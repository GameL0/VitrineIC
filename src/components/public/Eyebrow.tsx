import type { ReactNode } from "react";

/** Rótulo de seção: traço vermelho de 24 px e Geist Mono em caixa alta. */
export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-label uppercase ${onDark ? "text-sky" : "text-navy/65"}`}>
      <span className="h-px w-6 shrink-0 bg-red" />
      {children}
    </p>
  );
}
