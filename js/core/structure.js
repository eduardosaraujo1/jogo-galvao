/*
 * Geometria da estrutura quadrada.
 * A área ocupada é o quadrado sólido mais a camada em construção ao redor,
 * portanto tem lado `solid + 2`.
 */
(function (SG) {
  function rect(state) {
    return { x: state.pos.x, y: state.pos.y, size: state.solid + 2 };
  }

  // Dois quadrados {x, y, size} se sobrepõem? `margin` amplia o primeiro.
  function overlaps(a, b, margin) {
    margin = margin || 0;
    return a.x - margin < b.x + b.size && a.x + a.size + margin > b.x &&
           a.y - margin < b.y + b.size && a.y + a.size + margin > b.y;
  }

  function inBounds(r) {
    var grid = SG.settings.gridSize;
    return r.x >= 0 && r.y >= 0 && r.x + r.size <= grid && r.y + r.size <= grid;
  }

  function move(state) {
    var d = SG.directions[state.dir];
    state.prev = { x: state.pos.x, y: state.pos.y };
    state.pos = { x: state.pos.x + d.x, y: state.pos.y + d.y };
  }

  // Consolida a camada: cresce 1 célula para cada lado, sem sair do grid.
  function grow(state) {
    state.solid += 2;
    var max = SG.settings.gridSize - (state.solid + 2);
    state.pos = {
      x: Math.min(Math.max(state.pos.x - 1, 0), max),
      y: Math.min(Math.max(state.pos.y - 1, 0), max)
    };
    state.prev = { x: state.pos.x, y: state.pos.y };
  }

  SG.structure = { rect: rect, overlaps: overlaps, inBounds: inBounds, move: move, grow: grow };
})(window.SG = window.SG || {});
