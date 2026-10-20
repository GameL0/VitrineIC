import { useState } from "react";
import { allProjects, useVitrine } from "@/lib/store";
import { isProfileVisible } from "@/lib/profile";
import { INSTITUTION } from "@/data/institution";
import { PageHead } from "./PageHead";
import { ProjectCard } from "./ProjectCard";
import { PAGE } from "./layout";

const ALL = "Todas";

/** Dois dígitos, como no contador do Figma ("06 de 12 projetos"). */
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Catálogo público de projetos — a vitrine que o visitante vê sem login.
 *
 * Monta-se a partir de `allProjects`, derivado dos estudantes do store, para
 * não criar outra base de projetos. Estudante sem perfil visível fica de fora.
 */
export function ProjectsCatalog({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [area, setArea] = useState(ALL);
  const { students } = useVitrine();
  const projects = allProjects(students.filter(isProfileVisible));
  const areas = [ALL, ...Array.from(new Set(projects.map((p) => p.area)))];
  const shown = area === ALL ? projects : projects.filter((p) => p.area === area);

  return (
    <main className={`${PAGE} pb-20 md:pb-28`}>
      <PageHead
        eyebrow="Catálogo"
        title={`Projetos da ${INSTITUTION.universityShort}.`}
        lead="Trabalhos reais de estudantes, revisados pela curadoria antes da publicação."
      />

      <div className="flex flex-col gap-4 border-b border-navy/13 pb-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {areas.map((a) => (
            <button
              key={a}
              onClick={() => setArea(a)}
              aria-pressed={area === a}
              className={`vt-pill ${area === a ? "vt-pill-selected" : ""}`}
            >
              {a}
            </button>
          ))}
        </div>
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-navy/65">
          {pad(shown.length)} de {pad(projects.length)} projetos
        </p>
      </div>

      <div className="grid gap-5 pt-8 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={() => onOpenProject(project.id)} />
        ))}
      </div>
    </main>
  );
}
