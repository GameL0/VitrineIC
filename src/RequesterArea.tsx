import { useState } from "react";

const NAVY = "#1C2B4A";
const RED = "#c1121f";
const OFFWHITE = "#F5F4F0";

// ─── Shared primitives ────────────────────────────────────────────────────────

function Label({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className="block text-[9px] tracking-[0.22em] uppercase mb-1.5"
      style={{
        fontFamily: "Space Mono, monospace",
        color: light ? OFFWHITE : NAVY,
        opacity: light ? 0.45 : 0.45,
      }}
    >
      {children}
    </span>
  );
}

function Input({
  label,
  type = "text",
  placeholder,
  mono,
  textarea,
  rows = 3,
  value,
  onChange,
}: {
  label?: string;
  type?: string;
  placeholder?: string;
  mono?: boolean;
  textarea?: boolean;
  rows?: number;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const base: React.CSSProperties = {
    fontFamily: mono ? "Space Mono, monospace" : "Inter, sans-serif",
    color: NAVY,
    fontSize: mono ? "12px" : "13px",
    border: `1px solid ${NAVY}35`,
    borderRadius: 0,
    background: "transparent",
    width: "100%",
    outline: "none",
    padding: "10px 12px",
    resize: "none",
    transition: "border-color 0.15s",
  };
  return (
    <div>
      {label && <Label>{label}</Label>}
      {textarea ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          style={base}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
          onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}35`)}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          style={base}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
          onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}35`)}
        />
      )}
    </div>
  );
}

function SelectField({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          fontFamily: "Inter, sans-serif",
          color: NAVY,
          fontSize: "13px",
          border: `1px solid ${NAVY}35`,
          borderRadius: 0,
          background: OFFWHITE,
          width: "100%",
          outline: "none",
          padding: "10px 12px",
          appearance: "none",
          cursor: "pointer",
        }}
      >
        <option value="">Selecione...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Rule() {
  return <div style={{ height: "1px", background: `${NAVY}15`, margin: "24px 0" }} />;
}

