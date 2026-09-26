# Convenções de código

## Imports

- O alias **`@` aponta para `src/`**. Use `@/components/...`, `@/data/...`,
  `@/types`. **Nunca `../../`.**
- Entre arquivos da mesma área, use relativo curto: `./ui`, `./NavBar`.
- Tipos entram com `import type`.

```tsx
import { useState } from "react";
import { Label, Input } from "./ui";
import { NAVY, RED } from "@/styles/tokens";
import { DEMANDS } from "@/data/demands";
import type { Demand } from "@/types";
```

## Componentes

- **Um componente por arquivo**, com o nome do arquivo.
- **Export nomeado** entre componentes.
- **Export default** só nas telas raiz: `LandingPage`, `StudentArea`,
  `RequesterArea`, `CuratorArea`.
- Props tipadas inline no parâmetro, que é o padrão do projeto:

```tsx
export function StatusBadge({ status, size = 8 }: { status: DemandStatus; size?: number }) {
```

- Componente novo vai na pasta da área que o usa. Se servir a mais de uma área,
  isso é sinal de que a extração para um `ui/` compartilhado deve ser proposta —
  sinalize em vez de duplicar mais uma vez.

## Estado

- Estado no componente mais baixo possível. `App.tsx` só roteia.
- Cada área guarda seu `view` no shell e passa callbacks para baixo
  (`onBack`, `onNew`, `onConfirm`).
- Evite booleanos paralelos para estados mutuamente exclusivos — use união de
  strings, como `type Area` em `App.tsx`. Foi assim que o roteamento por três
  booleanos foi corrigido.

## TypeScript

- `strict: true`. **Não use `any`** — o código herdado tem casos no onboarding
  do estudante, e eles são dívida a reduzir, não padrão a seguir.
- Tipos de domínio ficam em `src/types/index.ts`.

## Estilo de escrita

- **Aspas duplas** em strings que contenham apóstrofo (`"We're here to help"`).
  Apóstrofo não escapado dentro de aspas simples quebra o build.
- Texto de interface em **português**, com acentuação correta.
- Comentários e nomes de domínio em português; nomes de componentes e props em
  inglês, como já está.

## Dados

- Conteúdo exibido vai em `src/data/`, nunca inline no componente.
- Todo arquivo de dados abre com um comentário marcando o conteúdo como
  fictício.
- **Não crie uma nova base de demanda ou estudante.** Já existem bases paralelas
  demais (ver `03-dominio.md`); reutilize as existentes.

## Antes de terminar uma tarefa

```bash
pnpm typecheck    # obrigatório
pnpm build        # se mexeu em estrutura, import ou config
```

Se a mudança é visível, percorra o fluxo no navegador **sem recarregar a
página** — não há persistência, e reload zera o estado.

## Ao mexer em código herdado

O código veio de um protótipo gerado por ferramenta visual. Ele tem padrões que
não são os que se quer daqui para frente: `style={{}}` no lugar de utilities,
hover manipulado em JavaScript, inputs não controlados, primitivas duplicadas
por área.

Melhore o que a tarefa toca, mas **não misture refatoração ampla com mudança
funcional** — separe em commits distintos, senão o diff fica ilegível e a
revisão impossível.

## Commits

Mensagem em português, no imperativo, com prefixo convencional (`feat:`,
`fix:`, `refactor:`, `chore:`, `docs:`). Corpo explicando **por que**, não o
que o diff já mostra. Não faça push sem pedido explícito.
