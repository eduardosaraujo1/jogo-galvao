/*
 * Motor do jogo: laço principal, passo de simulação e transições de estado.
 * Comunica-se com a interface apenas pelos callbacks recebidos em init():
 *   render(state, alpha)  a cada quadro (alpha = fração do tick, para animação)
 *   onTick(state)         após cada passo de simulação
 *   onStatus(state)       quando o status muda (menu, briefing, playing...)
 *   onCollect(info)       quando um artefato é coletado
 */
(function (SG) {
  var state = null;
  var hooks = null;
  var lastTime = 0;
  var acc = 0; // tempo acumulado desde o último tick (ms)

  function setStatus(status) {
    state.status = status;
    acc = 0;
    hooks.onStatus(state);
  }

  function newGame() {
    state = SG.state.create();
    SG.spawner.refillItems(state);
    setStatus('briefing');
  }

  // Conclui a fase: vitória na última, senão cresce e apresenta a próxima arquitetura.
  function advancePhase() {
    state.score += SG.rules.phaseBonus(state);

    if (state.phase === SG.architectures.length - 1) {
      state.prev = state.pos;
      setStatus('won');
      return;
    }

    state.phase++;
    state.progress = SG.state.emptyCounts();
    state.dir = null;
    state.queuedDir = null;
    state.items = [];
    state.bugs = [];
    SG.structure.grow(state);
    SG.spawner.refillItems(state);
    setStatus('briefing');
  }

  function lose(reason) {
    state.lossReason = reason;
    setStatus('over');
  }

  // Um passo de simulação: move, verifica colisões, coleta e repõe.
  function step() {
    var S = SG.structure;

    if (state.queuedDir) state.dir = state.queuedDir;
    if (!state.dir) return; // parada até a primeira direção da fase

    S.move(state);
    var body = S.rect(state);

    if (!S.inBounds(body)) {
      state.pos = state.prev; // permanece visível dentro do grid
      return lose('wall');
    }

    var hitBug = state.bugs.some(function (bug) {
      return SG.spawner.isActive(bug) && S.overlaps(body, bug);
    });
    if (hitBug) return lose('bug');

    state.items = state.items.filter(function (item) {
      if (!S.overlaps(body, item)) return true;
      hooks.onCollect(SG.rules.collect(state, item));
      return false;
    });

    if (SG.rules.phaseComplete(state)) {
      advancePhase();
    } else {
      SG.spawner.updateBugs(state);
      SG.spawner.refillItems(state);
    }
    hooks.onTick(state);
  }

  function frame(time) {
    var delta = Math.min(time - lastTime, 250); // evita saltos ao voltar à aba
    lastTime = time;
    var alpha = 1;

    if (state.status === 'playing') {
      acc += delta;
      while (state.status === 'playing' && acc >= SG.rules.tickMs(state)) {
        acc -= SG.rules.tickMs(state);
        step();
      }
      if (state.status === 'playing' && state.dir) {
        alpha = acc / SG.rules.tickMs(state);
      }
    }

    hooks.render(state, alpha);
    requestAnimationFrame(frame);
  }

  // --- API usada pela interface ---

  function init(callbacks) {
    hooks = callbacks;
    state = SG.state.create();
    hooks.onStatus(state);
    requestAnimationFrame(frame);
  }

  // Ação principal das telas: iniciar, continuar ou reiniciar.
  function proceed() {
    if (state.status === 'briefing' || state.status === 'paused') {
      setStatus('playing');
    } else if (state.status !== 'playing') {
      newGame();
    }
  }

  function setDirection(name) {
    if (state.status === 'playing') state.queuedDir = name;
  }

  function togglePause() {
    if (state.status === 'playing') setStatus('paused');
    else if (state.status === 'paused') setStatus('playing');
  }

  SG.engine = {
    init: init,
    proceed: proceed,
    setDirection: setDirection,
    togglePause: togglePause,
    step: step,
    getState: function () { return state; }
  };
})(window.SG = window.SG || {});
