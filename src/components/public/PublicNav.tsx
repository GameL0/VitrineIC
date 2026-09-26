import { MobileMenu } from "@/components/MobileMenu";
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
      <button type="button" onClick={onHome} className="flex items-center gap-3" aria-label="VitrineIC — página inicial">
        <div className="w-5 h-5 flex-shrink-0" style={{ background: NAVY }} />
        <span
          className="text-[12px] tracking-[0.2em] uppercase font-semibold"
          style={{ fontFamily: SANS, color: NAVY }}
        >
          VitrineIC
        </span>
      </button>

      <ul className="hidden md:flex items-center gap-1" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              aria-current={view === item.id ? "page" : undefined}
              onClick={() => onNavigate(item.id)}
              className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase transition-all"
              style={{
                fontFamily: SANS,
                color: NAVY,
                background: view === item.id ? `${NAVY}08` : "transparent",
                borderBottom: view === item.id ? `2px solid ${RED}` : "2px solid transparent",
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <MobileMenu
          items={items}
          current={view}
          onSelect={(id) => onNavigate(id as typeof items[number]["id"])}
          label="Navegação pública"
        />
        <button
          type="button"
          onClick={onSignIn}
          className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-80"
          style={{ border: `1px solid ${NAVY}`, color: NAVY, fontFamily: SANS }}
        >
          Entrar
        </button>
      </div>
    </nav>
  );
}

export { MONO, SANS };
