/* Categorias de artefatos. `side` indica a parte da estrutura que cada uma constrói. */
(function (SG) {
  SG.categories = [
    {
      id: 'uc',
      short: 'UC',
      name: 'Casos de Uso',
      side: 'left',
      sideLabel: 'Lado esquerdo',
      color: '#4cc2ff',
      desc: 'Funcionalidades vistas pela perspectiva dos usuários.'
    },
    {
      id: 'rf',
      short: 'RF',
      name: 'Requisitos Funcionais',
      side: 'top',
      sideLabel: 'Lado superior',
      color: '#5fd38d',
      desc: 'Ações e funcionalidades que o sistema deve executar.'
    },
    {
      id: 'rnf',
      short: 'NF',
      name: 'Requisitos Não Funcionais',
      side: 'right',
      sideLabel: 'Lado direito',
      color: '#ffb454',
      desc: 'Desempenho, segurança, disponibilidade e usabilidade.'
    },
    {
      id: 'uml',
      short: 'DG',
      name: 'Diagramas UML',
      side: 'bottom',
      sideLabel: 'Lado inferior',
      color: '#c792ea',
      desc: 'Modelagem e documentação do sistema.'
    },
    {
      id: 'arq',
      short: 'AR',
      name: 'Componentes de Arquitetura',
      side: 'core',
      sideLabel: 'Núcleo',
      color: '#ff7eb6',
      desc: 'Organização estrutural dos componentes do sistema.'
    }
  ];
})(window.SG = window.SG || {});
