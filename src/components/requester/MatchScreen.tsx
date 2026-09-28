import { useState } from "react";
import { Label } from "./ui";
import { MATCHED_STUDENTS } from "@/data/matched-students";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

export function MatchCard({ student }: { student: typeof MATCHED_STUDENTS[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{ border: `1px solid ${NAVY}20`, borderRadius: "16px", overflow: "hidden" }}
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
          className="w-16 h-16 flex items-center justify-center flex-shrink-0 rounded-[12px]"
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
              style={{ border: `1px solid ${RED}`, background: `${RED}08`, borderRadius: "6px" }}
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
              style={{ background: RED, color: OFFWHITE, fontFamily: "Inter, sans-serif", borderRadius: "10px" }}
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
              style={{ border: `1.5px solid ${RED}`, color: RED, background: "transparent", fontFamily: "Inter, sans-serif", borderRadius: "10px" }}
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
              style={{ border: `1px solid ${NAVY}30`, color: NAVY, fontFamily: "Space Mono, monospace", borderRadius: "10px" }}
            >
              Ver perfil completo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function MatchScreen() {
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
        style={{ background: `${NAVY}05`, border: `1px solid ${NAVY}12`, borderRadius: "12px" }}
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
        style={{ border: `1px dashed ${NAVY}20`, borderRadius: "12px" }}
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
