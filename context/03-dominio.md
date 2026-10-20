# Domínio e dados

## Entidades

### Demand — `src/types/index.ts`

```ts
interface Demand {
  id: string;            // "VIC-2026-0041"
  title: string;
  company: string;
  area: string;          // "Eng. de Software"
  scope: string;         // "Médio (3–6 meses)"
  deadline: string;
  skills: string[];      // base do algoritmo de match
  description: string;
  submitted: string;
  status: DemandStatus;
  priority: "alta" | "normal" | "baixa";
}
```

É a entidade mais bem modelada do projeto, porque é onde há lógica real.

### Estudante — sem tipo declarado

O estudante existe em **três representações que não se conhecem**:

| Onde | Forma |
|---|---|
| `data/students.ts` | base da curadoria: `id`, `name`, `initials`, `course`, `semester`, `gpa`, `skills[]`, `projects[]`, `github`, `availability` |
| `data/showcase.ts` | vitrine da landing: mistura pessoa (`name`, `course`) e projeto (`project`, `year`, `tag`) numa estrutura só |
| Onboarding | objeto montado em `Step1-3`, sem tipo — o perfil do estudante é a única entidade central sem contrato |

Ao criar tipo para estudante, comece por `data/students.ts`, que é o shape mais
completo, e note que `showcase.ts` precisa ser separado em pessoa + projeto.

## Status da demanda: um vocabulário só

`DemandStatus` vale para as três áreas: `nova`, `em_analise`, `aprovada`,
`rejeitada`, `contato_liberado`. Cada área escolhe o rótulo que mostra (o
solicitante vê `aprovada` como "Recebendo interesses"). Não existe etapa de
"concluída": depois do contato liberado o site não acompanha mais nada. O
kanban da triagem mostra as cinco colunas.

## Interesse — o fluxo de match

Desenho completo em `fluxo/fluxo-match.md` (pasta do projeto). Um registro só,
`Interest` em `src/types/index.ts`, para três portas:

| Origem | Quem cria | Caminho até o contato |
|---|---|---|
| `candidatura` | estudante, em Oportunidades | aguardando solicitante → contato liberado |
| `convite` | solicitante, pela vitrine de estudantes | aguardando estudante → contato liberado |
| `sugestao` | curadoria, no matchmaking, com justificativa obrigatória | aguardando estudante → aguardando solicitante → contato liberado |

Qualquer recusa encerra o interesse (`recusado_estudante` ou
`recusado_solicitante`) e o `refusalReason` fica visível ao solicitante e à
curadoria, nunca ao estudante. O solicitante só vê uma sugestão depois que o
estudante aceitou (`visibleToRequester`). A curadoria vê tudo, mas só age nas
próprias sugestões. As transições moram em `src/lib/interest.ts`.

O selo "em projeto" (`Student.inProject`) é marcado pelo estudante em Meus
projetos e é o único dado que continua depois do contato.

## O algoritmo de match — `src/lib/match.ts`

É a única lógica de negócio do sistema:

```ts
function scoreStudent(student, demand): number {
  const matched = student.skills.filter((s) =>
    demand.skills.some((ds) => ds.toLowerCase() === s.toLowerCase())
  ).length;
  return Math.round((matched / demand.skills.length) * 100);
}
```

Percentual das skills da demanda cobertas pelo estudante, por igualdade de
string sem diferenciar maiúsculas.

O que a escolha implica:

- **A demanda é o denominador.** Mede cobertura da necessidade, não
  aproveitamento do repertório do estudante.
- **Compatibilidade é binária por skill.** Os 4 níveis de proficiência coletados
  no onboarding (`data/skills.ts` → `LEVELS`) **não entram na conta**. É um dado
  já capturado e não aproveitado — o caminho mais curto para melhorar o match.
- **Todas as skills pesam igual.** Não há requisito obrigatório versus desejável.
- **Só tecnologia conta.** `availability`, `gpa`, `semester`, área de interesse e
  escopo existem nos dados e ficam de fora. O README previa "área de interesse,
  tecnologia, disponibilidade" — um dos três está implementado.
- **A taxonomia é parcialmente controlada.** A comparação continua textual, mas
  a entrada passa por `canonicalSkill` (`@/data/skills`), que resolve apelidos:
  `reactjs` e `react.js` viram `React` antes de entrar no perfil. Skills fora do
  catálogo ainda podem ser declaradas — ficam marcadas como tal na UI, e é nelas
  que a divergência de grafia persiste.
- **Demanda sem skills retorna `NaN`** (divisão por zero).

Para um protótipo de disciplina é defensável: transparente e explicável. O ponto
de atenção é que não sustenta a promessa de "apontar a pessoa mais compatível"
com a precisão que o README sugere.

## Dados — `src/data/`

**Tudo é fictício.** Nomes, métricas e demandas foram inventados para o
protótipo. Nada deve ser tratado ou publicado como real.

| Arquivo | Conteúdo | Usado por |
|---|---|---|
| `showcase.ts` | `stats`, `featuredStudents` (6) | landing |
| `demands.ts` | `DEMANDS: Demand[]` — base única | as três áreas e o impacto |
| `interests.ts` | `INTERESTS: Interest[]` | as três áreas e o impacto |
| `companies.ts` | perfil dos solicitantes, `CURRENT_REQUESTER` | solicitante, estudante |
| `students.ts` | `STUDENTS` (5), `CURRENT_STUDENT_ID` | todas as áreas e páginas públicas |
| `projects.ts` | `SAMPLE_PROJECTS`, `STATUS_CONFIG` | laboratório |
| `notifications.ts` | `notifications` | caixa de entrada do estudante |
| `skills.ts` | `ALL_SKILLS` (catálogo + apelidos), `LEVELS`, busca e normalização | onboarding |

### Estado compartilhado — `src/lib/store.ts`

Demandas, interesses e o selo "em projeto" vivem num store em memória
(`useVitrine`), inicializado a partir de `src/data/`. Uma candidatura feita na
área do estudante aparece na do solicitante e na da curadoria durante a sessão.
Não há persistência: recarregar volta aos dados fictícios. Ao criar uma tela
que consome demanda ou interesse, leia de `useVitrine` e altere pelas funções
do store; **não crie outra base**.
