/**
 * DADOS FICTÍCIOS — insumos qualitativos do painel de impacto (ACE1).
 *
 * Os números do painel NÃO ficam aqui: são derivados de `@/data/students`,
 * `@/data/demands` e `@/data/invitations` em tempo de render, para que o
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
    quote:
      "Eu tinha o projeto parado no GitHub havia meses. Em duas semanas na vitrine recebi um convite de uma demanda que usava exatamente a stack que eu estudava.",
    author: "Rafael Moreira Santos",
    role: "Ciência da Computação · 5º sem",
  },
  {
    quote:
      "O que nos convenceu foi a curadoria. Não recebemos trinta candidaturas para filtrar: recebemos uma indicação com justificativa técnica escrita por alguém do Instituto.",
    author: "TechBr Soluções",
    role: "Solicitante · Eng. de Software",
  },
];

/** Metas declaradas para o período, usadas como denominador no painel. */
export const TARGETS = {
  students: 8,
  projects: 10,
  demands: 6,
  matches: 3,
};
