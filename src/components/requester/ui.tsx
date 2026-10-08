import type * as React from "react";
import { NAVY, OFFWHITE } from "@/styles/tokens";

export function Label({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className="block text-[9px] tracking-[0.22em] uppercase mb-1.5"
      style={{
        fontFamily: "Geist Mono, ui-monospace, monospace",
        color: light ? OFFWHITE : NAVY,
        opacity: light ? 0.45 : 0.45,
      }}
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
}: {
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
      {label && <Label>{label}</Label>}
      {textarea ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          className={cls}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={cls}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
    </div>
  );
}

export function SelectField({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}

        className="vt-input"
        style={{
          appearance: "none",
          cursor: "pointer",
        }}
      >
        <option value="">Selecione...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Rule() {
  return <div style={{ height: "1px", background: `${NAVY}15`, margin: "24px 0" }} />;
}
