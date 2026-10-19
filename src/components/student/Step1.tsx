import { useRef, useState } from "react";
import { Input, Label, Select } from "./ui";
import type { OnboardingField } from "./Onboarding";
import { FieldError, invalidProps } from "@/components/app/FieldError";
import { UNITS, findUnit } from "@/data/institution";
import { BIO_MAX, type ProfileDraft } from "@/lib/profile";

const INTERESTS = [
  "Inteligência Artificial", "Engenharia de Software", "Redes & Sistemas",
  "Segurança da Informação", "Banco de Dados", "Computação Gráfica",
  "Sistemas Embarcados", "Bioinformática", "HCI & Design",
];

type Field = (name: OnboardingField) => { id: string; error?: string };

/**
 * Passo 1. Nome, e-mail, instituto e curso vieram do cadastro e aparecem num
 * resumo; "Editar" abre esses campos aqui mesmo (o e-mail é o login e não muda).
 */
export function Step1({
  data,
  setData,
  field,
  email,
}: {
  data: ProfileDraft;
  setData: (d: Partial<ProfileDraft>) => void;
  field: Field;
  email?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [editingAccount, setEditingAccount] = useState(false);
  const interests = data.interests;
  const unit = findUnit(data.unit);
  const accountError = field("name").error || field("unit").error || field("course").error;

  const toggleInterest = (item: string) =>
    setData({ interests: interests.includes(item) ? interests.filter((i) => i !== item) : [...interests, item] });

  const bio = field("bio");

  return (
    <div className="flex flex-col gap-8">
      {/* Dados da conta */}
      <div className="rounded-xl border border-navy/13 bg-offwhite p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-navy/55">Dados da conta</p>
            <p className="mt-2 font-sans text-[15px] text-navy">{data.name || "—"}</p>
            <p className="mt-1 break-words font-mono text-[11px] text-navy/65">
              {[email, unit?.short, data.course].filter(Boolean).join(" · ")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEditingAccount(!editingAccount)}
            aria-expanded={editingAccount || !!accountError}
            className="vt-btn vt-btn-secondary shrink-0"
          >
            {editingAccount ? "Fechar" : "Editar"}
          </button>
        </div>

        {(editingAccount || accountError) && (
          <div className="mt-5 grid gap-x-4 gap-y-5 border-t border-navy/8 pt-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <Input label="Nome completo" value={data.name} onChange={(v) => setData({ name: v })} {...field("name")} />
            </div>
            <Select
              {...field("unit")}
              label="Instituto ou faculdade"
              options={UNITS.map((u) => ({ value: u.short, label: `${u.name} (${u.short})` }))}
              value={data.unit}
              onChange={(v: string) => setData({ unit: v, course: "" })}
            />
            <Select
              {...field("course")}
              label="Curso"
              options={unit?.courses ?? []}
              value={data.course}
              onChange={(v: string) => setData({ course: v })}
            />
          </div>
        )}
      </div>

      {/* Foto de perfil (opcional) */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          aria-label="Carregar foto de perfil"
          className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-dashed border-navy/25 text-navy/55 transition-colors hover:border-navy/60"
        >
          {data.photo ? (
            <img src={data.photo} alt="Foto de perfil" className="size-full object-cover" />
          ) : (
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <circle cx="14" cy="11" r="5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          )}
        </button>
        <div>
          <p className="font-sans text-sm text-navy">Foto de perfil</p>
          <p className="font-sans text-xs text-navy/55">Opcional. Aparece no seu perfil público.</p>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => setData({ photo: String(reader.result) });
            reader.readAsDataURL(file);
          }}
        />
      </div>

      <div className="grid gap-x-4 gap-y-5 md:grid-cols-2">
        <Input
          label="Matrícula"
          placeholder="19210345"
          inputMode="numeric"
          value={data.matricula}
          onChange={(v) => setData({ matricula: v })}
          {...field("matricula")}
        />
        <Select
          label="Período"
          options={Array.from({ length: 14 }, (_, i) => `${i + 1}º semestre`)}
          value={data.semester}
          onChange={(v: string) => setData({ semester: v })}
        />
        <div className="md:col-span-2">
          <label htmlFor={bio.id}>
            <Label>Bio curta</Label>
          </label>
          <textarea
            id={bio.id}
            rows={3}
            placeholder="Descreva brevemente seu percurso e objetivos..."
            className="vt-input"
            value={data.bio}
            onChange={(e) => setData({ bio: e.target.value })}
            {...invalidProps(bio.id, bio.error)}
          />
          <div className="mt-1.5 flex items-start justify-between gap-4">
            <FieldError id={bio.id}>{bio.error}</FieldError>
            <span
              className={`ml-auto shrink-0 font-mono text-[10px] ${data.bio.length > BIO_MAX ? "text-terracotta" : "text-navy/55"}`}
            >
              {data.bio.length} de {BIO_MAX}
            </span>
          </div>
        </div>
      </div>

      <div>
        <Label>Áreas de interesse</Label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggleInterest(item)}
              aria-pressed={interests.includes(item)}
              className={`vt-pill ${interests.includes(item) ? "vt-pill-selected" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
