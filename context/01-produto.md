# Produto

## O que é

VitrineIC é uma plataforma web que conecta estudantes do Instituto de
Computação a quem tem demandas de desenvolvimento e pesquisa. É o projeto final
de duas disciplinas simultâneas: **Programação 3 (Web)** e **ACE 1 (Atividade
Curricular de Extensão 1)**.

Essa dupla exigência é estrutural. A ACE1 obriga alcance a público externo à
disciplina, então o projeto não se encerra na entrega de software: precisa
demonstrar impacto real. A visão de longo prazo é que a curadoria da plataforma
seja operada por um projeto de extensão dedicado — o que amarra a exigência
acadêmica dentro da própria arquitetura do produto.

## O problema

Hoje, fora do GitHub, estudantes do IC não têm onde expor o que desenvolvem nem
onde encontrar alguém para tirar uma ideia do papel. O resultado é network
perdido entre pessoas com interesses parecidos. O VitrineIC quer ser também
porta de entrada para PIBIC, PIBITI e startups dentro do Instituto.

## As três peças

O README da equipe define três peças como **inegociáveis** — nenhuma pode ser
cortada da entrega:

1. **Vitrine de projetos** — estudantes cadastram e apresentam o que constroem,
   no espírito de startup em estágio inicial.
   No código: `components/student/Lab.tsx`.
2. **Mural de vagas e demandas** — quem precisa publica o que precisa.
   No código: `components/requester/Dashboard.tsx`.
3. **Sistema de match com crivo humano** — e aqui está a decisão de design que
   diferencia o produto.

## O match direcionado

**Não é candidatura aberta.** O sistema aponta *a pessoa mais compatível* e
**só ela é contatada**. Isso é o oposto de um mural onde todos se candidatam.

O **crivo humano** precisa existir de fato no sistema, "mesmo que de forma
simplificada, e não apenas como um espaço reservado no design". É "parte
essencial do fluxo, não um detalhe a implementar depois". Tags podem simplificar
a triagem, mas não substituem a pessoa.

A divisão de responsabilidade implementada respeita isso: **o algoritmo ordena,
o humano decide**. A máquina nunca confirma sozinha — apresenta candidatos com
justificativa visível e exige ato deliberado do curador, com campo para
registrar o porquê.

No código: `components/curator/`.

## Usuários

| Perfil | No código | O que faz |
|---|---|---|
| Estudante | `student` | expõe projetos, preenche perfil e skills, recebe convites |
| Solicitante | `company` / `requester` | publica demandas, acompanha status, recebe matches |
| Curador | área `curator` | tria demandas, seleciona candidato, confirma conexão |

## Modelo de negócio

Resumo do canvas em `docs/modelo-de-negocio.md`:

- **Parcerias** — coordenação do IC, professores e laboratórios, núcleo de
  empreendedorismo/pré-incubadora, centro acadêmico
- **Proposta de valor** — espaço único para expor e buscar parceiros; match
  direcionado a 1 pessoa; curadoria humana em cada match; porta de entrada para
  PIBIC, PIBITI e startups
- **Custos** — hospedagem, tempo de desenvolvimento e, separadamente, **tempo da
  equipe de curadoria**. O custo humano recorrente do crivo está reconhecido, não
  escondido.

## Divergência de escopo em aberto

**Esta é a decisão mais importante ainda não tomada.**

| | README da equipe | Código |
|---|---|---|
| Conecta | alunos ↔ demandas da **universidade** (PIBIC, PIBITI, professores, coordenação) | alunos ↔ **empresas** |
| Papel intermediário | professor / coordenação / proponente | empresa / solicitante |
| Copy do hero | — | "Conectando inovação acadêmica **ao mercado**" |
| Dados de exemplo | — | `TechBr Soluções`, `Fintech Labs`, `EduCorpora` |

O código seguiu firme na direção aluno↔empresa por dois commits seguidos, e
nenhuma demanda de exemplo é acadêmica. A leitura mais provável é que **o README
está desatualizado**, não o código — mas a equipe precisa confirmar, porque a
ACE1 depende de qual história será contada.

**Ao escrever código novo, siga o que já existe (empresa) e sinalize a
divergência em vez de decidir sozinho.**
