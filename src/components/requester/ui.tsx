import { useId } from "react";
import type * as React from "react";
import { NAVY, NAVY_MUTED, OFFWHITE, OFFWHITE_MUTED } from "@/styles/tokens";

/** Rótulo em caixa alta. Com `htmlFor` vira <label> de verdade; sem, é só texto. */
export function Label({
  children,
  light,
  htmlFor,
}: {
  children: React.ReactNode;
  light?: boolean;
  htmlFor?: string;
}) {
  const className = "block text-[9px] tracking-[0.22em] uppercase mb-1.5";
  const style = {
    fontFamily: "Space Mono, monospace",
    color: light ? OFFWHITE_MUTED : NAVY_MUTED,
  };
  return htmlFor ? (
    <label htmlFor={htmlFor} className={className} style={style}>
      {children}
    </label>
  ) : (
    <span className={className} style={style}>
      {children}
    </span>
  );
}

export function Input({
  label,
  ariaLabel,
  type = "text",
  placeholder,
  mono,
  textarea,
  rows = 3,
  value,
  onChange,
}: {
  label?: string;
  ariaLabel?: string;
  type?: string;
  placeholder?: string;
  mono?: boolean;
  textarea?: boolean;
  rows?: number;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const id = useId();
  const base: React.CSSProperties = {
    fontFamily: mono ? "Space Mono, monospace" : "Inter, sans-serif",
    color: NAVY,
    fontSize: mono ? "12px" : "13px",
    border: `1px solid ${NAVY}35`,
    borderRadius: 0,
    background: "transparent",
    width: "100%",
    padding: "10px 12px",
    resize: "none",
    transition: "border-color 0.15s",
  };
  const shared = {
    id,
    placeholder,
    style: base,
    value,
    "aria-label": label ? undefined : ariaLabel,
  };
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      {textarea ? (
        <textarea
          {...shared}
          rows={rows}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
          onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}35`)}
        />
      ) : (
        <input
          {...shared}
          type={type}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
          onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}35`)}
        />
      )}
    </div>
  );
}

export function SelectField({
  label,
  ariaLabel,
  options,
  value,
  onChange,
}: {
  label?: string;
  ariaLabel?: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <select
        id={id}
        aria-label={label ? undefined : ariaLabel}
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
  return <div style={{ height: "1px", background: `${NAVY}15`, margin: "24px 0" }} aria-hidden="true" />;
}
