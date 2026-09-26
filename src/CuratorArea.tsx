import { useState } from "react";

const NAVY = "#1C2B4A";
const RED = "#c1121f";
const OFFWHITE = "#F5F4F0";

// ─── Shared primitives ────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block text-[9px] tracking-[0.22em] uppercase mb-1.5"
      style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
    >
      {children}
    </span>
  );
}

function Mono({ children, dim, red }: { children: React.ReactNode; dim?: boolean; red?: boolean }) {
  return (
    <span
      style={{
        fontFamily: "Space Mono, monospace",
        color: red ? RED : NAVY,
        opacity: dim ? 0.4 : 1,
        fontSize: "11px",
      }}
    >
      {children}
    </span>
  );
}

function Rule() {
  return <div style={{ height: "1px", background: `${NAVY}15`, margin: "20px 0" }} />;
}

function SkillTag({
  children,
  highlight,
  small,
}: {
  children: React.ReactNode;
  highlight?: boolean;
  small?: boolean;
}) {
  return (
    <span
      className="inline-block tracking-[0.12em] uppercase"
      style={{
        fontFamily: "Space Mono, monospace",
        fontSize: small ? "8px" : "9px",
        padding: small ? "2px 6px" : "3px 8px",
        border: `1px solid ${highlight ? RED : `${NAVY}28`}`,
        color: highlight ? RED : NAVY,
        background: highlight ? `${RED}08` : "transparent",
        opacity: highlight ? 1 : 0.65,
      }}
    >
      {children}
    </span>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

type DemandStatus = "nova" | "em_analise" | "aprovada" | "rejeitada" | "matched";

interface Demand {
  id: string;
  title: string;
  company: string;
  area: string;
  scope: string;
  deadline: string;
  skills: string[];
  description: string;
  submitted: string;
  status: DemandStatus;
  priority: "alta" | "normal" | "baixa";
}

const DEMANDS: Demand[] = [
  {
    id: "VIC-2026-0041",
    title: "Sistema de Monitoramento IoT para Fábricas",
    company: "TechBr Soluções",
    area: "Eng. de Software",
    scope: "Médio (3–6 meses)",
    deadline: "30 nov 2026",
    skills: ["Python", "MQTT", "PostgreSQL", "Docker", "React"],
    description: "Desenvolvimento de plataforma de coleta e visualização de dados de sensores industriais em tempo real. Pipeline de ingestão com tolerância a falhas e dashboard de monitoramento.",
    submitted: "12 set 2026",
    status: "nova",
    priority: "alta",
  },
  {
    id: "VIC-2026-0038",
    title: "Análise Preditiva de Churn em SaaS",
    company: "Fintech Labs",
    area: "IA / Dados",
    scope: "Pequeno (< 3 meses)",
    deadline: "15 out 2026",
    skills: ["Python", "scikit-learn", "SQL", "Pandas"],
    description: "Modelo preditivo para identificação antecipada de cancelamento de clientes em plataforma SaaS B2B. Feature engineering, treinamento e API de inferência.",
    submitted: "05 set 2026",
    status: "em_analise",
    priority: "alta",
  },
  {
    id: "VIC-2026-0029",
    title: "Automação de Relatórios com LLM",
    company: "Consultoria GX",
    area: "IA / ML",
    scope: "Pequeno (< 3 meses)",
    deadline: "20 out 2026",
    skills: ["Python", "LangChain", "OpenAI API", "FastAPI"],
    description: "Integração de LLM para geração automática de relatórios financeiros a partir de dados estruturados e templates.",
    submitted: "20 ago 2026",
    status: "aprovada",
    priority: "normal",
  },
  {
    id: "VIC-2026-0025",
    title: "Plataforma de E-learning para Técnicos",
    company: "EduCorpora",
    area: "Sistemas Web",
    scope: "Grande (6–12 meses)",
    deadline: "10 dez 2026",
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    description: "LMS customizado para treinamento técnico industrial com gamificação, trilhas adaptativas e relatórios gerenciais.",
    submitted: "08 ago 2026",
    status: "matched",
    priority: "normal",
  },
  {
    id: "VIC-2026-0019",
    title: "API de Reconhecimento de Documentos",
    company: "DocScan Ltda",
    area: "Visão Computacional",
    scope: "Médio (3–6 meses)",
    deadline: "01 nov 2026",
    skills: ["Python", "OpenCV", "PyTorch", "FastAPI", "Docker"],
    description: "OCR e extração estruturada de dados de documentos fiscais e contratos usando modelos de visão.",
    submitted: "01 ago 2026",
    status: "rejeitada",
    priority: "baixa",
  },
];

const STUDENTS = [
  {
    id: "STU-001",
    name: "Rafael Moreira Santos",
    initials: "RM",
    course: "Ciência da Computação",
    semester: "5º sem",
    gpa: "9.1",
    skills: ["Python", "PyTorch", "Docker", "PostgreSQL", "Node.js", "scikit-learn", "MQTT"],
    projects: [
      { title: "Detecção de Anomalias em Redes", stack: ["Python", "PyTorch"], status: "coding" },
      { title: "DSL para Análise Genômica", stack: ["Rust", "LLVM"], status: "ideation" },
    ],
    github: "github.com/rafaelms",
    availability: "Imediata",
  },
  {
    id: "STU-002",
    name: "Isadora Lima Costa",
    initials: "IL",
    course: "Engenharia de Computação",
    semester: "6º sem",
    gpa: "8.7",
    skills: ["Python", "React", "AWS", "PostgreSQL", "scikit-learn", "Pandas", "SQL"],
    projects: [
      { title: "Dashboard ESG para PMEs", stack: ["React", "Node.js", "D3.js"], status: "review" },
    ],
    github: "github.com/isadoralc",
    availability: "Imediata",
  },
  {
    id: "STU-003",
    name: "Bruno Takashi Yamamoto",
    initials: "BT",
    course: "Eng. de Software",
    semester: "4º sem",
    gpa: "8.3",
    skills: ["Python", "FastAPI", "Docker", "PostgreSQL", "React", "TypeScript"],
    projects: [
      { title: "Compilador para Linguagem Educacional", stack: ["Python", "LLVM"], status: "coding" },
    ],
    github: "github.com/brunoty",
    availability: "Após 15/out",
  },
  {
    id: "STU-004",
    name: "Fernanda Oliveira Braga",
    initials: "FO",
    course: "Ciência da Computação",
    semester: "5º sem",
    gpa: "9.4",
    skills: ["Python", "OpenCV", "PyTorch", "FastAPI", "Docker", "C++"],
    projects: [
      { title: "Robótica Assistiva", stack: ["Python", "OpenCV", "ROS"], status: "coding" },
    ],
    github: "github.com/fernandaob",
    availability: "Imediata",
  },
  {
    id: "STU-005",
    name: "Lucas Henrique Pinto",
    initials: "LP",
    course: "Eng. de Computação",
    semester: "3º sem",
    gpa: "7.9",
    skills: ["Python", "SQL", "Pandas", "scikit-learn", "React"],
    projects: [
      { title: "Análise Preditiva de Falhas", stack: ["Python", "Pandas"], status: "ideation" },
    ],
    github: "github.com/lucashp",
    availability: "Imediata",
  },
];

// ─── Status config ────────────────────────────────────────────────────────────

const DEMAND_STATUS: Record<DemandStatus, { label: string; color: string; shape: "circle" | "square" | "diamond" }> = {
  nova:       { label: "Nova",         color: RED,          shape: "diamond" },
  em_analise: { label: "Em Análise",   color: `${NAVY}88`,  shape: "circle"  },
  aprovada:   { label: "Aprovada",     color: "#2d7a3a",    shape: "square"  },
  rejeitada:  { label: "Rejeitada",    color: `${NAVY}40`,  shape: "diamond" },
  matched:    { label: "Matched",      color: NAVY,         shape: "square"  },
};

const KANBAN_COLS: DemandStatus[] = ["nova", "em_analise", "aprovada", "matched"];

function StatusBadge({ status, size = 8 }: { status: DemandStatus; size?: number }) {
  const cfg = DEMAND_STATUS[status];
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
        {cfg.shape === "circle" && <circle cx={size/2} cy={size/2} r={size/2-0.5} fill={cfg.color} />}
        {cfg.shape === "square" && <rect x={0.5} y={0.5} width={size-1} height={size-1} fill={cfg.color} />}
        {cfg.shape === "diamond" && <polygon points={`${size/2},0.5 ${size-0.5},${size/2} ${size/2},${size-0.5} 0.5,${size/2}`} fill={cfg.color} />}
      </svg>
      <span className="text-[9px] tracking-[0.14em] uppercase" style={{ fontFamily: "Space Mono, monospace", color: cfg.color }}>
        {cfg.label}
      </span>
    </div>
  );
}

// ─── Triage / Kanban ─────────────────────────────────────────────────────────

function TriageCard({
  demand,
  onSelect,
  onStatus,
}: {
  demand: Demand;
  onSelect: () => void;
  onStatus: (s: DemandStatus) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="mb-2 transition-all"
      style={{ border: `1px solid ${NAVY}18`, background: OFFWHITE }}
    >
      <div
        className="px-4 py-3 cursor-pointer"
        onClick={() => setOpen(!open)}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `${NAVY}04`)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <Mono dim>{demand.id}</Mono>
          {demand.priority === "alta" && (
            <span
              className="text-[8px] tracking-[0.14em] uppercase px-1.5 py-0.5 flex-shrink-0"
              style={{ fontFamily: "Space Mono, monospace", color: RED, border: `1px solid ${RED}` }}
            >
              Alta
            </span>
          )}
        </div>
        <p
          className="text-[13px] font-medium leading-tight mb-2"
          style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
        >
          {demand.title}
        </p>
        <p
          className="text-[10px] mb-2"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.45 }}
        >
          {demand.company}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          {demand.skills.slice(0, 3).map((s) => (
            <SkillTag key={s} small>{s}</SkillTag>
          ))}
          {demand.skills.length > 3 && (
            <span className="text-[8px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}>
              +{demand.skills.length - 3}
            </span>
          )}
        </div>
        <Mono dim>{demand.scope}</Mono>
      </div>

      {open && (
        <div style={{ borderTop: `1px solid ${NAVY}12` }}>
          <div className="px-4 py-3">
            <p className="text-[11px] leading-relaxed mb-3" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}>
              {demand.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {demand.skills.map((s) => <SkillTag key={s} small>{s}</SkillTag>)}
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["em_analise", "aprovada", "rejeitada"] as DemandStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={(e) => { e.stopPropagation(); onStatus(s); }}
                  className="px-2.5 py-1 text-[8px] tracking-[0.12em] uppercase transition-opacity hover:opacity-80"
                  style={{
                    fontFamily: "Space Mono, monospace",
                    border: `1px solid ${DEMAND_STATUS[s].color}`,
                    color: DEMAND_STATUS[s].color,
                    background: demand.status === s ? `${DEMAND_STATUS[s].color}12` : "transparent",
                  }}
                >
                  → {DEMAND_STATUS[s].label}
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 py-3" style={{ borderTop: `1px solid ${NAVY}10` }}>
            <button
              onClick={(e) => { e.stopPropagation(); onSelect(); }}
              className="w-full py-2 text-[9px] tracking-[0.16em] uppercase font-semibold transition-opacity hover:opacity-85"
              style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
            >
              Fazer Match →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Triage({
  demands,
  setDemands,
  onMatch,
}: {
  demands: Demand[];
  setDemands: (d: Demand[]) => void;
  onMatch: (d: Demand) => void;
}) {
  const updateStatus = (id: string, status: DemandStatus) => {
    setDemands(demands.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}>
            <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
            Fila de Triagem
          </p>
          <h1 className="text-4xl" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
            Demandas Recebidas
          </h1>
        </div>
        <div className="flex gap-5">
          {KANBAN_COLS.map((col) => (
            <div key={col} className="text-right">
              <p className="text-2xl leading-none" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
                {demands.filter((d) => d.status === col).length}
              </p>
              <p className="text-[9px] mt-1" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}>
                {DEMAND_STATUS[col].label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0" style={{ border: `1px solid ${NAVY}18` }}>
        {KANBAN_COLS.map((col, ci) => (
          <div
            key={col}
            style={{ borderLeft: ci > 0 ? `1px solid ${NAVY}18` : "none" }}
          >
            {/* Column header */}
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{ borderBottom: `1px solid ${NAVY}18`, background: `${NAVY}04` }}
            >
              <StatusBadge status={col} />
              <span className="ml-auto text-[9px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}>
                {demands.filter((d) => d.status === col).length}
              </span>
            </div>
            {/* Cards */}
            <div className="p-3 min-h-[300px]">
              {demands.filter((d) => d.status === col).map((d) => (
                <TriageCard
                  key={d.id}
                  demand={d}
                  onSelect={() => onMatch(d)}
                  onStatus={(s) => updateStatus(d.id, s)}
                />
              ))}
              {demands.filter((d) => d.status === col).length === 0 && (
                <div className="flex items-center justify-center h-24">
                  <span className="text-[9px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.2 }}>
                    Vazio
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Matchmaking screen ───────────────────────────────────────────────────────

function scoreStudent(student: typeof STUDENTS[0], demand: Demand): number {
  const matched = student.skills.filter((s) =>
    demand.skills.some((ds) => ds.toLowerCase() === s.toLowerCase())
  ).length;
  return Math.round((matched / demand.skills.length) * 100);
}

function StudentMatchCard({
  student,
  demand,
  onSelect,
}: {
  student: typeof STUDENTS[0];
  demand: Demand;
  onSelect: () => void;
}) {
  const score = scoreStudent(student, demand);
  const matchedSkills = student.skills.filter((s) =>
    demand.skills.some((ds) => ds.toLowerCase() === s.toLowerCase())
  );

  return (
    <div
      className="transition-all cursor-pointer"
      style={{ border: `1px solid ${score >= 60 ? `${NAVY}30` : `${NAVY}15`}` }}
    >
      <div className="px-5 py-4">
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 flex items-center justify-center flex-shrink-0"
            style={{ background: score >= 60 ? NAVY : `${NAVY}30` }}
          >
            <span className="text-[11px]" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: OFFWHITE }}>
              {student.initials}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[14px]" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
                {student.name}
              </span>
              <span
                className="text-[9px] px-1.5 py-0.5 tracking-[0.12em] uppercase flex-shrink-0"
                style={{
                  fontFamily: "Space Mono, monospace",
                  color: score >= 70 ? RED : NAVY,
                  border: `1px solid ${score >= 70 ? RED : `${NAVY}30`}`,
                  background: score >= 70 ? `${RED}08` : "transparent",
                  opacity: score >= 70 ? 1 : 0.5,
                }}
              >
                {score}% match
              </span>
            </div>
            <p className="text-[10px] mb-2" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}>
              {student.course} · {student.semester} · IRA {student.gpa}
            </p>
            {/* Skill cross-reference */}
            <div className="flex flex-wrap gap-1 mb-2">
              {student.skills.map((s) => (
                <SkillTag key={s} small highlight={matchedSkills.includes(s)}>
                  {s}
                </SkillTag>
              ))}
            </div>
            {/* Projects preview */}
            {student.projects.slice(0, 1).map((p) => (
              <div key={p.title} className="flex items-center gap-2 mt-1">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ color: NAVY, opacity: 0.25, flexShrink: 0 }}>
                  <rect x="0.5" y="0.5" width="9" height="9" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
                  <path d="M2.5 3h5M2.5 5h5M2.5 7h3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                </svg>
                <span className="text-[9px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}>
                  {p.title}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className="flex items-end gap-[2px]">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "3px",
                    height: `${4 + i * 1.6}px`,
                    background: i < Math.round(score / 10) ? (score >= 70 ? RED : NAVY) : `${NAVY}15`,
                  }}
                />
              ))}
            </div>
            <span className="text-[9px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}>
              {student.availability}
            </span>
          </div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${NAVY}10` }}>
        <button
          onClick={onSelect}
          className="w-full py-2.5 text-[9px] tracking-[0.16em] uppercase font-semibold transition-all flex items-center justify-center gap-2"
          style={{
            fontFamily: "Inter, sans-serif",
            color: score >= 60 ? OFFWHITE : NAVY,
            background: score >= 60 ? NAVY : "transparent",
            opacity: score >= 60 ? 1 : 0.4,
          }}
          onMouseEnter={(e) => score >= 60 && (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => score >= 60 && (e.currentTarget.style.opacity = "1")}
        >
          Selecionar para match
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Matchmaking({
  demand,
  onConfirm,
}: {
  demand: Demand;
  onConfirm: (student: typeof STUDENTS[0]) => void;
}) {
  const [filter, setFilter] = useState("");
  const sorted = [...STUDENTS]
    .map((s) => ({ ...s, score: scoreStudent(s, demand) }))
    .filter((s) => {
      if (!filter) return true;
      return s.skills.some((sk) => sk.toLowerCase().includes(filter.toLowerCase())) ||
        s.name.toLowerCase().includes(filter.toLowerCase());
    })
    .sort((a, b) => b.score - a.score);

  return (
    <div className="flex-1 overflow-hidden" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100%" }}>
      {/* Left — demand detail */}
      <div
        className="overflow-y-auto px-8 py-8"
        style={{ borderRight: `1px solid ${NAVY}18` }}
      >
        <p className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}>
          <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
          Demanda selecionada
        </p>
        <h2 className="text-3xl leading-tight mb-1" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
          {demand.title}
        </h2>
        <p className="text-[11px] mb-6" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}>
          {demand.id} · {demand.company}
        </p>

        <div className="flex flex-col gap-0" style={{ border: `1px solid ${NAVY}15` }}>
          {[
            { label: "Área", val: demand.area },
            { label: "Escopo", val: demand.scope },
            { label: "Prazo", val: demand.deadline },
            { label: "Enviado em", val: demand.submitted },
          ].map((r, i, arr) => (
            <div key={r.label} className="grid px-4 py-3" style={{ gridTemplateColumns: "100px 1fr", borderBottom: i < arr.length - 1 ? `1px solid ${NAVY}08` : "none" }}>
              <Label><span style={{ display: "inline" }}>{r.label}</span></Label>
              <Mono dim>{r.val}</Mono>
            </div>
          ))}
        </div>

        <Rule />

        <Label>Requisitos técnicos</Label>
        <div className="flex flex-wrap gap-1.5 mt-2 mb-6">
          {demand.skills.map((s) => (
            <SkillTag key={s}>{s}</SkillTag>
          ))}
        </div>

        <Label>Descrição do problema</Label>
        <p className="text-[12px] leading-relaxed mt-1" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.55, fontWeight: 300 }}>
          {demand.description}
        </p>

        <Rule />

        <div
          className="px-4 py-4 flex items-start gap-3"
          style={{ border: `1px solid ${NAVY}18`, background: `${NAVY}03` }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: NAVY, opacity: 0.25, flexShrink: 0, marginTop: 2 }}>
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" />
            <path d="M7 4v4M7 9.5v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p className="text-[10px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.4, fontWeight: 300 }}>
            O sistema de cross-reference destaca em vermelho as skills do estudante que coincidem com esta demanda.
            Priorize estudantes com ≥ 60% de match e projetos ativos relacionados.
          </p>
        </div>
      </div>

      {/* Right — candidate list */}
      <div className="overflow-y-auto px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[9px] tracking-[0.22em] uppercase mb-1"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}>
              Candidatos — {sorted.length} encontrados
            </p>
            <div className="flex items-center gap-3">
              <SkillTag highlight small>Skill cruzada</SkillTag>
              <SkillTag small>Não requerida</SkillTag>
            </div>
          </div>
          <input
            placeholder="Filtrar..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1.5 text-[11px] w-36 outline-none"
            style={{
              fontFamily: "Space Mono, monospace",
              border: `1px solid ${NAVY}30`,
              background: "transparent",
              color: NAVY,
              borderRadius: 0,
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
            onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}30`)}
          />
        </div>
        <div className="flex flex-col gap-3">
          {sorted.map((s) => (
            <StudentMatchCard
              key={s.id}
              student={s}
              demand={demand}
              onSelect={() => onConfirm(s)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Confirm modal ────────────────────────────────────────────────────────────

function ConfirmModal({
  demand,
  student,
  onClose,
  onConfirm,
}: {
  demand: Demand;
  student: typeof STUDENTS[0];
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [note, setNote] = useState("");
  const score = scoreStudent(student, demand);
  const matchedSkills = student.skills.filter((s) =>
    demand.skills.some((ds) => ds.toLowerCase() === s.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(28,43,74,0.5)", backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-2xl"
        style={{
          background: OFFWHITE,
          border: `1.5px solid ${RED}`,
          outline: `1px solid ${RED}`,
          outlineOffset: "3px",
        }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: `1px solid ${NAVY}15` }}>
          <p className="text-[10px] tracking-[0.2em] uppercase flex items-center gap-3"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <rect x="0.5" y="0.5" width="7" height="7" fill={RED} />
            </svg>
            Confirmação de Match
          </p>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center"
            style={{ color: NAVY, opacity: 0.3 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-6">
          {/* Pair display */}
          <div className="grid grid-cols-2 gap-0 mb-6" style={{ border: `1px solid ${NAVY}15` }}>
            <div className="px-5 py-5" style={{ borderRight: `1px solid ${NAVY}15` }}>
              <Label>Demanda</Label>
              <p className="text-[15px] leading-tight mb-1" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
                {demand.title}
              </p>
              <Mono dim>{demand.id} · {demand.company}</Mono>
            </div>
            <div className="px-5 py-5">
              <Label>Estudante</Label>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: NAVY }}>
                  <span className="text-[10px]" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: OFFWHITE }}>
                    {student.initials}
                  </span>
                </div>
                <div>
                  <p className="text-[15px] leading-tight" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
                    {student.name}
                  </p>
                  <Mono dim>{student.course} · {student.semester}</Mono>
                </div>
              </div>
            </div>
          </div>

          {/* Score + skills */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <Label>Compatibilidade técnica</Label>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-3xl" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: score >= 70 ? RED : NAVY }}>
                  {score}%
                </span>
                <div className="flex items-end gap-[2px]">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} style={{
                      width: "5px",
                      height: `${5 + i * 2}px`,
                      background: i < Math.round(score / 10) ? (score >= 70 ? RED : NAVY) : `${NAVY}15`,
                    }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="text-right">
              <Label>Skills em comum</Label>
              <div className="flex flex-wrap gap-1 justify-end mt-1">
                {matchedSkills.map((s) => <SkillTag key={s} highlight small>{s}</SkillTag>)}
              </div>
            </div>
          </div>

          {/* Projects preview */}
          {student.projects.length > 0 && (
            <>
              <Rule />
              <Label>Projetos ativos do estudante</Label>
              <div className="flex flex-col gap-1.5 mt-2">
                {student.projects.map((p) => (
                  <div key={p.title} className="flex items-center justify-between px-3 py-2" style={{ border: `1px solid ${NAVY}10` }}>
                    <span className="text-[12px]" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.65 }}>
                      {p.title}
                    </span>
                    <div className="flex gap-1">
                      {p.stack.map((t) => <SkillTag key={t} small>{t}</SkillTag>)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <Rule />

          {/* Justification note */}
          <div>
            <Label>Nota de justificativa interna <span style={{ opacity: 0.5 }}>(opcional)</span></Label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Registre o motivo técnico da seleção, critérios adicionais considerados..."
              className="w-full px-3 py-2.5 text-[11px] outline-none transition-colors"
              style={{
                fontFamily: "Space Mono, monospace",
                color: NAVY,
                border: `1px solid ${NAVY}30`,
                borderRadius: 0,
                background: "transparent",
                resize: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
              onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}30`)}
            />
          </div>
        </div>

        {/* CTA footer */}
        <div className="px-8 pb-8">
          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 py-4 text-[11px] tracking-[0.22em] uppercase font-bold transition-opacity hover:opacity-88"
              style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
            >
              Confirmar Conexão
            </button>
            <button
              onClick={onClose}
              className="px-6 py-4 text-[10px] tracking-[0.18em] uppercase font-medium transition-opacity hover:opacity-60 opacity-40"
              style={{ border: `1px solid ${NAVY}40`, color: NAVY, fontFamily: "Inter, sans-serif" }}
            >
              Cancelar
            </button>
          </div>
          <p className="text-[9px] mt-3 text-center" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}>
            O solicitante e o estudante receberão notificação automática por e-mail.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Confirmed screen ─────────────────────────────────────────────────────────

function MatchConfirmed({
  demand,
  student,
  onBack,
}: {
  demand: Demand;
  student: typeof STUDENTS[0];
  onBack: () => void;
}) {
  const score = scoreStudent(student, demand);
  const protocol = `MCH-${Date.now().toString().slice(-6)}`;

  return (
    <div className="px-8 md:px-16 py-16 max-w-screen-lg mx-auto">
      <div className="mb-12">
        <p className="text-[9px] tracking-[0.25em] uppercase mb-5 flex items-center gap-3"
          style={{ fontFamily: "Space Mono, monospace", color: RED, opacity: 0.85 }}>
          <span className="inline-block w-6" style={{ height: "1px", background: RED }} />
          Match efetivado
        </p>
        <h1 className="text-7xl md:text-8xl leading-none tracking-tight mb-6"
          style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
          Conexão<br />
          <em className="not-italic" style={{ color: RED }}>confirmada.</em>
        </h1>
        <div className="inline-flex items-center gap-4 px-5 py-3" style={{ border: `1px solid ${NAVY}22`, background: `${NAVY}04` }}>
          <span className="text-[9px] tracking-[0.18em] uppercase" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}>
            Protocolo
          </span>
          <span className="text-xl font-bold" style={{ fontFamily: "Space Mono, monospace", color: NAVY }}>
            {protocol}
          </span>
        </div>
      </div>

      {/* Matched pair */}
      <div className="grid md:grid-cols-2 gap-0 mb-10" style={{ border: `1px solid ${NAVY}18` }}>
        <div className="px-8 py-7" style={{ borderRight: `1px solid ${NAVY}15` }}>
          <Label>Demanda</Label>
          <h3 className="text-xl mb-1" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
            {demand.title}
          </h3>
          <Mono dim>{demand.id} · {demand.company}</Mono>
          <div className="flex flex-wrap gap-1 mt-4">
            {demand.skills.map((s) => <SkillTag key={s} small>{s}</SkillTag>)}
          </div>
        </div>
        <div className="px-8 py-7">
          <Label>Estudante alocado</Label>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 flex items-center justify-center" style={{ background: NAVY }}>
              <span className="text-sm" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: OFFWHITE }}>
                {student.initials}
              </span>
            </div>
            <div>
              <h3 className="text-xl" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
                {student.name}
              </h3>
              <Mono dim>{student.course} · {student.semester} · IRA {student.gpa}</Mono>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: RED }}>
              {score}%
            </span>
            <span className="text-[9px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}>
              compatibilidade técnica
            </span>
          </div>
        </div>
      </div>

      {/* Next steps checklist */}
      <div className="mb-10">
        <Label>Próximas ações automáticas</Label>
        {[
          { done: true,  text: "E-mail enviado ao solicitante com dados do estudante" },
          { done: true,  text: "E-mail enviado ao estudante com dados de contato do solicitante" },
          { done: false, text: "Aguardando aceite do estudante (prazo: 48h)" },
          { done: false, text: "Formalização do projeto após aceite" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 py-3" style={{ borderBottom: `1px solid ${NAVY}08` }}>
            <div
              className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ border: `1px solid ${item.done ? NAVY : `${NAVY}25`}`, background: item.done ? NAVY : "transparent" }}
            >
              {item.done && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4l2 2 3-3.5" stroke={OFFWHITE} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[12px]" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: item.done ? 0.6 : 0.35, fontWeight: 300 }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-3 px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-85"
          style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
        >
          Voltar à Fila
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className="px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-70"
          style={{ border: `1px solid ${NAVY}35`, color: NAVY, fontFamily: "Inter, sans-serif" }}
        >
          Exportar relatório
        </button>
      </div>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function NavBar({
  view,
  setView,
  onBack,
  demands,
}: {
  view: string;
  setView: (v: "triage") => void;
  onBack: () => void;
  demands: Demand[];
}) {
  const newCount = demands.filter((d) => d.status === "nova").length;
  return (
    <nav
      className="w-full flex items-center justify-between px-8 md:px-12 py-4 sticky top-0 z-30"
      style={{ background: OFFWHITE, borderBottom: `1px solid ${NAVY}15` }}
    >
      <div className="flex items-center gap-3">
        <div className="w-5 h-5" style={{ background: NAVY }} />
        <span className="text-[12px] tracking-[0.2em] uppercase font-semibold" style={{ fontFamily: "Inter, sans-serif", color: NAVY }}>
          VitrineIC
        </span>
        <span className="text-[9px] tracking-[0.18em] uppercase ml-2" style={{ fontFamily: "Space Mono, monospace", color: RED, opacity: 0.7 }}>
          · Admin — Curadoria
        </span>
      </div>
      <div className="hidden md:flex items-center gap-1">
        {[
          { id: "triage", label: "Triagem", badge: newCount > 0 ? newCount : null },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setView("triage")}
            className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase transition-all flex items-center gap-2"
            style={{
              fontFamily: "Inter, sans-serif",
              color: NAVY,
              background: view === item.id || view === "matchmaking" || view === "confirmed" ? `${NAVY}08` : "transparent",
              borderBottom: view === item.id || view === "matchmaking" || view === "confirmed" ? `2px solid ${RED}` : "2px solid transparent",
            }}
          >
            Demandas & Match
            {item.badge && (
              <span className="px-1.5 py-0.5 text-[8px]" style={{ background: RED, color: OFFWHITE, fontFamily: "Space Mono, monospace" }}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        className="text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80 opacity-40 flex items-center gap-2"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        Sair
      </button>
    </nav>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────

export default function CuratorArea({ onBack }: { onBack: () => void }) {
  const [demands, setDemands] = useState<Demand[]>(DEMANDS);
  const [view, setView] = useState<"triage" | "matchmaking" | "confirm" | "confirmed">("triage");
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS[0] | null>(null);

  const goToMatch = (d: Demand) => {
    setSelectedDemand(d);
    setView("matchmaking");
  };

  const goToConfirm = (s: typeof STUDENTS[0]) => {
    setSelectedStudent(s);
    setView("confirm");
  };

  const doConfirm = () => {
    if (selectedDemand) {
      setDemands(demands.map((d) => d.id === selectedDemand.id ? { ...d, status: "matched" } : d));
    }
    setView("confirmed");
  };

  return (
    <div style={{ background: OFFWHITE, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar view={view} setView={setView} onBack={onBack} demands={demands} />

      {view === "triage" && (
        <Triage
          demands={demands}
          setDemands={setDemands}
          onMatch={goToMatch}
        />
      )}

      {view === "matchmaking" && selectedDemand && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", height: "calc(100vh - 57px)" }}>
          {/* Sub-header */}
          <div
            className="flex items-center justify-between px-8 py-3 flex-shrink-0"
            style={{ borderBottom: `1px solid ${NAVY}12` }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView("triage")}
                className="flex items-center gap-2 text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80 opacity-40"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M8 5H2M4.5 2.5L2 5l2.5 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
                Triagem
              </button>
              <span style={{ color: NAVY, opacity: 0.2, fontSize: 12 }}>/</span>
              <span className="text-[9px] tracking-[0.16em] uppercase" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.6 }}>
                Matchmaking
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}>
                {selectedDemand.id}
              </span>
              <span className="text-[9px] px-2 py-0.5" style={{ fontFamily: "Space Mono, monospace", color: NAVY, border: `1px solid ${NAVY}20`, opacity: 0.5 }}>
                {selectedDemand.skills.length} requisitos
              </span>
            </div>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <Matchmaking demand={selectedDemand} onConfirm={goToConfirm} />
          </div>
        </div>
      )}

      {view === "confirmed" && selectedDemand && selectedStudent && (
        <MatchConfirmed
          demand={selectedDemand}
          student={selectedStudent}
          onBack={() => setView("triage")}
        />
      )}

      {view === "confirm" && selectedDemand && selectedStudent && (
        <ConfirmModal
          demand={selectedDemand}
          student={selectedStudent}
          onClose={() => setView("matchmaking")}
          onConfirm={doConfirm}
        />
      )}
    </div>
  );
}
