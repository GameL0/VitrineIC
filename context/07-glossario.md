# Glossário

## Termos do produto

**Vitrine** — a exposição de projetos dos estudantes. No código é o
**Laboratório** (`student/Lab.tsx`). Um projeto na vitrine é apresentado como
uma startup em estágio inicial: descrição, stack, status, repositório.

**Mural** — a lista de vagas e demandas publicadas. No código é o Dashboard do
solicitante (`requester/Dashboard.tsx`).

**Demanda** — um pedido publicado: um sistema a ser feito, uma vaga de pesquisa,
um problema a resolver. Entidade `Demand`, com ID no formato `VIC-2026-0041`.

**Match** — o par demanda ↔ estudante. O sistema aponta **uma** pessoa, não abre
candidatura para todos. Match confirmado gera protocolo `MCH-######`.

**Crivo humano** — a revisão obrigatória antes de um match virar contato. É o
diferencial do produto e não pode ser automatizado: o algoritmo ordena, a pessoa
decide. No código, a área da curadoria.

**Curadoria** — a equipe que opera o crivo. A visão de longo prazo é que seja
gerida por um projeto de extensão dedicado.

**Triagem** — a primeira etapa do crivo: classificar demandas recebidas em
`nova`, `em_analise`, `aprovada` ou `rejeitada`. Kanban em `curator/Triage.tsx`.

**Matchmaking** — a segunda etapa: ver candidatos ranqueados para uma demanda
aprovada e escolher um.

**Solicitante** — quem publica demanda. No código é `company` / `requester`.
Ponto sensível: o README da equipe descreve esse papel como professor ou
coordenação; o código o modela como empresa. Ver `01-produto.md`.

**Score / compatibilidade** — o percentual exibido no matchmaking. Calculado por
`scoreStudent` em `lib/match.ts`.

## Siglas acadêmicas

**IC** — Instituto de Computação. O contexto institucional do projeto; os dados
de exemplo citam a Unicamp.

**PIBIC** — Programa Institucional de Bolsas de Iniciação Científica. Bolsa de
pesquisa para graduandos. Uma das portas de entrada que o VitrineIC quer abrir.

**PIBITI** — Programa Institucional de Bolsas de Iniciação em Desenvolvimento
Tecnológico e Inovação. Equivalente ao PIBIC, voltado a desenvolvimento
tecnológico em vez de pesquisa acadêmica.

**ACE 1** — Atividade Curricular de Extensão 1. Disciplina que exige alcance a
público externo à universidade. É por isso que o projeto precisa demonstrar
impacto real, não só entregar software.

**Programação 3 (Web)** — a disciplina técnica do projeto. Atenção: o README
original do repositório dizia "Programação 2", versão antiga.

**Lattes** — currículo acadêmico da plataforma do CNPq. Campo coletado no passo
de portfólio do onboarding.

**Centro acadêmico** — entidade representativa dos estudantes do curso. Listado
como parceiro e canal de divulgação no modelo de negócio.

**Pré-incubadora / núcleo de empreendedorismo** — estrutura da universidade que
apoia a criação de startups. Parceiro previsto.

## Termos do código

**Área** — cada um dos três espaços logados: `student`, `requester`, `curator`.
No código, uma pasta em `src/components/` e uma opção do tipo `Area` em
`App.tsx`.

**Shell** — o componente raiz de uma área (`StudentArea.tsx`,
`RequesterArea.tsx`, `CuratorArea.tsx`), que guarda o `view` e troca as telas.

**View** — a tela ativa dentro de uma área, guardada em `useState` no shell.

**Primitivas** — os componentes básicos de cada área (`Label`, `Input`, `Rule`,
`Tag`, `Mono`, `SkillTag`), reunidos no `ui.tsx` da pasta. Cada área tem o seu,
e eles não são idênticos.

**Onboarding** — o cadastro em três passos do estudante: perfil e interesses,
hard skills, portfólio.

**Proficiência** — o nível declarado por tecnologia no onboarding, em quatro
graus: Básico, Intermediário, Avançado, Especialista. Coletado e **ainda não
usado** pelo algoritmo de match.

**Protocolo** — identificador gerado ao enviar uma demanda ou confirmar um
match, usado para acompanhamento.
