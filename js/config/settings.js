/* Parâmetros ajustáveis do jogo. */
(function (SG) {
  SG.settings = {
    gridSize: 42, // células por lado da área de jogo
    itemSize: 2, // lado (em células) de um artefato coletável
    startSolid: 3, // lado do quadrado sólido inicial

    // Intervalo entre movimentos (ms): diminui a cada fase.
    tick: { start: 150, perPhase: 8 },

    bug: {
      size: 2,
      warnTicks: 14, // ticks como aviso (inofensivo) antes de ativar
      lifeTicks: 55, // duração mínima total
      lifeJitter: 40, // variação aleatória da duração
      margin: 3, // distância mínima da estrutura ao surgir
    },

    score: {
      item: 10, // por artefato, multiplicado pelo nº da fase
      fitBonus: 0.5, // bônus por coletar com o lado correspondente
      phase: 100, // por fase concluída, multiplicado pelo nº da fase
    },
  };

  // Direções de movimento. Os nomes coincidem com os lados da estrutura.
  SG.directions = {
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    top: { x: 0, y: -1 },
    bottom: { x: 0, y: 1 },
  };
})((window.SG = window.SG || {}));
