/* Desenho da área de jogo em canvas: grid, artefatos, bugs e a estrutura. */
(function (SG) {
  var theme = {
    grid: 'rgba(255, 255, 255, 0.04)',
    body: '#1f2630',
    joint: '#8b949e',
    bug: '#ff5c5c',
    ink: '#0d1117',
    font: 'ui-monospace, "JetBrains Mono", Consolas, monospace'
  };

  var canvas, ctx;
  var cell = 0; // tamanho de uma célula em pixels do canvas

  function init(element) {
    canvas = element;
    ctx = canvas.getContext('2d');
    new ResizeObserver(resize).observe(canvas.parentElement);
    resize();
  }

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    var size = Math.round(canvas.parentElement.clientWidth * dpr);
    canvas.width = size;
    canvas.height = size;
    cell = size / SG.settings.gridSize;
  }

  // --- Primitivas (coordenadas em células) ---

  // Bloco arredondado com uma pequena folga, preenchido ou só contornado.
  function block(x, y, w, h, color, filled) {
    var gap = Math.max(1, cell * 0.08);
    var px = x * cell + gap, py = y * cell + gap;
    var pw = w * cell - 2 * gap, ph = h * cell - 2 * gap;

    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(px, py, pw, ph, cell * 0.2);
    else ctx.rect(px, py, pw, ph);

    if (filled) {
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(1, cell * 0.08);
      ctx.stroke();
    }
  }

  function label(text, x, y, size, scale) {
    ctx.fillStyle = theme.ink;
    ctx.font = '700 ' + (cell * scale) + 'px ' + theme.font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, (x + size / 2) * cell, (y + size / 2) * cell + cell * 0.05);
  }

  // Faixa dividida em `need` segmentos; os `done` primeiros ficam preenchidos.
  // `opacity` atenua os segmentos preenchidos (camadas já consolidadas).
  function segments(x, y, length, vertical, color, need, done, opacity) {
    var seg = length / need;
    for (var i = 0; i < need; i++) {
      var filled = i < done;
      ctx.globalAlpha = filled ? (opacity || 1) : 0.45;
      if (vertical) block(x, y + i * seg, 1, seg, color, filled);
      else block(x + i * seg, y, seg, 1, color, filled);
    }
    ctx.globalAlpha = 1;
  }

  // --- Elementos do jogo ---

  function drawGrid() {
    var grid = SG.settings.gridSize;
    ctx.strokeStyle = theme.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var i = 1; i < grid; i++) {
      var p = Math.round(i * cell) + 0.5;
      ctx.moveTo(p, 0); ctx.lineTo(p, canvas.height);
      ctx.moveTo(0, p); ctx.lineTo(canvas.width, p);
    }
    ctx.stroke();
  }

  function drawItem(item) {
    block(item.x, item.y, item.size, item.size, item.cat.color, true);
    label(item.cat.short, item.x, item.y, item.size, 0.95);
  }

  // Aviso: contorno piscando. Ativo: bloco vermelho preenchido.
  function drawBug(bug) {
    if (SG.spawner.isActive(bug)) {
      block(bug.x, bug.y, bug.size, bug.size, theme.bug, true);
      label('BUG', bug.x, bug.y, bug.size, 0.7);
    } else {
      ctx.globalAlpha = bug.age % 4 < 2 ? 0.9 : 0.35;
      block(bug.x, bug.y, bug.size, bug.size, theme.bug, false);
      ctx.globalAlpha = 1;
    }
  }

  /*
   * Um anel (camada) de lado `size` com canto superior esquerdo em (x, y).
   * Cada lado pertence a uma categoria. Com `state`, é a camada em construção
   * (segmentos conforme o progresso); sem `state`, é uma camada consolidada.
   */
  function drawRing(x, y, size, state) {
    var inner = size - 2; // comprimento do lado sem os cantos
    var origin = {
      top: { x: x + 1, y: y, vertical: false },
      bottom: { x: x + 1, y: y + size - 1, vertical: false },
      left: { x: x, y: y + 1, vertical: true },
      right: { x: x + size - 1, y: y + 1, vertical: true }
    };

    SG.categories.forEach(function (cat) {
      var o = origin[cat.side];
      if (!o) return; // o núcleo não faz parte do anel

      if (state) {
        segments(o.x, o.y, inner, o.vertical, cat.color, SG.rules.need(state, cat), state.progress[cat.id]);
      } else {
        segments(o.x, o.y, inner, o.vertical, cat.color, 1, 1, 0.55);
      }
    });

    // Cantos: junções neutras entre os lados.
    ctx.globalAlpha = state ? 0.45 : 0.55;
    [[x, y], [x + size - 1, y], [x, y + size - 1], [x + size - 1, y + size - 1]].forEach(function (c) {
      block(c[0], c[1], 1, 1, theme.joint, !state);
    });
    ctx.globalAlpha = 1;
  }

  // Núcleo 3x3: enche de baixo para cima com os componentes de arquitetura.
  function drawCore(x, y, state) {
    var cat = SG.categories.filter(function (c) { return c.side === 'core'; })[0];
    var need = SG.rules.need(state, cat);
    var done = state.progress[cat.id];
    var seg = 3 / need;

    for (var i = 0; i < need; i++) {
      var filled = i < done;
      ctx.globalAlpha = filled ? 1 : 0.45;
      block(x, y + 3 - (i + 1) * seg, 3, seg, cat.color, filled);
    }
    ctx.globalAlpha = 1;
  }

  function drawStructure(state, alpha) {
    var x = state.prev.x + (state.pos.x - state.prev.x) * alpha;
    var y = state.prev.y + (state.pos.y - state.prev.y) * alpha;
    var size = state.solid + 2;

    // Fundo do quadrado sólido, na cor da arquitetura atual.
    ctx.fillStyle = theme.body;
    ctx.fillRect((x + 1) * cell, (y + 1) * cell, state.solid * cell, state.solid * cell);
    ctx.strokeStyle = SG.rules.arch(state).color;
    ctx.lineWidth = Math.max(1, cell * 0.1);
    ctx.strokeRect((x + 1) * cell, (y + 1) * cell, state.solid * cell, state.solid * cell);

    // Camadas consolidadas (uma por fase concluída), de fora para dentro.
    for (var i = 0; i < state.phase; i++) {
      drawRing(x + 1 + i, y + 1 + i, state.solid - 2 * i, null);
    }

    drawCore(x + 1 + state.phase, y + 1 + state.phase, state);
    drawRing(x, y, size, state); // camada em construção
  }

  function draw(state, alpha) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    state.items.forEach(drawItem);
    state.bugs.forEach(drawBug);
    drawStructure(state, alpha);
  }

  SG.renderer = { init: init, draw: draw };
})(window.SG = window.SG || {});
