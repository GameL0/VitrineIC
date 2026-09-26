/**
 * Vocabulário de tecnologias e níveis de proficiência.
 *
 * O catálogo é sugestão, não limite: o estudante pode declarar uma skill que
 * não esteja aqui. Os `aliases` existem porque o match compara texto
 * (`@/lib/match`), então "ReactJS" e "react.js" precisam virar "React" antes
 * de entrar no perfil — sem isso a taxonomia se fragmenta e o score cai por
 * diferença de grafia.
 */
import type { SkillLevel } from "@/types";

export interface SkillDef {
  name: string;
  cat: string;
  aliases?: string[];
}

export const ALL_SKILLS: SkillDef[] = [
  // Linguagens
  { name: "Python", cat: "Linguagens", aliases: ["py", "python3"] },
  { name: "JavaScript", cat: "Linguagens", aliases: ["js", "ecmascript"] },
  { name: "TypeScript", cat: "Linguagens", aliases: ["ts"] },
  { name: "Java", cat: "Linguagens" },
  { name: "C", cat: "Linguagens" },
  { name: "C++", cat: "Linguagens", aliases: ["cpp", "c/c++"] },
  { name: "C#", cat: "Linguagens", aliases: ["csharp"] },
  { name: "Go", cat: "Linguagens", aliases: ["golang"] },
  { name: "Rust", cat: "Linguagens" },
  { name: "Kotlin", cat: "Linguagens" },
  { name: "Swift", cat: "Linguagens" },
  { name: "PHP", cat: "Linguagens" },
  { name: "Ruby", cat: "Linguagens" },
  { name: "R", cat: "Linguagens" },
  { name: "MATLAB", cat: "Linguagens" },
  { name: "Assembly", cat: "Linguagens" },
  { name: "VHDL", cat: "Linguagens" },

  // Frontend
  { name: "React", cat: "Frontend", aliases: ["reactjs", "react.js"] },
  { name: "Vue", cat: "Frontend", aliases: ["vuejs", "vue.js"] },
  { name: "Angular", cat: "Frontend" },
  { name: "Svelte", cat: "Frontend" },
  { name: "Next.js", cat: "Frontend", aliases: ["nextjs", "next"] },
  { name: "HTML/CSS", cat: "Frontend", aliases: ["html", "css"] },
  { name: "Tailwind CSS", cat: "Frontend", aliases: ["tailwind"] },
  { name: "Flutter", cat: "Frontend" },
  { name: "React Native", cat: "Frontend" },

  // Backend
  { name: "Node.js", cat: "Backend", aliases: ["node", "nodejs"] },
  { name: "Express", cat: "Backend", aliases: ["expressjs"] },
  { name: "FastAPI", cat: "Backend" },
  { name: "Django", cat: "Backend" },
  { name: "Flask", cat: "Backend" },
  { name: "Spring Boot", cat: "Backend", aliases: ["spring"] },
  { name: "Laravel", cat: "Backend" },
  { name: ".NET", cat: "Backend", aliases: ["dotnet", "asp.net"] },
  { name: "GraphQL", cat: "Backend" },
  { name: "REST", cat: "Backend", aliases: ["api rest", "restful"] },

  // Dados
  { name: "PostgreSQL", cat: "Dados", aliases: ["postgres"] },
  { name: "MySQL", cat: "Dados" },
  { name: "SQLite", cat: "Dados" },
  { name: "MongoDB", cat: "Dados", aliases: ["mongo"] },
  { name: "Redis", cat: "Dados" },
  { name: "SQL", cat: "Dados" },
  { name: "Pandas", cat: "Dados" },
  { name: "Spark", cat: "Dados", aliases: ["apache spark", "pyspark"] },
  { name: "Power BI", cat: "Dados", aliases: ["powerbi"] },

  // IA/ML
  { name: "PyTorch", cat: "IA/ML", aliases: ["torch"] },
  { name: "TensorFlow", cat: "IA/ML", aliases: ["tf"] },
  { name: "scikit-learn", cat: "IA/ML", aliases: ["sklearn", "scikit learn"] },
  { name: "Keras", cat: "IA/ML" },
  { name: "OpenCV", cat: "IA/ML", aliases: ["cv2"] },
  { name: "Hugging Face", cat: "IA/ML", aliases: ["huggingface", "transformers"] },
  { name: "LangChain", cat: "IA/ML" },
  { name: "NLP", cat: "IA/ML", aliases: ["processamento de linguagem natural"] },
  { name: "Visão Computacional", cat: "IA/ML", aliases: ["computer vision"] },

  // DevOps e Cloud
  { name: "Docker", cat: "DevOps & Cloud" },
  { name: "Kubernetes", cat: "DevOps & Cloud", aliases: ["k8s"] },
  { name: "AWS", cat: "DevOps & Cloud", aliases: ["amazon web services"] },
  { name: "Google Cloud", cat: "DevOps & Cloud", aliases: ["gcp"] },
  { name: "Azure", cat: "DevOps & Cloud" },
  { name: "CI/CD", cat: "DevOps & Cloud", aliases: ["github actions", "gitlab ci"] },
  { name: "Terraform", cat: "DevOps & Cloud" },
  { name: "Linux", cat: "DevOps & Cloud" },

  // Embarcados e Redes
  { name: "Arduino", cat: "Embarcados & Redes" },
  { name: "Raspberry Pi", cat: "Embarcados & Redes" },
  { name: "ESP32", cat: "Embarcados & Redes" },
  { name: "MQTT", cat: "Embarcados & Redes" },
  { name: "ROS", cat: "Embarcados & Redes" },
  { name: "Redes TCP/IP", cat: "Embarcados & Redes", aliases: ["tcp/ip", "redes"] },

  // Ferramentas
  { name: "Git", cat: "Ferramentas" },
  { name: "Figma", cat: "Ferramentas" },
  { name: "Testes automatizados", cat: "Ferramentas", aliases: ["jest", "pytest", "testes"] },
  { name: "Metodologias Ágeis", cat: "Ferramentas", aliases: ["scrum", "kanban", "agile"] },
];

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
