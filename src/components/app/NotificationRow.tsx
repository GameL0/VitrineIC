import type { ReactNode } from "react";

/**
 * Linha de notificação do Figma: ponto (vermelho se não lida), título, pílula
 * de tipo, descrição e horário em mono à direita.
 */
export function NotificationRow({
  title,
  pill,
  description,
  time,
  unread,
  onClick,
}: {
  title: string;
  pill?: ReactNode;
  description: string;
  time: string;
  unread: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-start gap-4 rounded-none! px-5 py-5 text-left transition-colors hover:bg-navy/[0.02] md:px-6"
    >
      <span className={`mt-[7px] size-1.5 shrink-0 rounded-full ${unread ? "bg-red" : "bg-navy/15"}`} />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-sans text-[15px] text-navy">{title}</span>
          {pill}
        </span>
        <span className="truncate font-sans text-sm text-navy/60">{description}</span>
      </span>
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-navy/50">{time}</span>
    </button>
  );
}
