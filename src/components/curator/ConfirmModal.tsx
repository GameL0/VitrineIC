import { useState } from "react";
import { Label, Mono, Rule, SkillTag } from "./ui";
import { STUDENTS } from "@/data/students";
import { scoreStudent } from "@/lib/match";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import type { Demand } from "@/types";

export function ConfirmModal({
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
