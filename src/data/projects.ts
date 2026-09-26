/** DADOS FICTÍCIOS — projetos do laboratório do estudante. */

export const STATUS_CONFIG: Record<string, { label: string; shape: "circle" | "square" | "triangle" }> = {
  ideation: { label: "Idealização", shape: "circle" },
  coding: { label: "Codificação", shape: "square" },
  review: { label: "Revisão", shape: "triangle" },
  published: { label: "Publicado", shape: "square" },
};

export const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: "Sistema de Detecção de Anomalias em Redes",
    description: "Pipeline de ML para identificação de comportamentos suspeitos em tráfego de rede utilizando autoencoders e análise estatística.",
    stack: ["Python", "PyTorch", "Wireshark", "PostgreSQL"],
    status: "coding",
    repo: "github.com/anacf/anomaly-net",
    updated: "há 2 dias",
  },
  {
    id: 2,
    title: "Compilador para DSL de Análise Genômica",
    description: "Linguagem de domínio específico para expressão de pipelines bioinformáticos com compilação para bytecode executável.",
    stack: ["Rust", "LLVM", "Python"],
    status: "ideation",
    repo: "github.com/anacf/genomic-dsl",
    updated: "há 1 semana",
  },
  {
    id: 3,
    title: "Dashboard ESG para Pequenas Empresas",
    description: "Ferramenta de coleta e visualização de métricas de sustentabilidade adaptada para PMEs brasileiras.",
    stack: ["React", "Node.js", "MongoDB", "D3.js"],
    status: "review",
    repo: "github.com/anacf/esg-dashboard",
    updated: "há 3 dias",
  },
];
