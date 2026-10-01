import * as React from "react";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block text-[10px] tracking-[0.15em] uppercase mb-1.5 font-semibold"
      style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.85 }}
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
    border: `1px solid ${NAVY}60`,
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
            e.currentTarget.style.borderColor = `${NAVY}60`;
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
            e.currentTarget.style.borderColor = `${NAVY}60`;
            e.currentTarget.style.outline = "none";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
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
  multiple,
}: {
  label?: string;
  options: readonly string[];
  value: string | string[];
  onChange: (v: any) => void;
  multiple?: boolean;
}) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <select
        value={value}
        multiple={multiple}
        onChange={(e) => {
          if (multiple) {
            const vals = Array.from(e.target.selectedOptions, option => option.value);
            onChange(vals);
          } else {
            onChange(e.target.value);
          }
        }}
        style={{
          fontFamily: "Inter, sans-serif",
          color: NAVY,
          fontSize: "13px",
          border: `1px solid ${NAVY}60`,
          borderRadius: "8px",
          background: OFFWHITE,
          width: "100%",
          outline: "none",
          padding: "10px 12px",
          appearance: multiple ? "auto" : "none",
          cursor: "pointer",
        }}
      >
        {!multiple && <option value="">Selecione...</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function MultiSelect({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (opt: string) => {
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
    else onChange([...value, opt]);
  };

  return (
    <div ref={ref} className="relative">
      {label && <Label>{label}</Label>}
      <div
        onClick={() => setOpen(!open)}
        style={{
          fontFamily: "Inter, sans-serif",
          color: NAVY,
          fontSize: "13px",
          border: `1px solid ${open ? NAVY : `${NAVY}60`}`,
          borderRadius: "8px",
          background: OFFWHITE,
          width: "100%",
          padding: "10px 12px",
          cursor: "pointer",
          minHeight: "41px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <span style={{ opacity: value.length === 0 ? 0.6 : 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value.length === 0 ? "Selecione..." : value.join(", ")}
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open && (
        <div
          style={{
            marginTop: "4px",
            background: OFFWHITE,
            border: `1px solid ${NAVY}30`,
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxHeight: "200px",
            overflowY: "auto"
          }}
        >
          {options.map((o) => (
            <div
              key={o}
              onClick={() => toggle(o)}
              className="px-3 py-2.5 flex items-center gap-3 transition-colors cursor-pointer"
              style={{
                fontFamily: "Inter, sans-serif",
                color: NAVY,
                fontSize: "13px",
                borderBottom: `1px solid ${NAVY}10`
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${NAVY}05`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div
                className="w-4 h-4 flex items-center justify-center flex-shrink-0"
                style={{
                  border: `1px solid ${value.includes(o) ? NAVY : `${NAVY}40`}`,
                  borderRadius: "4px",
                  background: value.includes(o) ? NAVY : "transparent"
                }}
              >
                {value.includes(o) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" style={{ color: OFFWHITE }}>
                    <path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Rule() {
  return <div style={{ height: "1px", background: `${NAVY}30`, margin: "24px 0" }} />;
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
      className="px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase transition-all font-medium"
      style={{
        fontFamily: "Space Mono, monospace",
        border: `1px solid ${active ? (accent ? RED : NAVY) : `${NAVY}60`}`,
        background: active ? (accent ? RED : NAVY) : "transparent",
        color: active ? OFFWHITE : NAVY,
        opacity: 1,
        borderRadius: "6px"
      }}
    >
      {children}
    </button>
  );
}
