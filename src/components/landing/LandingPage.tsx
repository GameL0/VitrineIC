import { featuredStudents, stats } from "@/data/showcase";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import type { PublicRoute, PublicView } from "@/components/public/routes";

const NAV_ITEMS: { label: string; view: PublicView }[] = [
  { label: "Projetos", view: "projects" },
  { label: "Estudantes", view: "students" },
  { label: "Impacto", view: "impact" },
];


export default function LandingPage({
  onSignIn,
  onAdmin,
  onNavigate,
}: {
  onSignIn: () => void;
  onAdmin: () => void;
  onNavigate: (route: PublicRoute) => void;
}) {
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
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate({ view: item.view })}
              className="text-[11px] tracking-[0.16em] uppercase transition-opacity hover:opacity-100 opacity-50"
              style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={onAdmin}
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
          onClick={onSignIn}
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
                onClick={onSignIn}
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
                onClick={() => onNavigate({ view: "projects" })}
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
            onClick={() => onNavigate({ view: "projects" })}
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
            onClick={onSignIn}
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
    </div>
  );
}
