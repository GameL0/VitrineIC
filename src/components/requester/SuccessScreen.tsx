import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

export const PIPELINE_STEPS = [
  { n: "01", label: "Análise",   desc: "Equipe de curadoria revisa a demanda e valida escopo técnico." },
  { n: "02", label: "Curadoria", desc: "Perfis de estudantes elegíveis são filtrados e ranqueados." },
  { n: "03", label: "Match",     desc: "Candidatos apresentados ao solicitante para confirmação." },
  { n: "04", label: "Início",    desc: "Projeto formalizado e equipe notificada para começar." },
];

export function SuccessScreen({ protocol, onDashboard }: { protocol: string; onDashboard: () => void }) {
  return (
    <div className="px-8 md:px-16 py-16 max-w-screen-lg mx-auto">
      <div className="mb-16">
        <p
          className="text-[9px] tracking-[0.25em] uppercase mb-6 flex items-center gap-3"
          style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: RED, opacity: 0.8 }}
        >
          <span className="inline-block w-6" style={{ height: "1px", background: RED }} />
          Demanda enviada
        </p>
        <h1
          className="text-7xl md:text-9xl leading-none tracking-tight mb-8"
          style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}
        >
          Sucesso.
        </h1>
        <div
          className="inline-flex items-center gap-4 px-6 py-4"
          style={{ border: `1px solid ${NAVY}25`, background: `${NAVY}04` }}
        >
          <span
            className="text-[9px] tracking-[0.18em] uppercase"
            style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}
          >
            Protocolo
          </span>
          <span
            className="text-2xl font-bold tracking-wider"
            style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY }}
          >
            {protocol}
          </span>
        </div>
        <p
          className="text-[13px] mt-6 max-w-lg leading-relaxed"
          style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}
        >
          Sua demanda foi registrada e está em fila de análise. Você receberá atualizações
          por e-mail conforme o processo avança.
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <p
          className="text-[9px] tracking-[0.22em] uppercase mb-8"
          style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}
        >
          Próximas etapas
        </p>

        {/* Horizontal timeline */}
        <div className="relative hidden md:block">
          {/* Connecting line */}
          <div
            className="absolute top-[20px] left-0 right-0"
            style={{ height: "1px", background: `${NAVY}18` }}
          />
          <div className="grid grid-cols-4 gap-0 relative">
            {PIPELINE_STEPS.map((s, i) => (
              <div key={i} className="flex flex-col items-start pr-6">
                <div className="flex items-center gap-3 mb-5 relative">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 relative z-10"
                    style={{
                      background: i === 0 ? RED : OFFWHITE,
                      border: `1px solid ${i === 0 ? RED : `${NAVY}30`}`,
                    }}
                  >
                    <span
                      className="text-[11px] font-bold"
                      style={{
                        fontFamily: "Geist Mono, ui-monospace, monospace",
                        color: i === 0 ? OFFWHITE : NAVY,
                        opacity: i === 0 ? 1 : 0.4,
                      }}
                    >
                      {s.n}
                    </span>
                  </div>
                </div>
                <h3
                  className="text-[15px] mb-2"
                  style={{
                    fontFamily: "Inter Tight, Geist, system-ui, sans-serif",
                    color: i === 0 ? NAVY : `${NAVY}88`,
                  }}
                >
                  {s.label}
                </h3>
                <p
                  className="text-[11px] leading-relaxed"
                  style={{
                    fontFamily: "Geist, Inter, system-ui, sans-serif",
                    color: NAVY,
                    opacity: i === 0 ? 0.55 : 0.3,
                    fontWeight: 300,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden flex flex-col gap-0">
          {PIPELINE_STEPS.map((s, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: i === 0 ? RED : OFFWHITE,
                    border: `1px solid ${i === 0 ? RED : `${NAVY}25`}`,
                  }}
                >
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: i === 0 ? OFFWHITE : NAVY, opacity: i === 0 ? 1 : 0.4 }}
                  >
                    {s.n}
                  </span>
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="flex-1 w-px my-1" style={{ background: `${NAVY}15` }} />
                )}
              </div>
              <div className="pb-6">
                <h3 className="text-[15px] mb-1" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: i === 0 ? NAVY : `${NAVY}88` }}>
                  {s.label}
                </h3>
                <p className="text-[11px] leading-relaxed" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: i === 0 ? 0.5 : 0.28, fontWeight: 300 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={onDashboard}
          className="flex items-center gap-3 px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-85"
          style={{ background: NAVY, color: OFFWHITE, fontFamily: "Geist, Inter, system-ui, sans-serif" }}
        >
          Ver Demandas
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className="px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-70"
          style={{ border: `1px solid ${NAVY}40`, color: NAVY, fontFamily: "Geist, Inter, system-ui, sans-serif" }}
        >
          Nova Demanda
        </button>
      </div>
    </div>
  );
}
