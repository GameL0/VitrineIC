import { useState } from "react";
import { STUDENTS } from "@/data/students";
import { NAVY, INK, OFFWHITE, RED } from "@/styles/tokens";

const MONO = "Geist Mono, ui-monospace, monospace";
const SANS = "Geist, Inter, system-ui, sans-serif";
const SERIF = "Inter Tight, Geist, system-ui, sans-serif";

export function StudentsDirectory({ onOpenProfile }: { onOpenProfile: (id: string) => void }) {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown = q
    ? STUDENTS.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.course.toLowerCase().includes(q) ||
          s.skills.some((sk) => sk.toLowerCase().includes(q)),
      )
    : STUDENTS;

  return (
    <div className="px-8 md:px-16 py-14 max-w-screen-xl mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
        <div>
          <p
            className="text-[10px] tracking-[0.25em] uppercase mb-3 flex items-center gap-3"
            style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
          >
            <span className="inline-block w-8" style={{ height: "1px", background: RED }} />
            Diretório
          </p>
          <h1
            className="text-5xl md:text-6xl leading-none mb-5"
            style={{ fontFamily: SERIF, color: NAVY, letterSpacing: "-0.01em" }}
          >
            Estudantes.
          </h1>
          <p
            className="text-base leading-[1.7] max-w-xl"
            style={{ fontFamily: SANS, color: NAVY, opacity: 0.65, fontWeight: 300 }}
          >
            Quem está construindo no Instituto de Computação, com suas
            competências, projetos e disponibilidade.
          </p>
        </div>

        <div style={{ minWidth: "240px" }}>
          <label
            className="block text-[9px] tracking-[0.18em] uppercase mb-1.5"
            style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
          >
            Buscar por nome, curso ou skill
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ex.: Python, robótica…"
            className="w-full px-3 py-2.5 text-sm bg-transparent outline-none transition-colors"
            style={{ border: `1px solid ${NAVY}44`, borderRadius: "8px", fontFamily: SANS, color: NAVY }}
            onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
            onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}44`)}
          />
        </div>
      </div>

      {shown.length === 0 ? (
        <p
          className="py-20 text-center text-[11px] tracking-[0.16em] uppercase"
          style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
        >
          Nenhum estudante encontrado
        </p>
      ) : (
        <div>
          {shown.map((student) => (
            <button
              key={student.id}
              onClick={() => onOpenProfile(student.id)}
              className="w-full text-left flex items-start gap-6 py-7 px-1 transition-colors"
              style={{ borderTop: `1px solid ${NAVY}18` }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${NAVY}04`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: "44px", height: "44px", background: INK, borderRadius: "10px" }}
              >
                <span
                  className="text-[12px] tracking-[0.1em]"
                  style={{ fontFamily: MONO, color: OFFWHITE }}
                >
                  {student.initials}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-xl leading-snug" style={{ fontFamily: SERIF, color: NAVY }}>
                  {student.name}
                </h2>
                <p
                  className="text-[10px] tracking-[0.14em] uppercase mb-3"
                  style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
                >
                  {student.course} · {student.semester} · {student.projects.length}{" "}
                  {student.projects.length === 1 ? "projeto" : "projetos"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {student.skills.slice(0, 6).map((s) => (
                    <span
                      key={s}
                      className="text-[9px] tracking-[0.12em] uppercase px-2 py-1"
                      style={{ fontFamily: MONO, color: NAVY, border: `1px solid ${NAVY}20`, opacity: 0.55, borderRadius: "6px" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden md:block text-right flex-shrink-0">
                <p
                  className="text-[9px] tracking-[0.16em] uppercase mb-1"
                  style={{ fontFamily: MONO, color: NAVY, opacity: 0.5 }}
                >
                  Disponibilidade
                </p>
                <p className="text-[12px]" style={{ fontFamily: SANS, color: NAVY, opacity: 0.6 }}>
                  {student.availability}
                </p>
              </div>
            </button>
          ))}
          <div style={{ borderTop: `1px solid ${NAVY}18` }} />
        </div>
      )}
    </div>
  );
}
