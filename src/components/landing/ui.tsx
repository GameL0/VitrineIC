import { useId } from "react";
import type * as React from "react";
import { NAVY, NAVY_MUTED } from "@/styles/tokens";

export function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div style={{ flex: 1, height: "1px", background: `${NAVY}22` }} aria-hidden="true" />
      <span
        className="text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: "1px", background: `${NAVY}22` }} aria-hidden="true" />
    </div>
  );
}

export function InputField({
  label,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = useId();
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-[10px] tracking-[0.18em] uppercase mb-1.5"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}
      >
        {label}
      </label>
      <input
        id={id}
        autoComplete={autoComplete}
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm bg-transparent transition-colors"
        style={{
          border: `1px solid ${NAVY}44`,
          borderRadius: 0,
          fontFamily: "Inter, sans-serif",
          color: NAVY,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
        onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}44`)}
      />
    </div>
  );
}

export function SSOButton({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
}) {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all group"
      style={{ border: `1px solid ${NAVY}33`, background: "transparent" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = NAVY)}
      onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
      onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}33`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${NAVY}33`)}
    >
      <span style={{ color: NAVY, opacity: 0.7 }}>{icon}</span>
      <span className="flex-1">
        <span
          className="block text-[13px] font-medium"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
        >
          {label}
        </span>
        {sub && (
          <span
            className="block text-[10px] mt-0.5"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}
          >
            {sub}
          </span>
        )}
      </span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ color: NAVY_MUTED }}>
        <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
