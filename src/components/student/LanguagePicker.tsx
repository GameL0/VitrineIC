import { LevelPicker } from "./LevelPicker";
import { Label } from "./ui";
import { LANGUAGES, LANGUAGE_LEVELS } from "@/data/languages";
import { NAVY, RED } from "@/styles/tokens";
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
    has(name) ? undefined : onChange([...value, { name, conversacao: DEFAULT_LEVEL, leitura: DEFAULT_LEVEL, escuta: DEFAULT_LEVEL }]);

  const remove = (name: string) => onChange(value.filter((l) => l.name !== name));

  const setLevel = (name: string, type: "conversacao" | "leitura" | "escuta", level: SkillLevel) =>
    onChange(value.map((l) => (l.name === name ? { ...l, [type]: level } : l)));

  return (
    <div className="max-w-3xl">
      <div className="flex items-baseline justify-between mb-1.5">
        <Label>Idiomas</Label>
        {value.length > 0 && (
          <span
            className="text-[10px] tracking-[0.14em] uppercase"
            style={{ fontFamily: MONO, color: NAVY, opacity: 0.7 }}
          >
            {value.length} {value.length === 1 ? "idioma" : "idiomas"}
          </span>
        )}
      </div>

      {value.length > 0 && (
        <div className="mb-4" style={{ border: `1px solid ${NAVY}40` }}>
          {value.map((l, i) => (
            <div
              key={l.name}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 py-3"
              style={{ borderTop: i > 0 ? `1px solid ${NAVY}10` : "none" }}
            >
              <span className="text-[12px] w-24 flex-shrink-0" style={{ fontFamily: MONO, color: NAVY }}>
                {l.name}
              </span>
              <div className="flex-1 w-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-medium" style={{ fontFamily: MONO, color: NAVY, opacity: 0.7 }}>Conversação</span>
                  <LevelPicker name={`${l.name}-conv`} value={l.conversacao} onChange={(lvl) => setLevel(l.name, "conversacao", lvl)} labels={LANGUAGE_LEVELS} short={SHORT} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-medium" style={{ fontFamily: MONO, color: NAVY, opacity: 0.7 }}>Leitura</span>
                  <LevelPicker name={`${l.name}-leit`} value={l.leitura} onChange={(lvl) => setLevel(l.name, "leitura", lvl)} labels={LANGUAGE_LEVELS} short={SHORT} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-medium" style={{ fontFamily: MONO, color: NAVY, opacity: 0.7 }}>Escuta</span>
                  <LevelPicker name={`${l.name}-esc`} value={l.escuta} onChange={(lvl) => setLevel(l.name, "escuta", lvl)} labels={LANGUAGE_LEVELS} short={SHORT} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => remove(l.name)}
                aria-label={`Remover ${l.name}`}
                className="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-100 opacity-50 ml-auto sm:ml-4"
                style={{ color: NAVY }}
              >
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                  <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.4" />
                  <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
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
              style={{ fontFamily: MONO, border: `1px solid ${NAVY}60`, color: NAVY, opacity: 0.7 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = NAVY;
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${NAVY}60`;
                e.currentTarget.style.opacity = "0.7";
              }}
            >
              <span style={{ color: RED }}>+</span>
              {name}
            </button>
          ))}
        </div>
      )}

      <p className="text-[10px] mt-4" style={{ fontFamily: SANS, color: NAVY, opacity: 0.7 }}>
        Conta para demandas com bibliografia estrangeira, colaboração
        internacional e projetos de acessibilidade.
      </p>
    </div>
  );
}
