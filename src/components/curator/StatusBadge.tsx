import type * as React from "react";
import { MOSS, NAVY, OCHRE, SLATE, TERRACOTTA } from "@/styles/tokens";
import type { DemandStatus } from "@/types";

export const DEMAND_STATUS: Record<DemandStatus, { label: string; color: string; shape: "circle" | "square" | "diamond" }> = {
  nova:       { label: "Nova",         color: SLATE,      shape: "diamond" },
  em_analise: { label: "Em Análise",   color: OCHRE,      shape: "circle"  },
  aprovada:   { label: "Aprovada",     color: MOSS,       shape: "square"  },
  rejeitada:  { label: "Rejeitada",    color: TERRACOTTA, shape: "diamond" },
  matched:    { label: "Matched",      color: NAVY,       shape: "square"  },
};

export const KANBAN_COLS: DemandStatus[] = ["nova", "em_analise", "aprovada", "rejeitada", "matched"];

/** Pílula de status do guia: fundo tingido a 10%; "Matched" é sólida. */
export function StatusBadge({ status }: { status: DemandStatus; size?: number }) {
  const cfg = DEMAND_STATUS[status];
  return (
    <span
      className={status === "matched" ? "vt-status vt-status-solid" : "vt-status"}
      style={{ "--vt-status": cfg.color } as React.CSSProperties}
    >
      {cfg.label}
    </span>
  );
}
