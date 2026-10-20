/**
 * DADOS FICTÍCIOS — interesses entre estudantes e demandas.
 *
 * Um registro só para as três portas do fluxo de match: candidatura do
 * estudante, convite do solicitante e sugestão da curadoria. Referencia a
 * demanda em `@/data/demands` e o estudante em `@/data/students` por id.
 */
import type { Interest } from "@/types";

export const INTERESTS: Interest[] = [
  {
    id: "INT-0112",
    demandId: "VIC-2026-0041",
    studentId: "STU-001",
    origin: "sugestao",
    justification:
      "Perfil com aderência direta à stack da demanda (Python, MQTT, PostgreSQL, Docker) e projeto ativo em detecção de anomalias em rede, tema próximo ao pipeline de sensores pedido.",
    status: "aguardando_estudante",
    createdAt: "há 2h",
  },
  {
    id: "INT-0109",
    demandId: "VIC-2026-0038",
    studentId: "STU-001",
    origin: "sugestao",
    justification:
      "Cobertura parcial da stack, mas experiência prévia com modelagem preditiva e disponibilidade imediata.",
    status: "aguardando_estudante",
    createdAt: "há 5h",
  },
  {
    id: "INT-0104",
    demandId: "VIC-2026-0029",
    studentId: "STU-001",
    origin: "candidatura",
    justification: "Já integrei modelos de linguagem num projeto pessoal e quero aprofundar em FastAPI.",
    status: "aguardando_solicitante",
    createdAt: "há 1d",
  },
  {
    id: "INT-0098",
    demandId: "VIC-2026-0033",
    studentId: "STU-001",
    origin: "candidatura",
    status: "contato_liberado",
    createdAt: "há 6d",
  },
  {
    id: "INT-0111",
    demandId: "VIC-2026-0041",
    studentId: "STU-002",
    origin: "candidatura",
    justification: "Trabalho com dashboards de dados de sensores no meu projeto ESG e conheço bem PostgreSQL.",
    status: "aguardando_solicitante",
    createdAt: "há 1h",
  },
  {
    id: "INT-0110",
    demandId: "VIC-2026-0041",
    studentId: "STU-004",
    origin: "sugestao",
    justification:
      "Domina Python e Docker e já montou captura de dados em tempo real no projeto de robótica assistiva.",
    status: "aguardando_solicitante",
    createdAt: "há 4h",
  },
  {
    id: "INT-0107",
    demandId: "VIC-2026-0041",
    studentId: "STU-003",
    origin: "convite",
    justification: "Gostamos do seu compilador educacional e precisamos de alguém com FastAPI e Docker.",
    status: "aguardando_estudante",
    createdAt: "há 1d",
  },
  {
    id: "INT-0101",
    demandId: "VIC-2026-0041",
    studentId: "STU-005",
    origin: "candidatura",
    status: "recusado_solicitante",
    refusalReason: "A demanda pede experiência com MQTT e Docker em produção.",
    createdAt: "há 3d",
  },
  {
    id: "INT-0095",
    demandId: "VIC-2026-0033",
    studentId: "STU-003",
    origin: "convite",
    status: "contato_liberado",
    createdAt: "há 8d",
  },
  {
    id: "INT-0090",
    demandId: "VIC-2026-0025",
    studentId: "STU-002",
    origin: "sugestao",
    justification: "Experiência com React e AWS e foco em produtos educacionais.",
    status: "contato_liberado",
    createdAt: "há 12d",
  },
  {
    id: "INT-0102",
    demandId: "VIC-2026-0038",
    studentId: "STU-005",
    origin: "convite",
    status: "recusado_estudante",
    refusalReason: "Sem disponibilidade neste semestre.",
    createdAt: "há 2d",
  },
];
