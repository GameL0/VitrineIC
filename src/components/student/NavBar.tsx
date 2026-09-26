import { Dashboard } from "./Dashboard";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

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
    { id: "dashboard", label: "Dashboard" },
    { id: "lab", label: "Laboratório" },
    { id: "profile", label: "Perfil" },
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
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
        >
          · Área do Estudante
        </span>
      </div>
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
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
        ))}
      </div>
      <button
        onClick={onBack}
        className="text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-100 opacity-40 flex items-center gap-2"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        Sair
      </button>
    </nav>
  );
}
