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

/** Estágio de um projeto na vitrine do estudante. */
export type ProjectStatus = "ideation" | "coding" | "review" | "done";

export interface StudentProject {
  id: string;
  title: string;
  stack: string[];
  status: ProjectStatus;
  description: string;
  year: string;
  area: string;
}

export interface Student {
  id: string;
  name: string;
  initials: string;
  course: string;
  semester: string;
  gpa: string;
  bio: string;
  interests: string[];
  skills: string[];
  projects: StudentProject[];
  github: string;
  availability: string;
}

/**
 * Convite gerado quando a curadoria confirma um match.
 *
 * Referencia a demanda por id em `@/data/demands` e o estudante em
 * `@/data/students` — não duplica esses dados.
 */
export type InvitationStatus = "pendente" | "aceito" | "recusado";

export interface Invitation {
  id: string;
  demandId: string;
  studentId: string;
  score: number;
  curatorNote: string;
  sentAt: string;
  deadline: string;
  status: InvitationStatus;
}
