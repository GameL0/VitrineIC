import { useEffect, useMemo, useRef, useState } from "react";
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
const ALL = "Todas";

/**
 * Seleção de competências: busca em primeiro plano, catálogo como descoberta.
 *
 * O catálogo tem quase 200 tecnologias em 12 categorias, então listá-las
 * empilhadas por categoria tornava a tela impraticável. A navegação segue o
 * mesmo padrão do catálogo público de projetos (`public/ProjectsCatalog`):
 * uma linha de chips filtra, e o resultado cai numa única área com altura
 * limitada — a tela não cresce quando o catálogo cresce.
 *
 * Toda entrada passa por `canonicalSkill`, que resolve apelidos como "reactjs",
 * porque o match compara texto (`@/lib/match`). Skills fora do catálogo são
 * aceitas e sinalizadas.
 */
export function SkillPicker({
  value,
  onChange,
}: {
  value: StudentSkill[];
  onChange: (skills: StudentSkill[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedNames = value.map((s) => s.name);
  const has = (name: string) => selectedNames.some((n) => foldSkill(n) === foldSkill(name));

  /** Resultado = busca ∩ categoria ativa, já sem as competências escolhidas. */
  const results = useMemo(() => {
    const found = searchSkills(query, selectedNames);
    return category === ALL ? found : found.filter((s) => s.cat === category);
  }, [query, category, selectedNames.join("|")]);

  const canonical = canonicalSkill(query);
  const nothingAnywhere = searchSkills(query, selectedNames).length === 0;
  const canAddCustom = canonical.length > 1 && !has(canonical) && nothingAnywhere;

  useEffect(() => setHighlight(0), [query, category]);

  const add = (raw: string) => {
    const name = canonicalSkill(raw);
    if (!name || has(name)) {
      setQuery("");
      return;
    }
    onChange([...value, { name, level: DEFAULT_LEVEL }]);
    setQuery("");
    inputRef.current?.focus();
  };

  const remove = (name: string) =>
    onChange(value.filter((s) => foldSkill(s.name) !== foldSkill(name)));

  const setLevel = (name: string, level: SkillLevel) =>
    onChange(value.map((s) => (s.name === name ? { ...s, level } : s)));

  const move = (delta: number) => {
    const next = Math.max(0, Math.min(results.length - 1, highlight + delta));
    setHighlight(next);
    listRef.current?.querySelectorAll("button")[next]?.scrollIntoView({ block: "nearest" });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0) add(results[highlight]?.name ?? results[0].name);
      else if (canAddCustom) add(canonical);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    }
    if (e.key === "Escape") setQuery("");
  };

  const total = ALL_SKILLS.filter((s) => category === ALL || s.cat === category).length;

  return (
    <div>
      {/* ── Busca: caminho principal ── */}
      <Label>Buscar competência</Label>
      <div className="relative mt-1.5 mb-8">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Digite e pressione Enter — ex.: Python, FPGA, RAG…"
          className="w-full px-3 py-3 text-sm bg-transparent outline-none transition-colors"
          style={{ border: `1px solid ${NAVY}44`, borderRadius: 0, fontFamily: SANS, color: NAVY }}
          onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
          onBlur={(e) => (e.currentTarget.style.borderColor = `${NAVY}44`)}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Limpar busca"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center transition-opacity hover:opacity-100 opacity-35"
            style={{ color: NAVY }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.4" />
              <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* ── Selecionadas: o objetivo da tela ── */}
        <div className="order-first md:order-last md:sticky md:top-4">
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
              className="flex flex-col items-center justify-center gap-2 h-32 mt-1.5 px-6 text-center"
              style={{ border: `1px dashed ${NAVY}25` }}
            >
              <span
                className="text-[10px] tracking-[0.14em] uppercase"
                style={{ fontFamily: MONO, color: NAVY, opacity: 0.35 }}
              >
                Nenhuma competência ainda
              </span>
              <span className="text-[11px]" style={{ fontFamily: SANS, color: NAVY, opacity: 0.4 }}>
                Busque acima. O nível começa em Intermediário e você ajusta aqui.
              </span>
            </div>
          ) : (
            <div
              className="flex flex-col mt-1.5"
              style={{ border: `1px solid ${NAVY}15`, maxHeight: "420px", overflowY: "auto" }}
            >
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

        {/* ── Catálogo: descoberta ── */}
        <div className="md:order-first">
          <div className="flex items-baseline justify-between mb-3">
            <Label>Catálogo</Label>
            <span
              className="text-[10px] tracking-[0.14em] uppercase"
              style={{ fontFamily: MONO, color: NAVY, opacity: 0.35 }}
            >
              {query ? `${results.length} de ${total}` : `${total} tecnologias`}
            </span>
          </div>

          {/* Filtro por categoria — mesmo padrão do catálogo de projetos */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {[ALL, ...SKILL_CATEGORIES].map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className="px-2.5 py-1.5 text-[9px] tracking-[0.12em] uppercase transition-all"
                  style={{
                    fontFamily: MONO,
                    border: `1px solid ${active ? NAVY : `${NAVY}25`}`,
                    background: active ? NAVY : "transparent",
                    color: active ? OFFWHITE : NAVY,
                    opacity: active ? 1 : 0.55,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Uma área só, com altura limitada */}
          <div
            ref={listRef}
            style={{
              border: `1px solid ${NAVY}18`,
              maxHeight: "340px",
              overflowY: "auto",
            }}
          >
            {results.map((s, i) => (
              <button
                key={s.name}
                type="button"
                onMouseEnter={() => setHighlight(i)}
                onClick={() => add(s.name)}
                className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors"
                style={{
                  background: i === highlight ? `${NAVY}0A` : "transparent",
                  borderTop: i > 0 ? `1px solid ${NAVY}0D` : "none",
                }}
              >
                <span className="text-[12px]" style={{ fontFamily: SANS, color: NAVY }}>
                  {s.name}
                </span>
                <span
                  className="text-[9px] tracking-[0.12em] uppercase flex-shrink-0"
                  style={{ fontFamily: MONO, color: NAVY, opacity: 0.3 }}
                >
                  {s.cat}
                </span>
              </button>
            ))}

            {canAddCustom && (
              <button
                type="button"
                onClick={() => add(canonical)}
                className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left"
                style={{ background: `${RED}08` }}
              >
                <span className="text-[12px]" style={{ fontFamily: SANS, color: NAVY }}>
                  Adicionar “{canonical}”
                </span>
                <span
                  className="text-[9px] tracking-[0.12em] uppercase flex-shrink-0"
                  style={{ fontFamily: MONO, color: RED, opacity: 0.8 }}
                >
                  fora do catálogo
                </span>
              </button>
            )}

            {results.length === 0 && !canAddCustom && (
              <div className="px-4 py-6 text-center">
                <p
                  className="text-[10px] tracking-[0.14em] uppercase mb-2"
                  style={{ fontFamily: MONO, color: NAVY, opacity: 0.35 }}
                >
                  {category === ALL ? "Nada encontrado" : `Nada em ${category}`}
                </p>
                {category !== ALL && (
                  <button
                    type="button"
                    onClick={() => setCategory(ALL)}
                    className="text-[10px] tracking-[0.14em] uppercase transition-opacity hover:opacity-100 opacity-50"
                    style={{ fontFamily: MONO, color: NAVY, borderBottom: `1px solid ${NAVY}` }}
                  >
                    Buscar em todas
                  </button>
                )}
              </div>
            )}
          </div>

          <p
            className="text-[10px] mt-3"
            style={{ fontFamily: SANS, color: NAVY, opacity: 0.4 }}
          >
            Não achou? Digite o nome e adicione mesmo assim — a competência entra
            marcada como fora do catálogo.
          </p>
        </div>
      </div>
    </div>
  );
}
