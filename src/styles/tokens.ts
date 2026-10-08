/**
 * Tokens da identidade visual do VitrineIC (espelham o bloco @theme de index.css).
 *
 * Os nomes são herdados da paleta anterior: `NAVY` é o azul-marinho profundo
 * do texto, `RED` é o acento vermelho e `OFFWHITE` é o creme de fundo.
 */
export const NAVY = "#0b2545";
/** Azuis intermediários, usados nos gradientes dos painéis escuros. */
export const NAVY_MID = "#13315c";
export const NAVY_SOFT = "#134074";
export const RED = "#c1121f";
export const OFFWHITE = "#f3f1ec";
/** Pedra clara para superfícies secundárias. */
export const STONE = "#e6e2d9";
/** Azul claro para texto e acento sobre fundo escuro. */
export const SKY = "#8da9c4";
/** Branco dos cards. */
export const WHITE = "#ffffff";

/**
 * Cores de status do guia de estilos ("Estilos/Cores VitrineIC" no Figma).
 * Usadas em pílulas com fundo a 10% e texto na cor cheia.
 */
export const SLATE = "#4a6a9c"; // novo
export const OCHRE = "#b7791f"; // em análise / aguardo
export const MOSS = "#2f6b4f"; // aprovado / aceito
export const TERRACOTTA = "#b4432f"; // rejeitado / prioridade alta / erro

/** Degraus de transparência do azul-marinho no guia, como sufixo hex. */
export const NAVY_ALPHA = {
  8: `${NAVY}14`,
  13: `${NAVY}21`,
  50: `${NAVY}80`,
  65: `${NAVY}a6`,
} as const;
