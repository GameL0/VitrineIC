import type * as React from "react";
import { FieldError, FieldHint, invalidProps } from "@/components/app/FieldError";

export function Divider({ label }: { label: string }) {
  return (
    <div className="my-6 flex items-center gap-3">
      <span className="h-px flex-1 bg-navy/10" />
      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-navy/55">{label}</span>
      <span className="h-px flex-1 bg-navy/10" />
    </div>
  );
}

const LABEL = "mb-2 block font-mono text-[10px] uppercase tracking-[0.08em]";

/** Campo controlado dos formulários de acesso, com dica ou erro embaixo. */
export function InputField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  hint,
  autoComplete,
  dark = false,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: React.ReactNode;
  autoComplete?: string;
  /** Sobre a superfície escura da curadoria. */
  dark?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className={`${LABEL} ${dark ? "text-offwhite/65" : "text-navy/65"}`}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="vt-input"
        style={{ height: 44 }}
        {...invalidProps(id, error)}
      />
      {error ? <FieldError id={id}>{error}</FieldError> : hint ? <FieldHint>{hint}</FieldHint> : null}
    </div>
  );
}

/** Lista de seleção no mesmo padrão do `InputField`. */
export function SelectField({
  id,
  label,
  options,
  value,
  onChange,
  error,
  hint,
  disabled,
}: {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className={`${LABEL} text-navy/65`}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="vt-input"
          style={{ height: 44, appearance: "none", cursor: disabled ? "default" : "pointer", paddingRight: 40 }}
          {...invalidProps(id, error)}
        >
          <option value="">Selecione...</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-navy/55"
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error ? <FieldError id={id}>{error}</FieldError> : hint ? <FieldHint>{hint}</FieldHint> : null}
    </div>
  );
}

/** Faixa de erro geral do formulário (login recusado, e-mail já usado). */
export function FormAlert({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="alert"
      className="vt-field-error flex items-start gap-2.5 rounded-xl border border-terracotta/25 bg-terracotta/8 px-4 py-3 font-sans text-[13px] leading-[1.5] text-terracotta"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 4.75v4M8 11v.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span>{children}</span>
    </div>
  );
}
