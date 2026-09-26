import { useState, useRef } from "react";

const NAVY = "#1C2B4A";
const RED = "#c1121f";
const OFFWHITE = "#F5F4F0";

// ─── Shared primitives ────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block text-[9px] tracking-[0.22em] uppercase mb-1.5"
      style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.45 }}
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

function Rule() {
  return <div style={{ height: "1px", background: `${NAVY}15`, margin: "24px 0" }} />;
}

function Tag({
  children,
  active,
  accent,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  accent?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase transition-all"
      style={{
        fontFamily: "Space Mono, monospace",
        border: `1px solid ${active ? (accent ? RED : NAVY) : `${NAVY}35`}`,
        background: active ? (accent ? RED : NAVY) : "transparent",
        color: active ? OFFWHITE : NAVY,
        opacity: active ? 1 : 0.65,
      }}
    >
      {children}
    </button>
  );
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
    { id: "dashboard", label: "Dashboard" },
    { id: "lab", label: "Laboratório" },
    { id: "profile", label: "Perfil" },
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
          · Área do Estudante
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
        className="text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-100 opacity-40 flex items-center gap-2"
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

// ─── Onboarding Wizard ────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  const steps = [
    { n: "01", label: "Perfil & Interesses" },
    { n: "02", label: "Hard Skills" },
    { n: "03", label: "Portfólio" },
  ];
  return (
    <div className="flex items-center gap-0 mb-14">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className="text-[22px] leading-none transition-all"
                style={{
                  fontFamily: "DM Serif Display, Georgia, serif",
                  color: i < current ? RED : i === current ? NAVY : `${NAVY}30`,
                }}
              >
                {s.n}
              </span>
            </div>
            <span
              className="text-[9px] tracking-[0.16em] uppercase whitespace-nowrap"
              style={{
                fontFamily: "Space Mono, monospace",
                color: i === current ? NAVY : `${NAVY}30`,
              }}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="mx-6 mt-[-12px] flex-shrink-0"
              style={{
                width: "60px",
                height: "1px",
                background: i < current ? RED : `${NAVY}20`,
                transition: "background 0.3s",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Step1({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const interests = [
    "Inteligência Artificial", "Engenharia de Software", "Redes & Sistemas",
    "Segurança da Informação", "Banco de Dados", "Computação Gráfica",
    "Sistemas Embarcados", "Bioinformática", "HCI & Design",
  ];
  const toggleInterest = (item: string) => {
    const curr: string[] = data.interests || [];
    setData({
      ...data,
      interests: curr.includes(item) ? curr.filter((x: string) => x !== item) : [...curr, item],
    });
  };

  return (
    <div>
      <h2
        className="text-3xl mb-2"
        style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
      >
        Perfil & Interesses
      </h2>
      <p className="text-sm mb-10" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}>
        Configure sua identidade na plataforma.
      </p>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Photo upload */}
        <div className="md:col-span-3">
          <Label>Foto de Perfil</Label>
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full aspect-square flex flex-col items-center justify-center gap-3 transition-all"
            style={{ border: `1px dashed ${NAVY}35` }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = NAVY)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${NAVY}35`)}
          >
            {data.photo ? (
              <img
                src={data.photo}
                alt="Foto"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ color: NAVY, opacity: 0.3 }}>
                  <circle cx="14" cy="11" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M4 22c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span
                  className="text-[9px] tracking-[0.14em] uppercase text-center"
                  style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
                >
                  Carregar foto
                </span>
              </>
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" />
        </div>

        <div className="md:col-span-9 flex flex-col gap-5">
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Nome completo"
              placeholder="Ana Carolina Ferreira"
              value={data.name || ""}
              onChange={(v) => setData({ ...data, name: v })}
            />
            <Input
              label="Semestre atual"
              placeholder="4º semestre"
              mono
              value={data.semester || ""}
              onChange={(v) => setData({ ...data, semester: v })}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Curso"
              placeholder="Eng. de Computação"
              value={data.course || ""}
              onChange={(v) => setData({ ...data, course: v })}
            />
            <Input
              label="E-mail institucional"
              type="email"
              placeholder="a123456@dac.unicamp.br"
              mono
              value={data.email || ""}
              onChange={(v) => setData({ ...data, email: v })}
            />
          </div>
          <Input
            label="Bio curta"
            placeholder="Descreva brevemente seu percurso e objetivos..."
            textarea
            rows={3}
            value={data.bio || ""}
            onChange={(v) => setData({ ...data, bio: v })}
          />
        </div>
      </div>

      <Rule />

      <div>
        <Label>Áreas de interesse</Label>
        <p className="text-[11px] mb-4" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.4 }}>
          Selecione todas que se aplicam
        </p>
        <div className="flex flex-wrap gap-2">
          {interests.map((item) => (
            <Tag
              key={item}
              active={(data.interests || []).includes(item)}
              onClick={() => toggleInterest(item)}
            >
              {item}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}

const ALL_SKILLS = [
  { name: "Python", cat: "Linguagens" },
  { name: "JavaScript", cat: "Linguagens" },
  { name: "TypeScript", cat: "Linguagens" },
  { name: "C/C++", cat: "Linguagens" },
  { name: "Java", cat: "Linguagens" },
  { name: "Rust", cat: "Linguagens" },
  { name: "React", cat: "Frontend" },
  { name: "Node.js", cat: "Backend" },
  { name: "PostgreSQL", cat: "Dados" },
  { name: "MongoDB", cat: "Dados" },
  { name: "Docker", cat: "DevOps" },
  { name: "Kubernetes", cat: "DevOps" },
  { name: "PyTorch", cat: "IA/ML" },
  { name: "TensorFlow", cat: "IA/ML" },
  { name: "scikit-learn", cat: "IA/ML" },
  { name: "Git", cat: "Ferramentas" },
  { name: "Linux", cat: "Ferramentas" },
  { name: "AWS", cat: "Cloud" },
];

const LEVELS = ["Básico", "Intermediário", "Avançado", "Especialista"];

function ProficiencyBars({ level, onChange }: { level: number; onChange: (l: number) => void }) {
  return (
    <div className="flex gap-[3px] items-end h-4">
      {[1, 2, 3, 4].map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className="transition-all"
          style={{
            width: "8px",
            height: `${l * 4 + 4}px`,
            background: l <= level ? NAVY : `${NAVY}22`,
          }}
        />
      ))}
    </div>
  );
}

function Step2({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  const skills: { name: string; level: number }[] = data.skills || [];

  const hasSkill = (name: string) => skills.find((s) => s.name === name);

  const toggleSkill = (name: string) => {
    if (hasSkill(name)) {
      setData({ ...data, skills: skills.filter((s) => s.name !== name) });
    } else {
      setData({ ...data, skills: [...skills, { name, level: 2 }] });
    }
  };

  const setLevel = (name: string, level: number) => {
    setData({
      ...data,
      skills: skills.map((s) => (s.name === name ? { ...s, level } : s)),
    });
  };

  const categories = [...new Set(ALL_SKILLS.map((s) => s.cat))];

  return (
    <div>
      <h2
        className="text-3xl mb-2"
        style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
      >
        Hard Skills
      </h2>
      <p className="text-sm mb-10" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}>
        Selecione suas competências técnicas e indique o nível de proficiência.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Selector */}
        <div>
          <Label>Selecionar competências</Label>
          <div className="flex flex-col gap-4 mt-3">
            {categories.map((cat) => (
              <div key={cat}>
                <span
                  className="text-[9px] tracking-[0.18em] uppercase block mb-2"
                  style={{ fontFamily: "Space Mono, monospace", color: RED, opacity: 0.7 }}
                >
                  {cat}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_SKILLS.filter((s) => s.cat === cat).map((s) => (
                    <Tag
                      key={s.name}
                      active={!!hasSkill(s.name)}
                      onClick={() => toggleSkill(s.name)}
                    >
                      {s.name}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Level configuration */}
        <div>
          <Label>Nível de proficiência</Label>
          {skills.length === 0 ? (
            <div
              className="flex items-center justify-center h-32 mt-3"
              style={{ border: `1px dashed ${NAVY}25` }}
            >
              <span
                className="text-[10px] tracking-[0.14em] uppercase"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}
              >
                Selecione skills ao lado
              </span>
            </div>
          ) : (
            <div className="flex flex-col mt-3" style={{ border: `1px solid ${NAVY}15` }}>
              {skills.map((s, i) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: i < skills.length - 1 ? `1px solid ${NAVY}10` : "none" }}
                >
                  <div>
                    <span
                      className="text-[12px] font-medium block"
                      style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
                    >
                      {s.name}
                    </span>
                    <span
                      className="text-[9px]"
                      style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
                    >
                      {LEVELS[s.level - 1]}
                    </span>
                  </div>
                  <ProficiencyBars level={s.level} onChange={(l) => setLevel(s.name, l)} />
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center gap-6">
            {LEVELS.map((l, i) => (
              <div key={l} className="flex items-center gap-1.5">
                <div className="flex gap-[2px] items-end h-3">
                  {[1, 2, 3, 4].map((b) => (
                    <div
                      key={b}
                      style={{
                        width: "5px",
                        height: `${b * 3 + 1}px`,
                        background: b <= i + 1 ? NAVY : `${NAVY}22`,
                      }}
                    />
                  ))}
                </div>
                <span
                  className="text-[9px]"
                  style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
                >
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3({ data, setData }: { data: any; setData: (d: any) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h2
        className="text-3xl mb-2"
        style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
      >
        Portfólio
      </h2>
      <p className="text-sm mb-10" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}>
        Vincule seus repositórios e trabalhos anteriores.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-5">
          <Input
            label="GitHub"
            placeholder="github.com/usuario"
            mono
            value={data.github || ""}
            onChange={(v) => setData({ ...data, github: v })}
          />
          <Input
            label="LinkedIn"
            placeholder="linkedin.com/in/usuario"
            mono
            value={data.linkedin || ""}
            onChange={(v) => setData({ ...data, linkedin: v })}
          />
          <Input
            label="Site / Portfólio"
            placeholder="seusite.dev"
            mono
            value={data.site || ""}
            onChange={(v) => setData({ ...data, site: v })}
          />
          <Input
            label="Lattes"
            placeholder="lattes.cnpq.br/xxxxxxxx"
            mono
            value={data.lattes || ""}
            onChange={(v) => setData({ ...data, lattes: v })}
          />
        </div>

        <div>
          <Label>Trabalhos anteriores</Label>
          <div className="flex flex-col gap-2 mb-4">
            {(data.docs || []).map((d: string, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3"
                style={{ border: `1px solid ${NAVY}20` }}
              >
                <div className="flex items-center gap-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: NAVY, opacity: 0.5 }}>
                    <rect x="1.5" y="1" width="9" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
                    <path d="M4 4.5h5M4 7h5M4 9.5h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                  <span
                    className="text-[11px]"
                    style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
                  >
                    {d}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setData({ ...data, docs: (data.docs || []).filter((_: any, j: number) => j !== i) })
                  }
                  style={{ color: NAVY, opacity: 0.3 }}
                  className="hover:opacity-70 transition-opacity"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => fileRef.current?.click()}
            className="w-full py-8 flex flex-col items-center gap-3 transition-all"
            style={{ border: `1px dashed ${NAVY}30` }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = NAVY)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${NAVY}30`)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color: NAVY, opacity: 0.3 }}>
              <path d="M11 14V4M7 8l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M4 17h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span
              className="text-[10px] tracking-[0.14em] uppercase"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
            >
              Adicionar documento
            </span>
            <span
              className="text-[10px]"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.25 }}
            >
              PDF, DOCX, ZIP · máx. 20 MB
            </span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.docx,.zip"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []).map((f) => f.name);
              setData({ ...data, docs: [...(data.docs || []), ...files] });
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Onboarding({ onComplete }: { onComplete: (data: any) => void }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const next = () => {
    if (step < 2) setStep(step + 1);
    else onComplete(formData);
  };

  const update = (partial: any) => setFormData({ ...formData, ...partial });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: OFFWHITE }}
    >
      {/* Top bar */}
      <div
        className="w-full px-8 md:px-16 py-4 flex items-center gap-3"
        style={{ borderBottom: `1px solid ${NAVY}15` }}
      >
        <div className="w-5 h-5" style={{ background: NAVY }} />
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
          · Configuração inicial
        </span>
      </div>

      <div className="flex-1 px-8 md:px-16 py-14 max-w-4xl w-full mx-auto">
        <StepIndicator current={step} />

        <div className="min-h-[420px]">
          {step === 0 && (
            <Step1
              data={formData}
              setData={update}
            />
          )}
          {step === 1 && (
            <Step2
              data={formData}
              setData={update}
            />
          )}
          {step === 2 && (
            <Step3
              data={formData}
              setData={update}
            />
          )}
        </div>

        <div className="flex items-center justify-between mt-12 pt-6" style={{ borderTop: `1px solid ${NAVY}15` }}>
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className="flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80 opacity-50"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
            disabled={step === 0}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Anterior
          </button>

          <div className="flex items-center gap-3">
            <span
              className="text-[9px] tracking-[0.14em]"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}
            >
              {step + 1} / 3
            </span>
            <button
              onClick={next}
              className="flex items-center gap-3 px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-88"
              style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
            >
              {step === 2 ? "Concluir" : "Próximo"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

const notifications = [
  {
    type: "CONVITE",
    from: "TechBr Soluções",
    project: "Plataforma de Monitoramento IoT",
    time: "há 2h",
    unread: true,
  },
  {
    type: "CONVITE",
    from: "Fintech Labs",
    project: "Análise Preditiva de Crédito",
    time: "há 1d",
    unread: true,
  },
  {
    type: "VISUALIZAÇÃO",
    from: "StartupXYZ",
    project: "Viu seu perfil",
    time: "há 3d",
    unread: false,
  },
  {
    type: "MENSAGEM",
    from: "Prof. Dr. Silva",
    project: "Proposta de IC — Redes Neurais",
    time: "há 5d",
    unread: false,
  },
];

function Dashboard({ profile }: { profile: any }) {
  const name = profile?.name || "Ana C. Ferreira";
  const course = profile?.course || "Eng. de Computação";
  const semester = profile?.semester || "4º semestre";
  const skills: { name: string; level: number }[] = profile?.skills || [
    { name: "Python", level: 4 },
    { name: "React", level: 3 },
    { name: "PyTorch", level: 2 },
  ];

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      {/* Page title */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p
            className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
          >
            <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
            Dashboard
          </p>
          <h1
            className="text-4xl"
            style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
          >
            Bem-vindo, {name.split(" ")[0]}.
          </h1>
        </div>
        <span
          className="text-[10px] tracking-[0.14em]"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}
        >
          {new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        {/* Profile card */}
        <div className="md:col-span-4" style={{ border: `1px solid ${NAVY}18` }}>
          <div className="px-6 py-5" style={{ borderBottom: `1px solid ${NAVY}12` }}>
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ background: NAVY }}
              >
                <span
                  className="text-base"
                  style={{ fontFamily: "DM Serif Display, Georgia, serif", color: OFFWHITE }}
                >
                  {name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
                </span>
              </div>
              <div>
                <p
                  className="text-[14px] font-semibold leading-tight"
                  style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
                >
                  {name}
                </p>
                <p
                  className="text-[11px] mt-0.5"
                  style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.45 }}
                >
                  {course} · {semester}
                </p>
              </div>
            </div>
            <div style={{ height: "1px", background: `${NAVY}10`, margin: "0 0 16px" }} />
            <p
              className="text-[12px] leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.55, fontWeight: 300 }}
            >
              {profile?.bio || "Estudante de graduação com interesse em IA aplicada e sistemas distribuídos. Buscando projetos de iniciação científica."}
            </p>
          </div>

          <div className="px-6 py-4" style={{ borderBottom: `1px solid ${NAVY}12` }}>
            <Label>Competências</Label>
            <div className="flex flex-col gap-2 mt-2">
              {skills.slice(0, 5).map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <span
                    className="text-[11px]"
                    style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.7 }}
                  >
                    {s.name}
                  </span>
                  <div className="flex gap-[3px] items-end">
                    {[1, 2, 3, 4].map((b) => (
                      <div
                        key={b}
                        style={{
                          width: "6px",
                          height: `${b * 3 + 2}px`,
                          background: b <= s.level ? NAVY : `${NAVY}18`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-4">
            <Label>Perfil público</Label>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
              <span
                className="text-[11px]"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
              >
                vitrine.ic.unicamp.br/u/{name.split(" ")[0].toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="md:col-span-5" style={{ border: `1px solid ${NAVY}18` }}>
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: `1px solid ${NAVY}12` }}
          >
            <div className="flex items-center gap-2">
              <Label>Notificações</Label>
              <span
                className="px-1.5 py-0.5 text-[9px]"
                style={{
                  background: RED,
                  color: OFFWHITE,
                  fontFamily: "Space Mono, monospace",
                  marginBottom: "6px",
                }}
              >
                {notifications.filter((n) => n.unread).length}
              </span>
            </div>
            <button
              className="text-[9px] tracking-[0.14em] uppercase transition-opacity hover:opacity-80"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
            >
              Marcar lidas
            </button>
          </div>
          <div>
            {notifications.map((n, i) => (
              <div
                key={i}
                className="px-6 py-4 transition-colors cursor-pointer"
                style={{
                  borderBottom: i < notifications.length - 1 ? `1px solid ${NAVY}08` : "none",
                  background: n.unread ? `${NAVY}04` : "transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = `${NAVY}07`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = n.unread ? `${NAVY}04` : "transparent")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {n.unread && (
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: RED }}
                      />
                    )}
                    {!n.unread && <div className="w-1.5 flex-shrink-0" />}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[9px] tracking-[0.16em] uppercase px-1.5 py-0.5"
                          style={{
                            fontFamily: "Space Mono, monospace",
                            color: n.type === "CONVITE" ? RED : NAVY,
                            border: `1px solid ${n.type === "CONVITE" ? RED : `${NAVY}25`}`,
                            opacity: n.type === "CONVITE" ? 1 : 0.6,
                          }}
                        >
                          {n.type}
                        </span>
                      </div>
                      <p
                        className="text-[12px] font-medium"
                        style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
                      >
                        {n.project}
                      </p>
                      <p
                        className="text-[11px] mt-0.5"
                        style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.45 }}
                      >
                        {n.from}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-[9px] flex-shrink-0 mt-0.5"
                    style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}
                  >
                    {n.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Public preview */}
        <div className="md:col-span-3" style={{ border: `1px solid ${NAVY}18` }}>
          <div
            className="px-5 py-4"
            style={{ borderBottom: `1px solid ${NAVY}12`, background: NAVY }}
          >
            <Label>
              <span style={{ color: OFFWHITE, opacity: 0.5 }}>Preview público</span>
            </Label>
          </div>
          <div className="p-5" style={{ background: `${NAVY}04` }}>
            {/* Mini card preview */}
            <div className="bg-white p-4" style={{ border: `1px solid ${NAVY}15`, boxShadow: "0 2px 8px rgba(28,43,74,0.06)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 flex items-center justify-center" style={{ background: NAVY }}>
                  <span className="text-[10px]" style={{ fontFamily: "DM Serif Display", color: OFFWHITE }}>
                    {name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold" style={{ fontFamily: "Inter", color: NAVY }}>{name}</p>
                  <p className="text-[9px]" style={{ fontFamily: "Space Mono", color: NAVY, opacity: 0.4 }}>{course}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {skills.slice(0, 3).map((s) => (
                  <span
                    key={s.name}
                    className="text-[8px] px-1.5 py-0.5 tracking-wide"
                    style={{ fontFamily: "Space Mono", color: NAVY, border: `1px solid ${NAVY}25`, opacity: 0.7 }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
              <div style={{ height: "1px", background: `${NAVY}10` }} className="mb-2" />
              <p className="text-[8px]" style={{ fontFamily: "Space Mono", color: NAVY, opacity: 0.3 }}>
                vitrine.ic.unicamp.br/u/{name.split(" ")[0].toLowerCase()}
              </p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <Label>Visibilidade</Label>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
                  <span className="text-[9px]" style={{ fontFamily: "Space Mono", color: NAVY, opacity: 0.5 }}>Público</span>
                </div>
              </div>
              {[
                { label: "Visualizações", val: "34" },
                { label: "Convites", val: "2" },
                { label: "Buscas", val: "12" },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between py-1.5" style={{ borderTop: `1px solid ${NAVY}10` }}>
                  <span className="text-[9px]" style={{ fontFamily: "Space Mono", color: NAVY, opacity: 0.4 }}>{m.label}</span>
                  <span className="text-[11px] font-bold" style={{ fontFamily: "DM Serif Display", color: NAVY }}>{m.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Lab / Projects ───────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; shape: "circle" | "square" | "triangle" }> = {
  ideation: { label: "Idealização", shape: "circle" },
  coding: { label: "Codificação", shape: "square" },
  review: { label: "Revisão", shape: "triangle" },
  published: { label: "Publicado", shape: "square" },
};

const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: "Sistema de Detecção de Anomalias em Redes",
    description: "Pipeline de ML para identificação de comportamentos suspeitos em tráfego de rede utilizando autoencoders e análise estatística.",
    stack: ["Python", "PyTorch", "Wireshark", "PostgreSQL"],
    status: "coding",
    repo: "github.com/anacf/anomaly-net",
    updated: "há 2 dias",
  },
  {
    id: 2,
    title: "Compilador para DSL de Análise Genômica",
    description: "Linguagem de domínio específico para expressão de pipelines bioinformáticos com compilação para bytecode executável.",
    stack: ["Rust", "LLVM", "Python"],
    status: "ideation",
    repo: "github.com/anacf/genomic-dsl",
    updated: "há 1 semana",
  },
  {
    id: 3,
    title: "Dashboard ESG para Pequenas Empresas",
    description: "Ferramenta de coleta e visualização de métricas de sustentabilidade adaptada para PMEs brasileiras.",
    stack: ["React", "Node.js", "MongoDB", "D3.js"],
    status: "review",
    repo: "github.com/anacf/esg-dashboard",
    updated: "há 3 dias",
  },
];

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.ideation;
  const size = 8;
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {cfg.shape === "circle" && (
          <circle cx={size / 2} cy={size / 2} r={size / 2 - 0.5} fill={NAVY} opacity={0.5} />
        )}
        {cfg.shape === "square" && (
          <rect x={0.5} y={0.5} width={size - 1} height={size - 1} fill={RED} opacity={0.8} />
        )}
        {cfg.shape === "triangle" && (
          <polygon points={`${size / 2},0.5 ${size - 0.5},${size - 0.5} 0.5,${size - 0.5}`} fill={NAVY} opacity={0.35} />
        )}
      </svg>
      <span
        className="text-[9px] tracking-[0.16em] uppercase"
        style={{ fontFamily: "Space Mono, monospace", color: cfg.shape === "square" && status === "coding" ? RED : NAVY, opacity: cfg.shape === "square" && status === "coding" ? 0.85 : 0.55 }}
      >
        {cfg.label}
      </span>
    </div>
  );
}

function Lab() {
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

// ─── Student Area Shell ───────────────────────────────────────────────────────

export default function StudentArea({ onBack }: { onBack: () => void }) {
  const [onboarded, setOnboarded] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [view, setView] = useState("dashboard");

  if (!onboarded) {
    return (
      <Onboarding
        onComplete={(data) => {
          setProfile(data);
          setOnboarded(true);
        }}
      />
    );
  }

  return (
    <div style={{ background: OFFWHITE, minHeight: "100vh" }}>
      <NavBar view={view} setView={setView} onBack={onBack} />
      {view === "dashboard" && <Dashboard profile={profile} />}
      {view === "lab" && <Lab />}
      {view === "profile" && (
        <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
          <div className="mb-10">
            <p
              className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
            >
              <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
              Perfil
            </p>
            <h1
              className="text-4xl"
              style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
            >
              Meu Perfil
            </h1>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-5">
              <Input label="Nome completo" value={profile?.name || ""} onChange={() => {}} />
              <Input label="Curso" value={profile?.course || ""} onChange={() => {}} />
              <Input label="Semestre" value={profile?.semester || ""} mono onChange={() => {}} />
              <Input label="Bio" value={profile?.bio || ""} textarea onChange={() => {}} />
            </div>
            <div className="flex flex-col gap-5">
              <Input label="GitHub" value={profile?.github || ""} mono onChange={() => {}} />
              <Input label="LinkedIn" value={profile?.linkedin || ""} mono onChange={() => {}} />
              <Input label="Lattes" value={profile?.lattes || ""} mono onChange={() => {}} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
