import { useEffect, useRef, useState } from "react";
import { NAVY, NAVY_MUTED, OFFWHITE, RED } from "@/styles/tokens";

export type MenuItem = { id: string; label: string; badge?: number };

/**
 * Navegação das áreas abaixo de 768px, onde a barra horizontal é escondida.
 * Os quatro NavBar continuam independentes (ver AGENTS.md); só este menu é
 * compartilhado, para que o comportamento de teclado não divirja entre eles.
 */
export function MobileMenu({
  items,
  current,
  onSelect,
  label = "Navegação",
}: {
  items: MenuItem[];
  current: string;
  onSelect: (id: string) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClickOut = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOut);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOut);
    };
  }, [open]);

  return (
    <div className="md:hidden relative" ref={wrapperRef}>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? `Fechar ${label.toLowerCase()}` : `Abrir ${label.toLowerCase()}`}
        onClick={() => setOpen(!open)}
        className="w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
        style={{ background: "transparent", border: `1px solid ${NAVY}25` }}
      >
        <span style={{ width: "14px", height: "1.5px", background: NAVY }} />
        <span style={{ width: "14px", height: "1.5px", background: NAVY }} />
        <span style={{ width: "14px", height: "1.5px", background: NAVY }} />
      </button>

      {open && (
        <ul
          id="menu-mobile"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            minWidth: "200px",
            background: OFFWHITE,
            border: `1px solid ${NAVY}25`,
            zIndex: 40,
          }}
        >
          {items.map((item) => {
            const active = current === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-current={active ? "page" : undefined}
                  onClick={() => {
                    onSelect(item.id);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-[10px] tracking-[0.16em] uppercase flex items-center justify-between gap-3"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: active ? NAVY : NAVY_MUTED,
                    background: active ? `${NAVY}08` : "transparent",
                    border: "none",
                    borderLeft: active ? `2px solid ${RED}` : "2px solid transparent",
                  }}
                >
                  {item.label}
                  {item.badge ? (
                    <span
                      className="px-1.5 py-0.5 text-[8px]"
                      style={{ fontFamily: "Space Mono, monospace", background: RED, color: OFFWHITE }}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
