/* Ponto de entrada: liga a interface ao motor do jogo. */
(function (SG) {
  SG.renderer.init(document.getElementById('canvas'));
  SG.hud.init();
  SG.screens.init(document.getElementById('overlay'), function () { SG.engine.proceed(); });
  SG.input.init(document.getElementById('dpad'));

  SG.engine.init({
    render: SG.renderer.draw,
    onTick: SG.hud.update,
    onCollect: SG.hud.pulse,
    onStatus: function (state) {
      SG.hud.update(state);
      SG.screens.show(state);
    }
  });
})(window.SG);
