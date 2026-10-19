import { ArrowIcon, CheckIcon } from "@/components/app/Icons";
import { Eyebrow } from "@/components/public/Eyebrow";
import { PAGE } from "@/components/public/layout";

export const PIPELINE_STEPS = [
  { n: "01", label: "Análise",     desc: "Equipe de curadoria revisa a demanda e valida escopo técnico." },
  { n: "02", label: "Publicação",  desc: "A demanda aprovada aparece para os estudantes." },
  { n: "03", label: "Interesses",  desc: "Candidaturas dos estudantes e sugestões da curadoria chegam a você." },
  { n: "04", label: "Contato",     desc: "Liberado quando você e o estudante aceitam." },
];

export function SuccessScreen({ protocol, onDashboard }: { protocol: string; onDashboard: () => void }) {
  return (
    <main className={`${PAGE} flex flex-col items-center py-14 text-center md:py-20`}>
      <span className="grid size-14 place-items-center rounded-2xl bg-moss/10 text-moss">
        <CheckIcon />
      </span>
      <div className="mt-8">
        <Eyebrow>Demanda enviada</Eyebrow>
      </div>
      <h1 className="mt-5 font-display text-[40px] font-medium leading-none tracking-[-0.035em] text-navy md:text-page">
        Recebemos sua demanda.
      </h1>
      <p className="mt-5 max-w-[520px] font-sans text-lead font-light text-navy/65">
        A curadoria analisa em até 5 dias úteis. Depois de aprovada, a demanda recebe candidaturas e sugestões.
      </p>

      <div className="vt-card mt-10 px-10 py-7 md:px-14">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-navy/55">Protocolo</p>
        <p className="mt-3 font-display text-[28px] font-medium tracking-[-0.02em] text-navy md:text-[32px]">{protocol}</p>
      </div>

      <button onClick={onDashboard} className="vt-btn vt-btn-primary mt-8">
        Acompanhar demandas <ArrowIcon />
      </button>

      <ol className="mt-16 grid w-full max-w-[880px] gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
        {PIPELINE_STEPS.map((s, i) => (
          <li key={s.n} className={`border-t-2 pt-4 ${i === 0 ? "border-navy" : "border-navy/13"}`}>
            <p className={`font-display text-[15px] font-medium ${i === 0 ? "text-red" : "text-navy/40"}`}>{s.n}</p>
            <p className={`mt-1 font-sans text-[13px] ${i === 0 ? "text-navy" : "text-navy/55"}`}>{s.label}</p>
            <p className="mt-2 font-sans text-xs leading-[1.5] text-navy/50">{s.desc}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
