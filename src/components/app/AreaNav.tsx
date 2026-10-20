import type { ReactNode } from "react";
import { InboxIcon } from "./Icons";
import { Logo } from "@/components/public/Logo";

export interface AreaNavItem {
  id: string;
  label: string;
  /** Número em vermelho ao lado do rótulo (pendências). */
  badge?: number;
}

/**
 * Barra das áreas logadas (estudante, solicitante e curadoria), como no Figma:
 * logo, abas em pílula, caixa de entrada, sino e avatar. No celular as abas descem para uma
 * segunda linha com rolagem lateral.
 */
export function AreaNav({
  items,
  active,
  onSelect,
  avatar,
  onInbox,
  inboxDot = false,
  inboxActive = false,
  bell,
  onExit,
  extra,
}: {
  items: AreaNavItem[];
  active: string;
  onSelect: (id: string) => void;
  avatar: string;
  /** Abre a caixa de entrada; sem ele o ícone não aparece. */
  onInbox?: () => void;
  inboxDot?: boolean;
  inboxActive?: boolean;
  /** Sino de avisos curtos (`UpdatesMenu`). */
  bell?: ReactNode;
  onExit: () => void;
  extra?: ReactNode;
}) {
  const tabs = items.map((item) => {
    const isActive = item.id === active;
    return (
      <button
        key={item.id}
        onClick={() => onSelect(item.id)}
        aria-current={isActive ? "page" : undefined}
        className={`flex shrink-0 items-center gap-1.5 px-3 py-1.5 font-sans text-[13px] whitespace-nowrap transition-colors ${
          isActive
            ? "bg-white text-navy shadow-[0_1px_2px_rgba(11,37,69,0.06),0_2px_8px_rgba(11,37,69,0.06)]"
            : "text-navy/60 hover:text-navy"
        }`}
      >
        {item.label}
        {item.badge ? (
          <span className="grid min-w-4 place-items-center rounded-full bg-red px-1 font-mono text-[9px] leading-4 text-offwhite">
            {item.badge}
          </span>
        ) : null}
      </button>
    );
  });

  return (
    <nav className="sticky top-0 z-30 border-b border-navy/8 bg-offwhite/85 backdrop-blur-[8px]">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-5 md:px-10">
        <Logo />
        <div className="hidden min-w-0 items-center gap-1 lg:flex">{tabs}</div>

        <div className="ml-auto flex items-center gap-4">
          {extra}
          <button
            onClick={onExit}
            className="font-mono text-[10px] uppercase tracking-[0.08em] text-navy/55 transition-colors hover:text-navy"
          >
            Sair
          </button>
          {onInbox && (
            <button
              onClick={onInbox}
              aria-label="Caixa de entrada"
              aria-current={inboxActive ? "page" : undefined}
              className={`relative grid size-8 place-items-center transition-colors hover:text-navy ${
                inboxActive ? "bg-white text-navy shadow-[0_1px_2px_rgba(11,37,69,0.06),0_2px_8px_rgba(11,37,69,0.06)]" : "text-navy/65"
              }`}
            >
              <InboxIcon />
              {inboxDot && <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-red" />}
            </button>
          )}
          {bell}
          <span className="grid size-8 place-items-center rounded-[9px] bg-navy font-display text-[13px] font-medium text-offwhite">
            {(avatar.trim()[0] || "?").toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-t border-navy/8 px-5 py-2 lg:hidden">{tabs}</div>
    </nav>
  );
}
