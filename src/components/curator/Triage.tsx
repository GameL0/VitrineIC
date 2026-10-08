import { useState } from "react";
import { DEMAND_STATUS, KANBAN_COLS, StatusBadge } from "./StatusBadge";
import { Mono, SkillTag } from "./ui";
import { NAVY, OFFWHITE, RED, TERRACOTTA } from "@/styles/tokens";
import type { Demand, DemandStatus } from "@/types";


export function TriageCard({
  demand,
  onStatus,
  onDragStart,
  onDelete,
}: {
  demand: Demand;
  onStatus: (s: DemandStatus) => void;
  onDragStart: (id: string) => void;
  onDelete?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="mb-2 transition-all cursor-grab active:cursor-grabbing"
      draggable
      onDragStart={() => onDragStart(demand.id)}
      style={{ border: `1px solid ${NAVY}18`, background: OFFWHITE, borderRadius: "16px", overflow: "hidden" }}
    >
      <div
        className="px-4 py-3"
        onClick={() => setOpen(!open)}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `${NAVY}04`)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <Mono dim>{demand.id}</Mono>
          {demand.priority === "alta" && (
            <span
              className="text-[8px] tracking-[0.14em] uppercase px-1.5 py-0.5 flex-shrink-0"
              style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: TERRACOTTA, border: `1px solid ${TERRACOTTA}`, borderRadius: "6px" }}
            >
              Alta
            </span>
          )}
        </div>
        <p
          className="text-[13px] font-medium leading-tight mb-2"
          style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}
        >
          {demand.title}
        </p>
        <p
          className="text-[10px] mb-2"
          style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.5 }}
        >
          {demand.company}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          {demand.skills.slice(0, 3).map((s) => (
            <SkillTag key={s} small>{s}</SkillTag>
          ))}
          {demand.skills.length > 3 && (
            <span className="text-[8px]" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
              +{demand.skills.length - 3}
            </span>
          )}
        </div>
        <Mono dim>{demand.scope}</Mono>
      </div>

      {open && (
        <div style={{ borderTop: `1px solid ${NAVY}12` }}>
          <div className="px-4 py-3">
            <p className="text-[11px] leading-relaxed mb-3" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}>
              {demand.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-4">
              {demand.skills.map((s) => <SkillTag key={s} small>{s}</SkillTag>)}
            </div>
          </div>
          
          <div className="p-2 flex flex-col gap-2" style={{ background: `${NAVY}03`, borderTop: `1px solid ${NAVY}10` }}>
            {(["em_analise", "aprovada", "rejeitada"] as DemandStatus[]).map((s) => (
              <button
                key={s}
                onClick={(e) => { e.stopPropagation(); onStatus(s); }}
                className="w-full py-2.5 px-4 flex items-center justify-between text-[10px] tracking-[0.16em] uppercase font-semibold transition-all hover:opacity-85"
                style={{
                  fontFamily: "Geist, Inter, system-ui, sans-serif",
                  border: `1px solid ${DEMAND_STATUS[s].color}40`,
                  color: demand.status === s ? OFFWHITE : DEMAND_STATUS[s].color,
                  background: demand.status === s ? DEMAND_STATUS[s].color : OFFWHITE,
                  borderRadius: "10px"
                }}
              >
                <span>Mover para {DEMAND_STATUS[s].label}</span>
                {demand.status === s && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            ))}
            
            {demand.status === "rejeitada" && onDelete && (
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  if (window.confirm("Você tem certeza que deseja excluir esta demanda?")) {
                    onDelete(); 
                  }
                }}
                className="w-full py-2.5 px-4 flex items-center justify-between text-[10px] tracking-[0.16em] uppercase font-semibold transition-all hover:opacity-85 mt-2"
                style={{
                  fontFamily: "Geist, Inter, system-ui, sans-serif",
                  border: `1px solid ${TERRACOTTA}`,
                  color: OFFWHITE,
                  background: TERRACOTTA,
                  borderRadius: "10px"
                }}
              >
                <span>Excluir Demanda</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export function Triage({
  demands,
  setDemands,
}: {
  demands: Demand[];
  setDemands: (d: Demand[]) => void;
}) {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const updateStatus = (id: string, status: DemandStatus) => {
    setDemands(demands.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  const deleteDemand = (id: string) => {
    setDemands(demands.filter(d => d.id !== id));
  };

  const handleDrop = (e: React.DragEvent, status: DemandStatus) => {
    e.preventDefault();
    if (draggedId) {
      updateStatus(draggedId, status);
      setDraggedId(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
            <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
            Fila de Triagem
          </p>
          <h1 className="text-4xl" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>
            Demandas Recebidas
          </h1>
        </div>
        <div className="flex gap-5 flex-wrap">
          {KANBAN_COLS.map((col) => (
            <div key={col} className="text-right">
              <p className="text-2xl leading-none" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>
                {demands.filter((d) => d.status === col).length}
              </p>
              <p className="text-[9px] mt-1" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
                {DEMAND_STATUS[col].label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-0" style={{ border: `1px solid ${NAVY}18`, borderRadius: "16px", overflow: "hidden" }}>
        {KANBAN_COLS.map((col, ci) => (
          <div
            key={col}
            onDrop={(e) => handleDrop(e, col)}
            onDragOver={handleDragOver}
            style={{ borderLeft: ci > 0 ? `1px solid ${NAVY}18` : "none", transition: "background 0.2s" }}
            onDragEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${NAVY}03` }}
            onDragLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
            onDropCapture={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
          >
            {/* Column header */}
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{ borderBottom: `1px solid ${NAVY}18`, background: `${NAVY}04` }}
            >
              <StatusBadge status={col} />
              <span className="ml-auto text-[9px]" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
                {demands.filter((d) => d.status === col).length}
              </span>
            </div>
            {/* Cards */}
            <div className="p-3 min-h-[500px]">
              {demands.filter((d) => d.status === col).map((d) => (
                <TriageCard
                  key={d.id}
                  demand={d}
                  onStatus={(s) => updateStatus(d.id, s)}
                  onDragStart={(id) => setDraggedId(id)}
                  onDelete={() => deleteDemand(d.id)}
                />
              ))}
              {demands.filter((d) => d.status === col).length === 0 && (
                <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-[12px] opacity-50 pointer-events-none" style={{ borderColor: NAVY }}>
                  <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY }}>
                    Solte aqui
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