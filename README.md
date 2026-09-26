# VitrineIC

Plataforma que conecta estudantes do **Instituto de Computação da UFAL** a quem
tem demandas de desenvolvimento e pesquisa — com um crivo humano entre as duas
pontas.

Projeto final de **Programação 3 (P3)** e de **ACE 1** (Atividade Curricular de
Extensão 1).

## O problema

Hoje, fora do GitHub, estudantes do IC não têm onde expor o que desenvolvem nem
onde encontrar alguém para tirar uma ideia do papel. Quem procura talento
também não sabe onde olhar. O resultado é network perdido entre pessoas com
interesses parecidos, dentro do mesmo Instituto.

O VitrineIC ocupa esse espaço e serve como porta de entrada para PIBIC, PIBITI
e para projetos que podem virar startup dentro do IC.

## Como funciona

A plataforma tem três peças, e nenhuma pode ser cortada sem descaracterizar o
projeto.

**A vitrine** é onde o estudante apresenta o que constrói: descrição, stack,
estágio do projeto e repositório. Cada projeto é tratado como uma iniciativa em
estágio inicial, não como trabalho de disciplina arquivado.

**O mural** é onde empresas, laboratórios e professores publicam o que precisam
— um sistema a ser feito, uma vaga de pesquisa, um problema a resolver.

**O match** liga as duas pontas, e é aqui que está a decisão de design que
diferencia o projeto: **não é candidatura aberta**. O sistema ordena os
candidatos por compatibilidade técnica e aponta um; uma pessoa da curadoria
revisa, registra a justificativa e só então o contato acontece. O estudante
recebe o convite, aceita ou recusa, e a conexão se estabelece.

Ou seja: **o algoritmo ordena, o humano decide.** A máquina nunca confirma
sozinha. A intenção de longo prazo é que essa curadoria seja operada por um
projeto de extensão dedicado, o que amarra a exigência da ACE 1 dentro da
própria arquitetura do produto.

## Quem usa

- **Estudantes** do IC/UFAL — dos cursos de Ciência da Computação, Engenharia
  da Computação e Inteligência Artificial — expondo projetos e recebendo
  convites
- **Solicitantes** publicando demandas e acompanhando o andamento
- **Curadoria** triando demandas, escolhendo o candidato e confirmando a conexão

## O que já existe

A aplicação tem uma área pública e três áreas de uso.

| | |
|---|---|
| **Público** | landing, catálogo de projetos, diretório de estudantes, perfil público e painel de indicadores da extensão |
| **Estudante** | cadastro em três passos, dashboard, laboratório de projetos, convites recebidos e conexão estabelecida |
| **Solicitante** | mural de demandas, assistente de nova demanda em quatro passos, protocolo e matches recebidos |
| **Curadoria** | fila de triagem em kanban, matchmaking com ranqueamento, confirmação com justificativa e registro do match |

Os indicadores do painel de extensão são apurados a partir da própria base, e
não digitados, para que não divirjam do que o restante do sistema mostra.

**Ainda não há backend.** Os dados são fictícios e vivem em memória: recarregar
a página reinicia o estado. A autenticação é apenas interface. Persistência e
integração entre as áreas são os próximos passos.

## Rodando o projeto

Requer Node 22 e pnpm (versões em `.mise.toml`).

```bash
pnpm install
pnpm dev
```

A aplicação sobe em `http://localhost:5173`.

Outros comandos: `pnpm build` roda a verificação de tipos e o build de
produção, `pnpm preview` serve o build e `pnpm typecheck` verifica os tipos.

Stack: React 19, Vite 8, TypeScript e Tailwind CSS v4. Sem roteador, sem
estado global e sem dependências de UI.

## Organização do repositório

```
src/
├── components/
│   ├── public/      páginas abertas: catálogo, perfis, indicadores
│   ├── landing/     página inicial e acesso
│   ├── student/     área do estudante
│   ├── requester/   área do solicitante
│   └── curator/     área da curadoria
├── data/            conteúdo (fictício), catálogos e identidade institucional
├── types/           tipos do domínio
├── lib/             algoritmo de match
└── styles/          tokens visuais

context/             contexto do projeto, por assunto
docs/                análise do front-end, modelo de negócio e brainstorming
AGENTS.md            mapa de tarefa → arquivo
```

Antes de mexer no código, vale ler `AGENTS.md` para achar o arquivo certo sem
varrer `src/`, e `context/README.md` para entender as decisões por trás dele.

## Decisões em aberto

Algumas definições seguem pendentes e estão registradas em
`docs/perguntas-brainstorming.md` e `context/06-estado-atual.md`:

- Quem opera o crivo: equipe do projeto, professores ou um comitê de estudantes
- O que acontece depois do aceite — se a plataforma acompanha o projeto ou se
  seu papel termina ali
- Que indicadores a ACE 1 precisa demonstrar
- Se o solicitante é primariamente empresa ou também professores e
  coordenações da própria universidade

## Status

Em desenvolvimento. A navegação está completa e o ciclo de curadoria funciona
ponta a ponta; falta a camada de dados real. Este README é atualizado conforme
as decisões da equipe avançam.
