/**
 * Vocabulário de tecnologias e níveis de proficiência.
 *
 * O catálogo é sugestão, não limite: o estudante pode declarar uma skill que
 * não esteja aqui. Os `aliases` existem porque o match compara texto
 * (`@/lib/match`), então "ReactJS" e "react.js" precisam virar "React" antes
 * de entrar no perfil — sem isso a taxonomia se fragmenta e o score cai por
 * diferença de grafia.
 *
 * A cobertura busca atender os três cursos do IC/UFAL: fundamentos teóricos e
 * software (Ciência da Computação), hardware e sistemas embarcados
 * (Engenharia da Computação) e a pilha moderna de IA (Inteligência Artificial).
 * Ao incluir uma tecnologia, registre os apelidos com que ela costuma ser
 * escrita — é isso que mantém o match funcionando.
 */
import type { Course, SkillLevel } from "@/types";

export interface SkillDef {
  name: string;
  cat: string;
  aliases?: string[];
}

export const ALL_SKILLS: SkillDef[] = [
  // ── Linguagens ──────────────────────────────────────────────────────────
  { name: "Python", cat: "Linguagens", aliases: ["py", "python3"] },
  { name: "JavaScript", cat: "Linguagens", aliases: ["js", "ecmascript"] },
  { name: "TypeScript", cat: "Linguagens", aliases: ["ts"] },
  { name: "Java", cat: "Linguagens" },
  { name: "C", cat: "Linguagens" },
  { name: "C++", cat: "Linguagens", aliases: ["cpp", "c/c++"] },
  { name: "C#", cat: "Linguagens", aliases: ["csharp", "c sharp"] },
  { name: "Go", cat: "Linguagens", aliases: ["golang"] },
  { name: "Rust", cat: "Linguagens" },
  { name: "Kotlin", cat: "Linguagens" },
  { name: "Swift", cat: "Linguagens" },
  { name: "PHP", cat: "Linguagens" },
  { name: "Ruby", cat: "Linguagens" },
  { name: "R", cat: "Linguagens" },
  { name: "MATLAB", cat: "Linguagens", aliases: ["octave"] },
  { name: "Dart", cat: "Linguagens" },
  { name: "Scala", cat: "Linguagens" },
  { name: "Elixir", cat: "Linguagens" },
  { name: "Erlang", cat: "Linguagens" },
  { name: "Haskell", cat: "Linguagens" },
  { name: "Clojure", cat: "Linguagens" },
  { name: "Lua", cat: "Linguagens" },
  { name: "Julia", cat: "Linguagens" },
  { name: "Perl", cat: "Linguagens" },
  { name: "Fortran", cat: "Linguagens" },
  { name: "Assembly", cat: "Linguagens", aliases: ["asm"] },
  { name: "Shell Script", cat: "Linguagens", aliases: ["bash", "sh", "zsh"] },
  { name: "PowerShell", cat: "Linguagens" },

  // ── Fundamentos ─────────────────────────────────────────────────────────
  { name: "Algoritmos", cat: "Fundamentos", aliases: ["algoritmia"] },
  { name: "Estruturas de Dados", cat: "Fundamentos", aliases: ["ed"] },
  { name: "Complexidade Computacional", cat: "Fundamentos", aliases: ["análise de complexidade"] },
  { name: "Teoria dos Grafos", cat: "Fundamentos", aliases: ["grafos"] },
  { name: "Compiladores", cat: "Fundamentos", aliases: ["construção de compiladores"] },
  { name: "Linguagens Formais", cat: "Fundamentos", aliases: ["autômatos"] },
  { name: "Sistemas Operacionais", cat: "Fundamentos", aliases: ["so", "operating systems"] },
  { name: "Sistemas Distribuídos", cat: "Fundamentos" },
  { name: "Computação Paralela", cat: "Fundamentos", aliases: ["openmp", "mpi", "cuda"] },
  { name: "Matemática Discreta", cat: "Fundamentos" },
  { name: "Álgebra Linear", cat: "Fundamentos" },
  { name: "Probabilidade e Estatística", cat: "Fundamentos", aliases: ["estatística"] },
  { name: "Cálculo Numérico", cat: "Fundamentos", aliases: ["métodos numéricos"] },
  { name: "Pesquisa Operacional", cat: "Fundamentos", aliases: ["otimização"] },
  { name: "Engenharia de Requisitos", cat: "Fundamentos" },
  { name: "Padrões de Projeto", cat: "Fundamentos", aliases: ["design patterns"] },
  { name: "Arquitetura de Software", cat: "Fundamentos" },

  // ── Frontend ────────────────────────────────────────────────────────────
  { name: "React", cat: "Frontend", aliases: ["reactjs", "react.js"] },
  { name: "Vue", cat: "Frontend", aliases: ["vuejs", "vue.js"] },
  { name: "Angular", cat: "Frontend" },
  { name: "Svelte", cat: "Frontend", aliases: ["sveltekit"] },
  { name: "Next.js", cat: "Frontend", aliases: ["nextjs", "next"] },
  { name: "Nuxt", cat: "Frontend", aliases: ["nuxtjs"] },
  { name: "Astro", cat: "Frontend" },
  { name: "HTML/CSS", cat: "Frontend", aliases: ["html", "css", "html5"] },
  { name: "Sass/SCSS", cat: "Frontend", aliases: ["sass", "scss"] },
  { name: "Tailwind CSS", cat: "Frontend", aliases: ["tailwind"] },
  { name: "Bootstrap", cat: "Frontend" },
  { name: "Redux", cat: "Frontend" },
  { name: "jQuery", cat: "Frontend" },
  { name: "Vite", cat: "Frontend" },
  { name: "Webpack", cat: "Frontend" },
  { name: "D3.js", cat: "Frontend", aliases: ["d3"] },
  { name: "Three.js", cat: "Frontend", aliases: ["threejs"] },
  { name: "Acessibilidade Web", cat: "Frontend", aliases: ["a11y", "wcag"] },

  // ── Mobile ──────────────────────────────────────────────────────────────
  { name: "Flutter", cat: "Mobile" },
  { name: "React Native", cat: "Mobile", aliases: ["rn"] },
  { name: "Android", cat: "Mobile", aliases: ["android nativo"] },
  { name: "Jetpack Compose", cat: "Mobile", aliases: ["compose"] },
  { name: "iOS", cat: "Mobile", aliases: ["ios nativo"] },
  { name: "SwiftUI", cat: "Mobile" },
  { name: "Ionic", cat: "Mobile" },

  // ── Backend ─────────────────────────────────────────────────────────────
  { name: "Node.js", cat: "Backend", aliases: ["node", "nodejs"] },
  { name: "Express", cat: "Backend", aliases: ["expressjs"] },
  { name: "NestJS", cat: "Backend", aliases: ["nest"] },
  { name: "FastAPI", cat: "Backend" },
  { name: "Django", cat: "Backend" },
  { name: "Flask", cat: "Backend" },
  { name: "Spring Boot", cat: "Backend", aliases: ["spring"] },
  { name: "Laravel", cat: "Backend" },
  { name: "Ruby on Rails", cat: "Backend", aliases: ["rails"] },
  { name: ".NET", cat: "Backend", aliases: ["dotnet", "asp.net"] },
  { name: "REST", cat: "Backend", aliases: ["api rest", "restful"] },
  { name: "GraphQL", cat: "Backend" },
  { name: "gRPC", cat: "Backend" },
  { name: "WebSockets", cat: "Backend", aliases: ["socket.io"] },
  { name: "Kafka", cat: "Backend", aliases: ["apache kafka"] },
  { name: "RabbitMQ", cat: "Backend" },
  { name: "Celery", cat: "Backend" },
  { name: "Microsserviços", cat: "Backend", aliases: ["microservices", "microservicos"] },
  { name: "Autenticação", cat: "Backend", aliases: ["oauth", "jwt", "auth"] },

  // ── Dados ───────────────────────────────────────────────────────────────
  { name: "SQL", cat: "Dados" },
  { name: "PostgreSQL", cat: "Dados", aliases: ["postgres"] },
  { name: "MySQL", cat: "Dados", aliases: ["mariadb"] },
  { name: "SQLite", cat: "Dados" },
  { name: "SQL Server", cat: "Dados", aliases: ["sqlserver", "t-sql"] },
  { name: "Oracle", cat: "Dados", aliases: ["pl/sql"] },
  { name: "MongoDB", cat: "Dados", aliases: ["mongo"] },
  { name: "Redis", cat: "Dados" },
  { name: "Cassandra", cat: "Dados" },
  { name: "Neo4j", cat: "Dados", aliases: ["banco de grafos"] },
  { name: "Elasticsearch", cat: "Dados", aliases: ["elastic"] },
  { name: "Modelagem de Dados", cat: "Dados", aliases: ["modelagem", "er"] },
  { name: "Pandas", cat: "Dados" },
  { name: "NumPy", cat: "Dados" },
  { name: "Polars", cat: "Dados" },
  { name: "Spark", cat: "Dados", aliases: ["apache spark", "pyspark"] },
  { name: "Hadoop", cat: "Dados" },
  { name: "Airflow", cat: "Dados", aliases: ["apache airflow"] },
  { name: "dbt", cat: "Dados" },
  { name: "ETL", cat: "Dados", aliases: ["pipeline de dados", "elt"] },
  { name: "Data Warehouse", cat: "Dados", aliases: ["dw", "bigquery", "redshift"] },
  { name: "Power BI", cat: "Dados", aliases: ["powerbi"] },
  { name: "Tableau", cat: "Dados" },
  { name: "Metabase", cat: "Dados" },

  // ── IA/ML ───────────────────────────────────────────────────────────────
  { name: "Machine Learning", cat: "IA/ML", aliases: ["ml", "aprendizado de máquina"] },
  { name: "Deep Learning", cat: "IA/ML", aliases: ["redes neurais", "aprendizado profundo"] },
  { name: "PyTorch", cat: "IA/ML", aliases: ["torch"] },
  { name: "TensorFlow", cat: "IA/ML", aliases: ["tf"] },
  { name: "Keras", cat: "IA/ML" },
  { name: "scikit-learn", cat: "IA/ML", aliases: ["sklearn", "scikit learn"] },
  { name: "XGBoost", cat: "IA/ML", aliases: ["lightgbm", "gradient boosting"] },
  { name: "OpenCV", cat: "IA/ML", aliases: ["cv2"] },
  { name: "Visão Computacional", cat: "IA/ML", aliases: ["computer vision", "cv"] },
  { name: "YOLO", cat: "IA/ML", aliases: ["detecção de objetos"] },
  { name: "NLP", cat: "IA/ML", aliases: ["processamento de linguagem natural", "pln"] },
  { name: "spaCy", cat: "IA/ML", aliases: ["nltk"] },
  { name: "Hugging Face", cat: "IA/ML", aliases: ["huggingface", "transformers"] },
  { name: "LLMs", cat: "IA/ML", aliases: ["llm", "modelos de linguagem", "gpt"] },
  { name: "RAG", cat: "IA/ML", aliases: ["retrieval augmented generation"] },
  { name: "LangChain", cat: "IA/ML" },
  { name: "Fine-tuning", cat: "IA/ML", aliases: ["finetuning", "peft"] },
  { name: "Prompt Engineering", cat: "IA/ML", aliases: ["engenharia de prompt"] },
  { name: "Bancos Vetoriais", cat: "IA/ML", aliases: ["pinecone", "chroma", "faiss", "vector db"] },
  { name: "Aprendizado por Reforço", cat: "IA/ML", aliases: ["reinforcement learning", "rl"] },
  { name: "Séries Temporais", cat: "IA/ML", aliases: ["time series", "forecasting"] },
  { name: "Sistemas de Recomendação", cat: "IA/ML", aliases: ["recsys"] },
  { name: "MLOps", cat: "IA/ML", aliases: ["mlflow", "weights & biases"] },
  { name: "IA Generativa", cat: "IA/ML", aliases: ["generative ai", "stable diffusion"] },
  { name: "OpenAI API", cat: "IA/ML", aliases: ["api openai", "anthropic api", "ollama"] },

  // ── DevOps & Cloud ──────────────────────────────────────────────────────
  { name: "Docker", cat: "DevOps & Cloud", aliases: ["contêineres"] },
  { name: "Kubernetes", cat: "DevOps & Cloud", aliases: ["k8s"] },
  { name: "AWS", cat: "DevOps & Cloud", aliases: ["amazon web services", "ec2", "s3"] },
  { name: "Google Cloud", cat: "DevOps & Cloud", aliases: ["gcp"] },
  { name: "Azure", cat: "DevOps & Cloud" },
  { name: "CI/CD", cat: "DevOps & Cloud", aliases: ["github actions", "gitlab ci", "jenkins"] },
  { name: "Terraform", cat: "DevOps & Cloud", aliases: ["iac", "infraestrutura como código"] },
  { name: "Ansible", cat: "DevOps & Cloud" },
  { name: "Nginx", cat: "DevOps & Cloud", aliases: ["apache"] },
  { name: "Linux", cat: "DevOps & Cloud", aliases: ["unix"] },
  { name: "Serverless", cat: "DevOps & Cloud", aliases: ["lambda", "cloud functions"] },
  { name: "Observabilidade", cat: "DevOps & Cloud", aliases: ["prometheus", "grafana", "monitoramento"] },
  { name: "Firebase", cat: "DevOps & Cloud", aliases: ["supabase"] },
  { name: "Vercel", cat: "DevOps & Cloud", aliases: ["netlify"] },

  // ── Embarcados & Hardware ───────────────────────────────────────────────
  { name: "Arduino", cat: "Embarcados & Hardware" },
  { name: "ESP32", cat: "Embarcados & Hardware", aliases: ["esp8266"] },
  { name: "Raspberry Pi", cat: "Embarcados & Hardware", aliases: ["rpi"] },
  { name: "STM32", cat: "Embarcados & Hardware", aliases: ["arm cortex"] },
  { name: "FPGA", cat: "Embarcados & Hardware" },
  { name: "VHDL", cat: "Embarcados & Hardware" },
  { name: "Verilog", cat: "Embarcados & Hardware", aliases: ["systemverilog"] },
  { name: "RTOS", cat: "Embarcados & Hardware", aliases: ["freertos"] },
  { name: "Firmware", cat: "Embarcados & Hardware", aliases: ["bare metal"] },
  { name: "I2C/SPI", cat: "Embarcados & Hardware", aliases: ["i2c", "spi", "uart"] },
  { name: "Projeto de PCB", cat: "Embarcados & Hardware", aliases: ["pcb", "kicad", "altium", "eagle"] },
  { name: "Eletrônica Digital", cat: "Embarcados & Hardware", aliases: ["circuitos digitais"] },
  { name: "Arquitetura de Computadores", cat: "Embarcados & Hardware", aliases: ["risc-v", "mips"] },
  { name: "ROS", cat: "Embarcados & Hardware", aliases: ["ros2", "robótica"] },
  { name: "Controle e Automação", cat: "Embarcados & Hardware", aliases: ["pid", "clp", "scada"] },
  { name: "IoT", cat: "Embarcados & Hardware", aliases: ["internet das coisas"] },

  // ── Redes & Segurança ───────────────────────────────────────────────────
  { name: "Redes TCP/IP", cat: "Redes & Segurança", aliases: ["tcp/ip", "redes"] },
  { name: "MQTT", cat: "Redes & Segurança" },
  { name: "LoRa", cat: "Redes & Segurança", aliases: ["lorawan", "zigbee"] },
  { name: "Bluetooth/BLE", cat: "Redes & Segurança", aliases: ["ble", "bluetooth"] },
  { name: "Wireshark", cat: "Redes & Segurança", aliases: ["análise de tráfego"] },
  { name: "Criptografia", cat: "Redes & Segurança", aliases: ["cryptography"] },
  { name: "Segurança Ofensiva", cat: "Redes & Segurança", aliases: ["pentest", "kali", "red team"] },
  { name: "OWASP", cat: "Redes & Segurança", aliases: ["segurança de aplicações"] },
  { name: "Forense Digital", cat: "Redes & Segurança", aliases: ["perícia digital"] },
  { name: "Blockchain", cat: "Redes & Segurança", aliases: ["solidity", "web3"] },

  // ── Jogos & Gráficos ────────────────────────────────────────────────────
  { name: "Unity", cat: "Jogos & Gráficos" },
  { name: "Unreal Engine", cat: "Jogos & Gráficos", aliases: ["unreal"] },
  { name: "Godot", cat: "Jogos & Gráficos" },
  { name: "OpenGL", cat: "Jogos & Gráficos", aliases: ["webgl", "vulkan"] },
  { name: "Shaders", cat: "Jogos & Gráficos", aliases: ["glsl", "hlsl"] },
  { name: "Blender", cat: "Jogos & Gráficos", aliases: ["modelagem 3d"] },
  { name: "Computação Gráfica", cat: "Jogos & Gráficos", aliases: ["cg"] },

  // ── Ferramentas & Processo ──────────────────────────────────────────────
  { name: "Git", cat: "Ferramentas & Processo", aliases: ["github", "gitlab", "controle de versão"] },
  { name: "Testes Automatizados", cat: "Ferramentas & Processo", aliases: ["jest", "pytest", "junit", "testes"] },
  { name: "TDD", cat: "Ferramentas & Processo", aliases: ["test driven development"] },
  { name: "Metodologias Ágeis", cat: "Ferramentas & Processo", aliases: ["scrum", "kanban", "agile"] },
  { name: "Figma", cat: "Ferramentas & Processo" },
  { name: "UX/UI", cat: "Ferramentas & Processo", aliases: ["ux", "ui", "design de interface"] },
  { name: "Pesquisa com Usuários", cat: "Ferramentas & Processo", aliases: ["ux research", "entrevistas"] },
  { name: "LaTeX", cat: "Ferramentas & Processo" },
  { name: "Escrita Científica", cat: "Ferramentas & Processo", aliases: ["redação científica", "artigos"] },
  { name: "Jira", cat: "Ferramentas & Processo", aliases: ["trello", "notion"] },
];

