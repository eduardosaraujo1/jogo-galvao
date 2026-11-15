/*
 * Arquiteturas de software: cada uma é uma fase do jogo.
 *  - sideNeed: artefatos necessários em cada lado
 *  - coreNeed: componentes de arquitetura necessários no núcleo
 *  - bugs: quantidade de bugs simultâneos
 *  - icon: conteúdo de um SVG 48x48 (traço na cor da arquitetura)
 */
(function (SG) {
  SG.architectures = [
    {
      id: "layered",
      name: "Arquitetura em Camadas",
      en: "Layered Architecture",
      color: "#58a6ff",
      desc: "Organiza o sistema em camadas empilhadas (apresentação, negócio, dados). Cada camada só conversa com a camada logo abaixo.",
      sideNeed: 2,
      coreNeed: 1,
      bugs: 3,
      icon: '<rect x="6" y="7" width="36" height="9" rx="2"/><rect x="6" y="20" width="36" height="9" rx="2"/><rect x="6" y="33" width="36" height="9" rx="2"/>',
    },
    {
      id: "mvc",
      name: "Arquitetura MVC",
      en: "Model-View-Controller",
      color: "#3fd0c9",
      desc: "Separa os dados (Model), a interface (View) e o fluxo de controle (Controller), permitindo evoluir cada parte de forma independente.",
      sideNeed: 3,
      coreNeed: 1,
      bugs: 3,
      icon: '<path d="M24 15 L12 33 M24 15 L36 33 M17 37 L31 37"/><circle cx="24" cy="10" r="5"/><circle cx="11" cy="37" r="5"/><circle cx="37" cy="37" r="5"/>',
    },
    {
      id: "client-server",
      name: "Arquitetura Cliente-Servidor",
      en: "Client-Server",
      color: "#f2cc60",
      desc: "Clientes enviam requisições e um servidor central processa e responde. Regras e dados ficam concentrados no servidor.",
      sideNeed: 3,
      coreNeed: 2,
      bugs: 4,
      icon: '<rect x="4" y="16" width="14" height="16" rx="2"/><rect x="30" y="8" width="14" height="32" rx="2"/><path d="M18 21 H30 M30 21 l-4 -3 M30 21 l-4 3 M30 28 H18 M18 28 l4 -3 M18 28 l4 3"/>',
    },
    {
      id: "microservices",
      name: "Arquitetura de Microsserviços",
      en: "Microservices",
      color: "#ff9e64",
      desc: "Divide o sistema em serviços pequenos e independentes, cada um com sua responsabilidade, implantados e escalados separadamente.",
      sideNeed: 4,
      coreNeed: 2,
      bugs: 4,
      icon: '<rect x="5" y="5" width="13" height="13" rx="3"/><rect x="30" y="5" width="13" height="13" rx="3"/><rect x="5" y="30" width="13" height="13" rx="3"/><rect x="30" y="30" width="13" height="13" rx="3"/><path d="M18 18 L30 30 M30 18 L18 30"/>',
    },
    {
      id: "event-driven",
      name: "Arquitetura Orientada a Eventos",
      en: "Event-Driven Architecture",
      color: "#bb9af7",
      desc: "Componentes se comunicam publicando e consumindo eventos em um barramento, de forma assíncrona e desacoplada.",
      sideNeed: 4,
      coreNeed: 3,
      bugs: 5,
      icon: '<path d="M4 24 H44 M13 15 V24 M35 15 V24 M24 24 V33"/><circle cx="13" cy="10" r="5"/><circle cx="35" cy="10" r="5"/><circle cx="24" cy="38" r="5"/>',
    },
    {
      id: "hexagonal",
      name: "Arquitetura Hexagonal",
      en: "Ports and Adapters",
      color: "#7ee787",
      desc: "Isola o domínio no centro. O mundo externo (interface, banco, APIs) se conecta por portas e adaptadores substituíveis.",
      sideNeed: 5,
      coreNeed: 3,
      bugs: 6,
      icon: '<polygon points="24,4 41,14 41,34 24,44 7,34 7,14"/><rect x="18" y="18" width="12" height="12" rx="2"/><path d="M7 24 H18 M30 24 H41"/>',
    },
  ];
})((window.SG = window.SG || {}));
