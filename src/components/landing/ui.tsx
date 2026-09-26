import type * as React from "react";
import { NAVY } from "@/styles/tokens";

export function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div style={{ flex: 1, height: "1px", background: `${NAVY}22` }} />
      <span
        className="text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: "1px", background: `${NAVY}22` }} />
    </div>
  );
}

export function InputField({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div className="mb-4">
      <label
        className="block text-[10px] tracking-[0.18em] uppercase mb-1.5"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.55 }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm bg-transparent outline-none transition-colors"
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
      className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all group"
      style={{ border: `1px solid ${NAVY}33`, background: "transparent" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = NAVY)}
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
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
          >
            {sub}
          </span>
        )}
      </span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: NAVY, opacity: 0.3 }}>
        <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
