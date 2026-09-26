import { STATUS_CONFIG } from "@/data/projects";
import { NAVY, NAVY_MUTED, RED } from "@/styles/tokens";

export function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.ideation;
  const size = 8;
  return (
    <div className="flex items-center gap-2">
      <svg aria-hidden="true" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {cfg.shape === "circle" && (
          <circle cx={size / 2} cy={size / 2} r={size / 2 - 0.5} fill={NAVY} opacity={0.5} />
        )}
        {cfg.shape === "square" && (
          <rect x={0.5} y={0.5} width={size - 1} height={size - 1} fill={RED} opacity={0.8} />
        )}
        {cfg.shape === "triangle" && (
          <polygon points={`${size / 2},0.5 ${size - 0.5},${size - 0.5} 0.5,${size - 0.5}`} fill={NAVY} opacity={0.35} />
        )}
      </svg>
      <span
        className="text-[9px] tracking-[0.16em] uppercase"
        style={{
          fontFamily: "Space Mono, monospace",
          color: cfg.shape === "square" && status === "coding" ? RED : NAVY_MUTED,
        }}
      >
        {cfg.label}
      </span>
    </div>
  );
}
