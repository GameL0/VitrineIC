export interface Opportunity {
  id: string;
  title: string;
  description: string;
  compatibility: number;
  skills: string[];
  responsible: string;
  duration: string;
  contractType: string;
  origin: "Interno UFAL" | "Empresa Externa";
}

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-1",
    title: "Sistema de Monitoramento IoT",
    description: "Desenvolvimento de plataforma para coleta e visualização de dados de sensores industriais em tempo real, utilizando Python e React.",
    compatibility: 92,
    skills: ["Python", "React", "AWS", "IoT"],
    responsible: "Prof. Marcos Silva",
    duration: "6 meses",
    contractType: "Bolsa PIBIC",
    origin: "Interno UFAL",
  },
  {
    id: "opp-2",
    title: "App Mobile para Saúde Mental",
    description: "Criação de um aplicativo focado em bem-estar estudantil, com diário de emoções e dicas de mindfulness.",
    compatibility: 78,
    skills: ["React Native", "Firebase", "UX Design"],
    responsible: "Dra. Ana Costa (Empresa HealthTech)",
    duration: "12 meses",
    contractType: "PJ",
    origin: "Empresa Externa",
  },
  {
    id: "opp-3",
    title: "Dashboard de Dados Abertos",
    description: "Ferramenta para consolidar e expor métricas públicas de educação do estado através de gráficos interativos.",
    compatibility: 85,
    skills: ["Vue.js", "Node.js", "PostgreSQL", "D3.js"],
    responsible: "Secretaria de Educação",
    duration: "4 meses",
    contractType: "Bolsa Extensão",
    origin: "Interno UFAL",
  },
  {
    id: "opp-4",
    title: "Migração de Banco de Dados Legado",
    description: "Projeto de infraestrutura para converter uma base Oracle muito antiga para um cluster PostgreSQL moderno e escalável.",
    compatibility: 45,
    skills: ["Oracle DB", "PostgreSQL", "Docker", "Linux"],
    responsible: "Carlos Mendes (TI UFAL)",
    duration: "3 meses",
    contractType: "CLT (Estágio)",
    origin: "Interno UFAL",
  },
];
