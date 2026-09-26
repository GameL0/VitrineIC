import type * as React from "react";
import { NAVY, NAVY_MUTED, RED } from "@/styles/tokens";

/** Rótulo em caixa alta. Com `htmlFor` vira <label> de verdade; sem, é só texto. */
export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  const className = "block text-[9px] tracking-[0.22em] uppercase mb-1.5";
  const style = { fontFamily: "Space Mono, monospace", color: NAVY_MUTED };
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

export function Mono({ children, dim, red }: { children: React.ReactNode; dim?: boolean; red?: boolean }) {
  return (
    <span
      style={{
        fontFamily: "Space Mono, monospace",
        color: red ? RED : dim ? NAVY_MUTED : NAVY,
        fontSize: "11px",
      }}
    >
      {children}
    </span>
  );
}

export function Rule() {
  return <div style={{ height: "1px", background: `${NAVY}15`, margin: "20px 0" }} aria-hidden="true" />;
}

export function SkillTag({
  children,
  highlight,
  small,
}: {
  children: React.ReactNode;
  highlight?: boolean;
  small?: boolean;
}) {
  return (
    <span
      className="inline-block tracking-[0.12em] uppercase"
      style={{
        fontFamily: "Space Mono, monospace",
        fontSize: small ? "8px" : "9px",
        padding: small ? "2px 6px" : "3px 8px",
        border: `1px solid ${highlight ? RED : `${NAVY}28`}`,
        color: highlight ? RED : NAVY_MUTED,
        background: highlight ? `${RED}08` : "transparent",
      }}
    >
      {children}
    </span>
  );
}
