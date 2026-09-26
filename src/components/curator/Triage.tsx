import { useState } from "react";
import { DEMAND_STATUS, KANBAN_COLS, StatusBadge } from "./StatusBadge";
import { Mono, SkillTag } from "./ui";
import { NAVY, NAVY_MUTED, OFFWHITE, RED } from "@/styles/tokens";
import type { Demand, DemandStatus } from "@/types";

export function TriageCard({
  demand,
  onSelect,
  onStatus,
}: {
  demand: Demand;
  onSelect: () => void;
  onStatus: (s: DemandStatus) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="mb-2 transition-all"
      style={{ border: `1px solid ${NAVY}18`, background: OFFWHITE }}
    >
      <button
        type="button"
        aria-expanded={open}
        className="w-full text-left px-4 py-3 cursor-pointer"
        style={{ background: "transparent", border: "none", font: "inherit" }}
        onClick={() => setOpen(!open)}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `${NAVY}04`)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <Mono dim>{demand.id}</Mono>
          {demand.priority === "alta" && (
            <span
              className="text-[8px] tracking-[0.14em] uppercase px-1.5 py-0.5 flex-shrink-0"
              style={{ fontFamily: "Space Mono, monospace", color: RED, border: `1px solid ${RED}` }}
            >
              Alta
            </span>
          )}
        </div>
        <p
          className="text-[13px] font-medium leading-tight mb-2"
          style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
        >
          {demand.title}
        </p>
        <p
          className="text-[10px] mb-2"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY_MUTED }}
        >
          {demand.company}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          {demand.skills.slice(0, 3).map((s) => (
            <SkillTag key={s} small>{s}</SkillTag>
          ))}
          {demand.skills.length > 3 && (
            <span className="text-[8px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}>
              +{demand.skills.length - 3}
            </span>
          )}
        </div>
        <Mono dim>{demand.scope}</Mono>
      </button>

      {open && (
        <div style={{ borderTop: `1px solid ${NAVY}12` }}>
          <div className="px-4 py-3">
            <p className="text-[11px] leading-relaxed mb-3" style={{ fontFamily: "Inter, sans-serif", color: NAVY_MUTED, fontWeight: 300 }}>
              {demand.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {demand.skills.map((s) => <SkillTag key={s} small>{s}</SkillTag>)}
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["em_analise", "aprovada", "rejeitada"] as DemandStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={(e) => { e.stopPropagation(); onStatus(s); }}
                  className="px-2.5 py-1 text-[8px] tracking-[0.12em] uppercase transition-opacity hover:opacity-80"
                  style={{
                    fontFamily: "Space Mono, monospace",
                    border: `1px solid ${DEMAND_STATUS[s].color}`,
                    color: DEMAND_STATUS[s].color,
                    background: demand.status === s ? `${DEMAND_STATUS[s].color}12` : "transparent",
                  }}
                >
                  → {DEMAND_STATUS[s].label}
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 py-3" style={{ borderTop: `1px solid ${NAVY}10` }}>
            <button
              onClick={(e) => { e.stopPropagation(); onSelect(); }}
              className="w-full py-2 text-[9px] tracking-[0.16em] uppercase font-semibold transition-opacity hover:opacity-85"
              style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
            >
              Fazer Match →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Triage({
  demands,
  setDemands,
  onMatch,
}: {
  demands: Demand[];
  setDemands: (d: Demand[]) => void;
  onMatch: (d: Demand) => void;
}) {
  const updateStatus = (id: string, status: DemandStatus) => {
    setDemands(demands.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}>
            <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
            Fila de Triagem
          </p>
          <h1 className="text-4xl" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
            Demandas Recebidas
          </h1>
        </div>
        <div className="flex gap-5">
          {KANBAN_COLS.map((col) => (
            <div key={col} className="text-right">
              <p className="text-2xl leading-none" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
                {demands.filter((d) => d.status === col).length}
              </p>
              <p className="text-[9px] mt-1" style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}>
                {DEMAND_STATUS[col].label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0" style={{ border: `1px solid ${NAVY}18` }}>
        {KANBAN_COLS.map((col, ci) => (
          <div
            key={col}
            style={{ borderLeft: ci > 0 ? `1px solid ${NAVY}18` : "none" }}
          >
            {/* Column header */}
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{ borderBottom: `1px solid ${NAVY}18`, background: `${NAVY}04` }}
            >
              <StatusBadge status={col} />
              <span className="ml-auto text-[9px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}>
                {demands.filter((d) => d.status === col).length}
              </span>
            </div>
            {/* Cards */}
            <div className="p-3 min-h-[300px]">
              {demands.filter((d) => d.status === col).map((d) => (
                <TriageCard
                  key={d.id}
                  demand={d}
                  onSelect={() => onMatch(d)}
                  onStatus={(s) => updateStatus(d.id, s)}
                />
              ))}
              {demands.filter((d) => d.status === col).length === 0 && (
                <div className="flex items-center justify-center h-24">
                  <span className="text-[9px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}>
                    Vazio
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
