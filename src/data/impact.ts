/**
 * DADOS FICTÍCIOS — insumos qualitativos do painel de impacto (ACE1).
 *
 * Os números do painel NÃO ficam aqui: são derivados de `@/data/students`,
 * `@/data/demands` e `@/data/interests` em tempo de render, para que o
 * indicador nunca divirja da base. Só o que não dá para derivar mora aqui.
 */

export const IMPACT_PERIOD = "ago 2026 — set 2026";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "A curadoria nos sugeriu uma estudante com justificativa, e era exatamente o perfil que precisávamos.",
    author: "Fernanda Rocha",
    role: "CTO · Mangue Tech",
  },
  {
    quote: "Meu projeto de TCC virou meu primeiro contrato como desenvolvedor.",
    author: "João Pedro Lins",
    role: "Engenharia da Computação",
  },
  {
    quote: "Sem pilha de currículos: só falamos com quem tinha aceitado a demanda.",
    author: "André Malta",
    role: "Sócio · Sururu Labs",
  },
];

/** Metas declaradas para o período, usadas como denominador no painel. */
export const TARGETS = {
  students: 8,
  projects: 10,
  demands: 6,
  matches: 3,
};
