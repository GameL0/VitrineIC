import type * as React from "react";

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.08em] text-navy/60">{children}</span>
  );
}

export function Mono({ children, dim, red }: { children: React.ReactNode; dim?: boolean; red?: boolean }) {
  return (
    <span
      className={`font-mono text-[11px] tracking-[0.04em] ${red ? "text-red" : dim ? "text-navy/50" : "text-navy"}`}
    >
      {children}
    </span>
  );
}

export function Rule() {
  return <div className="my-5 h-px bg-navy/8" />;
}

/** Tag de skill (.vt-pill). `highlight` marca a skill que cruza com a demanda. */
export function SkillTag({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight?: boolean;
  small?: boolean;
}) {
  return (
    <span className={`vt-pill ${highlight ? "border-red/40! bg-red/5 text-red!" : ""}`}>{children}</span>
  );
}
