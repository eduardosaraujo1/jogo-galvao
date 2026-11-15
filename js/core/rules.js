/* Regras: metas por fase, coleta, pontuação e evolução geral. */
(function (SG) {
  function arch(state) {
    return SG.architectures[state.phase];
  }

  // Quantos artefatos da categoria a fase atual exige.
  function need(state, cat) {
    return cat.side === 'core' ? arch(state).coreNeed : arch(state).sideNeed;
  }

  function isFull(state, cat) {
    return state.progress[cat.id] >= need(state, cat);
  }

  function phaseComplete(state) {
    return SG.categories.every(function (cat) { return isFull(state, cat); });
  }

  // Registra a coleta de um item e devolve { cat, points, fit }.
  function collect(state, item) {
    var s = SG.settings.score;
    var fit = item.cat.side === state.dir; // coletado pelo lado correspondente
    var points = Math.round(s.item * (state.phase + 1) * (fit ? 1 + s.fitBonus : 1));

    state.progress[item.cat.id]++;
    state.totals[item.cat.id]++;
    state.score += points;

    return { cat: item.cat, points: points, fit: fit };
  }

  function phaseBonus(state) {
    return SG.settings.score.phase * (state.phase + 1);
  }

  // Total de artefatos necessários para concluir o projeto inteiro.
  function totalNeeded() {
    return SG.architectures.reduce(function (sum, a) {
      return sum + 4 * a.sideNeed + a.coreNeed;
    }, 0);
  }

  function totalCollected(state) {
    return SG.categories.reduce(function (sum, cat) {
      return sum + state.totals[cat.id];
    }, 0);
  }

  // Evolução geral do sistema, de 0 a 1.
  function evolution(state) {
    return totalCollected(state) / totalNeeded();
  }

  function tickMs(state) {
    var t = SG.settings.tick;
    return t.start - t.perPhase * state.phase;
  }

  SG.rules = {
    arch: arch,
    need: need,
    isFull: isFull,
    phaseComplete: phaseComplete,
    collect: collect,
    phaseBonus: phaseBonus,
    totalCollected: totalCollected,
    evolution: evolution,
    tickMs: tickMs
  };
})(window.SG = window.SG || {});
