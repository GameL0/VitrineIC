/** DADOS FICTÍCIOS — placeholder até existir backend. */
import type { Course } from "@/types";

interface Featured {
  name: string;
  course: Course;
  semester: string;
  project: string;
  year: string;
  tag: string;
}

export const stats = [
  { index: "01", value: "340+", label: "Projetos publicados" },
  { index: "02", value: "1.200", label: "Estudantes ativos" },
  { index: "03", value: "87", label: "Empresas parceiras" },
];

export const featuredStudents: Featured[] = [
  {
    name: "Ana Carolina Ferreira",
    course: "Inteligência Artificial",
    semester: "4º período",
    project: "Sistema de Detecção de Fraudes com ML",
    year: "2026",
    tag: "IA / ML",
  },
  {
    name: "Rafael Moreira Santos",
    course: "Ciência da Computação",
    semester: "3º período",
    project: "Plataforma de Telemedicina Rural",
    year: "2026",
    tag: "Saúde Digital",
  },
  {
    name: "Isadora Lima Costa",
    course: "Engenharia da Computação",
    semester: "5º período",
    project: "Dashboard ESG para PMEs",
    year: "2025",
    tag: "Sustentabilidade",
  },
  {
    name: "Bruno Takashi Yamamoto",
    course: "Ciência da Computação",
    semester: "4º período",
    project: "Compilador para Linguagem Educacional",
    year: "2025",
    tag: "Linguagens",
  },
  {
    name: "Fernanda Oliveira Braga",
    course: "Inteligência Artificial",
    semester: "5º período",
    project: "Robótica Assistiva para Reabilitação",
    year: "2026",
    tag: "Robótica",
  },
  {
    name: "Lucas Henrique Pinto",
    course: "Engenharia da Computação",
    semester: "3º período",
    project: "Análise Preditiva de Falhas em Redes",
    year: "2025",
    tag: "Redes",
  },
];
