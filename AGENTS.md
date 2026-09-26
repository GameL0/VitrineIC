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

### Área do estudante — `src/components/student/`

| Tarefa | Arquivo |
|---|---|
| Shell e troca de telas | `StudentArea.tsx` |
| Onboarding (fluxo) | `Onboarding.tsx`, `StepIndicator.tsx` |
| Onboarding: perfil / skills / portfólio | `Step1.tsx`, `Step2.tsx`, `Step3.tsx` |
| Barras de proficiência | `ProficiencyBars.tsx` |
| Dashboard e notificações | `Dashboard.tsx` |
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
| Tipos do domínio | `src/types/index.ts` |
| Cores | `src/styles/tokens.ts` e `src/index.css` |
| Conteúdo exibido (fictício) | `src/data/` |

Documentação do projeto em `docs/`. A análise do front-end — telas, fluxograma,
modelo de dados e aderência ao escopo — está em `docs/analise-frontend.md`;
leia antes de propor mudanças estruturais.

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

Identidade: navy `#1C2B4A`, vermelho `#c1121f`, off-white `#F5F4F0`; DM Serif
Display (títulos), Inter (corpo), Space Mono (rótulos em caixa alta).

## Cuidados

- Tudo em `src/data/` é **fictício** — métricas, pessoas e demandas inventadas.
- `data/demands.ts` (curadoria) e `data/requester-demands.ts` (solicitante) são
  **bases paralelas** que não se comunicam, assim como os dois vocabulários de
  status em `src/types/index.ts`. Unificá-las é a prioridade estrutural.
- Cada área tem seu próprio `ui.tsx` e `NavBar.tsx`, com implementações
  parecidas mas não idênticas. Ao mexer em uma, verifique as irmãs.
- Não há roteamento por URL, persistência, backend nem testes.
