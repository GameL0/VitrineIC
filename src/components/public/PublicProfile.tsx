import { findStudent } from "@/data/students";
import { LANGUAGE_LEVELS } from "@/data/languages";
import { STATUS_CONFIG } from "@/data/projects";
import { NAVY, NAVY_MUTED, OFFWHITE, RED } from "@/styles/tokens";

const MONO = "Space Mono, monospace";
const SANS = "Inter, sans-serif";
const SERIF = "DM Serif Display, Georgia, serif";

/** Perfil público de um estudante: o que o visitante vê sem login. */
export function PublicProfile({
  id,
  onBack,
  onOpenProject,
}: {
  id: string;
  onBack: () => void;
  onOpenProject: (projectId: string) => void;
}) {
  const student = findStudent(id);

  if (!student) {
    return (
      <div className="px-8 md:px-16 py-24 max-w-screen-xl mx-auto text-center">
        <p
          className="text-[11px] tracking-[0.16em] uppercase mb-6"
          style={{ fontFamily: MONO, color: NAVY_MUTED }}
        >
          Estudante não encontrado
        </p>
        <button
          onClick={onBack}
          className="text-[10px] tracking-[0.18em] uppercase"
          style={{ fontFamily: MONO, color: NAVY, borderBottom: `1px solid ${NAVY}` }}
        >
          Voltar ao diretório
        </button>
      </div>
    );
  }

  return (
    <div className="px-8 md:px-16 py-10 max-w-screen-lg mx-auto">
      <button
        onClick={onBack}
        className="text-[9px] tracking-[0.16em] uppercase transition-colors flex items-center gap-2 mb-10"
        style={{ fontFamily: MONO, color: NAVY_MUTED }}
      >
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        Estudantes
      </button>

      <div className="flex items-start gap-6 mb-10">
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{ width: "72px", height: "72px", background: NAVY }}
        >
          <span
            className="text-xl tracking-[0.1em]"
            style={{ fontFamily: MONO, color: OFFWHITE }}
          >
            {student.initials}
          </span>
        </div>
        <div className="flex-1">
          <p
            className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: MONO, color: NAVY_MUTED }}
          >
            <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
            Perfil público
          </p>
          <h1
            className="text-4xl md:text-5xl leading-none mb-3"
            style={{ fontFamily: SERIF, color: NAVY, letterSpacing: "-0.01em" }}
          >
            {student.name}
          </h1>
          <p
            className="text-[11px] tracking-[0.14em] uppercase"
            style={{ fontFamily: MONO, color: NAVY_MUTED }}
          >
            {student.course} · {student.semester} · {student.id}
          </p>
        </div>
      </div>

      <p
        className="text-base md:text-lg leading-[1.7] max-w-2xl mb-12"
        style={{ fontFamily: SANS, color: NAVY, opacity: 0.7, fontWeight: 300 }}
      >
        {student.bio}
      </p>

      <div className="grid md:grid-cols-3 gap-px mb-12" style={{ background: `${NAVY}18` }}>
        <div className="p-6 md:col-span-2" style={{ background: OFFWHITE }}>
          <p
            className="text-[9px] tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: MONO, color: NAVY_MUTED }}
          >
            Competências
          </p>
          <div className="flex flex-wrap gap-1.5">
            {student.skills.map((s) => (
              <span
                key={s}
                className="text-[10px] tracking-[0.12em] uppercase px-2.5 py-1.5"
                style={{ fontFamily: MONO, color: NAVY_MUTED, border: `1px solid ${NAVY}25` }}
              >
                {s}
              </span>
            ))}
          </div>

          {student.languages.length > 0 && (
            <>
              <p
                className="text-[9px] tracking-[0.2em] uppercase mt-6 mb-4"
                style={{ fontFamily: MONO, color: NAVY_MUTED }}
              >
                Idiomas
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {student.languages.map((l) => (
                  <span
                    key={l.name}
                    className="text-[11px]"
                    style={{ fontFamily: SANS, color: NAVY, opacity: 0.7 }}
                  >
                    {l.name}
                    <span
                      className="ml-2 text-[9px] tracking-[0.12em] uppercase"
                      style={{ fontFamily: MONO, color: NAVY_MUTED }}
                    >
                      {LANGUAGE_LEVELS[l.level - 1]}
                    </span>
                  </span>
                ))}
              </div>
            </>
          )}

          <p
            className="text-[9px] tracking-[0.2em] uppercase mt-6 mb-4"
            style={{ fontFamily: MONO, color: NAVY_MUTED }}
          >
            Áreas de interesse
          </p>
          <div className="flex flex-wrap gap-1.5">
            {student.interests.map((s) => (
              <span
                key={s}
                className="text-[10px] tracking-[0.12em] uppercase px-2.5 py-1.5"
                style={{ fontFamily: MONO, color: NAVY_MUTED, border: `1px solid ${NAVY}20` }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6" style={{ background: OFFWHITE }}>
          <div>
            <p
              className="text-[9px] tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: MONO, color: NAVY_MUTED }}
            >
              Disponibilidade
            </p>
            <p className="text-lg" style={{ fontFamily: SERIF, color: NAVY }}>
              {student.availability}
            </p>
          </div>
          <div>
            <p
              className="text-[9px] tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: MONO, color: NAVY_MUTED }}
            >
              Repositório
            </p>
            <p className="text-[11px]" style={{ fontFamily: MONO, color: NAVY_MUTED }}>
              {student.github}
            </p>
          </div>
        </div>
      </div>

      <p
        className="text-[9px] tracking-[0.2em] uppercase mb-5"
        style={{ fontFamily: MONO, color: NAVY_MUTED }}
      >
        Projetos na vitrine
      </p>
      <div>
        {student.projects.map((project) => {
          const status = STATUS_CONFIG[project.status];
          return (
            <button
              key={project.id}
              onClick={() => onOpenProject(project.id)}
              className="w-full text-left py-6 px-1 transition-colors"
              style={{ borderTop: `1px solid ${NAVY}18` }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${NAVY}04`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-[9px] tracking-[0.16em] uppercase px-2 py-1"
                      style={{ fontFamily: MONO, color: NAVY_MUTED, border: `1px solid ${NAVY}25` }}
                    >
                      {project.area}
                    </span>
                    {status && (
                      <span
                        className="text-[9px] tracking-[0.14em] uppercase"
                        style={{ fontFamily: MONO, color: NAVY_MUTED }}
                      >
                        {status.label} · {project.year}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl leading-snug mb-2" style={{ fontFamily: SERIF, color: NAVY }}>
                    {project.title}
                  </h2>
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ fontFamily: SANS, color: NAVY_MUTED }}
                  >
                    {project.description}
                  </p>
                </div>
                <svg aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ color: NAVY_MUTED, flexShrink: 0, marginTop: "6px" }}
                >
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
            </button>
          );
        })}
        <div style={{ borderTop: `1px solid ${NAVY}18` }} />
      </div>
    </div>
  );
}
