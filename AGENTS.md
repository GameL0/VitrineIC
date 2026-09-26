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

## Estrutura do projeto

- `src/main.tsx` — entrypoint React; importa `src/index.css` e monta `src/App.tsx` no `#root`
- `src/App.tsx` — landing page, modal de acesso e roteamento entre as áreas
- `src/StudentArea.tsx` — área do estudante (onboarding, dashboard, laboratório)
- `src/RequesterArea.tsx` — área do solicitante (demandas, nova demanda, matches)
- `src/CuratorArea.tsx` — área da curadoria (triagem, matchmaking, confirmação)
- `src/index.css` — CSS global, import do Tailwind v4 e tokens do tema
- `vite.config.ts` — Vite com React, Tailwind v4 e o alias `@` para `src`
- `.mise.toml` — versões de Node.js e pnpm

Documentação do projeto em `docs/`.

## Dependências

- Runtime: React 19 e React DOM 19
- Estilo: Tailwind CSS v4 via plugin `@tailwindcss/vite`
- Build: Vite 8, TypeScript 5.7 e `@vitejs/plugin-react`

## Estilo

Tailwind CSS v4 pelo plugin `@tailwindcss/vite` configurado em `vite.config.ts`.
`src/index.css` importa o Tailwind com `@import 'tailwindcss';` e declara os
tokens no bloco `@theme`. Não há config de Tailwind nem PostCSS.

Identidade: navy `#1C2B4A`, vermelho `#c1121f`, off-white `#F5F4F0`; DM Serif
Display (títulos), Inter (corpo), Space Mono (rótulos em caixa alta).

## Qualidade de código

- Use aspas duplas em strings que contenham apóstrofos (`"We're here to help"`)
- Garanta que tags JSX estejam fechadas e chaves balanceadas
- Exporte componentes como default export
