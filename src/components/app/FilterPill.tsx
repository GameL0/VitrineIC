import type { ReactNode } from "react";

/** Pílula de filtro (.vt-pill); a selecionada fica sólida. */
export function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`vt-pill rounded-full! transition-colors ${active ? "vt-pill-selected" : "hover:border-navy/30 hover:text-navy"}`}
    >
      {children}
    </button>
  );
}
