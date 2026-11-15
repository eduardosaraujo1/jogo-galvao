/* Geração aleatória de artefatos e bugs na área de jogo. */
(function (SG) {
  var MAX_TRIES = 200;

  function randomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // Procura um quadrado livre, a pelo menos `margin` células da estrutura.
  function freeSpot(state, size, margin) {
    var S = SG.structure;
    var body = S.rect(state);
    var others = state.items.concat(state.bugs);
    var range = SG.settings.gridSize - size + 1;

    for (var i = 0; i < MAX_TRIES; i++) {
      var spot = { x: randomInt(range), y: randomInt(range), size: size };
      if (S.overlaps(body, spot, margin)) continue;
      if (others.some(function (o) { return S.overlaps(o, spot, 1); })) continue;
      return spot;
    }
    return null;
  }

  // Mantém em campo um item de cada categoria que a fase ainda precisa.
  function refillItems(state) {
    SG.categories.forEach(function (cat) {
      if (SG.rules.isFull(state, cat)) return;
      if (state.items.some(function (item) { return item.cat === cat; })) return;

      var spot = freeSpot(state, SG.settings.itemSize, 1);
      if (spot) {
        spot.cat = cat;
        state.items.push(spot);
      }
    });
  }

  function isActive(bug) {
    return bug.age >= SG.settings.bug.warnTicks;
  }

  // Envelhece, remove e repõe bugs conforme a quantidade da fase.
  function updateBugs(state) {
    var cfg = SG.settings.bug;
    var body = SG.structure.rect(state);

    state.bugs.forEach(function (bug) {
      // Um bug nunca é ativado embaixo da estrutura.
      var wouldActivate = bug.age + 1 === cfg.warnTicks;
      if (wouldActivate && SG.structure.overlaps(body, bug)) return;
      bug.age++;
    });

    state.bugs = state.bugs.filter(function (bug) { return bug.age < bug.life; });

    while (state.bugs.length < SG.rules.arch(state).bugs) {
      var spot = freeSpot(state, cfg.size, cfg.margin);
      if (!spot) break;
      spot.age = 0;
      spot.life = cfg.lifeTicks + randomInt(cfg.lifeJitter);
      state.bugs.push(spot);
    }
  }

  SG.spawner = { refillItems: refillItems, updateBugs: updateBugs, isActive: isActive };
})(window.SG = window.SG || {});
