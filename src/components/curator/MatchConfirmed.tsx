import { Label, Mono, SkillTag } from "./ui";
import { STUDENTS } from "@/data/students";
import { scoreStudent } from "@/lib/match";
import { NAVY, INK, OFFWHITE, RED } from "@/styles/tokens";
import type { Demand } from "@/types";

export function MatchConfirmed({
  demand,
  student,
  onBack,
}: {
  demand: Demand;
  student: typeof STUDENTS[0];
  onBack: () => void;
}) {
  const score = scoreStudent(student, demand);
  const protocol = `MCH-${Date.now().toString().slice(-6)}`;

  return (
    <div className="px-8 md:px-16 py-16 max-w-screen-lg mx-auto">
      <div className="mb-12">
        <p className="text-[9px] tracking-[0.25em] uppercase mb-5 flex items-center gap-3"
          style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: RED, opacity: 0.85 }}>
          <span className="inline-block w-6" style={{ height: "1px", background: RED }} />
          Recomendação Registrada
        </p>
        <h1 className="text-7xl md:text-8xl leading-none tracking-tight mb-6"
          style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>
          Recomendação<br />
          <em className="not-italic" style={{ color: RED }}>enviada.</em>
        </h1>
        <div className="inline-flex items-center gap-4 px-5 py-3" style={{ border: `1px solid ${NAVY}22`, background: `${NAVY}04` }}>
          <span className="text-[9px] tracking-[0.18em] uppercase" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
            Protocolo
          </span>
          <span className="text-xl font-bold" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY }}>
            {protocol}
          </span>
        </div>
      </div>

      {/* Matched pair */}
      <div className="grid md:grid-cols-2 gap-0 mb-10" style={{ border: `1px solid ${NAVY}18` }}>
        <div className="px-8 py-7" style={{ borderRight: `1px solid ${NAVY}15` }}>
          <Label>Demanda</Label>
          <h3 className="text-xl mb-1" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>
            {demand.title}
          </h3>
          <Mono dim>{demand.id} · {demand.company}</Mono>
          <div className="flex flex-wrap gap-1 mt-4">
            {demand.skills.map((s) => <SkillTag key={s} small>{s}</SkillTag>)}
          </div>
        </div>
        <div className="px-8 py-7">
          <Label>Estudante alocado</Label>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 flex items-center justify-center" style={{ background: INK }}>
              <span className="text-sm" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: OFFWHITE }}>
                {student.initials}
              </span>
            </div>
            <div>
              <h3 className="text-xl" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>
                {student.name}
              </h3>
              <Mono dim>{student.course} · {student.semester}</Mono>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: RED }}>
              {score}%
            </span>
            <span className="text-[9px]" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
              compatibilidade técnica
            </span>
          </div>
        </div>
      </div>

      {/* Next steps checklist */}
      <div className="mb-10">
        <Label>Próximas ações automáticas</Label>
        {[
          { done: true,  text: "E-mail enviado ao solicitante com dados do estudante" },
          { done: true,  text: "E-mail enviado ao estudante com dados de contato do solicitante" },
          { done: false, text: "Aguardando aceite do estudante (prazo: 48h)" },
          { done: false, text: "Formalização do projeto após aceite" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 py-3" style={{ borderBottom: `1px solid ${NAVY}08` }}>
            <div
              className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ border: `1px solid ${item.done ? NAVY : `${NAVY}25`}`, background: item.done ? NAVY : "transparent" }}
            >
              {item.done && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4l2 2 3-3.5" stroke={OFFWHITE} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[12px]" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: item.done ? 0.6 : 0.35, fontWeight: 300 }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-3 px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-85"
          style={{ background: NAVY, color: OFFWHITE, fontFamily: "Geist, Inter, system-ui, sans-serif" }}
        >
          Voltar à Fila
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className="px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-70"
          style={{ border: `1px solid ${NAVY}35`, color: NAVY, fontFamily: "Geist, Inter, system-ui, sans-serif" }}
        >
          Exportar relatório
        </button>
      </div>
    </div>
  );
}
