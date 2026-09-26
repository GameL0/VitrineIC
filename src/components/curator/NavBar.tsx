import { Mono } from "./ui";
import { NAVY, NAVY_MUTED, OFFWHITE, RED } from "@/styles/tokens";
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
  return (
    <nav
      className="w-full flex items-center justify-between px-8 md:px-12 py-4 sticky top-0 z-30"
      style={{ background: OFFWHITE, borderBottom: `1px solid ${NAVY}15` }}
    >
      <div className="flex items-center gap-3">
        <div className="w-5 h-5" style={{ background: NAVY }} />
        <span className="text-[12px] tracking-[0.2em] uppercase font-semibold" style={{ fontFamily: "Inter, sans-serif", color: NAVY }}>
          VitrineIC
        </span>
        <span className="text-[9px] tracking-[0.18em] uppercase ml-2" style={{ fontFamily: "Space Mono, monospace", color: RED }}>
          · Admin — Curadoria
        </span>
      </div>
      <ul className="flex items-center gap-1" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {[
          { id: "triage", label: "Triagem", badge: newCount > 0 ? newCount : null },
        ].map((item) => (
          <li key={item.id}>
            <button
              type="button"
              aria-current={
                view === item.id || view === "matchmaking" || view === "confirmed" ? "page" : undefined
              }
              onClick={() => setView("triage")}
              className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase transition-all flex items-center gap-2"
              style={{
                fontFamily: "Inter, sans-serif",
                color: NAVY,
                background: view === item.id || view === "matchmaking" || view === "confirmed" ? `${NAVY}08` : "transparent",
                borderBottom: view === item.id || view === "matchmaking" || view === "confirmed" ? `2px solid ${RED}` : "2px solid transparent",
              }}
            >
              Demandas & Match
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[8px]" style={{ background: RED, color: OFFWHITE, fontFamily: "Space Mono, monospace" }}>
                  {item.badge}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
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
    </nav>
  );
}