/**
 * Atalhos por curso — progressive disclosure.
 *
 * O curso é coletado no passo 1, então o passo 2 não precisa abrir 195
 * tecnologias: mostra ~12 relevantes para quem está preenchendo. O catálogo
 * completo continua acessível sob demanda.
 */
export const SUGGESTED_BY_COURSE: Record<Course, string[]> = {
  "Ciência da Computação": [
    "Algoritmos", "Estruturas de Dados", "Python", "Java", "Git", "SQL",
    "Sistemas Operacionais", "Compiladores", "Sistemas Distribuídos",
    "React", "Docker", "Testes Automatizados",
  ],
  "Engenharia da Computação": [
    "C", "C++", "Arduino", "ESP32", "STM32", "FPGA", "VHDL", "Verilog",
    "Firmware", "I2C/SPI", "Arquitetura de Computadores", "Controle e Automação",
  ],
  "Inteligência Artificial": [
    "Python", "Machine Learning", "Deep Learning", "PyTorch", "scikit-learn",
    "Pandas", "NumPy", "Visão Computacional", "NLP", "LLMs", "RAG", "MLOps",
  ],
};

/** Usado quando o curso ainda não foi informado. */
export const POPULAR_SKILLS = [
  "Python", "JavaScript", "Git", "SQL", "React", "Java",
  "C", "Docker", "Algoritmos", "Linux", "HTML/CSS", "Machine Learning",
];

