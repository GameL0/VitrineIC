import { StatusPill } from "./StatusPill";
import { MOSS, OCHRE, TERRACOTTA } from "@/styles/tokens";
import type { InterestStatus } from "@/types";

/** Quem está olhando: muda o rótulo ("Aguardando sua resposta" x "Aguardando estudante"). */
export type InterestViewer = "estudante" | "solicitante" | "curadoria";

function label(status: InterestStatus, viewer: InterestViewer) {
  switch (status) {
    case "aguardando_estudante":
      return viewer === "estudante" ? "Aguardando sua resposta" : "Aguardando estudante";
    case "aguardando_solicitante":
      return viewer === "solicitante" ? "Aguardando sua resposta" : "Aguardando solicitante";
    case "contato_liberado":
      return "Contato liberado";
    case "recusado_estudante":
      return viewer === "estudante" ? "Você recusou" : "Recusado pelo estudante";
    case "recusado_solicitante":
      return viewer === "solicitante" ? "Você recusou" : "Recusado pelo solicitante";
  }
}

const COLOR: Record<InterestStatus, string> = {
  aguardando_estudante: OCHRE,
  aguardando_solicitante: OCHRE,
  contato_liberado: MOSS,
  recusado_estudante: TERRACOTTA,
  recusado_solicitante: TERRACOTTA,
};

/** Pílula do andamento de um interesse, com o rótulo do ponto de vista de quem vê. */
export function InterestStatusPill({ status, viewer }: { status: InterestStatus; viewer: InterestViewer }) {
  return <StatusPill color={COLOR[status]}>{label(status, viewer)}</StatusPill>;
}
