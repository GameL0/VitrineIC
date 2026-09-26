import { LEVELS, LEVEL_SHORT } from "@/data/skills";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import type { SkillLevel } from "@/types";

const MONO = "Space Mono, monospace";

const STEPS: SkillLevel[] = [1, 2, 3, 4];

/**
 * Seletor de proficiência em quatro segmentos rotulados.
 *
 * Substitui as barras de 8px do protótipo: os alvos de clique agora têm
 * largura útil, o nível é nomeado em vez de adivinhado pela altura, e o
 * conjunto é um `radiogroup` navegável por teclado.
 */
export function LevelPicker({
  value,
  onChange,
  name,
  labels = LEVELS,
  short = LEVEL_SHORT,
}: {
  value: SkillLevel;
  onChange: (level: SkillLevel) => void;
  name: string;
  /** Rótulos alternativos — idiomas usam "Fluente" no lugar de "Especialista". */
  labels?: readonly string[];
  short?: Record<SkillLevel, string>;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={`Proficiência em ${name}`}
      className="flex"
      style={{ border: `1px solid ${NAVY}25` }}
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
        const filled = step <= value;
        return (
          <button
            key={step}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            title={labels[step - 1]}
            onClick={() => onChange(step)}
            className="px-2.5 py-1.5 text-[9px] tracking-[0.12em] uppercase transition-all"
            style={{
              fontFamily: MONO,
              minWidth: "42px",
              borderLeft: step > 1 ? `1px solid ${NAVY}18` : "none",
              background: active ? NAVY : filled ? `${NAVY}0E` : "transparent",
              color: active ? OFFWHITE : NAVY,
              opacity: active ? 1 : filled ? 0.8 : 0.45,
            }}
          >
            {short[step]}
          </button>
        );
      })}
    </div>
  );
}

/** Indicador somente leitura, para exibir nível fora do formulário. */
export function LevelMeter({ level }: { level: SkillLevel }) {
  return (
    <span className="inline-flex items-end gap-[2px]" style={{ height: "12px" }}>
      {STEPS.map((step) => (
        <span
          key={step}
          style={{
            width: "4px",
            height: `${step * 2.5 + 2}px`,
            background: step <= level ? RED : `${NAVY}20`,
          }}
        />
      ))}
    </span>
  );
}
