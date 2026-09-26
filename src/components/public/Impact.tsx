import { ALL_PROJECTS, STUDENTS } from "@/data/students";
import { DEMANDS } from "@/data/demands";
import { INVITATIONS } from "@/data/invitations";
import { IMPACT_PERIOD, TARGETS, TESTIMONIALS } from "@/data/impact";
import { NAVY, NAVY_MUTED, OFFWHITE, RED } from "@/styles/tokens";

const MONO = "Space Mono, monospace";
const SANS = "Inter, sans-serif";
const SERIF = "DM Serif Display, Georgia, serif";

/**
 * Painel de indicadores da atividade de extensão (ACE1).
 *
 * Todos os números são DERIVADOS das bases em tempo de render — nenhum valor
 * é digitado aqui. Assim o painel não pode divergir do que a plataforma mostra
 * nas outras telas.
 */
export function Impact({ onOpenProjects }: { onOpenProjects: () => void }) {
  const students = STUDENTS.length;
  const projects = ALL_PROJECTS.length;
  const demands = DEMANDS.length;
  const triaged = DEMANDS.filter((d) => d.status !== "nova").length;
  const approved = DEMANDS.filter((d) => d.status === "aprovada" || d.status === "matched").length;
  const matched = DEMANDS.filter((d) => d.status === "matched").length;
  const accepted = INVITATIONS.filter((i) => i.status === "aceito").length;

  const headline = [
    { value: students, target: TARGETS.students, label: "Estudantes cadastrados" },
    { value: projects, target: TARGETS.projects, label: "Projetos na vitrine" },
    { value: demands, target: TARGETS.demands, label: "Demandas recebidas" },
    { value: matched, target: TARGETS.matches, label: "Matches confirmados" },
  ];

  const funnel = [
    { label: "Demandas recebidas", value: demands },
    { label: "Passaram pela triagem", value: triaged },
    { label: "Aprovadas pela curadoria", value: approved },
    { label: "Match confirmado", value: matched },
    { label: "Aceitos pelo estudante", value: accepted },
  ];

  const byArea = Object.entries(
    ALL_PROJECTS.reduce<Record<string, number>>((acc, p) => {
      acc[p.area] = (acc[p.area] || 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const maxArea = Math.max(...byArea.map(([, n]) => n), 1);

  return (
    <div className="px-8 md:px-16 py-14 max-w-screen-xl mx-auto">
      <div className="mb-12">
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-3 flex items-center gap-3"
          style={{ fontFamily: MONO, color: NAVY_MUTED }}
        >
          <span className="inline-block w-8" style={{ height: "1px", background: RED }} />
          Atividade Curricular de Extensão · ACE 1
        </p>
        <h1
          className="text-5xl md:text-6xl leading-none mb-5"
          style={{ fontFamily: SERIF, color: NAVY, letterSpacing: "-0.01em" }}
        >
          Indicadores de <em className="not-italic" style={{ color: RED }}>impacto</em>.
        </h1>
        <p
          className="text-base leading-[1.7] max-w-2xl"
          style={{ fontFamily: SANS, color: NAVY_MUTED, fontWeight: 300 }}
        >
          Números da plataforma no período de {IMPACT_PERIOD}. Todos os
          indicadores são apurados diretamente da base da plataforma.
        </p>
      </div>

      {/* Indicadores principais */}
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-0 mb-16"
        style={{ borderTop: `1px solid ${NAVY}15`, borderBottom: `1px solid ${NAVY}15` }}
      >
        {headline.map((m, i) => {
          const pct = Math.min(100, Math.round((m.value / m.target) * 100));
          return (
            <div
              key={m.label}
              className="py-8 md:px-8 first:pl-0 last:pr-0"
              style={{ borderLeft: i > 0 ? `1px solid ${NAVY}18` : "none" }}
            >
              <p
                className="text-5xl leading-none mb-3"
                style={{ fontFamily: SERIF, color: NAVY }}
              >
                {m.value}
              </p>
              <p
                className="text-[10px] tracking-[0.14em] uppercase mb-4"
                style={{ fontFamily: MONO, color: NAVY_MUTED }}
              >
                {m.label}
              </p>
              <div style={{ height: "3px", background: `${NAVY}12` }}>
                <div style={{ width: `${pct}%`, height: "3px", background: RED }} />
              </div>
              <p
                className="text-[9px] tracking-[0.14em] uppercase mt-2"
                style={{ fontFamily: MONO, color: NAVY_MUTED }}
              >
                {pct}% da meta ({m.target})
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Funil de curadoria */}
        <div>
          <p
            className="text-[9px] tracking-[0.2em] uppercase mb-6 flex items-center gap-2"
            style={{ fontFamily: MONO, color: NAVY_MUTED }}
          >
            <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
            Funil da curadoria
          </p>
          <div className="flex flex-col">
            {funnel.map((step, i) => {
              const pct = demands > 0 ? Math.round((step.value / demands) * 100) : 0;
              return (
                <div
                  key={step.label}
                  className="py-4"
                  style={{ borderTop: i > 0 ? `1px solid ${NAVY}12` : "none" }}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <span
                      className="text-[11px] tracking-[0.12em] uppercase"
                      style={{ fontFamily: MONO, color: NAVY_MUTED }}
                    >
                      {step.label}
                    </span>
                    <span
                      className="text-xl"
                      style={{ fontFamily: SERIF, color: i === funnel.length - 1 ? RED : NAVY }}
                    >
                      {step.value}
                    </span>
                  </div>
                  <div style={{ height: "2px", background: `${NAVY}10` }}>
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "2px",
                        background: i === funnel.length - 1 ? RED : `${NAVY}55`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p
            className="text-[10px] leading-relaxed mt-5"
            style={{ fontFamily: SANS, color: NAVY_MUTED }}
          >
            Cada demanda passa por revisão humana antes de virar contato. O funil
            mede quanto do que entra chega a uma conexão efetivada.
          </p>
        </div>

        {/* Distribuição por área */}
        <div>
          <p
            className="text-[9px] tracking-[0.2em] uppercase mb-6 flex items-center gap-2"
            style={{ fontFamily: MONO, color: NAVY_MUTED }}
          >
            <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
            Projetos por área
          </p>
          <div className="flex flex-col gap-4">
            {byArea.map(([area, n]) => (
              <div key={area}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span
                    className="text-[11px] tracking-[0.12em] uppercase"
                    style={{ fontFamily: MONO, color: NAVY_MUTED }}
                  >
                    {area}
                  </span>
                  <span
                    className="text-[11px]"
                    style={{ fontFamily: MONO, color: NAVY_MUTED }}
                  >
                    {n}
                  </span>
                </div>
                <div style={{ height: "6px", background: `${NAVY}10` }}>
                  <div
                    style={{ width: `${(n / maxArea) * 100}%`, height: "6px", background: NAVY }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={onOpenProjects}
            className="text-[10px] tracking-[0.18em] uppercase transition-colors mt-6"
            style={{ fontFamily: MONO, color: NAVY_MUTED, borderBottom: `1px solid ${NAVY}` }}
          >
            Ver catálogo completo
          </button>
        </div>
      </div>

      {/* Depoimentos */}
      <p
        className="text-[9px] tracking-[0.2em] uppercase mb-6 flex items-center gap-2"
        style={{ fontFamily: MONO, color: NAVY_MUTED }}
      >
        <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
        Depoimentos
      </p>
      <div className="grid md:grid-cols-2 gap-px" style={{ background: `${NAVY}18` }}>
        {TESTIMONIALS.map((t) => (
          <figure key={t.author} className="p-8 m-0" style={{ background: OFFWHITE }}>
            <blockquote
              className="text-lg leading-[1.55] mb-5"
              style={{ fontFamily: SERIF, color: NAVY }}
            >
              “{t.quote}”
            </blockquote>
            <figcaption>
              <p className="text-[12px] font-semibold" style={{ fontFamily: SANS, color: NAVY }}>
                {t.author}
              </p>
              <p
                className="text-[10px] tracking-[0.14em] uppercase mt-0.5"
                style={{ fontFamily: MONO, color: NAVY_MUTED }}
              >
                {t.role}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
