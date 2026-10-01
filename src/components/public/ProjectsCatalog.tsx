import { useState } from "react";
import { ALL_PROJECTS } from "@/data/students";
import { STATUS_CONFIG } from "@/data/projects";
import { NAVY, RED } from "@/styles/tokens";

const MONO = "Space Mono, monospace";
const SANS = "Inter, sans-serif";
const SERIF = "DM Serif Display, Georgia, serif";

const AREAS = ["Todas", ...Array.from(new Set(ALL_PROJECTS.map((p) => p.area)))];

/**
 * Catálogo público de projetos — a vitrine que o visitante vê sem login.
 *
 * Monta-se a partir de `ALL_PROJECTS`, derivado de `@/data/students`, para não
 * criar outra base de projetos.
 */
export function ProjectsCatalog({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [area, setArea] = useState("Todas");
  const shown = area === "Todas" ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.area === area);

  return (
    <div className="px-8 md:px-16 py-14 max-w-screen-xl mx-auto">
      <div className="mb-10">
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-3 flex items-center gap-3"
          style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
        >
          <span className="inline-block w-8" style={{ height: "1px", background: RED }} />
          Vitrine pública
        </p>
        <h1
          className="text-5xl md:text-6xl leading-none mb-5"
          style={{ fontFamily: SERIF, color: NAVY, letterSpacing: "-0.01em" }}
        >
          Projetos do <em className="not-italic" style={{ color: RED }}>IC</em>.
        </h1>
        <p
          className="text-base leading-[1.7] max-w-xl"
          style={{ fontFamily: SANS, color: NAVY, opacity: 0.65, fontWeight: 300 }}
        >
          O que estudantes do Instituto de Computação estão construindo. Explore
          por área, conheça quem está por trás e proponha uma parceria.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-1">
        {AREAS.map((a) => (
          <button
            key={a}
            onClick={() => setArea(a)}
            className="px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase transition-all"
            style={{
              fontFamily: MONO,
              border: `1px solid ${area === a ? NAVY : `${NAVY}30`}`,
              background: area === a ? NAVY : "transparent",
              color: area === a ? "#F5F4F0" : NAVY,
              opacity: area === a ? 1 : 0.6,
            }}
          >
            {a}
          </button>
        ))}
        <span
          className="ml-auto text-[10px] tracking-[0.16em] uppercase"
          style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
        >
          {shown.length} {shown.length === 1 ? "projeto" : "projetos"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {shown.map((project, i) => {
          const status = STATUS_CONFIG[project.status];
          return (
            <button
              key={project.id}
              onClick={() => onOpenProject(project.id)}
              className="group text-left p-6 transition-all"
              style={{
                border: `1px solid ${NAVY}33`,
                borderRadius: "16px",
                background: "#ffffff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${NAVY}05`;
                e.currentTarget.style.borderColor = NAVY;
                e.currentTarget.style.boxShadow = `0 0 0 1px ${NAVY}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.borderColor = `${NAVY}33`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-[9px] tracking-[0.16em] uppercase px-2 py-1"
                  style={{ fontFamily: MONO, color: NAVY, border: `1px solid ${NAVY}25`, opacity: 0.6 }}
                >
                  {project.area}
                </span>
                <span
                  className="text-[9px] tracking-[0.14em] uppercase"
                  style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
                >
                  {project.year}
                </span>
              </div>

              <h2
                className="text-base font-semibold mb-3 leading-snug"
                style={{ fontFamily: SANS, color: NAVY }}
              >
                {project.title}
              </h2>

              <p
                className="text-[12px] leading-relaxed mb-4"
                style={{ fontFamily: SANS, color: NAVY, opacity: 0.55 }}
              >
                {project.description.length > 110
                  ? `${project.description.slice(0, 110)}…`
                  : project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] tracking-[0.12em] uppercase px-2 py-1"
                    style={{ fontFamily: MONO, color: NAVY, border: `1px solid ${NAVY}20`, opacity: 0.55 }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div
                className="flex items-center justify-between pt-3"
                style={{ borderTop: `1px solid ${NAVY}10` }}
              >
                <span
                  className="text-[10px]"
                  style={{ fontFamily: SANS, color: NAVY, opacity: 0.5 }}
                >
                  {project.student.name}
                </span>
                {status && (
                  <span
                    className="text-[9px] tracking-[0.14em] uppercase"
                    style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
                  >
                    {status.label}
                  </span>
                )}
              </div>
            </button>
          );
        })}
        <div
          className="col-span-1 md:col-span-2 lg:col-span-3"
          style={{ borderTop: `1px solid ${NAVY}18` }}
        />
      </div>
    </div>
  );
}
