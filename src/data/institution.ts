/**
 * Identidade institucional do VitrineIC.
 *
 * Fonte única: nome da universidade, domínios e cursos ofertados. Não repita
 * esses valores em componente — importe daqui, para que trocar de instituição
 * ou incluir um curso seja mudança de uma linha só.
 */
import type { Course } from "@/types";

export const INSTITUTION = {
  unit: "Instituto de Computação",
  unitShort: "IC",
  university: "Universidade Federal de Alagoas",
  universityShort: "UFAL",
  city: "Maceió",
  state: "Alagoas",
  domain: "ic.ufal.br",
  showcaseDomain: "vitrine.ic.ufal.br",
  emailExample: "seunome@ic.ufal.br",
} as const;

/** Cursos ofertados pelo IC/UFAL. */
export const COURSES: Course[] = [
  "Ciência da Computação",
  "Engenharia da Computação",
  "Inteligência Artificial",
];

/** Forma curta, para metadados em caixa alta onde o espaço é apertado. */
export const COURSE_SHORT: Record<Course, string> = {
  "Ciência da Computação": "Ciência da Computação",
  "Engenharia da Computação": "Eng. da Computação",
  "Inteligência Artificial": "Inteligência Artificial",
};
