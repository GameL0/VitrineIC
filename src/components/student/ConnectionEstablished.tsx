import { DEMANDS } from "@/data/demands";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import type { Invitation } from "@/types";

const MONO = "Geist Mono, ui-monospace, monospace";
const SANS = "Geist, Inter, system-ui, sans-serif";
const SERIF = "Inter Tight, Geist, system-ui, sans-serif";

/** "TechBr Soluções" -> "techbrsolucoes": remove acentos antes de filtrar. */
function slug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

const NEXT_STEPS = [
  { label: "Seus dados de contato enviados ao solicitante", done: true },
  { label: "Dados de contato do solicitante liberados abaixo", done: true },
  { label: "Primeiro contato em até 5 dias úteis", done: false },
  { label: "Formalização do projeto junto à coordenação", done: false },
];

/**
 * Fecha o fluxo de match: é a tela que o estudante vê ao aceitar um convite.
 *
 * Espelha `curator/MatchConfirmed` — a mesma conexão, vista do outro lado.
 */
export function ConnectionEstablished({
  invitation,
  onInvitations,
}: {
  invitation: Invitation;
  onInvitations: () => void;
}) {
  const demand = DEMANDS.find((d) => d.id === invitation.demandId);
  if (!demand) return null;

  return (
    <div className="px-8 md:px-16 py-16 max-w-screen-lg mx-auto">
      <div className="mb-12">
        <p
          className="text-[9px] tracking-[0.25em] uppercase mb-5 flex items-center gap-3"
          style={{ fontFamily: MONO, color: RED, opacity: 0.85 }}
        >
          <span className="inline-block w-6" style={{ height: "1px", background: RED }} />
          Convite aceito
        </p>
        <h1
          className="text-6xl md:text-7xl leading-none tracking-tight mb-6"
          style={{ fontFamily: SERIF, color: NAVY }}
        >
          Conexão<br />
          <em className="not-italic" style={{ color: RED }}>estabelecida.</em>
        </h1>
        <div
          className="inline-flex items-center gap-4 px-5 py-3"
          style={{ border: `1px solid ${NAVY}22`, background: `${NAVY}04` }}
        >
          <span
            className="text-[9px] tracking-[0.18em] uppercase"
            style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
          >
            Protocolo
          </span>
          <span className="text-xl font-bold" style={{ fontFamily: MONO, color: NAVY }}>
            {invitation.id}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-px mb-12" style={{ background: `${NAVY}18` }}>
        <div className="p-6" style={{ background: OFFWHITE }}>
          <p
            className="text-[9px] tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
          >
            Projeto
          </p>
          <h2 className="text-xl leading-snug mb-2" style={{ fontFamily: SERIF, color: NAVY }}>
            {demand.title}
          </h2>
          <p
            className="text-[10px] tracking-[0.14em] uppercase mb-4"
            style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
          >
            {demand.id} · {demand.scope} · prazo {demand.deadline}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {demand.skills.map((s) => (
              <span
                key={s}
                className="text-[9px] tracking-[0.12em] uppercase px-2 py-1"
                style={{ fontFamily: MONO, color: NAVY, border: `1px solid ${NAVY}25`, opacity: 0.7 }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6" style={{ background: OFFWHITE }}>
          <p
            className="text-[9px] tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
          >
            Contato liberado
          </p>
          <h2 className="text-xl leading-snug mb-1" style={{ fontFamily: SERIF, color: NAVY }}>
            {demand.company}
          </h2>
          <p
            className="text-[11px] mb-4"
            style={{ fontFamily: SANS, color: NAVY, opacity: 0.5 }}
          >
            Responsável pela demanda · {demand.area}
          </p>
          <div className="flex flex-col gap-2">
            <span className="text-[11px]" style={{ fontFamily: MONO, color: NAVY, opacity: 0.65 }}>
              contato@{slug(demand.company)}.com.br
            </span>
            <span className="text-[11px]" style={{ fontFamily: MONO, color: NAVY, opacity: 0.65 }}>
              Compatibilidade técnica · {invitation.score}%
            </span>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <p
          className="text-[9px] tracking-[0.2em] uppercase mb-5"
          style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
        >
          Próximos passos
        </p>
        <div className="flex flex-col gap-3">
          {NEXT_STEPS.map((step) => (
            <div key={step.label} className="flex items-center gap-3">
              <span
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: "14px",
                  height: "14px",
                  border: `1px solid ${step.done ? NAVY : `${NAVY}30`}`,
                  background: step.done ? NAVY : "transparent",
                }}
              >
                {step.done && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4l2 2 4-4" stroke={OFFWHITE} strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                )}
              </span>
              <span
                className="text-[12px]"
                style={{ fontFamily: SANS, color: NAVY, opacity: step.done ? 0.75 : 0.4 }}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onInvitations}
        className="px-7 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity"
        style={{ background: NAVY, color: OFFWHITE, fontFamily: SANS }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Voltar aos convites
      </button>
    </div>
  );
}
