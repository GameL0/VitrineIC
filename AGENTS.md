# VitrineIC

React + Vite + Tailwind CSS v4. Vitrine de projetos e demandas do Instituto de
Computação.

## Servidor de desenvolvimento

```bash
pnpm install
pnpm dev
```

Sobe em `http://localhost:5173` com hot reload.
Outros scripts: `pnpm build` (typecheck + build), `pnpm preview`, `pnpm typecheck`.

## Onde mexer

Cada componente tem seu arquivo. **Abra só o que a tarefa pede** — não leia
`src/` inteiro nem varra as pastas de área.

### Área pública

| Tarefa | Arquivo |
|---|---|
| Landing: nav, hero, stats, destaques, CTA, rodapé | `src/components/landing/LandingPage.tsx` |
| Modal de acesso e abas | `src/components/landing/AuthModal.tsx` |
| Formulários de login | `src/components/landing/StudentForm.tsx`, `CompanyForm.tsx` |
| Campo, divisor, botão SSO | `src/components/landing/ui.tsx` |
| Roteamento entre áreas | `src/App.tsx` |

### Páginas públicas — `src/components/public/`

| Tarefa | Arquivo |
|---|---|
| Casca e navegação pública | `PublicArea.tsx`, `PublicNav.tsx` |
| Catálogo de projetos (vitrine pública) | `ProjectsCatalog.tsx` |
| Página de um projeto | `ProjectDetail.tsx` |
| Diretório de estudantes | `StudentsDirectory.tsx` |
| Perfil público do estudante | `PublicProfile.tsx` |
| Indicadores da ACE1 | `Impact.tsx` |
| Tipos das rotas públicas | `routes.ts` |

### Área do estudante — `src/components/student/`

| Tarefa | Arquivo |
|---|---|
| Shell e troca de telas | `StudentArea.tsx` |
| Onboarding (fluxo) | `Onboarding.tsx`, `StepIndicator.tsx` |
| Onboarding: perfil / skills / portfólio | `Step1.tsx`, `Step2.tsx`, `Step3.tsx` |
| Seleção de competências (busca + catálogo) | `SkillPicker.tsx` |
| Seletor de nível de proficiência | `LevelPicker.tsx` |
| Dashboard e notificações | `Dashboard.tsx` |
| Convites recebidos (aceitar/recusar) | `Invitations.tsx` |
| Conexão estabelecida | `ConnectionEstablished.tsx` |
| Laboratório (vitrine de projetos) | `Lab.tsx`, `StatusBadge.tsx` |
| Barra de navegação da área | `NavBar.tsx` |
| Label, Input, Rule, Tag | `ui.tsx` |

### Área do solicitante — `src/components/requester/`

| Tarefa | Arquivo |
|---|---|
| Shell e troca de telas | `RequesterArea.tsx` |
| Mural de demandas | `Dashboard.tsx` |
| Wizard de nova demanda (4 passos) | `NewDemandWizard.tsx` |
| Tela de sucesso e protocolo | `SuccessScreen.tsx` |
| Matches recebidos | `MatchScreen.tsx` |
| Status das demandas | `StatusBadge.tsx` |
| Barra de navegação da área | `NavBar.tsx` |
| Label, Input, SelectField, Rule | `ui.tsx` |

### Área da curadoria — `src/components/curator/`

| Tarefa | Arquivo |
|---|---|
| Shell e troca de telas | `CuratorArea.tsx` |
| Triagem (kanban) | `Triage.tsx` |
| Matchmaking e ranking | `Matchmaking.tsx` |
| Confirmação do match | `ConfirmModal.tsx` |
| Match efetivado | `MatchConfirmed.tsx` |
| Status e colunas do kanban | `StatusBadge.tsx` |
| Barra de navegação da área | `NavBar.tsx` |
| Label, Mono, Rule, SkillTag | `ui.tsx` |

### Transversais

