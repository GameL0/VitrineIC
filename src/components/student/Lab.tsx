import { useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { Input, Label, Tag } from "./ui";
import { SAMPLE_PROJECTS, STATUS_CONFIG } from "@/data/projects";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

export function Lab() {
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    stack: "",
    repo: "",
    status: "ideation",
  });

  const addProject = () => {
    if (!newProject.title) return;
    setProjects([
      ...projects,
      {
        id: Date.now(),
        title: newProject.title,
        description: newProject.description,
        stack: newProject.stack.split(",").map((s) => s.trim()).filter(Boolean),
        status: newProject.status,
        repo: newProject.repo,
        updated: "agora",
      },
    ]);
    setNewProject({ title: "", description: "", stack: "", repo: "", status: "ideation" });
    setShowForm(false);
  };

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p
            className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
          >
            <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
            Laboratório
          </p>
          <h1
            className="text-4xl"
            style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
          >
            Projetos em Desenvolvimento
          </h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-3 px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-85"
          style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
        >
          {showForm ? "Cancelar" : "+ Adicionar Projeto"}
        </button>
      </div>

      {/* Add project form */}
      {showForm && (
        <div
          className="mb-10 p-8"
          style={{ border: `1px solid ${NAVY}`, background: `${NAVY}04` }}
        >
          <div
            className="flex items-center gap-3 mb-6"
            style={{ borderBottom: `1px solid ${NAVY}15`, paddingBottom: "16px" }}
          >
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
            >
              Novo projeto
            </span>
            <div className="flex-1" style={{ height: "1px", background: `${NAVY}12` }} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <Input
                label="Título"
                placeholder="Nome do projeto"
                value={newProject.title}
                onChange={(v) => setNewProject({ ...newProject, title: v })}
              />
              <Input
                label="Descrição"
                placeholder="Descreva o projeto brevemente..."
                textarea
                rows={3}
                value={newProject.description}
                onChange={(v) => setNewProject({ ...newProject, description: v })}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Stack tecnológica"
                placeholder="Python, React, PostgreSQL..."
                mono
                value={newProject.stack}
                onChange={(v) => setNewProject({ ...newProject, stack: v })}
              />
              <Input
                label="Repositório"
                placeholder="github.com/usuario/projeto"
                mono
                value={newProject.repo}
                onChange={(v) => setNewProject({ ...newProject, repo: v })}
              />
              <div>
                <Label>Status</Label>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                    <Tag
                      key={key}
                      active={newProject.status === key}
                      accent={key === "coding"}
                      onClick={() => setNewProject({ ...newProject, status: key })}
                    >
                      {cfg.label}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6 pt-4" style={{ borderTop: `1px solid ${NAVY}12` }}>
            <button
              onClick={addProject}
              className="px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-85"
              style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
            >
              Salvar Projeto
            </button>
          </div>
        </div>
      )}

      {/* Project list */}
      <div className="flex flex-col">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className="group transition-all cursor-pointer"
            style={{
              borderTop: `1px solid ${NAVY}15`,
              borderBottom: i === projects.length - 1 ? `1px solid ${NAVY}15` : "none",
            }}
          >
            <div
              className="px-6 py-7 transition-all"
              onMouseEnter={(e) => (e.currentTarget.style.background = `${NAVY}04`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div className="grid md:grid-cols-12 gap-4 items-start">
                {/* Index */}
                <div className="md:col-span-1 pt-1">
                  <span
                    className="text-[11px]"
                    style={{ fontFamily: "Space Mono, monospace", color: RED, opacity: 0.6 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="md:col-span-8">
                  <h3
                    className="text-xl md:text-2xl leading-tight mb-2"
                    style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-[13px] leading-relaxed mb-4"
                    style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.55, fontWeight: 300, maxWidth: "540px" }}
                  >
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-[9px] tracking-[0.14em] uppercase"
                        style={{
                          fontFamily: "Space Mono, monospace",
                          color: NAVY,
                          border: `1px solid ${NAVY}25`,
                          opacity: 0.65,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="md:col-span-3 flex flex-col gap-3 items-start md:items-end">
                  <StatusBadge status={p.status} />
                  <a
                    href={`https://${p.repo}`}
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
                    style={{ color: NAVY, opacity: 0.4 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect x="1" y="2" width="7" height="8" rx="0.5" stroke="currentColor" strokeWidth="1" />
                      <path d="M5 1h5v5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      <path d="M5 7l5-5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    <span
                      className="text-[10px]"
                      style={{ fontFamily: "Space Mono, monospace" }}
                    >
                      {p.repo.replace("github.com/", "")}
                    </span>
                  </a>
                  <span
                    className="text-[9px]"
                    style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.25 }}
                  >
                    Atualizado {p.updated}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20"
          style={{ border: `1px dashed ${NAVY}25` }}
        >
          <span
            className="text-[10px] tracking-[0.18em] uppercase"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}
          >
            Nenhum projeto adicionado
          </span>
        </div>
      )}
    </div>
  );
}
