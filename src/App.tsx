import { useState, useEffect } from "react";
import StudentArea from "./StudentArea";
import RequesterArea from "./RequesterArea";
import CuratorArea from "./CuratorArea";

const NAVY = "#1C2B4A";
const RED = "#c1121f";
const OFFWHITE = "#F5F4F0";

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { index: "01", value: "340+", label: "Projetos publicados" },
  { index: "02", value: "1.200", label: "Estudantes ativos" },
  { index: "03", value: "87", label: "Empresas parceiras" },
];

const featuredStudents = [
  {
    name: "Ana Carolina Ferreira",
    course: "Eng. de Computação · 4º ano",
    project: "Sistema de Detecção de Fraudes com ML",
    year: "2026",
    tag: "IA / ML",
  },
  {
    name: "Rafael Moreira Santos",
    course: "Ciência da Computação · 3º ano",
    project: "Plataforma de Telemedicina Rural",
    year: "2026",
    tag: "Saúde Digital",
  },
  {
    name: "Isadora Lima Costa",
    course: "Sistemas de Informação · 5º ano",
    project: "Dashboard ESG para PMEs",
    year: "2025",
    tag: "Sustentabilidade",
  },
  {
    name: "Bruno Takashi Yamamoto",
    course: "Eng. de Software · 4º ano",
    project: "Compilador para Linguagem Educacional",
    year: "2025",
    tag: "Linguagens",
  },
  {
    name: "Fernanda Oliveira Braga",
    course: "Ciência da Computação · 5º ano",
    project: "Robótica Assistiva para Reabilitação",
    year: "2026",
    tag: "Robótica",
  },
  {
    name: "Lucas Henrique Pinto",
    course: "Eng. de Computação · 3º ano",
    project: "Análise Preditiva de Falhas em Redes",
    year: "2025",
    tag: "Redes",
  },
];

// ─── Modal ───────────────────────────────────────────────────────────────────

function AuthModal({ onClose, onEnterStudent, onEnterCompany }: { onClose: () => void; onEnterStudent: () => void; onEnterCompany: () => void }) {
  const [role, setRole] = useState<"student" | "company">("student");

  useEffect(() => {
    document.body.classList.add("modal-open");
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(28,43,74,0.55)", backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-lg bg-[#F5F4F0]"
        style={{ border: `1.5px solid ${RED}`, outline: `1px solid ${RED}`, outlineOffset: "3px" }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-8 py-5"
          style={{ borderBottom: `1px solid ${NAVY}22` }}
        >
          <span
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
          >
            VitrineIC · Acesso
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center transition-colors"
            style={{ color: NAVY, opacity: 0.4 }}
            aria-label="Fechar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" />
              <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Toggle */}
        <div className="px-8 pt-7 pb-0">
          <div
            className="flex w-full"
            style={{ border: `1px solid ${NAVY}`, position: "relative" }}
          >
            <button
              onClick={() => setRole("student")}
              className="flex-1 py-3 text-[11px] tracking-[0.15em] uppercase font-medium transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                background: role === "student" ? NAVY : "transparent",
                color: role === "student" ? OFFWHITE : NAVY,
                borderRight: `1px solid ${NAVY}`,
              }}
            >
              Sou Estudante
            </button>
            <button
              onClick={() => setRole("company")}
              className="flex-1 py-3 text-[11px] tracking-[0.15em] uppercase font-medium transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                background: role === "company" ? NAVY : "transparent",
                color: role === "company" ? OFFWHITE : NAVY,
              }}
            >
              Sou Empresa/Solicitante
            </button>
          </div>
          {/* Red accent underline on active */}
          <div className="flex w-full" style={{ height: "2px" }}>
            <div
              style={{
                flex: 1,
                background: role === "student" ? RED : "transparent",
                transition: "background 0.2s",
              }}
            />
            <div
              style={{
                flex: 1,
                background: role === "company" ? RED : "transparent",
                transition: "background 0.2s",
              }}
            />
          </div>
        </div>

        {/* Form area */}
        <div className="px-8 pt-6 pb-8">
          {role === "student" ? <StudentForm onEnter={onEnterStudent} /> : <CompanyForm onEnter={onEnterCompany} />}
        </div>
      </div>
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div style={{ flex: 1, height: "1px", background: `${NAVY}22` }} />
      <span
        className="text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: "1px", background: `${NAVY}22` }} />
    </div>
  );
}

