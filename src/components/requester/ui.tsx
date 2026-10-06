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
  const base: React.CSSProperties = {
    fontFamily: mono ? "Geist Mono, ui-monospace, monospace" : "Geist, Inter, system-ui, sans-serif",
    color: NAVY,
    fontSize: mono ? "12px" : "13px",
    border: `1px solid ${NAVY}35`,
    borderRadius: "8px",
    background: "transparent",
    width: "100%",
    outline: "none",
    padding: "10px 12px",
    resize: "none",
    transition: "border-color 0.15s",
  };
  return (
    <div>
      {label && <Label>{label}</Label>}
      {textarea ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          style={base}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = NAVY;
            e.currentTarget.style.outline = `2px solid ${NAVY}`;
            e.currentTarget.style.backgroundColor = OFFWHITE;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = `${NAVY}35`;
            e.currentTarget.style.outline = "none";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          style={base}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = NAVY;
            e.currentTarget.style.outline = `2px solid ${NAVY}`;
            e.currentTarget.style.backgroundColor = OFFWHITE;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = `${NAVY}35`;
            e.currentTarget.style.outline = "none";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
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
        style={{
          fontFamily: "Geist, Inter, system-ui, sans-serif",
          color: NAVY,
          fontSize: "13px",
          border: `1px solid ${NAVY}35`,
          borderRadius: "8px",
          background: OFFWHITE,
          width: "100%",
          outline: "none",
          padding: "10px 12px",
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
