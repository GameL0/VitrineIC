import { useState } from "react";
import { Rule, Tag } from "./ui";
import { DEMANDS } from "@/data/demands";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import type { Invitation } from "@/types";

const MONO = "Space Mono, monospace";
const SANS = "Inter, sans-serif";
const SERIF = "DM Serif Display, Georgia, serif";

/** Barras de compatibilidade, no mesmo vocabulário visual do matchmaking. */
function ScoreBars({ score }: { score: number }) {
  const filled = Math.round((score / 100) * 6);
  return (
    <span className="inline-flex items-end gap-[2px]" style={{ height: "14px" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          style={{
            width: "3px",
            height: `${5 + i * 1.8}px`,
            background: i < filled ? RED : `${NAVY}20`,
          }}
        />
      ))}
    </span>
  );
}

function InvitationCard({
  invitation,
  onAccept,
  onDecline,
}: {
  invitation: Invitation;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const [open, setOpen] = useState(false);
  const demand = DEMANDS.find((d) => d.id === invitation.demandId);
  if (!demand) return null;

  const pending = invitation.status === "pendente";

  return (
    <div style={{ borderTop: `1px solid ${NAVY}18` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-1 py-6 transition-colors"
        onMouseEnter={(e) => (e.currentTarget.style.background = `${NAVY}04`)}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-[9px] tracking-[0.16em] uppercase px-2 py-1"
                style={{
                  fontFamily: MONO,
                  color: pending ? RED : NAVY,
                  border: `1px solid ${pending ? RED : `${NAVY}30`}`,
                  opacity: pending ? 1 : 0.5,
                }}
              >
                {invitation.status === "pendente"
                  ? "Convite"
                  : invitation.status === "aceito"
                    ? "Aceito"
                    : "Recusado"}
              </span>
              <span
                className="text-[9px] tracking-[0.14em] uppercase"
                style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
              >
                {demand.company} · {invitation.sentAt}
              </span>
            </div>
            <h3
              className="text-xl leading-snug mb-1"
              style={{ fontFamily: SERIF, color: NAVY }}
            >
              {demand.title}
            </h3>
            <p
              className="text-[10px] tracking-[0.14em] uppercase"
              style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
            >
              {demand.id} · {demand.area} · prazo {demand.deadline}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span
              className="text-2xl leading-none"
              style={{ fontFamily: SERIF, color: RED }}
            >
              {invitation.score}%
            </span>
            <ScoreBars score={invitation.score} />
          </div>
        </div>
      </button>

      {open && (
        <div className="px-1 pb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p
                className="text-[9px] tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
              >
                Descrição do problema
              </p>
              <p
                className="text-[13px] leading-relaxed mb-6"
                style={{ fontFamily: SANS, color: NAVY, opacity: 0.7 }}
              >
                {demand.description}
              </p>
              <p
                className="text-[9px] tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
              >
                Requisitos técnicos
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

            <div>
              <p
                className="text-[9px] tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
              >
                Por que você foi indicado
              </p>
              <div
                className="p-4 mb-6"
                style={{ border: `1px solid ${NAVY}18`, background: `${NAVY}04` }}
              >
                <p
                  className="text-[12px] leading-relaxed"
                  style={{ fontFamily: SANS, color: NAVY, opacity: 0.75 }}
                >
                  {invitation.curatorNote}
                </p>
                <p
                  className="text-[9px] tracking-[0.14em] uppercase mt-3"
                  style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
                >
                  — Curadoria do IC
                </p>
              </div>

              {pending ? (
                <>
                  <p
                    className="text-[9px] tracking-[0.16em] uppercase mb-3"
                    style={{ fontFamily: MONO, color: RED, opacity: 0.8 }}
                  >
                    Responda em até {invitation.deadline}
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onAccept}
                      className="px-7 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity"
                      style={{ background: NAVY, color: OFFWHITE, fontFamily: SANS }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      Aceitar convite
                    </button>
                    <button
                      onClick={onDecline}
                      className="px-5 py-3 text-[10px] tracking-[0.18em] uppercase transition-opacity hover:opacity-100 opacity-50"
                      style={{ fontFamily: MONO, color: NAVY, border: `1px solid ${NAVY}30` }}
                    >
                      Recusar
                    </button>
                  </div>
                  <p
                    className="text-[10px] mt-4 leading-relaxed"
                    style={{ fontFamily: SANS, color: NAVY, opacity: 0.5 }}
                  >
                    Ao aceitar, seus dados de contato são enviados ao solicitante e o
                    projeto segue para formalização.
                  </p>
                </>
              ) : (
                <p
                  className="text-[11px] tracking-[0.14em] uppercase"
                  style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
                >
                  {invitation.status === "aceito"
                    ? "Você aceitou este convite."
                    : "Você recusou este convite."}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Invitations({
  invitations,
  onAccept,
  onDecline,
}: {
  invitations: Invitation[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}) {
  const [filter, setFilter] = useState<"todos" | "pendente" | "aceito" | "recusado">("todos");

  const counts = {
    pendente: invitations.filter((i) => i.status === "pendente").length,
    aceito: invitations.filter((i) => i.status === "aceito").length,
    recusado: invitations.filter((i) => i.status === "recusado").length,
  };
  const shown = filter === "todos" ? invitations : invitations.filter((i) => i.status === filter);

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
        <div>
          <p
            className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
          >
            <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
            Caixa de convites
          </p>
          <h1 className="text-4xl" style={{ fontFamily: SERIF, color: NAVY }}>
            Convites Recebidos
          </h1>
        </div>
        <div className="flex items-start gap-8">
          {(["pendente", "aceito", "recusado"] as const).map((k) => (
            <div key={k} className="text-center">
              <p className="text-2xl leading-none" style={{ fontFamily: SERIF, color: k === "pendente" && counts[k] > 0 ? RED : NAVY }}>
                {counts[k]}
              </p>
              <p
                className="text-[9px] tracking-[0.14em] uppercase mt-1.5"
                style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
              >
                {k === "pendente" ? "Pendentes" : k === "aceito" ? "Aceitos" : "Recusados"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {(["todos", "pendente", "aceito", "recusado"] as const).map((k) => (
          <Tag key={k} active={filter === k} accent={k === "pendente"} onClick={() => setFilter(k)}>
            {k}
          </Tag>
        ))}
      </div>

      <Rule />

      {shown.length === 0 ? (
        <p
          className="py-16 text-center text-[11px] tracking-[0.16em] uppercase"
          style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
        >
          Nenhum convite nesta categoria
        </p>
      ) : (
        <div>
          {shown.map((inv) => (
            <InvitationCard
              key={inv.id}
              invitation={inv}
              onAccept={() => onAccept(inv.id)}
              onDecline={() => onDecline(inv.id)}
            />
          ))}
          <div style={{ borderTop: `1px solid ${NAVY}18` }} />
        </div>
      )}
    </div>
  );
}