function InputField({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div className="mb-4">
      <label
        className="block text-[10px] tracking-[0.18em] uppercase mb-1.5"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.55 }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm bg-transparent outline-none transition-colors"
        style={{
          border: `1px solid ${NAVY}44`,
          borderRadius: 0,
          fontFamily: "Inter, sans-serif",
          color: NAVY,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
        onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}44`)}
      />
    </div>
  );
}

function SSOButton({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
}) {
  return (
    <button
      className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all group"
      style={{ border: `1px solid ${NAVY}33`, background: "transparent" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = NAVY)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${NAVY}33`)}
    >
      <span style={{ color: NAVY, opacity: 0.7 }}>{icon}</span>
      <span className="flex-1">
        <span
          className="block text-[13px] font-medium"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
        >
          {label}
        </span>
        {sub && (
          <span
            className="block text-[10px] mt-0.5"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
          >
            {sub}
          </span>
        )}
      </span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: NAVY, opacity: 0.3 }}>
        <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function StudentForm({ onEnter }: { onEnter: () => void }) {
  return (
    <div>
      <p
        className="text-[11px] tracking-[0.15em] uppercase mb-5"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.45 }}
      >
        Acesso Institucional
      </p>
      <div className="flex flex-col gap-2.5">
        <SSOButton
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 9h8M9 5v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          }
          label="Entrar com SSO Institucional"
          sub="ic.unicamp.br · ic.usp.br · ..."
        />
        <SSOButton
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
              <path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          }
          label="Entrar com E-mail Acadêmico"
          sub="usuario@universidade.edu.br"
        />
      </div>
      <Divider label="ou" />
      <InputField label="E-mail acadêmico" type="email" placeholder="seu@universidade.edu.br" />
      <InputField label="Senha" type="password" placeholder="••••••••" />
      <button
        onClick={onEnter}
        className="w-full py-3 text-[11px] tracking-[0.18em] uppercase font-semibold transition-all mt-1"
        style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Acessar
      </button>
      <p
        className="text-center text-[11px] mt-4"
        style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.45 }}
      >
        Não tem conta?{" "}
        <button className="underline underline-offset-2" style={{ color: RED }}>
          Cadastrar como estudante
        </button>
      </p>
    </div>
  );
}

