import { LevelPicker } from "./LevelPicker";
import { Label } from "./ui";
import { LANGUAGES, LANGUAGE_LEVELS } from "@/data/languages";
import { NAVY, NAVY_MUTED, RED } from "@/styles/tokens";
import type { SkillLevel, StudentLanguage } from "@/types";

const MONO = "Space Mono, monospace";
const SANS = "Inter, sans-serif";

const DEFAULT_LEVEL: SkillLevel = 2;

/** "Fluente" no lugar de "Especialista" — especialista em idioma não diz nada. */
const SHORT: Record<SkillLevel, string> = { 1: "Bás", 2: "Int", 3: "Avan", 4: "Flu" };

/**
 * Seleção de idiomas.
 *
 * A lista é curta e fechada, então não precisa de busca: os idiomas
 * disponíveis aparecem como atalhos, no mesmo formato dos atalhos de
 * competências técnicas. Só o nível é configurável depois.
 */
export function LanguagePicker({
  value,
  onChange,
}: {
  value: StudentLanguage[];
  onChange: (languages: StudentLanguage[]) => void;
}) {
  const has = (name: string) => value.some((l) => l.name === name);
  const available = LANGUAGES.filter((l) => !has(l));

  const add = (name: string) =>
    has(name) ? undefined : onChange([...value, { name, level: DEFAULT_LEVEL }]);

  const remove = (name: string) => onChange(value.filter((l) => l.name !== name));

  const setLevel = (name: string, level: SkillLevel) =>
    onChange(value.map((l) => (l.name === name ? { ...l, level } : l)));

  return (
    <div className="max-w-3xl">
      <div className="flex items-baseline justify-between mb-1.5">
        <Label>Idiomas</Label>
        {value.length > 0 && (
          <span
            className="text-[10px] tracking-[0.14em] uppercase"
            style={{ fontFamily: MONO, color: NAVY_MUTED }}
          >
            {value.length} {value.length === 1 ? "idioma" : "idiomas"}
          </span>
        )}
      </div>

      {value.length > 0 && (
        <div className="mb-4" style={{ border: `1px solid ${NAVY}15` }}>
          {value.map((l, i) => (
            <div
              key={l.name}
              className="flex items-center justify-between gap-4 px-4 py-2.5"
              style={{ borderTop: i > 0 ? `1px solid ${NAVY}10` : "none" }}
            >
              <span className="text-[12px]" style={{ fontFamily: MONO, color: NAVY }}>
                {l.name}
              </span>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span
                  className="hidden sm:inline text-[9px] tracking-[0.1em] uppercase"
                  style={{ fontFamily: MONO, color: NAVY_MUTED }}
                >
                  {LANGUAGE_LEVELS[l.level - 1]}
                </span>
                <LevelPicker
                  name={l.name}
                  value={l.level}
                  onChange={(level) => setLevel(l.name, level)}
                  labels={LANGUAGE_LEVELS}
                  short={SHORT}
                />
                <button
                  type="button"
                  onClick={() => remove(l.name)}
                  aria-label={`Remover ${l.name}`}
                  className="w-6 h-6 flex items-center justify-center transition-colors"
                  style={{ color: NAVY_MUTED }}
                >
                  <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.4" />
                    <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {available.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {available.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => add(name)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] tracking-[0.1em] uppercase transition-all"
              style={{ fontFamily: MONO, border: `1px solid ${NAVY}30`, color: NAVY, opacity: 0.7 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = NAVY;
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${NAVY}30`;
                e.currentTarget.style.opacity = "0.7";
              }}
            >
              <span style={{ color: RED }}>+</span>
              {name}
            </button>
          ))}
        </div>
      )}

      <p className="text-[10px] mt-4" style={{ fontFamily: SANS, color: NAVY_MUTED }}>
        Conta para demandas com bibliografia estrangeira, colaboração
        internacional e projetos de acessibilidade.
      </p>
    </div>
  );
}
