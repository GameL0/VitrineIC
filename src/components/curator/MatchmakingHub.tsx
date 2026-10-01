import { useState } from "react";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import type { Demand } from "@/types";

export function MatchmakingHub({ demands, onSelect }: { demands: Demand[], onSelect: (d: Demand) => void }) {
  const approvedDemands = demands.filter(d => d.status === "aprovada");

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto h-full overflow-y-auto">
      <div className="mb-10">
        <p
          className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
        >
          <span className="inline-block w-4 rounded-full" style={{ height: "2px", background: RED }} />
          Curadoria Ativa
        </p>
        <h1
          className="text-4xl mb-3"
          style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
        >
          Análise de Matches
        </h1>
        <p
          className="text-[14px] max-w-2xl"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.55, fontWeight: 300 }}
        >
          Selecione uma demanda aprovada para analisar os perfis dos estudantes,
          recomendar candidatos para a empresa e gerenciar oportunidades.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedDemands.map((d) => (
          <button
            key={d.id}
            onClick={() => onSelect(d)}
            className="flex flex-col text-left p-6 transition-all hover:-translate-y-1"
            style={{ background: OFFWHITE, border: `1px solid ${NAVY}20`, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}
          >
            <div className="flex items-center justify-between mb-4 w-full">
               <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}>
                 {d.id}
               </span>
               <span className="px-2 py-0.5 text-[9px] tracking-[0.14em] uppercase font-bold" style={{ border: `1px solid ${RED}`, background: `${RED}08`, borderRadius: "6px", color: RED, fontFamily: "Space Mono, monospace" }}>
                 {d.priority === 'alta' ? 'Alta Prioridade' : 'Normal'}
               </span>
            </div>
            
            <h3 className="text-xl leading-tight mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
              {d.title}
            </h3>
            
            <p className="text-[12px] line-clamp-3 mb-6 flex-1" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.65 }}>
              {d.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-auto">
              {d.skills.slice(0, 3).map((skill: string) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-[9px] tracking-[0.1em] uppercase"
                  style={{ fontFamily: "Space Mono, monospace", color: NAVY, border: `1px solid ${NAVY}20`, borderRadius: "6px" }}
                >
                  {skill}
                </span>
              ))}
              {d.skills.length > 3 && (
                <span className="px-2 py-0.5 text-[9px] tracking-[0.1em] uppercase" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}>
                  +{d.skills.length - 3}
                </span>
              )}
            </div>
          </button>
        ))}

        {approvedDemands.length === 0 && (
          <div className="col-span-full p-12 text-center" style={{ border: `1px dashed ${NAVY}30`, borderRadius: "16px" }}>
             <p className="text-[14px]" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5 }}>
               Não há nenhuma demanda aprovada no momento. Aprove demandas na tela de Análise de Projetos.
             </p>
          </div>
        )}
      </div>
    </div>
  );
}
