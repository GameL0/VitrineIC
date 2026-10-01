import { useState } from "react";
import { Input, Label, Rule, SelectField } from "./ui";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

export const WIZARD_STEPS = [
  { n: "01", label: "Descrição" },
  { n: "02", label: "Escopo" },
  { n: "03", label: "Requisitos" },
  { n: "04", label: "Revisão" },
];

export function WizardStepIndicator({ current }: { current: number }) {
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

export const AREA_OPTIONS = [
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

export const SCOPE_OPTIONS = ["Pequeno (< 3 meses)", "Médio (3–6 meses)", "Grande (6–12 meses)"];

export function NewDemandWizard({ onSuccess }: { onSuccess: (protocol: string) => void }) {
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
        style={{ border: `1px solid ${NAVY}18`, background: `${NAVY}03`, borderRadius: "12px" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: NAVY, opacity: 0.5, flexShrink: 0, marginTop: 2 }}>
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.1" />
          <path d="M8 5v4M8 11v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <p
          className="text-[11px] leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}
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
      <div style={{ border: `1px solid ${NAVY}18`, borderRadius: "12px", overflow: "hidden" }}>
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
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
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
          className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase transition-opacity hover:opacity-80"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: step === 0 ? 0.3 : 1 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Anterior
        </button>
        <div className="flex items-center gap-3">
          <span
            className="text-[9px] tracking-[0.14em]"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
          >
            {step + 1} / 4
          </span>
          <button
            onClick={next}
            className="flex items-center gap-3 px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-88"
            style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif", borderRadius: "10px" }}
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
