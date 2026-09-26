# Design system

A identidade é **editorial**: serifada nos títulos, monoespaçada em caixa alta
nos rótulos, vermelho como acento pontual, zero arredondamento. Ela sobreviveu
intacta a três áreas escritas separadamente — é o ativo mais coeso do projeto.
Preserve-a.

## Cores

Três cores. Só isso.

| Token | Hex | RGB | Uso |
|---|---|---|---|
| Navy | `#1C2B4A` | `28, 43, 74` | texto, bordas, fundo do CTA, logo |
| Vermelho | `#c1121f` | `193, 18, 31` | acento pontual |
| Off-white | `#F5F4F0` | `245, 244, 240` | fundo da página, texto sobre navy |

Declaradas em dois lugares: `@theme` de `src/index.css` (gera as utilities
Tailwind) e `src/styles/tokens.ts` (constantes para `style={{}}`).

### Hierarquia por alpha, não por cores novas

A interface tem muitos tons, mas **nenhuma cor nova** — tudo é navy com alpha
hexadecimal. Ao precisar de um tom, use a escala existente em vez de inventar:

| Sufixo | Uso |
|---|---|
| `${NAVY}05` | fundo de hover de card |
| `${NAVY}15` / `${NAVY}18` | bordas de seção e de grid |
| `${NAVY}22` | divisores |
| `${NAVY}25` | contorno de tag |
| `${NAVY}33` | borda de botão secundário |
| `${NAVY}44` | contorno de input |
| `${NAVY}88` | texto de status neutro |

Overlay de modal: `rgba(28,43,74,0.55)` com `backdropFilter: blur(2px)`.
Estado inicial de underline animado: `${RED}00` (vermelho transparente).

Texto usa **opacidade** como hierarquia: 0.65 corpo, 0.5 secundário, 0.45
rótulo, 0.35–0.4 metadado, 0.25–0.3 terciário.

## Tipografia

| Família | Uso | Onde aparece |
|---|---|---|
| **DM Serif Display** | títulos | `h1`, `h2`, números grandes de stats |
| **Inter** (300–700) | corpo e botões | parágrafos, labels de botão, nomes |
| **Space Mono** | rótulos técnicos | eyebrows, metadados, IDs, status |

Carregadas por `@import` do Google Fonts no topo de `src/index.css`.

## Padrões recorrentes

- **Rótulos em caixa alta** com `letter-spacing` de 0.14em a 0.25em e tamanho
  micro (9–11 px). É a assinatura visual do projeto.
- **`border-radius: 0` em tudo.** Nenhum canto arredondado, em lugar nenhum.
- **Traço vermelho de 1 px** (`w-5` a `w-8`) como marcador antes do eyebrow de
  seção.
- **Grid com bordas compartilhadas** — cards sem borda própria, separados por
  `borderTop`/`borderLeft` condicionais ao índice.
- **Eyebrow + título** como abertura de toda seção: rótulo mono em caixa alta,
  depois o título serifado.
- **Numeração ordinal** (`01`, `02`, `03`) em mono vermelho, nas stats e nos
  indicadores de passo.
- **Hover discreto**: opacidade ou mudança de borda, sem escala nem sombra.

## Como escrever UI nova

O código herdado aplica cor e fonte via `style={{}}` com as constantes de
`tokens.ts`, e usa Tailwind só para layout e espaçamento. É assim em quase todo
lugar.

**Em código novo, prefira as utilities** geradas pelo `@theme` — `text-navy`,
`bg-offwhite`, `font-serif`, `font-mono`. Ao tocar em um componente antigo, pode
migrar o que alterar, mas não faça migração em massa junto de uma mudança
funcional: vira diff ilegível.

Para hover e transições, prefira CSS/Tailwind (`group-hover:`, `transition-*`)
a manipular `style` em `onMouseEnter`/`onMouseLeave` — o padrão herdado faz isso
em vários pontos e é o que se quer reduzir.

## Acessibilidade

Pontos conhecidos, para não reintroduzi-los em código novo:

- O modal não declara `role="dialog"` nem `aria-modal`, e não tem focus trap.
  Ele trata Escape e clique no backdrop, com cleanup correto.
- `<label>` não usa `htmlFor` e `<input>` não tem `id`, então clicar no rótulo
  não foca o campo.
- Links de navegação são `<button>`, não `<a href>`.
- Texto em opacidade 0.25–0.35 provavelmente não passa no contraste WCAG AA.
  Em elemento novo, evite descer abaixo de 0.45 para texto legível.
