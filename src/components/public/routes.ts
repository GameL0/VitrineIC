/** Rotas públicas, navegáveis sem login. */
export type PublicView = "projects" | "students" | "impact";

/**
 * Destino público atual. É uma união discriminada em vez de flags paralelas,
 * para que detalhe de projeto e perfil carreguem o id que exibem.
 */
export type PublicRoute =
  | { view: PublicView }
  | { view: "project"; id: string }
  | { view: "profile"; id: string };

/** Item da nav correspondente a uma rota (detalhes herdam a seção de origem). */
export function navSection(route: PublicRoute): PublicView {
  if (route.view === "project") return "projects";
  if (route.view === "profile") return "students";
  return route.view;
}
