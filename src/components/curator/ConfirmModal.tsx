import { useState } from "react";
import { Label, Mono, SkillTag } from "./ui";
import { scoreStudent } from "@/lib/match";
import { Avatar } from "@/components/app/Avatar";
import { ArrowIcon } from "@/components/app/Icons";
import { Modal } from "@/components/app/Modal";
import type { Demand, Student } from "@/types";

export function ConfirmModal({
  demand,
  student,
  onClose,
  onConfirm,
}: {
  demand: Demand;
  student: Student;
  onClose: () => void;
  onConfirm: (justification: string) => void;
}) {
  const [note, setNote] = useState("");
  const score = scoreStudent(student, demand);
  const matchedSkills = student.skills.filter((s) =>
    demand.skills.some((ds) => ds.toLowerCase() === s.toLowerCase())
  );

  return (
    <Modal eyebrow="Sugestão da curadoria" title="Sugerir estudante." onClose={onClose} width="max-w-[640px]">
      <div className="grid overflow-hidden rounded-2xl border border-navy/8 sm:grid-cols-2">
        <div className="border-b border-navy/8 p-5 sm:border-r sm:border-b-0">
          <Label>Demanda</Label>
          <p className="font-display text-[17px] leading-[1.25] font-medium text-navy">{demand.title}</p>
          <Mono dim>
            {demand.id} · {demand.company}
          </Mono>
        </div>
        <div className="p-5">
          <Label>Estudante</Label>
          <div className="flex items-center gap-3">
            <Avatar name={student.name} />
            <div className="min-w-0">
              <p className="font-display text-[17px] leading-[1.25] font-medium text-navy">{student.name}</p>
              <Mono dim>
                {student.course} · {student.semester}
              </Mono>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Label>Compatibilidade técnica</Label>
          <p className="font-display text-[32px] leading-none font-medium tracking-[-0.02em] text-navy">{score}%</p>
        </div>
        <div className="sm:text-right">
          <Label>Skills em comum</Label>
          <div className="flex flex-wrap gap-1.5 sm:justify-end">
            {matchedSkills.length ? matchedSkills.map((s) => <SkillTag key={s} highlight>{s}</SkillTag>) : <Mono dim>nenhuma</Mono>}
          </div>
        </div>
      </div>

      {student.projects.length > 0 && (
        <div className="mt-6">
          <Label>Projetos do estudante</Label>
          <ul className="divide-y divide-navy/8 rounded-xl border border-navy/8">
            {student.projects.map((p) => (
              <li key={p.title} className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5">
                <span className="font-sans text-[13px] text-navy/75">{p.title}</span>
                <span className="flex gap-1">
                  {p.stack.map((t) => <SkillTag key={t}>{t}</SkillTag>)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <Label>Justificativa (obrigatória)</Label>
        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Por que este estudante combina com a demanda: projetos, skills, disponibilidade..."
          className="vt-input"
        />
        <p className="mt-2 font-sans text-xs text-navy/50">O estudante e o solicitante leem este texto.</p>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <button onClick={onClose} className="rounded-[10px] px-3 py-2 font-sans text-sm text-navy/65 transition-colors hover:text-navy">
          Cancelar
        </button>
        <button onClick={() => onConfirm(note)} disabled={!note.trim()} className="vt-btn vt-btn-primary">
          Enviar sugestão <ArrowIcon />
        </button>
      </div>
      <p className="mt-4 text-right font-sans text-xs text-navy/50">
        O estudante responde primeiro. Se ele aceitar, a sugestão segue para o solicitante.
      </p>
    </Modal>
  );
}
