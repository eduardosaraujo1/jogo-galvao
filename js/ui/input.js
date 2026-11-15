/* Entrada do jogador: teclado (setas / WASD) e controles de toque. */
(function (SG) {
  var KEY_TO_DIR = {
    ArrowLeft: 'left', a: 'left',
    ArrowRight: 'right', d: 'right',
    ArrowUp: 'top', w: 'top',
    ArrowDown: 'bottom', s: 'bottom'
  };

  function onKeyDown(event) {
    var key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    var dir = KEY_TO_DIR[key];
    var playing = SG.engine.getState().status === 'playing';

    if (dir && playing) {
      event.preventDefault(); // evita rolar a página com as setas
      SG.engine.setDirection(dir);
    } else if (key === 'p' || key === 'Escape') {
      SG.engine.togglePause();
    }
  }

  function initDpad(dpad) {
    dpad.addEventListener('pointerdown', function (event) {
      var btn = event.target.closest('button');
      if (!btn) return;
      event.preventDefault();
      if (btn.dataset.dir) SG.engine.setDirection(btn.dataset.dir);
      else SG.engine.togglePause();
    });
  }

  function init(dpad) {
    document.addEventListener('keydown', onKeyDown);
    initDpad(dpad);
  }

  SG.input = { init: init };
})(window.SG = window.SG || {});
