# PLAN — Sistema² (jogo de Engenharia de Software)

Plano de ação para implementar o jogo descrito em `INSTRUCTIONS.md`.

## 1. Visão geral

Jogo de navegador em HTML5, CSS3 e JavaScript puro, sem dependências. O jogador
move pelo grid uma **estrutura quadrada** que representa um sistema de software.
Ela não cresce em comprimento: cresce em **camadas**, lado a lado, conforme os
artefatos de Engenharia de Software são coletados.

## 2. Decisões de design (confirmadas com o usuário)

| Tema | Decisão |
| --- | --- |
| Mecânica central | Bloco sólido em camadas. Um quadrado sólido `N×N` cercado por uma camada em construção (andaime). Quando os 4 lados e o núcleo ficam completos, a camada é consolidada e o sólido passa a `(N+2)×(N+2)`. |
| 5ª categoria | Componentes de Arquitetura preenchem o **núcleo**. São obrigatórios, junto com os 4 lados, para avançar de fase. |
| Derrota | Bater nas **paredes** da área de jogo ou encostar em um **bug** ativo. |
| Escopo | Plano + implementação completa, commits incrementais (`feat`, `fix`, `docs`), **sem `git push`**. |

Decisões tomadas por padrão (sem necessidade de consulta):

- **Scripts clássicos com namespace `window.SG`** em vez de ES Modules: módulos
  ES não carregam via `file://`, e o requisito é abrir o `index.html` direto.
- **Canvas 2D** para a área de jogo; DOM/CSS para painéis e telas.
- Interface em **português**.
- Controles de toque (D-pad) exibidos apenas em dispositivos touch.

## 3. Regras do jogo

### Estrutura
- Sólido inicial `3×3`; a área ocupada (e que colide) é `sólido + 2`, pois inclui
  a camada em construção.
- Move-se 1 célula por tick na direção atual (setas ou WASD). Fica parada até a
  primeira tecla de cada fase. Inverter a direção é permitido.
- Ao concluir a fase, cresce simetricamente (1 célula para cada lado) e é
  reposicionada para dentro do grid se necessário.

### Categorias (artefatos)
| Sigla | Categoria | Parte da estrutura |
| --- | --- | --- |
| UC | Casos de Uso | Lado esquerdo |
| RF | Requisitos Funcionais | Lado superior |
| NF | Requisitos Não Funcionais | Lado direito |
| DG | Diagramas UML | Lado inferior |
| AR | Componentes de Arquitetura | Núcleo |

- Sempre há no máximo 1 item de cada categoria ainda necessária, em posição
  aleatória. Categoria completa na fase deixa de aparecer — o crescimento é
  sempre equilibrado.
- Cada lado é dividido em segmentos (meta da fase); cada coleta preenche um.

### Arquiteturas (fases)
| # | Arquitetura | Meta por lado | Meta do núcleo | Bugs simultâneos |
| --- | --- | --- | --- | --- |
| 1 | Camadas | 2 | 1 | 1 |
| 2 | MVC | 3 | 1 | 2 |
| 3 | Cliente-Servidor | 3 | 2 | 2 |
| 4 | Microsserviços | 4 | 2 | 3 |
| 5 | Orientada a Eventos | 4 | 3 | 3 |
| 6 | Hexagonal | 5 | 3 | 4 |

Cada arquitetura tem cor, ícone (SVG) e descrição, exibidos no painel e em uma
tela de briefing no início da fase.

### Bugs
- Surgem em posição aleatória, longe da estrutura, primeiro como **aviso**
  (contorno piscando, inofensivo) e depois ficam ativos por tempo limitado.
- Um bug nunca é ativado enquanto estiver sob a estrutura.

### Dificuldade
Cresce com a fase: estrutura maior, tick mais rápido, mais bugs, metas maiores.

### Pontuação
- Coleta: `10 × nº da fase`.
- **Encaixe**: +50% se o item for coletado pelo lado correspondente (ex.: Caso de
  Uso coletado movendo-se para a esquerda).
- Conclusão de fase: `100 × nº da fase`.

### Fim de jogo
- **Vitória**: concluir a 6ª arquitetura.
- **Derrota**: parede ou bug. Sempre é possível reiniciar.

## 4. Interface

- **Barra superior**: título, pontuação, arquitetura atual, barra de evolução
  geral (artefatos coletados / total do projeto).
- **Área de jogo** centralizada (canvas quadrado) com overlay de telas: início,
  briefing de fase, pausa, game over, vitória.
- **Painel lateral**: cartão da arquitetura (ícone + descrição), categorias com
  progresso na fase e total, lista de fases.
- Tema escuro inspirado em IDEs/dashboards; cor própria por categoria.
- Responsivo: painel ao lado em telas largas, abaixo em telas estreitas.

## 5. Arquitetura do código

```
index.html
css/
  base/        tokens.css (variáveis), reset.css
  layout/      app.css (grid geral, responsividade)
  components/  topbar.css, board.css, overlay.css, panel.css, dpad.css
js/
  config/      settings.js, categories.js, architectures.js   (dados puros)
  core/        state.js, structure.js, rules.js, spawner.js, engine.js (lógica, sem DOM)
  ui/          renderer.js (canvas), hud.js (painéis), screens.js (overlay), input.js
  main.js      (ligação entre os módulos)
```

- `config/`: tudo que é ajustável (grid, velocidades, metas, textos) fica aqui.
- `core/`: lógica pura sobre um objeto `state`; não toca no DOM, o que permite
  testá-la com Node.
- `ui/`: lê o `state` e desenha; o `engine` avisa a UI por callbacks
  (`render`, `onTick`, `onStatus`, `onCollect`).

## 6. Lista de tarefas

- [x] T1 — `docs`: este plano.
- [x] T2 — `feat`: estrutura HTML e CSS (tokens, layout, componentes, responsivo).
- [x] T3 — `feat`: configuração (settings, categorias, arquiteturas).
- [x] T4 — `feat`: núcleo da lógica (state, structure, rules, spawner, engine).
- [x] T5 — `feat`: renderização em canvas da estrutura em camadas, itens e bugs.
- [x] T6 — `feat`: HUD, telas (início, briefing, pausa, game over, vitória) e entrada (teclado + toque).
- [x] T7 — verificação: simulação da lógica em Node e teste no navegador; `fix` do que aparecer.
- [x] T8 — `docs`: marcar tarefas concluídas.

## 7. Verificação

- Simulação headless da lógica (`core/`) com um bot simples até a vitória.
- Abertura do `index.html` no navegador: telas, controles, responsividade.
