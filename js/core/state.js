/* Estado de uma partida. Toda a lógica em core/ opera sobre este objeto. */
(function (SG) {
  // Contador zerado por categoria: { uc: 0, rf: 0, ... }
  function emptyCounts() {
    var counts = {};
    SG.categories.forEach(function (cat) { counts[cat.id] = 0; });
    return counts;
  }

  function create() {
    var s = SG.settings;
    var start = Math.floor((s.gridSize - (s.startSolid + 2)) / 2);

    return {
      status: 'menu',            // menu | briefing | playing | paused | over | won
      phase: 0,                  // índice em SG.architectures
      solid: s.startSolid,       // lado do quadrado já consolidado
      pos: { x: start, y: start },   // canto superior esquerdo da área ocupada
      prev: { x: start, y: start },  // posição no tick anterior (para animação)
      dir: null,                 // direção atual (chave de SG.directions)
      queuedDir: null,           // direção pedida pelo jogador
      progress: emptyCounts(),   // coletas na fase atual
      totals: emptyCounts(),     // coletas na partida
      score: 0,
      items: [],                 // { x, y, size, cat }
      bugs: [],                  // { x, y, size, age, life }
      lossReason: null           // 'wall' | 'bug'
    };
  }

  SG.state = { create: create, emptyCounts: emptyCounts };
})(window.SG = window.SG || {});
