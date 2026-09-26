import { findProject } from "@/data/students";
import { STATUS_CONFIG } from "@/data/projects";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

const MONO = "Space Mono, monospace";
const SANS = "Inter, sans-serif";
const SERIF = "DM Serif Display, Georgia, serif";

export function ProjectDetail({
  id,
  onBack,
  onOpenProfile,
  onSignIn,
}: {
  id: string;
  onBack: () => void;
  onOpenProfile: (studentId: string) => void;
  onSignIn: () => void;
}) {
  const project = findProject(id);

  if (!project) {
    return (
      <div className="px-8 md:px-16 py-24 max-w-screen-xl mx-auto text-center">
        <p
          className="text-[11px] tracking-[0.16em] uppercase mb-6"
          style={{ fontFamily: MONO, color: NAVY, opacity: 0.4 }}
        >
          Projeto não encontrado
        </p>
        <button
          onClick={onBack}
          className="text-[10px] tracking-[0.18em] uppercase"
          style={{ fontFamily: MONO, color: NAVY, borderBottom: `1px solid ${NAVY}` }}
        >
          Voltar ao catálogo
        </button>
      </div>
    );
  }

  const { student } = project;
  const status = STATUS_CONFIG[project.status];

  return (
    <div className="px-8 md:px-16 py-10 max-w-screen-lg mx-auto">
      <button
        onClick={onBack}
        className="text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-100 opacity-40 flex items-center gap-2 mb-10"
        style={{ fontFamily: MONO, color: NAVY }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        Projetos
      </button>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <span
            className="text-[9px] tracking-[0.16em] uppercase px-2 py-1"
            style={{ fontFamily: MONO, color: NAVY, border: `1px solid ${NAVY}25`, opacity: 0.6 }}
          >
            {project.area}
          </span>
          {status && (
            <span
              className="text-[9px] tracking-[0.16em] uppercase"
              style={{ fontFamily: MONO, color: RED, opacity: 0.8 }}
            >
              {status.label}
            </span>
          )}
          <span
            className="text-[9px] tracking-[0.14em] uppercase"
            style={{ fontFamily: MONO, color: NAVY, opacity: 0.3 }}
          >
            {project.year} · {project.id}
          </span>
        </div>

        <h1
          className="text-4xl md:text-5xl leading-[1.1] mb-6"
          style={{ fontFamily: SERIF, color: NAVY, letterSpacing: "-0.01em" }}
        >
          {project.title}
        </h1>

        <p
          className="text-base md:text-lg leading-[1.7] max-w-2xl"
          style={{ fontFamily: SANS, color: NAVY, opacity: 0.7, fontWeight: 300 }}
        >
          {project.description}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-px mb-12" style={{ background: `${NAVY}18` }}>
        <div className="p-6 md:col-span-2" style={{ background: OFFWHITE }}>
          <p
            className="text-[9px] tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: MONO, color: NAVY, opacity: 0.4 }}
          >
            Stack técnica
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="text-[10px] tracking-[0.12em] uppercase px-2.5 py-1.5"
                style={{ fontFamily: MONO, color: NAVY, border: `1px solid ${NAVY}25`, opacity: 0.75 }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6" style={{ background: OFFWHITE }}>
          <p
            className="text-[9px] tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: MONO, color: NAVY, opacity: 0.4 }}
          >
            Disponibilidade
          </p>
          <p className="text-lg" style={{ fontFamily: SERIF, color: NAVY }}>
            {student.availability}
          </p>
        </div>
      </div>

      {/* Autoria */}
      <p
        className="text-[9px] tracking-[0.2em] uppercase mb-4"
        style={{ fontFamily: MONO, color: NAVY, opacity: 0.4 }}
      >
        Desenvolvido por
      </p>
      <button
        onClick={() => onOpenProfile(student.id)}
        className="w-full text-left flex items-start gap-5 p-6 transition-colors"
        style={{ border: `1px solid ${NAVY}18` }}
        onMouseEnter={(e) => (e.currentTarget.style.background = `${NAVY}05`)}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{ width: "48px", height: "48px", background: NAVY }}
        >
          <span
            className="text-[13px] tracking-[0.1em]"
            style={{ fontFamily: MONO, color: OFFWHITE }}
          >
            {student.initials}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg leading-snug" style={{ fontFamily: SERIF, color: NAVY }}>
            {student.name}
          </h3>
          <p
            className="text-[11px] mb-3"
            style={{ fontFamily: SANS, color: NAVY, opacity: 0.5 }}
          >
            {student.course} · {student.semester}
          </p>
          <p
            className="text-[12px] leading-relaxed"
            style={{ fontFamily: SANS, color: NAVY, opacity: 0.6 }}
          >
            {student.bio}
          </p>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{ color: NAVY, opacity: 0.3, flexShrink: 0, marginTop: "4px" }}
        >
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className="mt-12 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{ background: NAVY }}
      >
        <div>
          <p
            className="text-[9px] tracking-[0.22em] uppercase mb-2"
            style={{ fontFamily: MONO, color: OFFWHITE, opacity: 0.4 }}
          >
            Interessado neste projeto?
          </p>
          <h3 className="text-2xl leading-tight" style={{ fontFamily: SERIF, color: OFFWHITE }}>
            Publique uma demanda e a curadoria faz a ponte.
          </h3>
        </div>
        <button
          onClick={onSignIn}
          className="flex-shrink-0 px-7 py-3.5 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity"
          style={{ background: OFFWHITE, color: NAVY, fontFamily: SANS }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Acessar Plataforma
        </button>
      </div>
    </div>
  );
}
