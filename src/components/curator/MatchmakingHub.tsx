import { ClockIcon } from "@/components/app/Icons";
import { StatusPill } from "@/components/app/StatusPill";
import { PageHead } from "@/components/public/PageHead";
import { PAGE } from "@/components/public/layout";
import { useVitrine } from "@/lib/store";
import { TERRACOTTA } from "@/styles/tokens";
import type { Demand } from "@/types";

export function MatchmakingHub({ demands, onSelect }: { demands: Demand[], onSelect: (d: Demand) => void }) {
  const { interests } = useVitrine();
  const approvedDemands = demands.filter(d => d.status === "aprovada");
  const countFor = (id: string) => interests.filter((i) => i.demandId === id).length;

  return (
    <main className={`${PAGE} pb-20`}>
      <PageHead
        eyebrow="Curadoria ativa"
        title="Análise de matches."
        lead="Escolha uma demanda aprovada para comparar os estudantes e sugerir quem combina, com justificativa."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {approvedDemands.map((d) => (
          <button
            key={d.id}
            onClick={() => onSelect(d)}
            className="vt-card vt-card-interactive flex flex-col gap-4 p-6 text-left"
          >
            <div className="flex w-full items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-navy/45">{d.id}</span>
              {d.priority === "alta" && <StatusPill color={TERRACOTTA}>Alta</StatusPill>}
            </div>
            <div>
              <h3 className="font-display text-xl font-medium leading-[1.25] tracking-[-0.015em] text-navy">{d.title}</h3>
              <p className="mt-1 font-sans text-[13px] text-navy/55">{d.company}</p>
            </div>
            <p className="line-clamp-3 font-sans text-[13px] leading-[1.55] text-navy/65">{d.description}</p>
            <div className="mt-auto flex flex-wrap gap-1.5">
              {d.skills.slice(0, 3).map((skill: string) => (
                <span key={skill} className="vt-pill">
                  {skill}
                </span>
              ))}
              {d.skills.length > 3 && (
                <span className="self-center font-mono text-[10px] text-navy/45">+{d.skills.length - 3}</span>
              )}
            </div>
            <p className="flex w-full items-center gap-1.5 border-t border-navy/8 pt-4 font-sans text-[12px] text-navy/55">
              <ClockIcon />
              {d.scope}
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.08em]">{countFor(d.id)} interesses</span>
            </p>
          </button>
        ))}

        {approvedDemands.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-navy/20 p-12 text-center font-sans text-sm text-navy/55">
            Não há nenhuma demanda aprovada no momento. Aprove demandas na tela de Análise de projetos.
          </div>
        )}
      </div>
    </main>
  );
}
