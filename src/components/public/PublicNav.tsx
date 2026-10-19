import { Logo } from "./Logo";
import type { PublicView } from "./routes";

const MONO = "Geist Mono, ui-monospace, monospace";
const SANS = "Geist, Inter, system-ui, sans-serif";

/** Navegação das páginas públicas, unificada com a Landing Page. */
export function PublicNav({
  view,
  onNavigate,
  onHome,
  onSignIn,
  onAdmin,
}: {
  view?: PublicView | "home"; // allow optional view for landing
  onNavigate: (v: PublicView) => void;
  onHome: () => void;
  onSignIn: () => void;
  onAdmin?: () => void;
}) {
  const items: { id: PublicView; label: string }[] = [
    { id: "projects", label: "Projetos" },
    { id: "students", label: "Estudantes" },
    { id: "impact", label: "Impacto" },
  ];

  const linkClass = (active: boolean) =>
    `font-sans text-[13px] transition-colors ${active ? "text-navy" : "text-navy/65 hover:text-navy"}`;

  return (
    <nav className="sticky top-0 z-30 border-b border-navy/8 bg-offwhite/85 backdrop-blur-[8px]">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-8 px-5 md:px-10">
        <button onClick={onHome} aria-label="VitrineIC, início">
          <Logo />
        </button>

        <div className="hidden items-center gap-6 md:flex">
          <button onClick={onHome} className={linkClass(!view || view === "home")}>
            Início
          </button>
          {items.map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.id)} className={linkClass(view === item.id)}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-4">
          {onAdmin && (
            <button
              onClick={onAdmin}
              className="font-mono text-[10px] uppercase tracking-[0.08em] text-navy/65 transition-colors hover:text-navy"
            >
              Admin
            </button>
          )}
          <button onClick={onSignIn} className="vt-btn vt-btn-secondary">
            Entrar
          </button>
        </div>
      </div>
    </nav>
  );
}

export { MONO, SANS };
