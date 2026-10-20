import type { CSSProperties } from "react";
import type { ProjectStatus } from "@/types";

/** Rótulo e cor de cada estágio do projeto, como nas pílulas do Figma. */
const PROJECT_STATUS: Record<ProjectStatus, { label: string; color: string }> = {
  ideation: { label: "Idealização", color: "var(--color-slate)" },
  coding: { label: "Codificação", color: "var(--color-ochre)" },
  review: { label: "Revisão", color: "var(--color-ochre)" },
  done: { label: "Concluído", color: "var(--color-moss)" },
};

/** Pílula de status do projeto (classe .vt-status, cor via --vt-status). */
export function ProjectStatusPill({ status }: { status: ProjectStatus }) {
  const { label, color } = PROJECT_STATUS[status];
  return (
    <span className="vt-status shrink-0" style={{ "--vt-status": color } as CSSProperties}>
      {label}
    </span>
  );
}
