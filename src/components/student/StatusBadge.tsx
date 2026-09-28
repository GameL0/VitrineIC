import { NAVY, RED } from "@/styles/tokens";

export type ProjectPhase = "idealização" | "codificação" | "revisão" | "publicado";

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase() as ProjectPhase;

  let icon = null;
  let label = status;

  switch (normalized) {
    case "idealização":
      icon = (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke={NAVY} strokeWidth="1.5" />
        </svg>
      );
      break;
    case "codificação":
      icon = (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="2" y="2" width="8" height="8" fill={RED} />
        </svg>
      );
      break;
    case "revisão":
      icon = (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 2L10.5 9.5H1.5L6 2Z" stroke={NAVY} strokeWidth="1.5" />
        </svg>
      );
      break;
    case "publicado":
      icon = (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="2" y="2" width="8" height="8" fill={NAVY} />
        </svg>
      );
      break;
    default:
      icon = (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke={NAVY} strokeWidth="1.5" />
        </svg>
      );
  }

  return (
    <div className="flex items-center gap-2">
      {icon}
      <span
        className="text-[11px] uppercase tracking-widest"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
      >
        {label}
      </span>
    </div>
  );
}
