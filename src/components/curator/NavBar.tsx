import { Mono } from "./ui";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import type { Demand } from "@/types";

export function NavBar({
  view,
  setView,
  onBack,
  demands,
}: {
  view: string;
  setView: (v: "triage") => void;
  onBack: () => void;
  demands: Demand[];
}) {
  const newCount = demands.filter((d) => d.status === "nova").length;
  const navItems = [
    { id: "triage", label: "Análise de Projetos", badge: newCount > 0 ? newCount : null },
    { id: "matchmaking_hub", label: "Análise de Matches", badge: null },
  ];

  return (
    <nav
      className="w-full flex items-center justify-between px-8 md:px-12 py-4 sticky top-0 z-30"
      style={{ background: OFFWHITE, borderBottom: `1px solid ${NAVY}15` }}
    >
      <div className="flex items-center gap-3">
        <img src="/logo.jpg" alt="Logo ConectaIC" className="w-6 h-6 object-contain rounded-[4px]" style={{ background: NAVY }} />
        <span className="text-[12px] tracking-[0.2em] uppercase font-semibold" style={{ fontFamily: "Inter, sans-serif", color: NAVY }}>
          VitrineIC
        </span>
        <span className="text-[9px] tracking-[0.18em] uppercase ml-2 hidden md:inline-block" style={{ fontFamily: "Space Mono, monospace", color: RED, opacity: 0.7 }}>
          · Admin — Curadoria
        </span>
      </div>
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as any)}
            className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase transition-all flex items-center gap-2"
            style={{
              fontFamily: "Inter, sans-serif",
              color: NAVY,
              background: view === item.id || (item.id === "matchmaking_hub" && (view === "matchmaking" || view === "confirmed")) ? `${NAVY}08` : "transparent",
              borderRadius: "10px",
              fontWeight: view === item.id || (item.id === "matchmaking_hub" && (view === "matchmaking" || view === "confirmed")) ? 600 : 400
            }}
          >
            {item.label}
            {item.badge && (
              <span className="px-1.5 py-0.5 text-[8px] rounded-[5px]" style={{ background: RED, color: OFFWHITE, fontFamily: "Space Mono, monospace" }}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        className="text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80 opacity-50 flex items-center gap-2"
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
