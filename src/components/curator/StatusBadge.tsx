import { Mono } from "./ui";
import { NAVY, RED } from "@/styles/tokens";
import type { DemandStatus } from "@/types";

export const DEMAND_STATUS: Record<DemandStatus, { label: string; color: string; shape: "circle" | "square" | "diamond" }> = {
  nova:       { label: "Nova",         color: RED,          shape: "diamond" },
  em_analise: { label: "Em Análise",   color: `${NAVY}88`,  shape: "circle"  },
  aprovada:   { label: "Aprovada",     color: "#2d7a3a",    shape: "square"  },
  rejeitada:  { label: "Rejeitada",    color: `${NAVY}40`,  shape: "diamond" },
  matched:    { label: "Matched",      color: NAVY,         shape: "square"  },
};

export const KANBAN_COLS: DemandStatus[] = ["nova", "em_analise", "aprovada", "rejeitada", "matched"];

export function StatusBadge({ status, size = 8 }: { status: DemandStatus; size?: number }) {
  const cfg = DEMAND_STATUS[status];
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
        {cfg.shape === "circle" && <circle cx={size/2} cy={size/2} r={size/2-0.5} fill={cfg.color} />}
        {cfg.shape === "square" && <rect x={0.5} y={0.5} width={size-1} height={size-1} fill={cfg.color} />}
        {cfg.shape === "diamond" && <polygon points={`${size/2},0.5 ${size-0.5},${size/2} ${size/2},${size-0.5} 0.5,${size/2}`} fill={cfg.color} />}
      </svg>
      <span className="text-[9px] tracking-[0.14em] uppercase" style={{ fontFamily: "Space Mono, monospace", color: cfg.color }}>
        {cfg.label}
      </span>
    </div>
  );
}
