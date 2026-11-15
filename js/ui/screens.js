/* Telas sobre a área de jogo: início, briefing da fase, pausa, game over e vitória. */
(function (SG) {
  var overlay;

  var LOSS_TEXT = {
    wall: 'A estrutura ultrapassou os limites do escopo do projeto.',
    bug: 'Um bug crítico atingiu o sistema.'
  };

  function button(text) {
    return '<button class="btn" data-proceed>' + text + '</button>';
  }

  function legend() {
    return '<div class="legend">' + SG.categories.map(function (cat) {
      return '<span class="legend__item" style="--cat:' + cat.color + '">' +
        '<span class="badge">' + cat.short + '</span>' + cat.name + ' → ' + cat.sideLabel.toLowerCase() +
      '</span>';
    }).join('') + '</div>';
  }

  function result(state) {
    return '<dl class="result">' +
      '<dt>Pontuação</dt><dd>' + state.score + '</dd>' +
      '<dt>Artefatos</dt><dd>' + SG.rules.totalCollected(state) + '</dd>' +
      '<dt>Evolução</dt><dd>' + Math.round(SG.rules.evolution(state) * 100) + '%</dd>' +
    '</dl>';
  }

  var templates = {
    menu: function () {
      return '<span class="screen__kicker">Engenharia de Software</span>' +
        '<h2 class="screen__title">Sistema<sup>2</sup></h2>' +
        '<p class="screen__text">Construa um sistema de software camada por camada. Cada artefato ' +
        'coletado ergue <strong>um lado</strong> da estrutura; com os quatro lados e o núcleo completos, ' +
        'o sistema cresce e evolui para uma nova arquitetura.</p>' +
        legend() +
        '<p class="screen__text">Desvie das <strong>paredes</strong> e dos <strong>bugs</strong>.</p>' +
        button('Iniciar projeto') +
        '<span class="screen__hint"><kbd>Setas</kbd> ou <kbd>WASD</kbd> movem · <kbd>P</kbd> pausa</span>';
    },

    briefing: function (state) {
      var arch = SG.rules.arch(state);
      return '<span class="screen__kicker">Fase ' + (state.phase + 1) + ' de ' + SG.architectures.length + '</span>' +
        SG.hud.archIcon(arch, 'screen__icon') +
        '<h2 class="screen__title">' + arch.name + '</h2>' +
        '<span class="screen__kicker">' + arch.en + '</span>' +
        '<p class="screen__text">' + arch.desc + '</p>' +
        '<p class="screen__text">Meta: <strong>' + arch.sideNeed + '</strong> artefatos em cada lado e <strong>' +
        arch.coreNeed + '</strong> no núcleo.</p>' +
        button('Começar fase') +
        '<span class="screen__hint">A estrutura só se move depois da primeira direção.</span>';
    },

    paused: function () {
      return '<h2 class="screen__title">Pausado</h2>' + button('Continuar');
    },

    over: function (state) {
      return '<span class="screen__kicker">Game over</span>' +
        '<h2 class="screen__title">Projeto interrompido</h2>' +
        '<p class="screen__text">' + LOSS_TEXT[state.lossReason] + ' Você chegou até a <strong>' +
        SG.rules.arch(state).name + '</strong>.</p>' +
        result(state) +
        button('Reiniciar');
    },

    won: function (state) {
      return '<span class="screen__kicker">Vitória</span>' +
        '<h2 class="screen__title">Projeto concluído!</h2>' +
        '<p class="screen__text">O sistema passou pelas ' + SG.architectures.length +
        ' arquiteturas e todas as camadas foram entregues.</p>' +
        result(state) +
        button('Novo projeto');
    }
  };

  var COLORS = { over: 'var(--danger)', won: 'var(--success)' };

  function init(element, onProceed) {
    overlay = element;
    overlay.addEventListener('click', function (event) {
      if (event.target.closest('[data-proceed]')) onProceed();
    });
  }

  function show(state) {
    var template = templates[state.status];
    overlay.hidden = !template;
    if (!template) {
      overlay.innerHTML = '';
      return;
    }

    var color = COLORS[state.status] || 'var(--arch)';
    overlay.innerHTML = '<div class="screen" style="--screen-color:' + color + '">' + template(state) + '</div>';
    overlay.querySelector('[data-proceed]').focus(); // Enter/Espaço acionam o botão
  }

  SG.screens = { init: init, show: show };
})(window.SG = window.SG || {});
