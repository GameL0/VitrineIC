import type { CSSProperties, ReactNode } from "react";

/**
 * Pílula de status do guia (.vt-status): fundo tingido e texto na cor dada.
 * `solid` é a versão navy cheia, usada em "Contato liberado".
 */
export function StatusPill({ color, solid = false, children }: { color: string; solid?: boolean; children: ReactNode }) {
  return (
    <span
      className={solid ? "vt-status vt-status-solid" : "vt-status"}
      style={{ "--vt-status": color } as CSSProperties}
    >
      {children}
    </span>
  );
}
