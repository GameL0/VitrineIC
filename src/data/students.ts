/**
 * DADOS FICTÍCIOS — base de estudantes.
 *
 * Fonte única para o matchmaking da curadoria, o catálogo público de projetos
 * e os perfis públicos. Não crie outra base de estudante: enriqueça esta.
 */
import type { Student } from "@/types";

export const STUDENTS: Student[] = [
  {
    id: "STU-001",
    name: "Rafael Moreira Santos",
    initials: "RM",
    course: "Ciência da Computação",
    semester: "5º sem",
    gpa: "9.1",
    bio: "Interesse em sistemas distribuídos e aprendizado de máquina aplicado a infraestrutura. Busco projetos de iniciação científica em detecção de anomalias.",
    interests: ["Inteligência Artificial", "Redes & Sistemas", "Banco de Dados"],
    skills: ["Python", "PyTorch", "Docker", "PostgreSQL", "Node.js", "scikit-learn", "MQTT"],
    projects: [
      {
        id: "PRJ-001",
        title: "Detecção de Anomalias em Redes",
        stack: ["Python", "PyTorch"],
        status: "coding",
        description: "Pipeline de ML para identificação de comportamentos suspeitos em tráfego de rede, usando autoencoders e análise estatística de séries temporais.",
        year: "2026",
        area: "Redes & Sistemas",
      },
      {
        id: "PRJ-002",
        title: "DSL para Análise Genômica",
        stack: ["Rust", "LLVM"],
        status: "ideation",
        description: "Linguagem de domínio específico para expressão de pipelines bioinformáticos, com compilação para bytecode executável.",
        year: "2026",
        area: "Linguagens",
      },
    ],
    github: "github.com/rafaelms",
    availability: "Imediata",
  },
  {
    id: "STU-002",
    name: "Isadora Lima Costa",
    initials: "IL",
    course: "Engenharia da Computação",
    semester: "6º sem",
    gpa: "8.7",
    bio: "Foco em visualização de dados e sustentabilidade. Já trabalhei com métricas ESG para pequenas empresas e quero seguir em dados aplicados a impacto social.",
    interests: ["Banco de Dados", "Sistemas Web", "HCI & Design"],
    skills: ["Python", "React", "AWS", "PostgreSQL", "scikit-learn", "Pandas", "SQL"],
    projects: [
      {
        id: "PRJ-003",
        title: "Dashboard ESG para PMEs",
        stack: ["React", "Node.js", "D3.js"],
        status: "review",
        description: "Ferramenta de coleta e visualização de métricas de sustentabilidade adaptada à realidade de pequenas e médias empresas brasileiras.",
        year: "2025",
        area: "Sistemas Web",
      },
    ],
    github: "github.com/isadoralc",
    availability: "Imediata",
  },
  {
    id: "STU-003",
    name: "Bruno Takashi Yamamoto",
    initials: "BT",
    course: "Ciência da Computação",
    semester: "4º sem",
    gpa: "8.3",
    bio: "Gosto de compiladores e de ensino de programação. Meu projeto atual nasceu de monitoria: queria uma linguagem que desse mensagens de erro compreensíveis para calouros.",
    interests: ["Engenharia de Software", "Linguagens", "Sistemas Web"],
    skills: ["Python", "FastAPI", "Docker", "PostgreSQL", "React", "TypeScript"],
    projects: [
      {
        id: "PRJ-004",
        title: "Compilador para Linguagem Educacional",
        stack: ["Python", "LLVM"],
        status: "coding",
        description: "Compilador de linguagem projetada para ensino introdutório, com diagnósticos de erro voltados a quem está aprendendo a programar.",
        year: "2025",
        area: "Linguagens",
      },
    ],
    github: "github.com/brunoty",
    availability: "Após 15/out",
  },
  {
    id: "STU-004",
    name: "Fernanda Oliveira Braga",
    initials: "FO",
    course: "Inteligência Artificial",
    semester: "5º sem",
    gpa: "9.4",
    bio: "Trabalho com visão computacional aplicada a reabilitação motora, em parceria com o laboratório de robótica. Procuro demandas na área de saúde.",
    interests: ["Inteligência Artificial", "Sistemas Embarcados", "Computação Gráfica"],
    skills: ["Python", "OpenCV", "PyTorch", "FastAPI", "Docker", "C++"],
    projects: [
      {
        id: "PRJ-005",
        title: "Robótica Assistiva",
        stack: ["Python", "OpenCV", "ROS"],
        status: "coding",
        description: "Sistema de acompanhamento de exercícios de reabilitação por visão computacional, com feedback em tempo real para o paciente.",
        year: "2026",
        area: "Robótica",
      },
    ],
    github: "github.com/fernandaob",
    availability: "Imediata",
  },
  {
    id: "STU-005",
    name: "Lucas Henrique Pinto",
    initials: "LP",
    course: "Engenharia da Computação",
    semester: "3º sem",
    gpa: "7.9",
    bio: "Começando em ciência de dados. Estou montando um projeto de manutenção preditiva e procuro alguém mais experiente para orientar.",
    interests: ["Banco de Dados", "Redes & Sistemas", "Inteligência Artificial"],
    skills: ["Python", "SQL", "Pandas", "scikit-learn", "React"],
    projects: [
      {
        id: "PRJ-006",
        title: "Análise Preditiva de Falhas",
        stack: ["Python", "Pandas"],
        status: "ideation",
        description: "Modelo de previsão de falhas em equipamentos de rede a partir de histórico de logs e métricas de desempenho.",
        year: "2025",
        area: "Redes & Sistemas",
      },
    ],
    github: "github.com/lucashp",
    availability: "Imediata",
  },
];

/** Projetos de todos os estudantes, achatados para o catálogo público. */
export const ALL_PROJECTS = STUDENTS.flatMap((student) =>
  student.projects.map((project) => ({ ...project, student })),
);

export function findStudent(id: string) {
  return STUDENTS.find((s) => s.id === id);
}

export function findProject(id: string) {
  return ALL_PROJECTS.find((p) => p.id === id);
}
