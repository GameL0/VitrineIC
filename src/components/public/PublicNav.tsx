import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import type { PublicView } from "./routes";

const MONO = "Space Mono, monospace";
const SANS = "Inter, sans-serif";

/** Navegação das páginas públicas, no mesmo formato das navs das áreas. */
export function PublicNav({
  view,
  onNavigate,
  onHome,
  onSignIn,
}: {
  view: PublicView;
  onNavigate: (v: PublicView) => void;
  onHome: () => void;
  onSignIn: () => void;
}) {
  const items: { id: PublicView; label: string }[] = [
    { id: "projects", label: "Projetos" },
    { id: "students", label: "Estudantes" },
    { id: "impact", label: "Impacto" },
  ];

  return (
    <nav
      className="w-full flex items-center justify-between px-8 md:px-12 py-4 sticky top-0 z-30"
      style={{ background: OFFWHITE, borderBottom: `1px solid ${NAVY}15` }}
    >
      <button onClick={onHome} className="flex items-center gap-3">
        <div className="w-5 h-5 flex-shrink-0" style={{ background: NAVY, borderRadius: "6px" }} />
        <span
          className="text-[12px] tracking-[0.2em] uppercase font-semibold"
          style={{ fontFamily: SANS, color: NAVY }}
        >
          VitrineIC
        </span>
      </button>

      <div className="hidden md:flex items-center gap-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase transition-all"
            style={{
              fontFamily: SANS,
              color: NAVY,
              background: view === item.id ? `${NAVY}08` : "transparent",
              borderRadius: "10px",
              fontWeight: view === item.id ? 600 : 400
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <button
        onClick={onSignIn}
        className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-80"
        style={{ border: `1px solid ${NAVY}`, color: NAVY, fontFamily: SANS, borderRadius: "10px" }}
      >
        Entrar
      </button>
    </nav>
  );
}

export { MONO, SANS };
