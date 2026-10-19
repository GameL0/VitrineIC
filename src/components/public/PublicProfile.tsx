import { LEVELS } from "@/data/skills";
import { findStudent, useVitrine } from "@/lib/store";
import { isProfileVisible } from "@/lib/profile";
import { InProjectBadge } from "@/components/app/InProjectBadge";
import { BackButton } from "./BackButton";
import { Eyebrow } from "./Eyebrow";
import { ProjectCard } from "./ProjectCard";
import { PAGE } from "./layout";

/** Perfil público do estudante: resumo, competências com nível e projetos. */
export function PublicProfile({
  id,
  onBack,
  onOpenProject,
}: {
  id: string;
  onBack: () => void;
  onOpenProject: (projectId: string) => void;
}) {
  const { inProject } = useVitrine();
  const student = findStudent(id);

  if (!student || !isProfileVisible(student)) {
    return (
      <main className={`${PAGE} flex flex-col items-center gap-6 py-24`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-navy/65">
          {student ? "Perfil indisponível" : "Estudante não encontrado"}
        </p>
        <button onClick={onBack} className="vt-btn vt-btn-secondary">
          Voltar ao diretório
        </button>
      </main>
    );
  }

  const skills = student.skills.flatMap((name) => {
    const level = student.skillLevels[name];
    return level ? [{ name, level }] : [];
  });

  return (
    <main className={`${PAGE} pt-8 pb-20 md:pb-28`}>
      <BackButton label="Voltar" onClick={onBack} />

      <div className="mt-12 grid items-start gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="vt-card flex flex-col p-7">
          <span className="grid size-22 place-items-center rounded-[24px] bg-navy font-display text-[40px] font-medium text-offwhite">
            {student.name[0]}
          </span>
          <h1 className="mt-6 font-display text-[22px] font-medium tracking-[-0.01em] text-navy">{student.name}</h1>
          <p className="mt-1 font-sans text-sm text-navy/65">
            {student.course} · {student.semester}
          </p>
          {inProject[student.id] && (
            <div className="mt-3">
              <InProjectBadge />
            </div>
          )}
          <p className="mt-6 font-sans text-[15px] leading-[1.5] text-navy/80">{student.bio}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {student.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="vt-pill">
                {skill}
              </span>
            ))}
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.08em] text-navy/65">
            Contato liberado quando estudante e solicitante aceitam
          </p>
        </aside>

        <div className="flex min-w-0 flex-col gap-8">
          {skills.length > 0 && (
            <section className="vt-card p-7">
              <Eyebrow>Competências</Eyebrow>
              <ul className="mt-2 flex flex-col">
                {skills.map(({ name, level }) => (
                  <li key={name} className="pt-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-sans text-sm text-navy">{name}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-navy/65">
                        {LEVELS[level - 1]}
                      </span>
                    </div>
                    <span className="mt-2 block h-1.5 rounded-full bg-navy/8">
                      <span
                        className="block h-1.5 rounded-full bg-navy"
                        style={{ width: `${(level / LEVELS.length) * 100}%` }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <Eyebrow>Projetos</Eyebrow>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {student.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={{ ...project, student }}
                  onOpen={() => onOpenProject(project.id)}
                  compact
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
