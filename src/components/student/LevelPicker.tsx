import { LEVELS } from "@/data/skills";
import { MOSS, NAVY, TERRACOTTA } from "@/styles/tokens";
import type { SkillLevel } from "@/types";

const MONO = "Geist Mono, ui-monospace, monospace";

const STEPS: SkillLevel[] = [1, 2, 3, 4];

const LEVEL_COLORS: Record<SkillLevel, string> = {
  1: MOSS, // Verde
  2: "#c0672b", // Laranja
  3: TERRACOTTA, // Vermelho
  4: "#7e22ce", // Roxo
};

/**
 * Seletor de proficiência: quatro pílulas, a escolhida em navy sólido.
 * Setas do teclado sobem e descem o nível.
 */
export function LevelPicker({
  value,
  onChange,
  name,
  labels = LEVELS,
}: {
  value: SkillLevel;
  onChange: (level: SkillLevel) => void;
  name: string;
  labels?: readonly string[];
}) {
  return (
    <div
      role="radiogroup"
      aria-label={`Proficiência em ${name}`}
      className="flex flex-wrap gap-1.5"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          onChange(Math.min(4, value + 1) as SkillLevel);
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          onChange(Math.max(1, value - 1) as SkillLevel);
        }
      }}
    >
      {STEPS.map((step) => {
        const active = step === value;
        return (
          <button
            key={step}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(step)}
            className={`vt-pill ${active ? "vt-pill-selected" : ""}`}
          >
            {labels[step - 1]}
          </button>
        );
      })}
    </div>
  );
}

/** Indicador somente leitura, para exibir nível fora do formulário. */
export function LevelMeter({ level, labels = LEVELS }: { level: SkillLevel; labels?: readonly string[] }) {
  const activeColor = LEVEL_COLORS[level];
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-end gap-[2px]" style={{ height: "12px" }}>
        {STEPS.map((step) => (
          <span
            key={step}
            style={{
              width: "4px",
              height: `${step * 2.5 + 2}px`,
              background: step <= level ? LEVEL_COLORS[step] : `${NAVY}20`,
              borderRadius: "1px"
            }}
          />
        ))}
      </span>
      <span className="text-[10px] tracking-[0.1em] uppercase font-bold" style={{ fontFamily: MONO, color: activeColor }}>
        {labels[level - 1]}
      </span>
    </div>
  );
}