/** Atalhos a exibir: os do curso, ou os populares como retaguarda. */
export function suggestedFor(course?: string): string[] {
  const list = course && course in SUGGESTED_BY_COURSE
    ? SUGGESTED_BY_COURSE[course as Course]
    : POPULAR_SKILLS;
  return list;
}

export const SKILL_CATEGORIES = Array.from(new Set(ALL_SKILLS.map((s) => s.cat)));

export const LEVELS = ["Básico", "Intermediário", "Avançado", "Especialista"] as const;

/** Rótulo curto, para caber no seletor sem quebrar linha. */
export const LEVEL_SHORT: Record<SkillLevel, string> = {
  1: "Bás",
  2: "Int",
  3: "Avan",
  4: "Esp",
};

/** Minúsculas, sem acento e sem espaço duplicado — base de toda comparação. */
export function foldSkill(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Devolve o nome canônico de uma skill digitada, ou o texto limpo quando ela
 * não existe no catálogo (skill livre).
 */
export function canonicalSkill(input: string): string {
  const folded = foldSkill(input);
  if (!folded) return "";
  const hit = ALL_SKILLS.find(
    (s) => foldSkill(s.name) === folded || s.aliases?.some((a) => foldSkill(a) === folded),
  );
  return hit ? hit.name : input.replace(/\s+/g, " ").trim();
}

/** true quando a skill não consta do catálogo — usado para sinalizar na UI. */
export function isCustomSkill(name: string): boolean {
  const folded = foldSkill(name);
  return !ALL_SKILLS.some((s) => foldSkill(s.name) === folded);
}

/**
 * Busca por nome ou alias. Prioriza quem começa com o termo, depois quem
 * contém, para que "re" ofereça React antes de "Spring Boot".
 */
export function searchSkills(query: string, exclude: string[] = []): SkillDef[] {
  const q = foldSkill(query);
  const taken = new Set(exclude.map(foldSkill));
  const pool = ALL_SKILLS.filter((s) => !taken.has(foldSkill(s.name)));
  if (!q) return pool;

  const scored = pool
    .map((s) => {
      const hay = [s.name, ...(s.aliases ?? [])].map(foldSkill);
      if (hay.some((h) => h.startsWith(q))) return { s, rank: 0 };
      if (hay.some((h) => h.includes(q))) return { s, rank: 1 };
      if (foldSkill(s.cat).includes(q)) return { s, rank: 2 };
      return null;
    })
    .filter((x): x is { s: SkillDef; rank: number } => x !== null);

  return scored.sort((a, b) => a.rank - b.rank || a.s.name.localeCompare(b.s.name)).map((x) => x.s);
}
