import { useState } from "react";
import { INSTITUTION } from "@/data/institution";
import { useVitrine } from "@/lib/store";
import { isProfileVisible } from "@/lib/profile";
import { InProjectBadge } from "@/components/app/InProjectBadge";
import { PageHead } from "./PageHead";
import { PAGE } from "./layout";

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-navy/55"
    >
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** Diretório público de estudantes, com busca por nome, curso ou tecnologia. */
export function StudentsDirectory({ onOpenProfile }: { onOpenProfile: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const { inProject, students } = useVitrine();
  const visible = students.filter(isProfileVisible);

  const q = query.trim().toLowerCase();
  const shown = q
    ? visible.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.course.toLowerCase().includes(q) ||
          s.skills.some((sk) => sk.toLowerCase().includes(q)),
      )
    : visible;

  return (
    <main className={`${PAGE} pb-20 md:pb-28`}>
      <PageHead
        eyebrow="Diretório"
        title={`Estudantes da ${INSTITUTION.universityShort}.`}
        lead="Perfis públicos de quem está construindo. O contato é liberado quando estudante e solicitante aceitam."
        aside={
          <div className="relative w-full md:w-[288px] md:shrink-0">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome ou tecnologia"
              aria-label="Buscar estudantes por nome, curso ou tecnologia"
              className="h-11 w-full rounded-[10px] border border-navy/15 bg-white pr-4 pl-10 font-sans text-sm text-navy outline-none transition-colors placeholder:text-navy/55 focus:border-navy"
            />
          </div>
        }
      />

      {shown.length === 0 ? (
        <p className="py-20 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-navy/65">
          Nenhum estudante encontrado
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((student) => (
            <button
              key={student.id}
              onClick={() => onOpenProfile(student.id)}
              className="vt-card vt-card-interactive flex min-w-0 flex-col gap-4 p-6 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-[13px] bg-navy font-display text-xl font-medium text-offwhite">
                  {student.name[0]}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate font-display text-lg font-medium tracking-[-0.01em] text-navy">
                    {student.name}
                  </h2>
                  <p className="truncate font-sans text-[13px] text-navy/65">
                    {student.course} · {student.semester}
                  </p>
                </div>
              </div>

              {inProject[student.id] && (
                <div>
                  <InProjectBadge />
                </div>
              )}

              <p className="line-clamp-2 font-sans text-sm leading-[1.5] text-navy/65">{student.bio}</p>

              <div className="flex flex-wrap gap-1.5">
                {student.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="vt-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
