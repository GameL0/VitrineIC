import type * as React from "react";
import { NAVY, RED } from "@/styles/tokens";

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block text-[9px] tracking-[0.22em] uppercase mb-1.5"
      style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
    >
      {children}
    </span>
  );
}

export function Mono({ children, dim, red }: { children: React.ReactNode; dim?: boolean; red?: boolean }) {
  return (
    <span
      style={{
        fontFamily: "Space Mono, monospace",
        color: red ? RED : NAVY,
        opacity: dim ? 0.4 : 1,
        fontSize: "11px",
      }}
    >
      {children}
    </span>
  );
}

export function Rule() {
  return <div style={{ height: "1px", background: `${NAVY}15`, margin: "20px 0" }} />;
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
        color: highlight ? RED : NAVY,
        background: highlight ? `${RED}08` : "transparent",
        opacity: highlight ? 1 : 0.65,
        borderRadius: "6px",
      }}
    >
      {children}
    </span>
  );
}
