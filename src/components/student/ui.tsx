import type * as React from "react";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block text-[9px] tracking-[0.22em] uppercase mb-1.5"
      style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.45 }}
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
    fontFamily: mono ? "Space Mono, monospace" : "Inter, sans-serif",
    color: NAVY,
    fontSize: mono ? "12px" : "13px",
    border: `1px solid ${NAVY}35`,
    borderRadius: 0,
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
          onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
          onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}35`)}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          style={base}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
          onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}35`)}
        />
      )}
    </div>
  );
}

export function Select({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: readonly string[];
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
          fontFamily: "Inter, sans-serif",
          color: NAVY,
          fontSize: "13px",
          border: `1px solid ${NAVY}35`,
          borderRadius: 0,
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

export function Tag({
  children,
  active,
  accent,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  accent?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase transition-all"
      style={{
        fontFamily: "Space Mono, monospace",
        border: `1px solid ${active ? (accent ? RED : NAVY) : `${NAVY}35`}`,
        background: active ? (accent ? RED : NAVY) : "transparent",
        color: active ? OFFWHITE : NAVY,
        opacity: active ? 1 : 0.65,
      }}
    >
      {children}
    </button>
  );
}
