/** DADOS FICTÍCIOS — demandas vistas pelo solicitante. */

import type { StatusKey } from "@/types";

export const DEMANDS = [
  {
    id: "VIC-2026-0041",
    title: "Sistema de Monitoramento IoT para Fábricas",
    area: "Eng. de Software",
    date: "12 set 2026",
    deadline: "30 nov 2026",
    status: "buscando" as StatusKey,
    applicants: 4,
  },
  {
    id: "VIC-2026-0038",
    title: "Análise Preditiva de Churn em SaaS",
    area: "IA / Dados",
    date: "05 set 2026",
    deadline: "15 out 2026",
    status: "em_andamento" as StatusKey,
    applicants: 1,
  },
  {
    id: "VIC-2026-0029",
    title: "Automação de Relatórios Financeiros com LLM",
    area: "IA / ML",
    date: "20 ago 2026",
    deadline: "20 out 2026",
    status: "analise" as StatusKey,
    applicants: 0,
  },
  {
    id: "VIC-2026-0017",
    title: "Plataforma de E-learning para Técnicos",
    area: "Sistemas Web",
    date: "10 jul 2026",
    deadline: "10 set 2026",
    status: "concluido" as StatusKey,
    applicants: 2,
  },
  {
    id: "VIC-2026-0009",
    title: "Dashboard de Sustentabilidade ESG",
    area: "Engenharia de Dados",
    date: "15 mai 2026",
    deadline: "15 jul 2026",
    status: "concluido" as StatusKey,
    applicants: 3,
  },
];
