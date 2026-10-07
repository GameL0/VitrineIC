import { useState } from "react";
import { Label, Mono, Rule, SkillTag } from "./ui";
import { LANGUAGE_LEVELS } from "@/data/languages";
import { STUDENTS } from "@/data/students";
import { scoreStudent } from "@/lib/match";
import { NAVY, INK, OFFWHITE, RED } from "@/styles/tokens";
import type { Demand } from "@/types";

export function StudentMatchCard({
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

  const AVATAR_COLORS = ["#0e37aa", "#b91c1c", "#047857", "#4338ca", "#a21caf", "#be123c", "#0f766e"];
  const avatarColor = AVATAR_COLORS[student.name.length % AVATAR_COLORS.length];

  return (
    <div
      className="transition-all cursor-pointer"
      style={{ border: `1px solid ${score >= 60 ? `${NAVY}40` : `${NAVY}25`}`, borderRadius: "16px", overflow: "hidden", background: OFFWHITE }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = NAVY;
        e.currentTarget.style.boxShadow = `0 0 0 1px ${NAVY}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = score >= 60 ? `${NAVY}40` : `${NAVY}25`;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="px-5 py-4">
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 flex items-center justify-center flex-shrink-0"
            style={{ background: score >= 60 ? avatarColor : `${NAVY}`, borderRadius: "10px" }}
          >
            <span className="text-[11px]" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: OFFWHITE }}>
              {student.initials}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[14px]" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>
                {student.name}
              </span>
              <span
                className="text-[9px] px-1.5 py-0.5 tracking-[0.12em] uppercase flex-shrink-0"
                style={{
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  color: score >= 70 ? RED : NAVY,
                  border: `1px solid ${score >= 70 ? RED : `${NAVY}30`}`,
                  background: score >= 70 ? `${RED}08` : "transparent",
                  opacity: score >= 70 ? 1 : 0.5,
                  borderRadius: "6px"
                }}
              >
                {score}% match
              </span>
            </div>
            <p className="text-[10px] mb-2" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
              {student.course} · {student.semester}
            </p>
            {/* Skill cross-reference */}
            <div className="flex flex-wrap gap-1 mb-2">
              {student.skills.map((s) => (
                <SkillTag key={s} small highlight={matchedSkills.includes(s)}>
                  {s}
                </SkillTag>
              ))}
            </div>
            {/* Idiomas */}
            {student.languages.length > 0 && (
              <div className="flex items-center gap-2 mt-1.5">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ color: NAVY, opacity: 0.5, flexShrink: 0 }}>
                  <circle cx="5" cy="5" r="4.2" stroke="currentColor" strokeWidth="0.8" />
                  <path d="M0.8 5h8.4M5 0.8c1.2 1.3 1.2 6.9 0 8.4M5 0.8C3.8 2.1 3.8 7.7 5 9.2" stroke="currentColor" strokeWidth="0.8" />
                </svg>
                <span className="text-[9px]" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
                  {student.languages.map((l) => l.name).join(", ")}
                </span>
              </div>
            )}
            {/* Projects preview */}
            {student.projects.slice(0, 1).map((p) => (
              <div key={p.title} className="flex items-center gap-2 mt-1">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ color: NAVY, opacity: 0.5, flexShrink: 0 }}>
                  <rect x="0.5" y="0.5" width="9" height="9" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
                  <path d="M2.5 3h5M2.5 5h5M2.5 7h3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                </svg>
                <span className="text-[9px]" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
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
            <span className="text-[9px]" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
              {student.availability}
            </span>
          </div>
        </div>
      </div>
      <div className="flex" style={{ borderTop: `1px solid ${NAVY}10` }}>
        <button
          onClick={onSelect}
          className="flex-1 py-2.5 px-2 text-[9px] tracking-[0.12em] uppercase font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          style={{
            fontFamily: "Geist, Inter, system-ui, sans-serif",
            color: score >= 60 ? OFFWHITE : OFFWHITE,
            background: score >= 60 ? RED : NAVY,
            opacity: score >= 60 ? 1 : 0.8,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = score >= 60 ? "0.85" : "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = score >= 60 ? "1" : "0.8")}
        >
          Recomendar
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert(`Mensagem enviada para as notificações de ${student.name}.`);
          }}
          className="flex-1 py-2.5 px-2 text-[9px] tracking-[0.12em] uppercase font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-80"
          style={{
            fontFamily: "Geist, Inter, system-ui, sans-serif",
            color: NAVY,
            background: OFFWHITE,
            borderLeft: `1px solid ${NAVY}15`
          }}
        >
          Notificar Aluno
        </button>
      </div>
    </div>
  );
}

export function Matchmaking({
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
          style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
          <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
          Demanda selecionada
        </p>
        <h2 className="text-3xl leading-tight mb-1" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>
          {demand.title}
        </h2>
        <p className="text-[11px] mb-6" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
          {demand.id} · {demand.company}
        </p>

        <div className="flex flex-col gap-0" style={{ border: `1px solid ${NAVY}15`, borderRadius: "12px", overflow: "hidden" }}>
          {[
            { label: "Área", val: demand.area },
            { label: "Escopo", val: demand.scope },
            { label: "Prazo", val: demand.deadline },
            { label: "Enviado em", val: demand.submitted },
          ].map((r, i, arr) => (
            <div key={r.label} className="grid px-4 py-3" style={{ gridTemplateColumns: "100px 1fr", borderBottom: i < arr.length - 1 ? `1px solid ${NAVY}08` : "none", background: "#ffffff" }}>
              <span className="block text-[10px] tracking-[0.2em] uppercase font-bold mt-0.5" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: RED }}>{r.label}</span>
              <span className="text-[12px] font-medium" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY }}>{r.val}</span>
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
        <p className="text-[12px] leading-relaxed mt-1" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.55, fontWeight: 300 }}>
          {demand.description}
        </p>

        <Rule />

        <div
          className="px-4 py-4 flex items-start gap-3"
          style={{ border: `1px solid ${INK}`, background: INK, borderRadius: "12px" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: OFFWHITE, flexShrink: 0, marginTop: 2 }}>
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" />
            <path d="M7 4v4M7 9.5v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p className="text-[10px] leading-relaxed" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: OFFWHITE, opacity: 0.9, fontWeight: 300 }}>
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
              style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
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
              fontFamily: "Geist Mono, ui-monospace, monospace",
              border: `1px solid ${NAVY}30`,
              background: "transparent",
              color: NAVY,
              borderRadius: "8px",
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
