import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import type { PublicView } from "./routes";

const MONO = "Space Mono, monospace";
const SANS = "Inter, sans-serif";

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

  return (
    <nav
      className="w-full flex items-center justify-between px-8 md:px-12 py-4 sticky top-0 z-30"
      style={{ background: OFFWHITE, borderBottom: `1px solid ${NAVY}15` }}
    >
      <button onClick={onHome} className="flex items-center gap-3">
        <img src="/logo.jpg" alt="Logo ConectaIC" className="w-6 h-6 object-contain rounded-[4px]" style={{ background: NAVY }} />
        <span
          className="text-[12px] tracking-[0.2em] uppercase font-semibold"
          style={{ fontFamily: SANS, color: NAVY }}
        >
          VitrineIC
        </span>
      </button>

      <div className="hidden md:flex items-center gap-1">
        <button
          onClick={onHome}
          className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase transition-all"
          style={{
            fontFamily: SANS,
            color: NAVY,
            background: (!view || view === "home") ? `${NAVY}08` : "transparent",
            borderRadius: "10px",
            fontWeight: (!view || view === "home") ? 600 : 400
          }}
        >
          Início
        </button>
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
        {onAdmin && (
          <button
            onClick={onAdmin}
            className="ml-4 px-3 py-2 text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80 opacity-50 flex items-center gap-1.5"
            style={{ fontFamily: MONO, color: RED }}
          >
            <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
              <rect x="0.5" y="0.5" width="6" height="6" fill={RED} rx="2" />
            </svg>
            Admin
          </button>
        )}
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
