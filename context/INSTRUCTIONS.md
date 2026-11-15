Crie um jogo de navegador inspirado no clássico Snake Game, mas com uma temática voltada à Engenharia de Software. O jogo deverá ser desenvolvido utilizando exclusivamente HTML, CSS e JavaScript puro, sem necessidade de frameworks ou instalação de dependências, podendo ser executado diretamente pelo navegador.
O jogador controla uma representação visual de um sistema de software, simbolizada por uma cobrinha.
Entretanto, diferentemente do Snake tradicional, a cobrinha não deverá simplesmente crescer em comprimento. Sua proposta é representar o crescimento estrutural de um projeto de software.
A cobrinha deverá manter um formato perfeitamente equilibrado, preferencialmente quadrado, enquanto seus lados são incrementados conforme o jogador coleta diferentes elementos relacionados à Engenharia de Software.
Cada elemento coletado representa uma parte do desenvolvimento de um sistema, como casos de uso, requisitos funcionais, requisitos não funcionais, diagramas, componentes arquiteturais e outros artefatos de Engenharia de Software.
A principal característica do jogo é que cada categoria de elemento coletável deverá estar associada a um dos lados da estrutura da cobrinha.
Por exemplo:
- Casos de uso: incrementam o lado esquerdo.
- Requisitos funcionais: incrementam o lado superior.
- Requisitos não funcionais: incrementam o lado direito.
- Diagramas UML: incrementam o lado inferior.
Essas associações são apenas exemplos. A implementação deverá contemplar pelo menos 5 categorias distintas de elementos da Engenharia de Software, preferencialmente com cores, símbolos e identificações próprias.
O crescimento deverá ser visualmente equilibrado. Não quero uma cobrinha convencional que apenas aumenta seu comprimento: quero uma estrutura quadrada que se expande de maneira organizada, mantendo sua identidade visual e a proporção entre os lados.
A coleta de um elemento deverá atualizar tanto a estrutura visual quanto os indicadores de progresso da respectiva categoria.
Inclua pelo menos cinco categorias relacionadas à Engenharia de Software. Sugestões:
1. Casos de Uso: representam as funcionalidades observadas pela perspectiva dos usuários.
2. Requisitos Funcionais: representam as ações e funcionalidades que o sistema deve executar.
3. Requisitos Não Funcionais: representam características como desempenho, segurança, disponibilidade e usabilidade.
4. Diagramas UML: representam a modelagem e documentação do sistema.
5. Arquitetura de Software: representa a organização estrutural dos componentes do sistema.
As categorias devem ser facilmente identificáveis durante a partida, utilizando elementos visuais diferentes.
Além das categorias de artefatos, o jogo deverá contemplar pelo menos cinco tipos de arquiteturas de software, que poderão ser apresentados como fases, desafios, objetivos especiais ou sistemas de progressão.
Considere as seguintes arquiteturas:
- Arquitetura em Camadas (Layered Architecture).
- Arquitetura MVC (Model-View-Controller).
- Arquitetura Cliente-Servidor.
- Arquitetura de Microsserviços.
- Arquitetura Orientada a Eventos (Event-Driven Architecture).
- Arquitetura Hexagonal (Ports and Adapters).
Cada arquitetura deverá possuir uma identidade visual e uma breve descrição explicativa, permitindo que o jogador reconheça suas características.
A progressão entre arquiteturas poderá acontecer conforme o jogador atinge determinadas metas de desenvolvimento.
- O jogador deverá controlar a estrutura utilizando as setas do teclado ou WASD.
- Os elementos coletáveis deverão aparecer em posições aleatórias dentro da área de jogo.
- Cada coleta deverá incrementar a categoria correspondente.
- A estrutura deverá manter seu formato quadrado e crescimento equilibrado.
- O jogador deverá visualizar seu progresso individual em cada categoria.
- A dificuldade poderá aumentar gradualmente conforme o sistema evolui.
- Deve existir uma condição de vitória, derrota e possibilidade de reiniciar a partida.
- Implemente um sistema de pontuação baseado na quantidade de elementos coletados e na evolução do sistema.
Desenvolva uma interface moderna, com estética inspirada em ferramentas de desenvolvimento de software e dashboards tecnológicos.
A interface deverá apresentar:
- Área principal do jogo, centralizada.
- Painel lateral com as categorias e respectivas quantidades coletadas.
- Indicador de pontuação.
- Indicador da arquitetura atual.
- Barra ou indicador de evolução geral do sistema.
- Tela inicial com título, descrição e botão para iniciar.
- Tela de Game Over.
- Tela de vitória ou conclusão do projeto.
Utilize uma identidade visual consistente, com cores distintas para cada categoria, boa legibilidade e animações suaves.
O design deverá ser responsivo, adaptando-se a diferentes resoluções de tela.
- Utilizar HTML5, CSS3 e JavaScript puro.
- Não utilizar frameworks.
- Organizar o código em módulos, com estrutura, e se necessário, subestruturas, principalmente no JavaScript e CSS .
- Implementar uma lógica de jogo organizada e de fácil manutenção.
- Evitar códigos desnecessariamente complexos.
- Garantir que todas as funcionalidades estejam efetivamente implementadas.
- Não utilizar elementos visuais meramente decorativos que não tenham relação com a mecânica do jogo.
A mecânica de crescimento quadrado é o elemento central do projeto.
Não transforme o jogo em uma simples cópia do Snake tradicional com nomes de Engenharia de Software.
Quero que o jogador tenha a sensação de estar construindo e expandindo um sistema de software. Cada elemento coletado deverá representar uma contribuição real para a evolução do projeto, enquanto a estrutura principal cresce de maneira equilibrada e organizada.
O resultado deverá ser um jogo funcional, intuitivo, visualmente interessante e que consiga transmitir conceitos fundamentais da Engenharia de Software por meio de sua jogabilidade.
