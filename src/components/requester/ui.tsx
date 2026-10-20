import { FieldError, FieldHint, invalidProps } from "@/components/app/FieldError";
import type * as React from "react";

export function Label({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`mb-2 block font-mono text-[10px] uppercase tracking-[0.08em] ${light ? "text-offwhite/60" : "text-navy/65"}`}
    >
      {children}
    </span>
  );
}

export function Input({
  label,
  type = "text",
  placeholder,
  mono,
  textarea,
  rows = 3,
  value,
  onChange,
  id,
  error,
  hint,
  maxLength,
  inputMode,
}: {
  id?: string;
  /** Mensagem de erro; liga `aria-invalid` e `aria-describedby`. */
  error?: string;
  hint?: React.ReactNode;
  maxLength?: number;
  inputMode?: "numeric" | "text" | "email" | "url";
  label?: string;
  type?: string;
  placeholder?: string;
  mono?: boolean;
  textarea?: boolean;
  rows?: number;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const cls = mono ? "vt-input vt-input-mono" : "vt-input";
  return (
    <div>
      {label && (id ? <label htmlFor={id}><Label>{label}</Label></label> : <Label>{label}</Label>)}
      {textarea ? (
        <textarea
          id={id}
          maxLength={maxLength}
          {...invalidProps(id, error)}
          rows={rows}
          placeholder={placeholder}
          className={cls}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : (
        <input
          id={id}
          maxLength={maxLength}
          inputMode={inputMode}
          {...invalidProps(id, error)}
          type={type}
          placeholder={placeholder}
          className={cls}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
      {id && error ? <FieldError id={id}>{error}</FieldError> : hint ? <FieldHint>{hint}</FieldHint> : null}
    </div>
  );
}

export function SelectField({
  label,
  options,
  value,
  onChange,
  id,
  error,
}: {
  label?: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  id?: string;
  error?: string;
}) {
  return (
    <div>
      {label && (id ? <label htmlFor={id}><Label>{label}</Label></label> : <Label>{label}</Label>)}
      <div className="relative">
        <select
          id={id}
          {...invalidProps(id, error)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="vt-input"
          style={{ appearance: "none", cursor: "pointer", paddingRight: 40 }}
        >
          <option value="">Selecione...</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
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
      {id && <FieldError id={id}>{error}</FieldError>}
    </div>
  );
}

export function Rule() {
  return <div className="my-6 h-px bg-navy/8" />;
}