function CompanyForm({ onEnter }: { onEnter: () => void }) {
  return (
    <div>
      <p
        className="text-[11px] tracking-[0.15em] uppercase mb-5"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.45 }}
      >
        Acesso Corporativo
      </p>
      <div className="flex flex-col gap-2.5">
        <SSOButton
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 14V6l7-4 7 4v8H2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <rect x="6.5" y="10" width="5" height="4" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          }
          label="Entrar com E-mail Corporativo"
          sub="SSO · SAML 2.0 suportado"
        />
        <SSOButton
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="4" width="16" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1 8h16" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="4.5" cy="12" r="1" fill="currentColor" opacity="0.5" />
            </svg>
          }
          label="Continuar com LinkedIn"
          sub="Autenticação OAuth 2.0"
        />
        <SSOButton
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M9 5.5V9l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          }
          label="Continuar com Google"
          sub="conta Google Workspace ou pessoal"
        />
      </div>
      <Divider label="ou e-mail corporativo" />
      <InputField label="E-mail corporativo" type="email" placeholder="nome@empresa.com.br" />
      <InputField label="Senha" type="password" placeholder="••••••••" />
      <button
        onClick={onEnter}
        className="w-full py-3 text-[11px] tracking-[0.18em] uppercase font-semibold transition-all mt-1"
        style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Acessar Plataforma
      </button>
      <p
        className="text-center text-[11px] mt-4"
        style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.45 }}
      >
        Primeira vez?{" "}
        <button className="underline underline-offset-2" style={{ color: RED }}>
          Criar conta empresarial
        </button>
      </p>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inStudentArea, setInStudentArea] = useState(false);
  const [inRequesterArea, setInRequesterArea] = useState(false);
  const [inCuratorArea, setInCuratorArea] = useState(false);

  if (inStudentArea) return <StudentArea onBack={() => setInStudentArea(false)} />;
  if (inRequesterArea) return <RequesterArea onBack={() => setInRequesterArea(false)} />;
  if (inCuratorArea) return <CuratorArea onBack={() => setInCuratorArea(false)} />;

  return (
    <div style={{ background: OFFWHITE, minHeight: "100vh" }}>
      {/* ── Nav ── */}
      <nav
        className="w-full flex items-center justify-between px-8 md:px-16 py-5"
        style={{ borderBottom: `1px solid ${NAVY}18` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 flex-shrink-0"
            style={{ background: NAVY }}
          />
          <span
            className="text-[13px] tracking-[0.2em] uppercase font-semibold"
            style={{ fontFamily: "Inter, sans-serif", color: NAVY, letterSpacing: "0.22em" }}
          >
            VitrineIC
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Projetos", "Estudantes", "Empresas", "Sobre"].map((item) => (
            <button
              key={item}
              className="text-[11px] tracking-[0.16em] uppercase transition-opacity hover:opacity-100 opacity-50"
              style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => setInCuratorArea(true)}
            className="text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80 opacity-25 flex items-center gap-1.5"
            style={{ fontFamily: "Space Mono, monospace", color: RED }}
          >
            <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
              <rect x="0.5" y="0.5" width="6" height="6" fill={RED} />
            </svg>
            Admin
          </button>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-80"
          style={{
            border: `1px solid ${NAVY}`,
            color: NAVY,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Entrar
        </button>
      </nav>

      {/* ── Hero ── */}
      <section className="px-8 md:px-16 pt-20 pb-16 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-12 gap-y-10 md:gap-x-8 items-start">
          {/* Display heading */}
          <div className="md:col-span-8">
            <p
              className="text-[10px] tracking-[0.25em] uppercase mb-6 flex items-center gap-3"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.45 }}
            >
              <span
                className="inline-block w-8"
                style={{ height: "1px", background: RED }}
              />
              Plataforma de Talentos Acadêmicos
            </p>
            <h1
              className="text-5xl md:text-7xl leading-[1.0] mb-8"
              style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY, letterSpacing: "-0.01em" }}
            >
              Conectando{" "}
              <em className="not-italic" style={{ color: RED }}>
                inovação
              </em>{" "}
              acadêmica ao mercado.
            </h1>
            <p
              className="text-base md:text-lg leading-[1.7] max-w-xl"
              style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.65, fontWeight: 300 }}
            >
              VitrineIC é o ponto de encontro entre estudantes de computação e
              organizações que buscam soluções inovadoras. Explore projetos,
              conecte talentos e acelere o desenvolvimento tecnológico.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-4 px-8 py-4 text-[11px] tracking-[0.22em] uppercase font-semibold transition-all group"
                style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Acessar Plataforma
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </button>
              <button
                className="inline-flex items-center gap-2 px-8 py-4 text-[11px] tracking-[0.22em] uppercase font-medium transition-opacity hover:opacity-70"
                style={{ border: `1px solid ${NAVY}44`, color: NAVY, fontFamily: "Inter, sans-serif" }}
              >
                Explorar Projetos
              </button>
            </div>
          </div>

          {/* Side rule */}
          <div className="hidden md:block md:col-span-4 pt-4">
            <div
              className="w-full h-px mb-8"
              style={{ background: `${NAVY}15` }}
            />
            <p
              className="text-[10px] tracking-[0.18em] uppercase leading-relaxed"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
            >
              Instituto de Computação<br />
              Universidade Estadual de Campinas<br />
              São Paulo — Brasil
            </p>
            <div
              className="w-full h-px mt-8"
              style={{ background: `${NAVY}15` }}
            />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        className="px-8 md:px-16 py-14 max-w-screen-xl mx-auto"
        style={{ borderTop: `1px solid ${NAVY}15`, borderBottom: `1px solid ${NAVY}15` }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.index}
              className="flex items-start gap-6 py-4 md:py-0 md:px-10 first:pl-0 last:pr-0"
              style={{
                borderLeft: i > 0 ? `1px solid ${NAVY}18` : "none",
              }}
            >
              <span
                className="text-[10px] mt-1 flex-shrink-0"
                style={{ fontFamily: "Space Mono, monospace", color: RED, opacity: 0.8 }}
              >
                {stat.index}
              </span>
              <div>
                <p
                  className="text-4xl md:text-5xl leading-none mb-1"
                  style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-[11px] tracking-[0.14em] uppercase mt-2"
                  style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.45 }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Grid ── */}
      <section className="px-8 md:px-16 py-20 max-w-screen-xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-[10px] tracking-[0.25em] uppercase mb-3 flex items-center gap-3"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
            >
              <span
                className="inline-block w-5"
                style={{ height: "1px", background: RED }}
              />
              Destaques
            </p>
            <h2
              className="text-3xl md:text-4xl leading-tight"
              style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
            >
              Estudantes & Projetos
            </h2>
          </div>
          <button
            className="hidden md:block text-[10px] tracking-[0.18em] uppercase transition-opacity hover:opacity-100 opacity-40 pb-1"
            style={{
              fontFamily: "Space Mono, monospace",
              color: NAVY,
              borderBottom: `1px solid ${NAVY}`,
            }}
          >
            Ver todos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featuredStudents.map((student, i) => (
            <div
              key={i}
              className="group p-6 transition-all cursor-pointer"
              style={{
                borderTop: `1px solid ${NAVY}18`,
                borderLeft: i % 3 !== 0 ? `1px solid ${NAVY}18` : "none",
                borderRight: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = `${NAVY}05`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "transparent";
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-[9px] tracking-[0.16em] uppercase px-2 py-1"
                  style={{
                    fontFamily: "Space Mono, monospace",
                    color: NAVY,
                    border: `1px solid ${NAVY}25`,
                    opacity: 0.6,
                  }}
                >
                  {student.tag}
                </span>
                <span
                  className="text-[9px]"
                  style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}
                >
                  {student.year}
                </span>
              </div>
              <h3
                className="text-base font-semibold mb-1 leading-snug"
                style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
              >
                {student.project}
              </h3>
              <p
                className="text-[12px] mt-3 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5 }}
              >
                {student.name}
              </p>
              <p
                className="text-[10px] mt-0.5"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
              >
                {student.course}
              </p>
              <div
                className="mt-5 h-px transition-all"
                style={{ background: `${RED}00`, width: 0 }}
                ref={(el) => {
                  if (el) {
                    const parent = el.parentElement;
                    parent?.addEventListener("mouseenter", () => {
                      el.style.background = RED;
                      el.style.width = "32px";
                    });
                    parent?.addEventListener("mouseleave", () => {
                      el.style.background = `${RED}00`;
                      el.style.width = "0px";
                    });
                  }
                }}
              />
            </div>
          ))}
          {/* Bottom border row */}
          <div
            className="col-span-1 md:col-span-2 lg:col-span-3"
            style={{ borderTop: `1px solid ${NAVY}18` }}
          />
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="mx-8 md:mx-16 mb-20"
        style={{ background: NAVY }}
      >
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p
              className="text-[10px] tracking-[0.22em] uppercase mb-4"
              style={{ fontFamily: "Space Mono, monospace", color: OFFWHITE, opacity: 0.4 }}
            >
              Pronto para começar?
            </p>
            <h2
              className="text-3xl md:text-4xl leading-tight"
              style={{ fontFamily: "DM Serif Display, Georgia, serif", color: OFFWHITE }}
            >
              Faça parte da vitrine de<br />
              <em className="not-italic" style={{ color: RED }}>inovação</em> do IC.
            </h2>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex-shrink-0 flex items-center gap-4 px-8 py-4 text-[11px] tracking-[0.22em] uppercase font-semibold transition-all"
            style={{ background: OFFWHITE, color: NAVY, fontFamily: "Inter, sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Acessar Plataforma
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="px-8 md:px-16 py-8 max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ borderTop: `1px solid ${NAVY}15` }}
      >
        <div className="flex items-center gap-3">
          <div className="w-4 h-4" style={{ background: NAVY }} />
          <span
            className="text-[11px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
          >
            VitrineIC — IC · Unicamp · 2026
          </span>
        </div>
        <div className="flex gap-6">
          {["Privacidade", "Termos", "Contato"].map((item) => (
            <button
              key={item}
              className="text-[10px] tracking-[0.15em] uppercase transition-opacity hover:opacity-80 opacity-35"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
            >
              {item}
            </button>
          ))}
        </div>
      </footer>

      {/* ── Modal ── */}
      {modalOpen && (
        <AuthModal
          onClose={() => setModalOpen(false)}
          onEnterStudent={() => { setModalOpen(false); setInStudentArea(true); }}
          onEnterCompany={() => { setModalOpen(false); setInRequesterArea(true); }}
        />
      )}
    </div>
  );
}
