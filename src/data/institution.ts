/**
 * Identidade institucional do VitrineIC.
 *
 * Fonte única: universidade, domínio de e-mail, unidades e cursos. O site
 * atende todos os institutos e faculdades da UFAL; o IC é onde ele nasceu.
 * Não repita esses valores em componente — importe daqui.
 */

export const INSTITUTION = {
  unit: "Instituto de Computação",
  unitShort: "IC",
  university: "Universidade Federal de Alagoas",
  universityShort: "UFAL",
  city: "Maceió",
  state: "Alagoas",
  stateShort: "AL",
  campus: "Campus A. C. Simões",
  domain: "ic.ufal.br",
  showcaseDomain: "vitrine.ic.ufal.br",
  contactEmail: "vitrine@ic.ufal.br",
  emailExample: "seunome@ic.ufal.br",
} as const;

/**
 * Unidades acadêmicas que giram no cartão do hero, começando pelo IC.
 * Siglas e nomes conforme ufal.br/ufal/institucional/unidades-academicas.
 */
export interface Unit {
  short: string;
  name: string;
  courses: string[];
}

/**
 * Cursos de cada unidade. Os do IC são os reais; os das demais unidades são
 * exemplo e devem ser conferidos em ufal.br antes de publicar.
 */
export const UNITS: Unit[] = [
  {
    short: "IC",
    name: "Instituto de Computação",
    courses: ["Ciência da Computação", "Engenharia da Computação", "Inteligência Artificial"],
  },
  { short: "FAMED", name: "Faculdade de Medicina", courses: ["Medicina"] },
  { short: "FDA", name: "Faculdade de Direito", courses: ["Direito"] },
  {
    short: "CTEC",
    name: "Centro de Tecnologia",
    courses: ["Engenharia Civil", "Engenharia Ambiental e Sanitária", "Engenharia Química", "Engenharia de Petróleo"],
  },
  { short: "FAU", name: "Faculdade de Arquitetura e Urbanismo", courses: ["Arquitetura e Urbanismo", "Design"] },
  {
    short: "FEAC",
    name: "Faculdade de Economia, Administração e Contabilidade",
    courses: ["Administração", "Ciências Contábeis", "Economia"],
  },
  { short: "FALE", name: "Faculdade de Letras", courses: ["Letras – Português", "Letras – Inglês"] },
  { short: "IQB", name: "Instituto de Química e Biotecnologia", courses: ["Química", "Biotecnologia"] },
];

/** Todos os cursos da universidade, na ordem das unidades. */
export const COURSES: string[] = UNITS.flatMap((u) => u.courses);

export function findUnit(short: string) {
  return UNITS.find((u) => u.short === short);
}

/** Forma curta, para metadados em caixa alta onde o espaço é apertado. */
const COURSE_SHORT: Record<string, string> = {
  "Engenharia da Computação": "Eng. da Computação",
  "Engenharia Ambiental e Sanitária": "Eng. Ambiental",
};

export function courseShort(course: string) {
  return COURSE_SHORT[course] ?? course;
}

export const EMAIL_DOMAIN_SUFFIX = ".ufal.br";

/** Aceita ic.ufal.br, feac.ufal.br, ufal.br... */
export function isUfalEmail(email: string) {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  return domain === "ufal.br" || domain.endsWith(EMAIL_DOMAIN_SUFFIX);
}
