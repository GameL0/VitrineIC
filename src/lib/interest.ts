/**
 * Regras do fluxo de match: três portas, aceite duplo.
 *
 * Candidatura → aguardando solicitante → contato liberado.
 * Convite     → aguardando estudante   → contato liberado.
 * Sugestão    → aguardando estudante   → aguardando solicitante → contato liberado.
 * Qualquer recusa encerra o interesse. Ver `fluxo/fluxo-match.md`.
 */

import type { InterestOrigin, InterestSide, InterestStatus } from "@/types";

export const ORIGIN_LABEL: Record<InterestOrigin, string> = {
  candidatura: "Candidatura",
  convite: "Convite",
  sugestao: "Sugestão da curadoria",
};

/** Status com que cada porta nasce. */
export function initialStatus(origin: InterestOrigin): InterestStatus {
  return origin === "candidatura" ? "aguardando_solicitante" : "aguardando_estudante";
}

/** De quem é a vez de responder, ou `null` se o interesse já terminou. */
export function turnOf(status: InterestStatus): InterestSide | null {
  if (status === "aguardando_estudante") return "estudante";
  if (status === "aguardando_solicitante") return "solicitante";
  return null;
}

/**
 * Próximo status depois da resposta de um lado. Devolve o status atual se não
 * for a vez desse lado. Na sugestão o estudante responde primeiro, para o
 * solicitante só ver quem demonstrou interesse.
 */
export function nextStatus(
  status: InterestStatus,
  origin: InterestOrigin,
  side: InterestSide,
  accept: boolean,
): InterestStatus {
  if (turnOf(status) !== side) return status;
  if (!accept) return side === "estudante" ? "recusado_estudante" : "recusado_solicitante";
  if (side === "estudante" && origin === "sugestao") return "aguardando_solicitante";
  return "contato_liberado";
}

export function isRefused(status: InterestStatus) {
  return status === "recusado_estudante" || status === "recusado_solicitante";
}

/**
 * O solicitante só vê a sugestão depois que o estudante aceitou: uma sugestão
 * ainda sem resposta, ou recusada pelo estudante, não chega até ele.
 */
export function visibleToRequester(interest: { origin: InterestOrigin; status: InterestStatus }) {
  return !(
    interest.origin === "sugestao" &&
    (interest.status === "aguardando_estudante" || interest.status === "recusado_estudante")
  );
}
