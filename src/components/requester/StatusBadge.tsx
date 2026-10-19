import type * as React from "react";
import { MOSS, NAVY, OCHRE, RED, TERRACOTTA } from "@/styles/tokens";
import type { DemandStatus } from "@/types";

/** Rótulos do solicitante para o vocabulário único de status da demanda. */
export const STATUS_MAP: Record<DemandStatus, { label: string; color: string }> = {
  nova:             { label: "Em Análise",           color: OCHRE },
  em_analise:       { label: "Em Análise",           color: OCHRE },
  aprovada:         { label: "Recebendo interesses", color: RED },
  rejeitada:        { label: "Rejeitada",            color: TERRACOTTA },
  contato_liberado: { label: "Contato liberado",     color: MOSS },
};

/** Pílula de status do guia: fundo tingido a 10%. */
export function StatusBadge({ status }: { status: DemandStatus }) {
  const cfg = STATUS_MAP[status];
  return (
    <span className="vt-status" style={{ "--vt-status": cfg.color ?? NAVY } as React.CSSProperties}>
      {cfg.label}
    </span>
  );
}
