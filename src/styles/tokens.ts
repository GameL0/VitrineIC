/** Tokens da identidade visual do VitrineIC (espelham o bloco @theme de index.css). */
export const NAVY = "#1C2B4A";
export const RED = "#c1121f";
export const OFFWHITE = "#F5F4F0";

/**
 * Texto secundário. Substitui o antigo `color: NAVY` + `opacity: 0.3–0.5`,
 * que rendia 1,8–3,0:1 sobre o off-white. Este dá 5,15:1 (WCAG AA exige 4,5:1).
 */
export const NAVY_MUTED = "#5C6780";

/** Texto secundário sobre superfície navy: 5,4:1 contra #1C2B4A. */
export const OFFWHITE_MUTED = "#B4B8C2";

/**
 * O vermelho da marca sobre navy dá só 2,3:1. Este clareado dá 4,6:1 e é o
 * único que deve aparecer como texto dentro de uma superfície navy.
 */
export const RED_ON_NAVY = "#EC6C74";
