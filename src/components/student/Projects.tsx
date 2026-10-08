import { useState } from "react";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import { Input, Label, Select } from "./ui";

interface MyProject {
  id: string;
  title: string;
  description: string;
  phase: string;
  link?: string;
  tools?: string;
}

const PHASES = ["Idealização", "Codificação", "Revisão", "Publicado"];

export function Projects() {
  const [projects, setProjects] = useState<MyProject[]>([
    {
      id: "p1",
      title: "Classificador de Imagens Médicas",
      description: "Modelo de redes neurais convolucionais para detecção precoce de anomalias em raios-x do tórax.",
      phase: "Publicado",
      link: "https://github.com/exemplo/med-ai",
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<MyProject>>({});

  const saveProject = () => {
    if (!form.title || !form.description || !form.phase) return;
    setProjects([
      { ...form, id: `p-${Date.now()}` } as MyProject,
      ...projects
    ]);
    setIsAdding(false);
    setForm({});
  };

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p
            className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}
          >
            <span className="inline-block w-4 rounded-full" style={{ height: "2px", background: RED }} />
            Portfólio Pessoal
          </p>
          <h1
            className="text-4xl"
            style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}
          >
            Meus Projetos
          </h1>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-3 px-6 py-3 text-[10px] tracking-[0.16em] uppercase font-semibold transition-all"
            style={{ background: NAVY, color: OFFWHITE, fontFamily: "Geist, Inter, system-ui, sans-serif", borderRadius: "8px" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Adicionar Projeto
          </button>
        )}
      </div>

      {isAdding && (
        <div
          className="p-8 mb-10 transition-all"
          style={{ background: OFFWHITE, border: `1px solid ${NAVY}30`, borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <h3 className="text-xl mb-6" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>
            Novo Projeto ou Pesquisa
          </h3>
          <div className="flex flex-col gap-5">
            <Input
              label="Título do projeto"
              placeholder="Ex: App de Gestão de Tempo"
              value={form.title || ""}
              onChange={(v) => setForm({ ...form, title: v })}
            />
            <Input
              label="Descrição curta"
              placeholder="Descreva o objetivo e as tecnologias principais..."
              textarea
              rows={3}
              value={form.description || ""}
              onChange={(v) => setForm({ ...form, description: v })}
            />
            <div className="grid md:grid-cols-2 gap-5">
              <Select
                label="Fase atual"
                options={PHASES}
                value={form.phase || ""}
                onChange={(v) => setForm({ ...form, phase: v })}
              />
              <Input
                label="Link (Opcional)"
                placeholder="https://github.com/..."
                value={form.link || ""}
                onChange={(v) => setForm({ ...form, link: v })}
                mono
              />
              <div className="md:col-span-2">
                <Input
                  label="Ferramentas utilizadas (separadas por vírgula)"
                  placeholder="Ex: React, Python, TensorFlow"
                  value={form.tools || ""}
                  onChange={(v) => setForm({ ...form, tools: v })}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-8 pt-6" style={{ borderTop: `1px solid ${NAVY}15` }}>
            <button
              onClick={saveProject}
              className="px-8 py-3 text-[10px] tracking-[0.16em] uppercase font-semibold transition-all"
              style={{ background: NAVY, color: OFFWHITE, fontFamily: "Geist, Inter, system-ui, sans-serif", borderRadius: "8px" }}
            >
              Publicar
            </button>
            <button
              onClick={() => { setIsAdding(false); setForm({}); }}
              className="px-6 py-3 text-[10px] tracking-[0.16em] uppercase transition-opacity hover:opacity-100 opacity-60"
              style={{ color: NAVY, fontFamily: "Geist Mono, ui-monospace, monospace" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {projects.length === 0 && !isAdding ? (
        <div
          className="flex flex-col items-center justify-center p-12 text-center"
          style={{ border: `1px dashed ${NAVY}30`, borderRadius: "16px" }}
        >
          <p className="text-[14px] mb-4" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.5 }}>
            Você ainda não publicou nenhum projeto.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between"
              style={{ background: "transparent", border: `1px solid ${NAVY}20`, borderRadius: "16px" }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h4 className="text-xl font-medium" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>
                    {p.title}
                  </h4>
                  <span
                    className="px-2.5 py-1 text-[9px] tracking-[0.1em] uppercase"
                    style={{
                      fontFamily: "Geist Mono, ui-monospace, monospace",
                      color: NAVY,
                      background: p.phase === "Publicado" ? `${NAVY}10` : "transparent",
                      border: `1px solid ${NAVY}30`,
                      borderRadius: "6px"
                    }}
                  >
                    {p.phase}
                  </span>
                </div>
                <p
                  className="text-[13px] leading-relaxed max-w-2xl"
                  style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.65 }}
                >
                  {p.description}
                </p>
              </div>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.12em] uppercase font-medium transition-all"
                  style={{ border: `1px solid ${NAVY}30`, color: NAVY, borderRadius: "8px", textDecoration: "none" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${NAVY}08`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  Acessar
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
