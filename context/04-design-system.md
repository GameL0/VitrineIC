# Design system

A identidade segue a referência do **rulebase.co**: fundo creme quente, tinta
quase preta, acento verde-musgo, títulos sans grandes com tracking negativo,
cards brancos arredondados com sombra suave e painéis escuros com textura de
pedra. A estrutura das telas é a mesma da fase editorial anterior; mudou só a
camada visual.

Os nomes das constantes são herdados: `NAVY` é a tinta, `RED` é o acento
verde e `OFFWHITE` é o creme. Renomear seria um diff em todos os arquivos, então
ficou para depois.

## Cores

| Token | Hex | Uso |
|---|---|---|
| `NAVY` (tinta) | `#1a1915` | texto, bordas, botão primário, painéis escuros |
| `RED` (musgo) | `#2f6b4f` | acento pontual, estados positivos |
| `OFFWHITE` (creme) | `#f3f1ec` | fundo da página, texto sobre tinta |
| `STONE` | `#e6e2d9` | superfícies secundárias |
| `SAGE` | `#a8c3ae` | acento sobre fundo escuro |

Cores de status (literais, tons terrosos): azul ardósia `#4a6a9c` (novo),
ocre `#b7791f` (em análise/aguardo), musgo `#2f6b4f` (aprovado/aceito),
terracota `#b4432f` (rejeitado, prioridade alta, erro).

Declaradas em `@theme` de `src/index.css` e em `src/styles/tokens.ts`.

### Hierarquia por alpha

Tons intermediários continuam sendo a tinta com alpha hexadecimal
(`${NAVY}14` para borda de card, `${NAVY}22` para divisores etc.). Overlay de
modal: `rgba(26,25,21,0.55)` com `backdropFilter: blur(2px)`.

## Tipografia

| Família | Uso |
|---|---|
| **Inter Tight** (500) | títulos e números grandes; tracking −0.035em em h1/h2 |
| **Geist** | corpo e botões; botões em caixa normal |
| **Geist Mono** | rótulos técnicos em caixa alta, tracking 0.08em |

Peso e tracking são aplicados por `src/index.css` a partir da família no
`style` inline, então trocar a família de um elemento já traz o ritmo certo.

## Superfícies

- `.vt-stone` — painel escuro com gradientes e ruído fractal (substitui as
  fotos de pedra/mármore da referência). Usado no CTA, rodapé e card do hero.
- `.vt-sand` — versão clara, para destaques sobre o creme.
- Cards: fundo branco, `border-radius: 16px`, borda `${NAVY}14` e sombra em
  camadas (vem do CSS global). Hover aumenta a sombra, sem escala.
- Botões e inputs 10px; tags e pílulas totalmente arredondadas.

## Padrões recorrentes

- **Rótulos em caixa alta** com `letter-spacing` de 0.14em a 0.25em e tamanho
  micro (9–11 px). É a assinatura visual do projeto.
- **Traço de acento de 1 px** (`w-5` a `w-8`) como marcador antes do eyebrow de
  seção.
- **Grid com bordas compartilhadas** — cards sem borda própria, separados por
  `borderTop`/`borderLeft` condicionais ao índice.
- **Eyebrow + título** como abertura de toda seção: rótulo mono em caixa alta,
  depois o título serifado.
- **Numeração ordinal** (`01`, `02`, `03`) em mono no acento, nas stats e nos
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
