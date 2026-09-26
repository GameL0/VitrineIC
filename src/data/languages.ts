/**
 * Idiomas e escala de domínio.
 *
 * Idioma é a competência não técnica que vale coletar: é verificável, tem
 * escala consolidada e discrimina de fato — ao contrário de adjetivos
 * autodeclarados. Importa para leitura de artigos em PIBIC/PIBITI, para
 * colaboração internacional e para demandas com material estrangeiro.
 *
 * Libras entra por ser competência reconhecida e determinante em projetos de
 * acessibilidade. Português consta para estudantes intercambistas.
 */

export const LANGUAGES = [
  "Inglês",
  "Espanhol",
  "Francês",
  "Alemão",
  "Italiano",
  "Mandarim",
  "Japonês",
  "Libras",
  "Português",
];

/**
 * Quatro níveis, para reaproveitar o mesmo seletor das competências técnicas.
 * Se a equipe preferir o padrão acadêmico, dá para trocar por CEFR (A1–C2)
 * mexendo só aqui e na largura do seletor.
 */
export const LANGUAGE_LEVELS = ["Básico", "Intermediário", "Avançado", "Fluente"] as const;