function NavBar({
  view,
  setView,
  onBack,
}: {
  view: string;
  setView: (v: string) => void;
  onBack: () => void;
}) {
  const navItems = [
    { id: "dashboard", label: "Demandas" },
    { id: "new", label: "Nova Demanda" },
    { id: "matches", label: "Matches" },
  ];
  return (
    <nav
      className="w-full flex items-center justify-between px-8 md:px-12 py-4 sticky top-0 z-30"
      style={{ background: OFFWHITE, borderBottom: `1px solid ${NAVY}15` }}
    >
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 flex-shrink-0" style={{ background: NAVY }} />
        <span
          className="text-[12px] tracking-[0.2em] uppercase font-semibold"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
        >
          VitrineIC
        </span>
        <span
          className="text-[9px] tracking-[0.18em] uppercase ml-2"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
        >
          · Área do Solicitante
        </span>
      </div>
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase transition-all"
            style={{
              fontFamily: "Inter, sans-serif",
              color: NAVY,
              background: view === item.id ? `${NAVY}08` : "transparent",
              borderBottom: view === item.id ? `2px solid ${RED}` : "2px solid transparent",
            }}
          >
            {item.label}
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

// ─── Status badge ─────────────────────────────────────────────────────────────

type StatusKey = "analise" | "buscando" | "em_andamento" | "concluido" | "cancelado";

const STATUS_MAP: Record<StatusKey, { label: string; color: string; shape: "circle" | "square" | "diamond" }> = {
  analise:      { label: "Em Análise",       color: `${NAVY}88`,  shape: "diamond" },
  buscando:     { label: "Buscando Alunos",  color: RED,          shape: "circle"  },
  em_andamento: { label: "Em Andamento",     color: RED,          shape: "square"  },
  concluido:    { label: "Concluído",        color: NAVY,         shape: "square"  },
  cancelado:    { label: "Cancelado",        color: `${NAVY}44`,  shape: "diamond" },
};

function StatusBadge({ status }: { status: StatusKey }) {
  const cfg = STATUS_MAP[status];
  const s = 8;
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ flexShrink: 0 }}>
        {cfg.shape === "circle" && (
          <circle cx={s / 2} cy={s / 2} r={s / 2 - 0.5} fill={cfg.color} />
        )}
        {cfg.shape === "square" && (
          <rect x={0.5} y={0.5} width={s - 1} height={s - 1} fill={cfg.color} />
        )}
        {cfg.shape === "diamond" && (
          <polygon
            points={`${s / 2},0.5 ${s - 0.5},${s / 2} ${s / 2},${s - 0.5} 0.5,${s / 2}`}
            fill={cfg.color}
          />
        )}
      </svg>
      <span
        className="text-[9px] tracking-[0.14em] uppercase"
        style={{
          fontFamily: "Space Mono, monospace",
          color: cfg.shape === "square" || cfg.shape === "circle" ? cfg.color : NAVY,
          opacity: cfg.shape === "diamond" && status === "cancelado" ? 0.45 : 1,
        }}
      >
        {cfg.label}
      </span>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

const DEMANDS = [
  {
    id: "VIC-2026-0041",
    title: "Sistema de Monitoramento IoT para Fábricas",
    area: "Eng. de Software",
    date: "12 set 2026",
    deadline: "30 nov 2026",
    status: "buscando" as StatusKey,
    applicants: 4,
  },
  {
    id: "VIC-2026-0038",
    title: "Análise Preditiva de Churn em SaaS",
    area: "IA / Dados",
    date: "05 set 2026",
    deadline: "15 out 2026",
    status: "em_andamento" as StatusKey,
    applicants: 1,
  },
  {
    id: "VIC-2026-0029",
    title: "Automação de Relatórios Financeiros com LLM",
    area: "IA / ML",
    date: "20 ago 2026",
    deadline: "20 out 2026",
    status: "analise" as StatusKey,
    applicants: 0,
  },
  {
    id: "VIC-2026-0017",
    title: "Plataforma de E-learning para Técnicos",
    area: "Sistemas Web",
    date: "10 jul 2026",
    deadline: "10 set 2026",
    status: "concluido" as StatusKey,
    applicants: 2,
  },
  {
    id: "VIC-2026-0009",
    title: "Dashboard de Sustentabilidade ESG",
    area: "Engenharia de Dados",
    date: "15 mai 2026",
    deadline: "15 jul 2026",
    status: "concluido" as StatusKey,
    applicants: 3,
  },
];

function Dashboard({ onNew, onViewMatch }: { onNew: () => void; onViewMatch: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  const activeCount = DEMANDS.filter((d) => d.status !== "concluido" && d.status !== "cancelado").length;

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p
            className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
          >
            <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
            Painel do Solicitante
          </p>
          <h1
            className="text-4xl"
            style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
          >
            Suas Demandas
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6 mr-2">
            {[
              { val: DEMANDS.length, label: "Total" },
              { val: activeCount, label: "Ativas" },
              { val: DEMANDS.filter((d) => d.status === "concluido").length, label: "Concluídas" },
            ].map((s) => (
              <div key={s.label} className="text-right">
                <p
                  className="text-2xl leading-none"
                  style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
                >
                  {s.val}
                </p>
                <p
                  className="text-[9px] mt-1"
                  style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={onNew}
            className="flex items-center gap-3 px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-85"
            style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
          >
            + Nova Demanda
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ border: `1px solid ${NAVY}18` }}>
        {/* Header row */}
        <div
          className="hidden md:grid px-6 py-3"
          style={{
            gridTemplateColumns: "180px 1fr 120px 120px 160px 80px",
            borderBottom: `1px solid ${NAVY}18`,
            background: `${NAVY}05`,
          }}
        >
          {["ID da Demanda", "Título", "Área", "Prazo", "Status", "Match"].map((h) => (
            <span
              key={h}
              className="text-[9px] tracking-[0.18em] uppercase"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
            >
              {h}
            </span>
          ))}
        </div>

        {DEMANDS.map((d, i) => (
          <div
            key={d.id}
            className="cursor-pointer transition-all"
            style={{
              borderBottom: i < DEMANDS.length - 1 ? `1px solid ${NAVY}10` : "none",
              background: selected === d.id ? `${NAVY}06` : "transparent",
            }}
            onClick={() => setSelected(selected === d.id ? null : d.id)}
            onMouseEnter={(e) => {
              if (selected !== d.id) (e.currentTarget as HTMLElement).style.background = `${NAVY}04`;
            }}
            onMouseLeave={(e) => {
              if (selected !== d.id) (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {/* Main row */}
            <div
              className="px-6 py-4 md:grid md:items-center gap-4"
              style={{ gridTemplateColumns: "180px 1fr 120px 120px 160px 80px" }}
            >
              <span
                className="block text-[11px] mb-1 md:mb-0"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
              >
                {d.id}
              </span>
              <span
                className="block text-[14px] font-medium mb-1 md:mb-0"
                style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
              >
                {d.title}
              </span>
              <span
                className="hidden md:block text-[10px]"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
              >
                {d.area}
              </span>
              <span
                className="hidden md:block text-[10px]"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
              >
                {d.deadline}
              </span>
              <div className="hidden md:block">
                <StatusBadge status={d.status} />
              </div>
              <div className="hidden md:flex items-center">
                {d.status === "em_andamento" || d.status === "buscando" ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); onViewMatch(); }}
                    className="text-[9px] tracking-[0.14em] uppercase flex items-center gap-1.5 transition-opacity hover:opacity-80"
                    style={{
                      fontFamily: "Space Mono, monospace",
                      color: RED,
                      borderBottom: `1px solid ${RED}`,
                    }}
                  >
                    {d.applicants > 0 ? `Ver (${d.applicants})` : "—"}
                  </button>
                ) : (
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.25 }}
                  >
                    {d.applicants > 0 ? `${d.applicants} concl.` : "—"}
                  </span>
                )}
              </div>
            </div>

            {/* Expanded detail */}
            {selected === d.id && (
              <div
                className="px-6 pb-5 grid md:grid-cols-4 gap-4"
                style={{ borderTop: `1px solid ${NAVY}10` }}
              >
                <div className="md:col-span-1">
                  <Label>Registrado em</Label>
                  <p className="text-[12px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.6 }}>{d.date}</p>
                </div>
                <div className="md:col-span-1">
                  <Label>Prazo final</Label>
                  <p className="text-[12px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.6 }}>{d.deadline}</p>
                </div>
                <div className="md:col-span-1">
                  <Label>Candidatos</Label>
                  <p className="text-[12px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.6 }}>{d.applicants}</p>
                </div>
                <div className="md:col-span-1 flex items-end">
                  <button
                    className="text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-75"
                    style={{
                      fontFamily: "Space Mono, monospace",
                      color: NAVY,
                      borderBottom: `1px solid ${NAVY}40`,
                      opacity: 0.45,
                    }}
                  >
                    Editar demanda
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── New Demand Wizard ────────────────────────────────────────────────────────

const WIZARD_STEPS = [
  { n: "01", label: "Descrição" },
  { n: "02", label: "Escopo" },
  { n: "03", label: "Requisitos" },
  { n: "04", label: "Revisão" },
];

function WizardStepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center mb-14">
      {WIZARD_STEPS.map((s, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <span
              className="text-[20px] leading-none transition-all"
              style={{
                fontFamily: "DM Serif Display, Georgia, serif",
                color: i < current ? RED : i === current ? NAVY : `${NAVY}28`,
              }}
            >
              {s.n}
            </span>
            <span
              className="text-[9px] tracking-[0.14em] uppercase whitespace-nowrap"
              style={{
                fontFamily: "Space Mono, monospace",
                color: i === current ? NAVY : `${NAVY}30`,
              }}
            >
              {s.label}
            </span>
          </div>
          {i < WIZARD_STEPS.length - 1 && (
            <div
              className="mx-5 mb-4 flex-shrink-0"
              style={{
                width: "48px",
                height: "1px",
                background: i < current ? RED : `${NAVY}18`,
                transition: "background 0.3s",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const AREA_OPTIONS = [
  "Inteligência Artificial / ML",
  "Engenharia de Software",
  "Sistemas Web / Mobile",
  "Redes & Segurança",
  "Banco de Dados / Dados",
  "Computação em Nuvem",
  "Robótica / Embarcados",
  "Bioinformática",
  "Outra área",
];

const SCOPE_OPTIONS = ["Pequeno (< 3 meses)", "Médio (3–6 meses)", "Grande (6–12 meses)"];

function NewDemandWizard({ onSuccess }: { onSuccess: (protocol: string) => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: "",
    problem: "",
    audience: "",
    area: "",
    scope: "",
    deadline: "",
    budget: "",
    skills: "",
    teamSize: "",
    notes: "",
  });

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const next = () => {
    if (step < 3) setStep(step + 1);
    else {
      const protocol = `VIC-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
      onSuccess(protocol);
    }
  };

  const fieldsBystep = [
    /* step 0 */
    <div key="s0" className="flex flex-col gap-6">
      <h2 className="text-3xl mb-1" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
        Descrição do Problema
      </h2>
      <p className="text-sm mb-4" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}>
        Descreva o desafio que sua organização enfrenta com clareza e objetividade.
      </p>
      <Input
        label="Título da demanda"
        placeholder="Ex: Sistema de monitoramento em tempo real para sensores IoT"
        value={form.title}
        onChange={(v) => update("title", v)}
      />
      <Input
        label="Descrição do problema"
        placeholder="Explique o contexto, o problema atual e por que ele precisa ser resolvido..."
        textarea
        rows={5}
        value={form.problem}
        onChange={(v) => update("problem", v)}
      />
      <div className="grid md:grid-cols-2 gap-5">
        <Input
          label="Público-alvo / beneficiários"
          placeholder="Ex: Operadores de fábrica, equipe de TI..."
          value={form.audience}
          onChange={(v) => update("audience", v)}
        />
        <SelectField
          label="Área tecnológica"
          options={AREA_OPTIONS}
          value={form.area}
          onChange={(v) => update("area", v)}
        />
      </div>
    </div>,

    /* step 1 */
    <div key="s1" className="flex flex-col gap-6">
      <h2 className="text-3xl mb-1" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
        Escopo & Prazos
      </h2>
      <p className="text-sm mb-4" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}>
        Defina o tamanho do projeto, cronograma e recursos disponíveis.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        <SelectField
          label="Escopo esperado"
          options={SCOPE_OPTIONS}
          value={form.scope}
          onChange={(v) => update("scope", v)}
        />
        <Input
          label="Prazo final (deadline)"
          type="date"
          value={form.deadline}
          onChange={(v) => update("deadline", v)}
          mono
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Input
          label="Orçamento disponível (R$)"
          placeholder="Ex: 8.000,00 ou A combinar"
          mono
          value={form.budget}
          onChange={(v) => update("budget", v)}
        />
        <Input
          label="Tamanho da equipe desejada"
          placeholder="Ex: 1 estudante, dupla, grupo de 3..."
          value={form.teamSize}
          onChange={(v) => update("teamSize", v)}
        />
      </div>
      <Input
        label="Entregas esperadas"
        placeholder="Descreva os artefatos finais esperados: código-fonte, relatório, protótipo, deploy..."
        textarea
        rows={4}
        value={form.notes}
        onChange={(v) => update("notes", v)}
      />
    </div>,

    /* step 2 */
    <div key="s2" className="flex flex-col gap-6">
      <h2 className="text-3xl mb-1" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
        Requisitos Técnicos
      </h2>
      <p className="text-sm mb-4" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}>
        Liste as tecnologias, habilidades e pré-requisitos desejados.
      </p>
      <Input
        label="Habilidades técnicas necessárias"
        placeholder="Ex: Python, React, Docker, PostgreSQL..."
        mono
        value={form.skills}
        onChange={(v) => update("skills", v)}
      />
      <Input
        label="Nível acadêmico mínimo"
        placeholder="Ex: 3º semestre em diante, qualquer semestre..."
        value={form.audience}
        onChange={(v) => update("audience", v)}
      />
      <Input
        label="Requisitos adicionais / observações"
        placeholder="Sigilo, NDA, disponibilidade presencial, metodologia ágil..."
        textarea
        rows={4}
        value={form.notes}
        onChange={(v) => update("notes", v)}
      />
      <div
        className="flex items-start gap-4 p-4"
        style={{ border: `1px solid ${NAVY}18`, background: `${NAVY}03` }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: NAVY, opacity: 0.3, flexShrink: 0, marginTop: 2 }}>
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.1" />
          <path d="M8 5v4M8 11v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <p
          className="text-[11px] leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.45, fontWeight: 300 }}
        >
          Após submissão, a equipe de curadoria do IC revisará a demanda em até 5 dias úteis.
          Você receberá notificação por e-mail ao ser aprovada e quando houver match com estudantes.
        </p>
      </div>
    </div>,

    /* step 3 — review */
    <div key="s3">
      <h2 className="text-3xl mb-1" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
        Revisão Final
      </h2>
      <p className="text-sm mb-8" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}>
        Confirme os dados antes de enviar a demanda.
      </p>
      <div style={{ border: `1px solid ${NAVY}18` }}>
        {[
          { label: "Título", value: form.title || "—" },
          { label: "Área", value: form.area || "—" },
          { label: "Escopo", value: form.scope || "—" },
          { label: "Prazo", value: form.deadline || "—" },
          { label: "Orçamento", value: form.budget || "—" },
          { label: "Equipe", value: form.teamSize || "—" },
          { label: "Skills", value: form.skills || "—" },
        ].map((r, i, arr) => (
          <div
            key={r.label}
            className="grid px-6 py-3.5"
            style={{
              gridTemplateColumns: "160px 1fr",
              borderBottom: i < arr.length - 1 ? `1px solid ${NAVY}10` : "none",
            }}
          >
            <span
              className="text-[9px] tracking-[0.18em] uppercase"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
            >
              {r.label}
            </span>
            <span
              className="text-[13px]"
              style={{ fontFamily: r.label === "Skills" || r.label === "Prazo" ? "Space Mono, monospace" : "Inter, sans-serif", color: NAVY, opacity: 0.75 }}
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>
      {form.problem && (
        <>
          <Rule />
          <Label>Descrição do problema</Label>
          <p
            className="text-[13px] leading-relaxed mt-2"
            style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.6, fontWeight: 300 }}
          >
            {form.problem}
          </p>
        </>
      )}
    </div>,
  ];

  return (
    <div className="px-8 md:px-16 py-14 max-w-4xl mx-auto">
      <WizardStepIndicator current={step} />
      <div className="min-h-[440px]">{fieldsBystep[step]}</div>
      <div
        className="flex items-center justify-between mt-12 pt-6"
        style={{ borderTop: `1px solid ${NAVY}15` }}
      >
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: step === 0 ? 0.2 : 0.5 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Anterior
        </button>
        <div className="flex items-center gap-3">
          <span
            className="text-[9px] tracking-[0.14em]"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.25 }}
          >
            {step + 1} / 4
          </span>
          <button
            onClick={next}
            className="flex items-center gap-3 px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-88"
            style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
          >
            {step === 3 ? "Enviar Demanda" : "Próximo"}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

const PIPELINE_STEPS = [
  { n: "01", label: "Análise",   desc: "Equipe de curadoria revisa a demanda e valida escopo técnico." },
  { n: "02", label: "Curadoria", desc: "Perfis de estudantes elegíveis são filtrados e ranqueados." },
  { n: "03", label: "Match",     desc: "Candidatos apresentados ao solicitante para confirmação." },
  { n: "04", label: "Início",    desc: "Projeto formalizado e equipe notificada para começar." },
];

function SuccessScreen({ protocol, onDashboard }: { protocol: string; onDashboard: () => void }) {
  return (
    <div className="px-8 md:px-16 py-16 max-w-screen-lg mx-auto">
      <div className="mb-16">
        <p
          className="text-[9px] tracking-[0.25em] uppercase mb-6 flex items-center gap-3"
          style={{ fontFamily: "Space Mono, monospace", color: RED, opacity: 0.8 }}
        >
          <span className="inline-block w-6" style={{ height: "1px", background: RED }} />
          Demanda enviada
        </p>
        <h1
          className="text-7xl md:text-9xl leading-none tracking-tight mb-8"
          style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
        >
          Sucesso.
        </h1>
        <div
          className="inline-flex items-center gap-4 px-6 py-4"
          style={{ border: `1px solid ${NAVY}25`, background: `${NAVY}04` }}
        >
          <span
            className="text-[9px] tracking-[0.18em] uppercase"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
          >
            Protocolo
          </span>
          <span
            className="text-2xl font-bold tracking-wider"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
          >
            {protocol}
          </span>
        </div>
        <p
          className="text-[13px] mt-6 max-w-lg leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}
        >
          Sua demanda foi registrada e está em fila de análise. Você receberá atualizações
          por e-mail conforme o processo avança.
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <p
          className="text-[9px] tracking-[0.22em] uppercase mb-8"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
        >
          Próximas etapas
        </p>

        {/* Horizontal timeline */}
        <div className="relative hidden md:block">
          {/* Connecting line */}
          <div
            className="absolute top-[20px] left-0 right-0"
            style={{ height: "1px", background: `${NAVY}18` }}
          />
          <div className="grid grid-cols-4 gap-0 relative">
            {PIPELINE_STEPS.map((s, i) => (
              <div key={i} className="flex flex-col items-start pr-6">
                <div className="flex items-center gap-3 mb-5 relative">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 relative z-10"
                    style={{
                      background: i === 0 ? RED : OFFWHITE,
                      border: `1px solid ${i === 0 ? RED : `${NAVY}30`}`,
                    }}
                  >
                    <span
                      className="text-[11px] font-bold"
                      style={{
                        fontFamily: "Space Mono, monospace",
                        color: i === 0 ? OFFWHITE : NAVY,
                        opacity: i === 0 ? 1 : 0.4,
                      }}
                    >
                      {s.n}
                    </span>
                  </div>
                </div>
                <h3
                  className="text-[15px] mb-2"
                  style={{
                    fontFamily: "DM Serif Display, Georgia, serif",
                    color: i === 0 ? NAVY : `${NAVY}88`,
                  }}
                >
                  {s.label}
                </h3>
                <p
                  className="text-[11px] leading-relaxed"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: NAVY,
                    opacity: i === 0 ? 0.55 : 0.3,
                    fontWeight: 300,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden flex flex-col gap-0">
          {PIPELINE_STEPS.map((s, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: i === 0 ? RED : OFFWHITE,
                    border: `1px solid ${i === 0 ? RED : `${NAVY}25`}`,
                  }}
                >
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: "Space Mono, monospace", color: i === 0 ? OFFWHITE : NAVY, opacity: i === 0 ? 1 : 0.4 }}
                  >
                    {s.n}
                  </span>
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="flex-1 w-px my-1" style={{ background: `${NAVY}15` }} />
                )}
              </div>
              <div className="pb-6">
                <h3 className="text-[15px] mb-1" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: i === 0 ? NAVY : `${NAVY}88` }}>
                  {s.label}
                </h3>
                <p className="text-[11px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: i === 0 ? 0.5 : 0.28, fontWeight: 300 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={onDashboard}
          className="flex items-center gap-3 px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-85"
          style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
        >
          Ver Demandas
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className="px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-70"
          style={{ border: `1px solid ${NAVY}40`, color: NAVY, fontFamily: "Inter, sans-serif" }}
        >
          Nova Demanda
        </button>
      </div>
    </div>
  );
}

// ─── Match Screen ─────────────────────────────────────────────────────────────

const MATCHED_STUDENTS = [
  {
    name: "Rafael Moreira Santos",
    initials: "RM",
    course: "Ciência da Computação",
    semester: "5º semestre",
    university: "Unicamp",
    gpa: "9,1",
    skills: ["Python", "PyTorch", "Docker", "PostgreSQL", "Node.js"],
    bio: "Pesquisa em aprendizado de máquina aplicado a séries temporais. Projeto de IC em andamento com Prof. Dr. Araújo na área de detecção de anomalias.",
    github: "github.com/rafaelms",
    score: 94,
    demand: "VIC-2026-0041",
  },
  {
    name: "Isadora Lima Costa",
    initials: "IL",
    course: "Engenharia de Computação",
    semester: "6º semestre",
    university: "Unicamp",
    gpa: "8,7",
    skills: ["Python", "React", "AWS", "PostgreSQL", "Scikit-learn"],
    bio: "Especialização em sistemas de dados e dashboards analíticos. Projetos publicados com foco em sustentabilidade e métricas ESG.",
    github: "github.com/isadoralc",
    score: 88,
    demand: "VIC-2026-0038",
  },
];

function MatchCard({ student }: { student: typeof MATCHED_STUDENTS[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{ border: `1px solid ${NAVY}20` }}
      className="transition-all"
    >
      {/* Card header */}
      <div
        className="grid px-6 py-6 gap-6 cursor-pointer"
        style={{ gridTemplateColumns: "64px 1fr auto" }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Avatar */}
        <div
          className="w-16 h-16 flex items-center justify-center flex-shrink-0"
          style={{ background: NAVY }}
        >
          <span
            className="text-lg"
            style={{ fontFamily: "DM Serif Display, Georgia, serif", color: OFFWHITE }}
          >
            {student.initials}
          </span>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h3
              className="text-xl"
              style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
            >
              {student.name}
            </h3>
            <div
              className="px-2 py-0.5 flex items-center gap-1.5"
              style={{ border: `1px solid ${RED}`, background: `${RED}08` }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: RED }} />
              <span
                className="text-[9px] tracking-[0.14em] uppercase"
                style={{ fontFamily: "Space Mono, monospace", color: RED }}
              >
                Match {student.score}%
              </span>
            </div>
          </div>
          <p
            className="text-[11px] mb-3"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.45 }}
          >
            {student.course} · {student.semester} · {student.university}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {student.skills.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 text-[9px] tracking-[0.12em] uppercase"
                style={{
                  fontFamily: "Space Mono, monospace",
                  color: NAVY,
                  border: `1px solid ${NAVY}22`,
                  opacity: 0.65,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Score bar */}
        <div className="flex flex-col items-end justify-between">
          <div className="flex flex-col items-end gap-1">
            <span
              className="text-[9px] tracking-[0.14em] uppercase"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}
            >
              Compatibilidade
            </span>
            <div className="flex items-end gap-[3px]">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "4px",
                    height: `${6 + i * 2}px`,
                    background: i < Math.round(student.score / 10) ? NAVY : `${NAVY}18`,
                  }}
                />
              ))}
            </div>
          </div>
          <button
            className="text-[9px] tracking-[0.14em] uppercase flex items-center gap-1.5 mt-4 transition-opacity hover:opacity-70"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
          >
            {expanded ? "Recolher" : "Ver perfil"}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d={expanded ? "M2 7l3-4 3 4" : "M2 3l3 4 3-4"}
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{ borderTop: `1px solid ${NAVY}12` }}>
          <div className="grid md:grid-cols-3 gap-0">
            {/* Bio */}
            <div className="px-6 py-5 md:col-span-2" style={{ borderRight: `1px solid ${NAVY}10` }}>
              <Label>Sobre o estudante</Label>
              <p
                className="text-[12px] leading-relaxed mt-2"
                style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.55, fontWeight: 300 }}
              >
                {student.bio}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: NAVY, opacity: 0.3 }}>
                  <rect x="1" y="2" width="7" height="8" rx="0.5" stroke="currentColor" strokeWidth="1" />
                  <path d="M5 1h5v5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M5 7l5-5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
                <span
                  className="text-[10px]"
                  style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
                >
                  {student.github}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="px-6 py-5">
              <Label>Dados acadêmicos</Label>
              <div className="flex flex-col gap-2 mt-2">
                {[
                  { label: "IRA", val: student.gpa },
                  { label: "Demanda", val: student.demand },
                  { label: "Curso", val: student.course },
                  { label: "Semestre", val: student.semester },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between py-1.5"
                    style={{ borderBottom: `1px solid ${NAVY}08` }}
                  >
                    <span
                      className="text-[9px] uppercase tracking-wider"
                      style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
                    >
                      {m.label}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.6 }}
                    >
                      {m.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div
            className="px-6 py-5 flex flex-col sm:flex-row gap-3"
            style={{ borderTop: `1px solid ${NAVY}10` }}
          >
            <button
              className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 text-[10px] tracking-[0.18em] uppercase font-semibold transition-all"
              style={{ background: RED, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M1 4l6 5 6-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Enviar e-mail para o aluno
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 text-[10px] tracking-[0.18em] uppercase font-semibold transition-all"
              style={{ border: `1.5px solid ${RED}`, color: RED, background: "transparent", fontFamily: "Inter, sans-serif" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${RED}08`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2.5C2 2.5 4 2 5.5 4.5C5.5 4.5 6 6 4.5 7.5C4.5 7.5 6 10.5 9.5 11.5C9.5 11.5 11 10 12 10.5C12 10.5 13.5 12 12 13C12 13 8 14 2.5 7.5C2.5 7.5 1 2.5 2 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Abrir WhatsApp
            </button>
            <button
              className="flex items-center justify-center gap-2 px-5 py-3.5 text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-60 opacity-40"
              style={{ border: `1px solid ${NAVY}30`, color: NAVY, fontFamily: "Space Mono, monospace" }}
            >
              Ver perfil completo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MatchScreen() {
  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="mb-10">
        <p
          className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
        >
          <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
          Matches ativos
        </p>
        <h1
          className="text-4xl mb-3"
          style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
        >
          Estudantes Selecionados
        </h1>
        <p
          className="text-[13px] max-w-xl"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.45, fontWeight: 300 }}
        >
          Estes estudantes foram selecionados pela curadoria do IC com base nos requisitos
          das suas demandas ativas.
        </p>
      </div>

      {/* Summary bar */}
      <div
        className="flex items-center gap-8 px-6 py-4 mb-8"
        style={{ background: `${NAVY}05`, border: `1px solid ${NAVY}12` }}
      >
        {[
          { val: "2", label: "Matches ativos" },
          { val: "VIC-2026-0041", label: "Demanda principal", mono: true },
          { val: "VIC-2026-0038", label: "Demanda secundária", mono: true },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span
              className="text-[18px]"
              style={{ fontFamily: s.mono ? "Space Mono, monospace" : "DM Serif Display, Georgia, serif", color: NAVY, fontSize: s.mono ? "12px" : "18px" }}
            >
              {s.val}
            </span>
            <span
              className="text-[9px] tracking-[0.14em] uppercase"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {MATCHED_STUDENTS.map((s) => (
          <MatchCard key={s.name} student={s} />
        ))}
      </div>

      <div
        className="mt-8 px-6 py-5 flex items-center gap-4"
        style={{ border: `1px dashed ${NAVY}20` }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: NAVY, opacity: 0.25, flexShrink: 0 }}>
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.1" />
          <path d="M8 5v4M8 11v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <p
          className="text-[11px] leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.35, fontWeight: 300 }}
        >
          Novos matches são notificados por e-mail. Após confirmar interesse, o estudante
          receberá seus dados de contato e o projeto poderá ser formalizado.
        </p>
      </div>
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────

export default function RequesterArea({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<"dashboard" | "new" | "success" | "matches">("dashboard");
  const [protocol, setProtocol] = useState("");

  const handleSetView = (v: string) => setView(v as typeof view);

  return (
    <div style={{ background: OFFWHITE, minHeight: "100vh" }}>
      <NavBar view={view} setView={handleSetView} onBack={onBack} />
      {view === "dashboard" && (
        <Dashboard
          onNew={() => setView("new")}
          onViewMatch={() => setView("matches")}
        />
      )}
      {view === "new" && (
        <NewDemandWizard
          onSuccess={(p) => {
            setProtocol(p);
            setView("success");
          }}
        />
      )}
      {view === "success" && (
        <SuccessScreen
          protocol={protocol}
          onDashboard={() => setView("dashboard")}
        />
      )}
      {view === "matches" && <MatchScreen />}
    </div>
  );
}
