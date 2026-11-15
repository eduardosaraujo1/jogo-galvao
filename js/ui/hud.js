/* Indicadores: pontuação, arquitetura atual, evolução geral, categorias e fases. */
(function (SG) {
  var el = {};
  var shownPhase = -1; // fase atualmente exibida no cartão da arquitetura

  function byId(id) {
    return document.getElementById(id);
  }

  function archIcon(arch, cls) {
    return '<svg class="' + cls + '" viewBox="0 0 48 48" fill="none" stroke="currentColor" ' +
           'stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' + arch.icon + '</svg>';
  }

  function buildCategories() {
    el.cats.innerHTML = SG.categories.map(function (cat) {
      return '<li class="cat" data-id="' + cat.id + '" style="--cat:' + cat.color + '" title="' + cat.desc + '">' +
        '<span class="badge">' + cat.short + '</span>' +
        '<div class="cat__info">' +
          '<span class="cat__name">' + cat.name + '</span>' +
          '<span class="cat__side">' + cat.sideLabel + ' · total <span data-total>0</span></span>' +
        '</div>' +
        '<span class="cat__count" data-count>0/0</span>' +
        '<div class="meter"><div class="meter__fill" data-fill></div></div>' +
      '</li>';
    }).join('');
  }

  function buildPhases() {
    el.phases.innerHTML = SG.architectures.map(function (arch) {
      return '<li class="phase" style="--phase-color:' + arch.color + '">' + arch.name + '</li>';
    }).join('');
  }

  function init() {
    ['score', 'arch-name', 'evolution-pct', 'evolution-fill', 'arch-card', 'cats', 'phases'].forEach(function (id) {
      el[id.replace(/-(\w)/, function (m, c) { return c.toUpperCase(); })] = byId(id);
    });
    buildCategories();
    buildPhases();
  }

  function updateArchitecture(state) {
    if (state.phase === shownPhase) return;
    shownPhase = state.phase;

    var arch = SG.rules.arch(state);
    document.documentElement.style.setProperty('--arch', arch.color);
    el.archName.textContent = arch.name.replace(/^Arquitetura (de |em )?/, '');
    el.archCard.innerHTML =
      archIcon(arch, 'arch__icon') +
      '<h2 class="arch__name">' + arch.name + '</h2>' +
      '<span class="arch__en">' + arch.en + '</span>' +
      '<p class="arch__desc">' + arch.desc + '</p>';
  }

  function updateCategories(state) {
    SG.categories.forEach(function (cat) {
      var row = el.cats.querySelector('[data-id="' + cat.id + '"]');
      var need = SG.rules.need(state, cat);
      var done = state.progress[cat.id];

      row.querySelector('[data-count]').textContent = done + '/' + need;
      row.querySelector('[data-total]').textContent = state.totals[cat.id];
      row.querySelector('[data-fill]').style.width = (100 * done / need) + '%';
      row.classList.toggle('is-full', done >= need);
    });
  }

  function updatePhases(state) {
    var won = state.status === 'won';
    Array.prototype.forEach.call(el.phases.children, function (item, i) {
      item.classList.toggle('is-done', i < state.phase || won);
      item.classList.toggle('is-current', i === state.phase && !won);
    });
  }

  function update(state) {
    var pct = Math.round(SG.rules.evolution(state) * 100) + '%';
    el.score.textContent = state.score;
    el.evolutionPct.textContent = pct;
    el.evolutionFill.style.width = pct;

    updateArchitecture(state);
    updateCategories(state);
    updatePhases(state);
  }

  // Destaca a categoria que acabou de ser coletada.
  function pulse(info) {
    var row = el.cats.querySelector('[data-id="' + info.cat.id + '"]');
    row.classList.remove('is-pulse');
    void row.offsetWidth; // reinicia a animação
    row.classList.add('is-pulse');
  }

  SG.hud = { init: init, update: update, pulse: pulse, archIcon: archIcon };
})(window.SG = window.SG || {});
