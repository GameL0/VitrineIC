import type * as React from "react";
import { NAVY, OCHRE, RED } from "@/styles/tokens";
import type { StatusKey } from "@/types";

export const STATUS_MAP: Record<StatusKey, { label: string; color: string; shape: "circle" | "square" | "diamond" }> = {
  analise:      { label: "Em Análise",       color: OCHRE,        shape: "diamond" },
  buscando:     { label: "Buscando Alunos",  color: RED,          shape: "circle"  },
  em_andamento: { label: "Em Andamento",     color: RED,          shape: "square"  },
  concluido:    { label: "Concluído",        color: NAVY,         shape: "square"  },
  cancelado:    { label: "Cancelado",        color: `${NAVY}80`,  shape: "diamond" },
};

/** Pílula de status do guia: fundo tingido a 10%; "Concluído" é sólida. */
export function StatusBadge({ status }: { status: StatusKey }) {
  const cfg = STATUS_MAP[status];
  return (
    <span
      className={status === "concluido" ? "vt-status vt-status-solid" : "vt-status"}
      style={{ "--vt-status": cfg.color } as React.CSSProperties}
    >
      {cfg.label}
    </span>
  );
}
