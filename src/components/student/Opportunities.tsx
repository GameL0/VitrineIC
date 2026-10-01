import { useState } from "react";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import { OPPORTUNITIES, type Opportunity } from "@/data/opportunities";

export function Opportunities({ profile, onOpenNotifications }: { profile: any; onOpenNotifications: () => void }) {
  const [selected, setSelected] = useState<Opportunity | null>(null);

  if (selected) {
    return (
      <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80 mb-8"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Voltar para Oportunidades
        </button>

        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <h1
              className="text-4xl"
              style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
            >
              {selected.title}
            </h1>
            <div
              className="px-3 py-1 flex items-center gap-1.5"
              style={{ border: `1px solid ${RED}`, background: `${RED}08`, borderRadius: "6px" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: RED }} />
              <span
                className="text-[10px] tracking-[0.14em] uppercase font-bold"
                style={{ fontFamily: "Space Mono, monospace", color: RED }}
              >
                Match {selected.compatibility}%
              </span>
            </div>
            <div
              className="px-3 py-1 flex items-center gap-1.5"
              style={{ border: `1px solid ${NAVY}40`, background: `${NAVY}05`, borderRadius: "6px" }}
            >
              <span
                className="text-[10px] tracking-[0.14em] uppercase font-bold"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
              >
                {selected.origin}
              </span>
            </div>
          </div>
          <p
            className="text-[14px] max-w-2xl leading-relaxed mt-4"
            style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.7 }}
          >
            {selected.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="flex flex-col gap-6">
            <div>
              <span className="block text-[10px] tracking-[0.15em] uppercase mb-1.5 font-semibold" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}>
                Responsável
              </span>
              <p className="text-[15px]" style={{ fontFamily: "Inter, sans-serif", color: NAVY }}>{selected.responsible}</p>
            </div>
            <div>
              <span className="block text-[10px] tracking-[0.15em] uppercase mb-1.5 font-semibold" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}>
                Duração Prevista
              </span>
              <p className="text-[15px]" style={{ fontFamily: "Inter, sans-serif", color: NAVY }}>{selected.duration}</p>
            </div>
            <div>
              <span className="block text-[10px] tracking-[0.15em] uppercase mb-1.5 font-semibold" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}>
                Tipo de Contrato
              </span>
              <p className="text-[15px]" style={{ fontFamily: "Inter, sans-serif", color: NAVY }}>{selected.contractType}</p>
            </div>
          </div>

          <div>
            <span className="block text-[10px] tracking-[0.15em] uppercase mb-3 font-semibold" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}>
              Competências Desejadas
            </span>
            <div className="flex flex-wrap gap-2">
              {selected.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 text-[11px] tracking-[0.1em] uppercase"
                  style={{
                    fontFamily: "Space Mono, monospace",
                    color: NAVY,
                    border: `1px solid ${NAVY}30`,
                    background: `${NAVY}05`,
                    borderRadius: "6px",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-12">
              <button
                className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 text-[11px] tracking-[0.18em] uppercase font-semibold transition-all hover:opacity-90"
                style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif", borderRadius: "10px" }}
              >
                Tenho Interesse
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="mb-10">
        <p
          className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
        >
          <span className="inline-block w-4 rounded-full" style={{ height: "2px", background: RED }} />
          Oportunidades
        </p>
        <h1
          className="text-4xl mb-3"
          style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
        >
          Projetos com Vagas Abertas
        </h1>
        <p
          className="text-[14px] max-w-2xl"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.55, fontWeight: 300 }}
        >
          Explore projetos que estão buscando estudantes. O nível de compatibilidade
          indica o quão próximo o seu perfil está das exigências da vaga.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {OPPORTUNITIES.sort((a, b) => b.compatibility - a.compatibility).map((opp) => (
          <div
            key={opp.id}
            className="flex flex-col p-6 transition-all hover:-translate-y-1 cursor-pointer"
            onClick={() => setSelected(opp)}
            style={{ background: OFFWHITE, border: `1px solid ${NAVY}20`, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}
          >
            <div className="flex items-start justify-between mb-4 gap-4">
              <div>
                <h3 className="text-xl font-medium leading-tight mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
                  {opp.title}
                </h3>
                <span className="px-2 py-1 text-[8px] uppercase tracking-widest font-bold" style={{ background: `${NAVY}10`, color: NAVY, borderRadius: "4px", fontFamily: "Space Mono, monospace" }}>
                  {opp.origin}
                </span>
              </div>
              <div
                className="px-2.5 py-1 flex items-center gap-1.5 flex-shrink-0"
                style={{ border: `1px solid ${RED}`, background: `${RED}08`, borderRadius: "6px" }}
              >
                <span
                  className="text-[9px] tracking-[0.14em] uppercase font-bold"
                  style={{ fontFamily: "Space Mono, monospace", color: RED }}
                >
                  {opp.compatibility}% Match
                </span>
              </div>
            </div>
            
            <p
              className="text-[13px] leading-relaxed mb-6 flex-1"
              style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.65 }}
            >
              {opp.description}
            </p>

            <button
              onClick={() => setSelected(opp)}
              className="mt-auto self-start flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.16em] uppercase font-semibold transition-colors"
              style={{ background: "transparent", border: `1px solid ${NAVY}40`, color: NAVY, borderRadius: "8px" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${NAVY}08`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              Saiba Mais
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
