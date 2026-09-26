import { NAVY, RED } from "@/styles/tokens";
import type { StatusKey } from "@/types";

export const STATUS_MAP: Record<StatusKey, { label: string; color: string; shape: "circle" | "square" | "diamond" }> = {
  analise:      { label: "Em Análise",       color: `${NAVY}88`,  shape: "diamond" },
  buscando:     { label: "Buscando Alunos",  color: RED,          shape: "circle"  },
  em_andamento: { label: "Em Andamento",     color: RED,          shape: "square"  },
  concluido:    { label: "Concluído",        color: NAVY,         shape: "square"  },
  cancelado:    { label: "Cancelado",        color: `${NAVY}44`,  shape: "diamond" },
};

export function StatusBadge({ status }: { status: StatusKey }) {
  const cfg = STATUS_MAP[status];
  const s = 8;
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ flexShrink: 0 }}>
        {cfg.shape === "circle" && (
          <circle cx={s / 2} cy={s / 2} r={s / 2 - 0.5} fill={cfg.color} />
        )}
        {cfg.shape === "square" && (
          <rect x={0.5} y={0.5} width={s - 1} height={s - 1} fill={cfg.color} />
        )}
        {cfg.shape === "diamond" && (
          <polygon
            points={`${s / 2},0.5 ${s - 0.5},${s / 2} ${s / 2},${s - 0.5} 0.5,${s / 2}`}
            fill={cfg.color}
          />
        )}
      </svg>
      <span
        className="text-[9px] tracking-[0.14em] uppercase"
        style={{
          fontFamily: "Space Mono, monospace",
          color: cfg.shape === "square" || cfg.shape === "circle" ? cfg.color : NAVY,
          opacity: cfg.shape === "diamond" && status === "cancelado" ? 0.45 : 1,
        }}
      >
        {cfg.label}
      </span>
    </div>
  );
}