| Tarefa | Arquivo |
|---|---|
| Algoritmo de match | `src/lib/match.ts` |
| Convites gerados pela curadoria | `src/data/invitations.ts` |
| Base de estudantes e projetos | `src/data/students.ts` |
| Insumos do painel de impacto | `src/data/impact.ts` |
| Universidade, domínios e cursos | `src/data/institution.ts` |
| Tipos do domínio | `src/types/index.ts` |
| Cores | `src/styles/tokens.ts` e `src/index.css` |
| Conteúdo exibido (fictício) | `src/data/` |

## Contexto

`context/` reúne o contexto do projeto em arquivos curtos e temáticos. Comece
por `context/README.md`, que diz qual ler para cada tipo de tarefa:

| Arquivo | Assunto |
|---|---|
| `context/01-produto.md` | o que é o VitrineIC, usuários, escopo inegociável |
| `context/02-arquitetura.md` | stack, navegação, estrutura, dívida estrutural |
| `context/03-dominio.md` | entidades, status, algoritmo de match, dados |
| `context/04-design-system.md` | cores, tipografia, padrões visuais |
| `context/05-convencoes.md` | convenções de código |
| `context/06-estado-atual.md` | o que funciona de verdade e o que é fachada |
| `context/07-glossario.md` | termos do produto e siglas acadêmicas |

Análise longa do front-end — 14 telas, fluxograma, modelo de dados — em
`docs/analise-frontend.md`. Material original da equipe também em `docs/`.

## Convenções

- Alias `@` aponta para `src/`. Importe `@/components/...`, nunca `../../`
- Um componente por arquivo. Export nomeado entre componentes; export default
  só nas telas raiz (`LandingPage`, `StudentArea`, `RequesterArea`, `CuratorArea`)
- Aspas duplas em strings com apóstrofo (`"We're here to help"`)
- Estado fica no componente mais baixo possível; `App.tsx` só roteia

## Estilo

Tailwind CSS v4 via `@tailwindcss/vite`. `src/index.css` importa o Tailwind e
declara os tokens no bloco `@theme`. Não há config de Tailwind nem PostCSS.

Os mesmos tokens existem como constantes em `src/styles/tokens.ts` para os
estilos aplicados via `style={{}}`, que é como o código herdado do protótipo
funciona. **Em código novo, prefira as utilities** (`text-navy`, `font-serif`).

Identidade (inspirada no rulebase.co): azul-marinho `#0b2545` (constante `NAVY`),
vermelho `#c1121f` (constante `RED`), creme `#f3f1ec` (`OFFWHITE`); Inter Tight
(títulos), Geist (corpo), Geist Mono (rótulos em caixa alta). Superfícies escuras
texturizadas com a classe `.vt-stone`. Detalhes em `context/04-design-system.md`.

## Cuidados

- Tudo em `src/data/` é **fictício** — métricas, pessoas e demandas inventadas.
- `data/demands.ts` (curadoria) e `data/requester-demands.ts` (solicitante) são
  **bases paralelas** que não se comunicam, assim como os dois vocabulários de
  status em `src/types/index.ts`. Unificá-las é a prioridade estrutural.
- Cada área tem seu próprio `ui.tsx` e `NavBar.tsx`, com implementações
  parecidas mas não idênticas. Ao mexer em uma, verifique as irmãs.
- O alvo é o **IC/UFAL**, com três cursos: Ciência da Computação, Engenharia
  da Computação e Inteligência Artificial. Nome da universidade, domínios e a
  lista de cursos vivem em `src/data/institution.ts`; o tipo `Course` restringe
  o campo. Não escreva "UFAL" nem nome de curso direto no componente.
- `src/data/students.ts` é a **fonte única** de estudante e projeto: alimenta o
  matchmaking, o catálogo público e os perfis. Enriqueça esse arquivo em vez de
  criar outra base.
- Os números do painel de impacto são **derivados** das bases em tempo de
  render. Não digite indicadores em `data/impact.ts` — só o que não dá para
  derivar (depoimentos, metas) mora lá.
- Não há roteamento por URL, persistência, backend nem testes.
