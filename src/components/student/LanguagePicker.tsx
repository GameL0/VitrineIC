import { useState } from "react";
import { LevelPicker } from "./LevelPicker";
import { LANGUAGES, LANGUAGE_LEVELS } from "@/data/languages";
import type { SkillLevel, StudentLanguage } from "@/types";

const DEFAULT_LEVEL: SkillLevel = 2;

/**
 * Seleção de idiomas.
 *
 * Uma linha por idioma, com o nível de Básico a Fluente. A lista é curta e
 * fechada, então não precisa de busca: "Adicionar idioma" abre os que faltam.
 */
export function LanguagePicker({
  value,
  onChange,
}: {
  value: StudentLanguage[];
  onChange: (languages: StudentLanguage[]) => void;
}) {
  const [adding, setAdding] = useState(false);
  const has = (name: string) => value.some((l) => l.name === name);
  const available = LANGUAGES.filter((l) => !has(l));

  const add = (name: string) => {
    setAdding(false);
    if (!has(name)) onChange([...value, { name, level: DEFAULT_LEVEL }]);
  };

  const remove = (name: string) => onChange(value.filter((l) => l.name !== name));

  const setLevel = (name: string, level: SkillLevel) =>
    onChange(value.map((l) => (l.name === name ? { ...l, level } : l)));

  return (
    <div>
      {value.length > 0 && (
        <ul>
          {value.map((l) => (
            <li
              key={l.name}
              className="flex flex-col gap-3 border-b border-navy/8 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-sans text-[15px] text-navy">{l.name}</span>
              <span className="flex items-center gap-1">
                <LevelPicker
                  name={l.name}
                  value={l.level}
                  onChange={(lvl) => setLevel(l.name, lvl)}
                  labels={LANGUAGE_LEVELS}
                />
                <button
                  type="button"
                  onClick={() => remove(l.name)}
                  aria-label={`Remover ${l.name}`}
                  className="grid size-7 shrink-0 place-items-center rounded-md text-navy/40 transition-colors hover:bg-navy/5 hover:text-navy"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {available.length > 0 && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setAdding(!adding)}
            aria-expanded={adding}
            className="flex items-center gap-2 rounded-[10px] px-3 py-2 font-sans text-sm text-navy/65 transition-colors hover:bg-navy/5 hover:text-navy"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Adicionar idioma
          </button>
          {(adding || value.length === 0) && (
            <div className="mt-3 flex flex-wrap gap-1.5 px-3">
              {available.map((name) => (
                <button key={name} type="button" onClick={() => add(name)} className="vt-pill">
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
