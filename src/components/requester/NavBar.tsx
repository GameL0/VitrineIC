import { MobileMenu } from "@/components/MobileMenu";
import { NAVY, NAVY_MUTED, OFFWHITE, RED } from "@/styles/tokens";

export function NavBar({
  view,
  setView,
  onBack,
}: {
  view: string;
  setView: (v: string) => void;
  onBack: () => void;
}) {
  const navItems = [
    { id: "dashboard", label: "Demandas" },
    { id: "new", label: "Nova Demanda" },
    { id: "matches", label: "Matches" },
  ];
  return (
    <nav
      className="w-full flex items-center justify-between px-8 md:px-12 py-4 sticky top-0 z-30"
      style={{ background: OFFWHITE, borderBottom: `1px solid ${NAVY}15` }}
    >
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 flex-shrink-0" style={{ background: NAVY }} />
        <span
          className="text-[12px] tracking-[0.2em] uppercase font-semibold"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
        >
          VitrineIC
        </span>
        <span
          className="text-[9px] tracking-[0.18em] uppercase ml-2"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}
        >
          · Área do Solicitante
        </span>
      </div>
      <ul className="hidden md:flex items-center gap-1" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              aria-current={view === item.id ? "page" : undefined}
              onClick={() => setView(item.id)}
              className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
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
          items={navItems}
          current={view}
          onSelect={setView}
          label="Navegação da área do solicitante"
        />
        <button
          type="button"
          onClick={onBack}
          className="text-[9px] tracking-[0.16em] uppercase transition-colors flex items-center gap-2"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Sair
        </button>
      </div>
    </nav>
  );
}
