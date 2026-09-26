# Estado atual

Referência: commit `feat: Todas as telas` mais a remoção do Figma Make e a
reorganização de `src/`. Análise completa em `docs/analise-frontend.md`.

## Números

| | |
|---|---|
| Linhas em `src/` | ~6600 |
| Arquivos | 60 |
| Telas | 20 |
| Maior arquivo | `LandingPage.tsx (371 linhas)` |
| Bundle | ~349 kB (90 kB gzip) |

## Maturidade por fluxo

O que separa "tela pintada" de "funcionalidade":

| Fluxo | Estado |
|---|---|
| Triagem e match (curadoria) | **Funcional** — muda estado, decisão persiste na sessão |
| Cadastro de projeto (laboratório) | **Funcional** — a lista cresce de verdade |
| Convites do estudante (aceitar/recusar) | **Funcional** — muda estado, badge e contadores |
| Catálogo público, perfis e impacto | **Funcional** — derivados de `data/students.ts` |
| Onboarding do estudante | **Navegável** — os 3 passos avançam; o digitado não alimenta o perfil |
| Nova demanda (wizard) | **Navegável** — 4 passos e protocolo, sem gravar na lista |
| Matches do solicitante | **Estático** — lista fixa, não vem da curadoria |
| Notificações | **Estático** |
| Autenticação | **Fachada** — "Acessar" entra sem validar; SSO decorativo |
| Nav pública (Projetos, Estudantes, Impacto) | **Funcional** — levam às páginas públicas |

**O eixo curadoria → convite → conexão funciona ponta a ponta**, assim como o
catálogo público. O que segue estático é o lado do solicitante: o wizard de
demanda não grava e a tela de matches não vem da curadoria — porque `requester`
lê uma base própria (ver `03-dominio.md`).

Ao receber uma tarefa, confira nessa tabela o que já existe: pedir para "salvar
a demanda" pode significar implementar persistência do zero, não ajustar um
formulário.

## Aderência ao escopo

| Requisito | Estado |
|---|---|
| Vitrine de projetos | ✅ `student/Lab.tsx` |
| Mural de demandas | ✅ `requester/Dashboard.tsx` |
| Match apontando 1 pessoa | ✅ `curator/Matchmaking.tsx` |
| Crivo humano | ✅ triagem + confirmação com justificativa |
| Contato após o match | ✅ convite, aceite e conexão estabelecida |
| Vitrine pública (sem login) | ✅ catálogo, projeto e perfil público |
| Indicadores para a ACE1 | ✅ `public/Impact.tsx`, derivados da base |
| Avisos de demandas compatíveis | ⚠️ notificações abrem os convites, mas são fixas |
| Persistência | ❌ tudo em memória |
| Autenticação | ⚠️ só UI |

**As três peças inegociáveis existem.** O crivo humano deixou de ser espaço
reservado no design e virou fila de triagem com estados, passo de seleção e
justificativa do curador.

## Prioridades

Em ordem de dependência:

1. **Unificar os dados** — uma fonte de demandas e estudantes para as três
   áreas. Maior risco estrutural: quanto mais telas sobre bases paralelas, mais
   caro o conserto.
2. **Decidir a divergência de escopo** — empresa ou universidade — e alinhar
   README e código.
3. **Persistência**, nem que seja `localStorage`, para o estado sobreviver ao
   reload.
4. **Tipar o perfil do estudante** e definir a tradução entre os dois
   vocabulários de status.
5. **Extrair o compartilhado** (`NavBar`, `Label`, `Input`, `Rule`,
   `StatusBadge`) antes que as cópias divirjam mais.
6. **Evoluir o `scoreStudent`** aproveitando os níveis de proficiência já
   coletados e normalizando nomes de tecnologia.
7. **Roteamento por URL.**

## Perguntas ainda abertas

Do brainstorming da equipe (`docs/perguntas-brainstorming.md`), as que seguem
sem resposta e afetam implementação:

- O público é só do IC ou de outros institutos? Define o modelo de autenticação.
- Quem faz o crivo: equipe, professor, comitê de alunos? Define papéis e
  permissões.
- O que acontece depois do match aprovado? Define se existe módulo de
  mensageria ou se a plataforma encerra ali.
- Que impacto a ACE1 precisa demonstrar: usuários, projetos, matches,
  depoimentos? Define que métricas instrumentar.

**Se uma tarefa depender de uma dessas respostas, pergunte em vez de arbitrar.**

## Riscos ao mexer no código

- **Não há testes.** A verificação é `pnpm typecheck`, `pnpm build` e percorrer
  o fluxo no navegador.
- **Não há persistência.** Reload zera tudo; teste fluxos inteiros sem
  recarregar.
- **Dados fictícios.** Não trate nenhum nome ou número como real.
- **Primitivas duplicadas.** Alterar uma não propaga para as áreas irmãs.
- **Um pull pode reintroduzir o Figma Make.** Se `.figma/` reaparecer, é
  regressão.
