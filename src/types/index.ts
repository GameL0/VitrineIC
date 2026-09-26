/** Tipos do domínio do VitrineIC. */

export type DemandStatus = "nova" | "em_analise" | "aprovada" | "rejeitada" | "matched";

export interface Demand {
  id: string;
  title: string;
  company: string;
  area: string;
  scope: string;
  deadline: string;
  skills: string[];
  description: string;
  submitted: string;
  status: DemandStatus;
  priority: "alta" | "normal" | "baixa";
}

export type StatusKey = "analise" | "buscando" | "em_andamento" | "concluido" | "cancelado";
