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

## Status: dois vocabulários

O mesmo conceito tem dois vocabulários, um por área, **sem tradução entre eles**:

| Curadoria (`DemandStatus`) | Solicitante (`StatusKey`) |
|---|---|
| `nova` | `analise` |
| `em_analise` | `buscando` |
| `aprovada` | `em_andamento` |
| `rejeitada` | `concluido` |
| `matched` | `cancelado` |

São duas visões legítimas do ciclo de vida — a interna, de processo de triagem,
e a externa, de acompanhamento. O que falta é o mapeamento, que é exatamente
onde mora a regra de negócio. **Não invente a tradução sem combinar com a
equipe.**

O kanban da triagem usa quatro das cinco: `KANBAN_COLS = ["nova", "em_analise",
"aprovada", "matched"]` — `rejeitada` é ação, não coluna.

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
- **A taxonomia é implícita.** Como a comparação é textual, `React`, `ReactJS` e
  `React.js` são tecnologias distintas.
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
| `demands.ts` | `DEMANDS: Demand[]` | curadoria |
| `requester-demands.ts` | `DEMANDS` | solicitante |
| `students.ts` | `STUDENTS` (5) | curadoria, matchmaking |
| `matched-students.ts` | `MATCHED_STUDENTS` | solicitante |
| `projects.ts` | `SAMPLE_PROJECTS`, `STATUS_CONFIG` | laboratório |
| `notifications.ts` | `notifications` | dashboard do estudante |
| `skills.ts` | `ALL_SKILLS`, `LEVELS` | onboarding |

### O problema central: três bases paralelas

`data/demands.ts` e `data/requester-demands.ts` são **listas independentes** de
demanda, com IDs no mesmo formato (`VIC-2026-0041`) mas arrays distintos.
Aprovar uma demanda na curadoria não muda nada no painel do solicitante. O mesmo
vale para estudantes entre `students.ts`, `showcase.ts` e o onboarding.

**O sistema encena a integração em vez de realizá-la.** Navegando, o fluxo
parece completo; nenhum dado atravessa as fronteiras das áreas.

Unificar isso é a prioridade estrutural número um: quanto mais telas nascerem
sobre três bases paralelas, mais caro fica o conserto. Ao adicionar uma tela que
consome demanda ou estudante, **não crie uma quarta base** — reutilize e
sinalize a necessidade de unificação.
