import { useMemo, useRef, useState } from "react";
import { LevelPicker } from "./LevelPicker";
import { Label } from "./ui";
import {
  ALL_SKILLS,
  LEVELS,
  SKILL_CATEGORIES,
  canonicalSkill,
  foldSkill,
  isCustomSkill,
  searchSkills,
} from "@/data/skills";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import type { SkillLevel, StudentSkill } from "@/types";

const MONO = "Space Mono, monospace";
const SANS = "Inter, sans-serif";

const DEFAULT_LEVEL: SkillLevel = 2;
const SUGGESTION_LIMIT = 8;

/**
 * Seleção de competências com busca, sugestões e entrada livre.
 *
 * O catálogo (`@/data/skills`) é sugestão, não limite — uma skill fora dele
 * pode ser adicionada e fica marcada como "fora do catálogo", porque o match
 * compara texto e uma grafia própria reduz a chance de casar com a demanda.
 * Toda entrada passa por `canonicalSkill`, que resolve apelidos como "reactjs".
 */
export function SkillPicker({
  value,
  onChange,
}: {
  value: StudentSkill[];
  onChange: (skills: StudentSkill[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedNames = value.map((s) => s.name);
  const has = (name: string) => selectedNames.some((n) => foldSkill(n) === foldSkill(name));

  const suggestions = useMemo(
    () => searchSkills(query, selectedNames).slice(0, SUGGESTION_LIMIT),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, selectedNames.join("|")],
  );

  const canonical = canonicalSkill(query);
  const canAddCustom = canonical.length > 1 && !has(canonical) && suggestions.length === 0;

  const add = (raw: string) => {
    const name = canonicalSkill(raw);
    if (!name || has(name)) {
      setQuery("");
      return;
    }
    onChange([...value, { name, level: DEFAULT_LEVEL }]);
    setQuery("");
    setHighlight(0);
    inputRef.current?.focus();
  };

  const remove = (name: string) =>
    onChange(value.filter((s) => foldSkill(s.name) !== foldSkill(name)));

  const setLevel = (name: string, level: SkillLevel) =>
    onChange(value.map((s) => (s.name === name ? { ...s, level } : s)));

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0) add(suggestions[highlight]?.name ?? suggestions[0].name);
      else if (canAddCustom) add(canonical);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(suggestions.length - 1, h + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(0, h - 1));
    }
    if (e.key === "Escape") setQuery("");
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">
      {/* ── Busca e catálogo ── */}
      <div>
        <Label>Buscar competência</Label>
        <div className="relative mt-1.5">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlight(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Digite e pressione Enter — ex.: Python, Flutter…"
            className="w-full px-3 py-2.5 text-sm bg-transparent outline-none transition-colors"
            style={{ border: `1px solid ${NAVY}44`, borderRadius: 0, fontFamily: SANS, color: NAVY }}
            onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
            onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}44`)}
          />

          {query && (
            <div
              className="absolute left-0 right-0 z-20"
              style={{ top: "100%", background: OFFWHITE, border: `1px solid ${NAVY}25` }}
            >
              {suggestions.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => add(s.name)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left transition-colors"
                  style={{
                    background: i === highlight ? `${NAVY}0A` : "transparent",
                    borderTop: i > 0 ? `1px solid ${NAVY}10` : "none",
                  }}
                >
                  <span className="text-[12px]" style={{ fontFamily: SANS, color: NAVY }}>
                    {s.name}
                  </span>
                  <span
                    className="text-[9px] tracking-[0.14em] uppercase"
                    style={{ fontFamily: MONO, color: NAVY, opacity: 0.35 }}
                  >
                    {s.cat}
                  </span>
                </button>
              ))}

              {canAddCustom && (
                <button
                  type="button"
                  onClick={() => add(canonical)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left"
                  style={{ background: `${RED}08` }}
                >
                  <span className="text-[12px]" style={{ fontFamily: SANS, color: NAVY }}>
                    Adicionar “{canonical}”
                  </span>
                  <span
                    className="text-[9px] tracking-[0.14em] uppercase"
                    style={{ fontFamily: MONO, color: RED, opacity: 0.8 }}
                  >
                    fora do catálogo
                  </span>
                </button>
              )}

              {suggestions.length === 0 && !canAddCustom && (
                <p
                  className="px-3 py-2 text-[10px] tracking-[0.14em] uppercase"
                  style={{ fontFamily: MONO, color: NAVY, opacity: 0.35 }}
                >
                  Já selecionada
                </p>
              )}
            </div>
          )}
        </div>

        {/* Catálogo por categoria, sem as já escolhidas */}
        <div className="flex flex-col gap-4 mt-7">
          {SKILL_CATEGORIES.map((cat) => {
            const items = ALL_SKILLS.filter((s) => s.cat === cat && !has(s.name));
            if (items.length === 0) return null;
            const visible = showAll ? items : items.slice(0, 6);
            return (
              <div key={cat}>
                <span
                  className="text-[9px] tracking-[0.18em] uppercase block mb-2"
                  style={{ fontFamily: MONO, color: RED, opacity: 0.7 }}
                >
                  {cat}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {visible.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => add(s.name)}
                      className="px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase transition-all"
                      style={{
                        fontFamily: MONO,
                        border: `1px solid ${NAVY}35`,
                        color: NAVY,
                        opacity: 0.65,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = NAVY;
                        e.currentTarget.style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${NAVY}35`;
                        e.currentTarget.style.opacity = "0.65";
                      }}
                    >
                      {s.name}
                    </button>
                  ))}
                  {!showAll && items.length > visible.length && (
                    <span
                      className="text-[10px] tracking-[0.14em] uppercase self-center"
                      style={{ fontFamily: MONO, color: NAVY, opacity: 0.3 }}
                    >
                      +{items.length - visible.length}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="text-[10px] tracking-[0.18em] uppercase transition-opacity hover:opacity-100 opacity-45 mt-5"
          style={{ fontFamily: MONO, color: NAVY, borderBottom: `1px solid ${NAVY}` }}
        >
          {showAll ? "Mostrar menos" : "Ver catálogo completo"}
        </button>
      </div>

      {/* ── Selecionadas ── */}
      <div>
        <div className="flex items-baseline justify-between">
          <Label>Suas competências</Label>
          <span
            className="text-[10px] tracking-[0.14em] uppercase"
            style={{ fontFamily: MONO, color: NAVY, opacity: 0.4 }}
          >
            {value.length} {value.length === 1 ? "skill" : "skills"}
          </span>
        </div>

        {value.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-2 h-36 mt-1.5 px-6 text-center"
            style={{ border: `1px dashed ${NAVY}25` }}
          >
            <span
              className="text-[10px] tracking-[0.14em] uppercase"
              style={{ fontFamily: MONO, color: NAVY, opacity: 0.35 }}
            >
              Nenhuma competência ainda
            </span>
            <span className="text-[11px]" style={{ fontFamily: SANS, color: NAVY, opacity: 0.4 }}>
              Busque acima ou escolha uma sugestão. O nível começa em
              Intermediário e você ajusta aqui.
            </span>
          </div>
        ) : (
          <div className="flex flex-col mt-1.5" style={{ border: `1px solid ${NAVY}15` }}>
            {value.map((s, i) => (
              <div
                key={s.name}
                className="flex items-center justify-between gap-3 px-4 py-3"
                style={{ borderTop: i > 0 ? `1px solid ${NAVY}10` : "none" }}
              >
                <div className="min-w-0">
                  <span
                    className="text-[12px] font-medium block truncate"
                    style={{ fontFamily: MONO, color: NAVY }}
                  >
                    {s.name}
                  </span>
                  <span
                    className="text-[9px] tracking-[0.1em] uppercase"
                    style={{
                      fontFamily: MONO,
                      color: isCustomSkill(s.name) ? RED : NAVY,
                      opacity: isCustomSkill(s.name) ? 0.7 : 0.35,
                    }}
                  >
                    {isCustomSkill(s.name) ? "fora do catálogo" : LEVELS[s.level - 1]}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <LevelPicker
                    name={s.name}
                    value={s.level}
                    onChange={(level) => setLevel(s.name, level)}
                  />
                  <button
                    type="button"
                    onClick={() => remove(s.name)}
                    aria-label={`Remover ${s.name}`}
                    className="w-6 h-6 flex items-center justify-center transition-opacity hover:opacity-100 opacity-30"
                    style={{ color: NAVY }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.4" />
                      <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Legenda dos níveis */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
          {LEVELS.map((l, i) => (
            <span
              key={l}
              className="text-[9px] tracking-[0.12em] uppercase"
              style={{ fontFamily: MONO, color: NAVY, opacity: 0.4 }}
            >
              <span style={{ color: RED, opacity: 0.8 }}>{i + 1}</span> {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
