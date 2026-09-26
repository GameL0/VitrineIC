import { useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { Label } from "./ui";
import { DEMANDS } from "@/data/requester-demands";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

export function Dashboard({ onNew, onViewMatch }: { onNew: () => void; onViewMatch: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  const activeCount = DEMANDS.filter((d) => d.status !== "concluido" && d.status !== "cancelado").length;

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p
            className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
          >
            <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
            Painel do Solicitante
          </p>
          <h1
            className="text-4xl"
            style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
          >
            Suas Demandas
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6 mr-2">
            {[
              { val: DEMANDS.length, label: "Total" },
              { val: activeCount, label: "Ativas" },
              { val: DEMANDS.filter((d) => d.status === "concluido").length, label: "Concluídas" },
            ].map((s) => (
              <div key={s.label} className="text-right">
                <p
                  className="text-2xl leading-none"
                  style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
                >
                  {s.val}
                </p>
                <p
                  className="text-[9px] mt-1"
                  style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={onNew}
            className="flex items-center gap-3 px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-85"
            style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
          >
            + Nova Demanda
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ border: `1px solid ${NAVY}18` }}>
        {/* Header row */}
        <div
          className="hidden md:grid px-6 py-3"
          style={{
            gridTemplateColumns: "180px 1fr 120px 120px 160px 80px",
            borderBottom: `1px solid ${NAVY}18`,
            background: `${NAVY}05`,
          }}
        >
          {["ID da Demanda", "Título", "Área", "Prazo", "Status", "Match"].map((h) => (
            <span
              key={h}
              className="text-[9px] tracking-[0.18em] uppercase"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
            >
              {h}
            </span>
          ))}
        </div>

        {DEMANDS.map((d, i) => (
          <div
            key={d.id}
            className="cursor-pointer transition-all"
            style={{
              borderBottom: i < DEMANDS.length - 1 ? `1px solid ${NAVY}10` : "none",
              background: selected === d.id ? `${NAVY}06` : "transparent",
            }}
            onClick={() => setSelected(selected === d.id ? null : d.id)}
            onMouseEnter={(e) => {
              if (selected !== d.id) (e.currentTarget as HTMLElement).style.background = `${NAVY}04`;
            }}
            onMouseLeave={(e) => {
              if (selected !== d.id) (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {/* Main row */}
            <div
              className="px-6 py-4 md:grid md:items-center gap-4"
              style={{ gridTemplateColumns: "180px 1fr 120px 120px 160px 80px" }}
            >
              <span
                className="block text-[11px] mb-1 md:mb-0"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
              >
                {d.id}
              </span>
              <span
                className="block text-[14px] font-medium mb-1 md:mb-0"
                style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
              >
                {d.title}
              </span>
              <span
                className="hidden md:block text-[10px]"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
              >
                {d.area}
              </span>
              <span
                className="hidden md:block text-[10px]"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
              >
                {d.deadline}
              </span>
              <div className="hidden md:block">
                <StatusBadge status={d.status} />
              </div>
              <div className="hidden md:flex items-center">
                {d.status === "em_andamento" || d.status === "buscando" ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); onViewMatch(); }}
                    className="text-[9px] tracking-[0.14em] uppercase flex items-center gap-1.5 transition-opacity hover:opacity-80"
                    style={{
                      fontFamily: "Space Mono, monospace",
                      color: RED,
                      borderBottom: `1px solid ${RED}`,
                    }}
                  >
                    {d.applicants > 0 ? `Ver (${d.applicants})` : "—"}
                  </button>
                ) : (
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.25 }}
                  >
                    {d.applicants > 0 ? `${d.applicants} concl.` : "—"}
                  </span>
                )}
              </div>
            </div>

            {/* Expanded detail */}
            {selected === d.id && (
              <div
                className="px-6 pb-5 grid md:grid-cols-4 gap-4"
                style={{ borderTop: `1px solid ${NAVY}10` }}
              >
                <div className="md:col-span-1">
                  <Label>Registrado em</Label>
                  <p className="text-[12px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.6 }}>{d.date}</p>
                </div>
                <div className="md:col-span-1">
                  <Label>Prazo final</Label>
                  <p className="text-[12px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.6 }}>{d.deadline}</p>
                </div>
                <div className="md:col-span-1">
                  <Label>Candidatos</Label>
                  <p className="text-[12px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.6 }}>{d.applicants}</p>
                </div>
                <div className="md:col-span-1 flex items-end">
                  <button
                    className="text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-75"
                    style={{
                      fontFamily: "Space Mono, monospace",
                      color: NAVY,
                      borderBottom: `1px solid ${NAVY}40`,
                      opacity: 0.45,
                    }}
                  >
                    Editar demanda
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
