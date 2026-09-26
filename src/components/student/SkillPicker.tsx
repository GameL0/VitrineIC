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
  suggestedFor,
} from "@/data/skills";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import type { SkillLevel, StudentSkill } from "@/types";

const MONO = "Space Mono, monospace";
const SANS = "Inter, sans-serif";

const DEFAULT_LEVEL: SkillLevel = 2;

/** Máximo de sugestões visíveis. Acima disso a escolha trava em vez de ajudar. */
const MAX_SUGGESTIONS = 8;

/** Fold que preserva o comprimento, para destacar o trecho certo do nome. */
function fold(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/**
 * Destaca a parte PREVISTA do nome, não a digitada: em "back", negrita "pack"
 * de "backpack". É o que permite ao olho completar a palavra.
 */
function Predicted({ name, query }: { name: string; query: string }) {
  const q = fold(query.trim());
  const idx = q ? fold(name).indexOf(q) : -1;
  if (idx === -1) return <>{name}</>;
  const end = idx + q.length;
  return (
    <>
      {name.slice(0, end)}
      <strong style={{ fontWeight: 600 }}>{name.slice(end)}</strong>
    </>
  );
}

/**
 * Seleção de competências em campo de tokens.
 *
 * Combina três padrões consolidados:
 *
 * 1. Token input — as escolhidas viram chips removíveis dentro do próprio
 *    campo, então não há um segundo painel competindo com o catálogo.
 * 2. Busca estrita — no máximo oito sugestões, sem rolagem interna, com a
 *    parte prevista do nome em destaque.
 * 3. Divulgação progressiva — em vez das 195 tecnologias, atalhos relevantes
 *    ao curso informado no passo 1. O catálogo completo fica sob demanda.
 */
export function SkillPicker({
  value,
  onChange,
  course,
}: {
  value: StudentSkill[];
  onChange: (skills: StudentSkill[]) => void;
  course?: string;
}) {
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const [showCatalog, setShowCatalog] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedNames = value.map((s) => s.name);
  const has = (name: string) => selectedNames.some((n) => foldSkill(n) === foldSkill(name));

  const results = useMemo(
    () => searchSkills(query, selectedNames).slice(0, MAX_SUGGESTIONS),
    [query, selectedNames.join("|")],
  );

  const shortcuts = useMemo(
    () => suggestedFor(course).filter((n) => !has(n)).slice(0, 12),
    [course, selectedNames.join("|")],
  );

  const canonical = canonicalSkill(query);
  const canAddCustom =
    canonical.length > 1 && !has(canonical) && searchSkills(query, selectedNames).length === 0;

  const add = (raw: string) => {
    const name = canonicalSkill(raw);
    setQuery("");
    setHighlight(0);
    if (!name || has(name)) return;
    onChange([...value, { name, level: DEFAULT_LEVEL }]);
    inputRef.current?.focus();
  };

  const remove = (name: string) =>
    onChange(value.filter((s) => foldSkill(s.name) !== foldSkill(name)));

  const setLevel = (name: string, level: SkillLevel) =>
    onChange(value.map((s) => (s.name === name ? { ...s, level } : s)));

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0) add(results[highlight]?.name ?? results[0].name);
      else if (canAddCustom) add(canonical);
    }
    if (e.key === "Backspace" && query === "" && value.length > 0) {
      remove(value[value.length - 1].name);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(results.length - 1, h + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(0, h - 1));
    }
    if (e.key === "Escape") setQuery("");
  };

  return (
    <div className="max-w-3xl">
      <Label>Competências</Label>

      {/* ── Campo de tokens ── */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex flex-wrap items-center gap-1.5 px-2.5 py-2 mt-1.5 cursor-text"
        style={{ border: `1px solid ${NAVY}44`, minHeight: "48px" }}
      >
        {value.map((s) => (
          <span
            key={s.name}
            className="inline-flex items-center gap-2 pl-2.5 pr-1.5 py-1"
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              background: isCustomSkill(s.name) ? `${RED}0F` : `${NAVY}0C`,
              border: `1px solid ${isCustomSkill(s.name) ? `${RED}55` : `${NAVY}20`}`,
              color: NAVY,
            }}
          >
            {s.name}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                remove(s.name);
              }}
              aria-label={`Remover ${s.name}`}
              className="w-3.5 h-3.5 flex items-center justify-center transition-opacity hover:opacity-100 opacity-40"
              style={{ color: NAVY }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <line x1="1" y1="1" x2="7" y2="7" stroke="currentColor" strokeWidth="1.4" />
                <line x1="7" y1="1" x2="1" y2="7" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlight(0);
          }}
          onKeyDown={onKeyDown}
          placeholder={value.length === 0 ? "Digite uma competência e pressione Enter…" : ""}
          className="flex-1 min-w-[180px] px-1 py-1 text-sm bg-transparent outline-none"
          style={{ fontFamily: SANS, color: NAVY }}
        />
      </div>

      {/* ── Sugestões da busca: no máximo oito, sem rolagem ── */}
      {query && (results.length > 0 || canAddCustom) && (
        <div style={{ border: `1px solid ${NAVY}25`, borderTop: "none" }}>
          {results.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onMouseEnter={() => setHighlight(i)}
              onClick={() => add(s.name)}
              className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left transition-colors"
              style={{
                background: i === highlight ? `${NAVY}0A` : "transparent",
                borderTop: i > 0 ? `1px solid ${NAVY}0D` : "none",
              }}
            >
              <span className="text-[13px]" style={{ fontFamily: SANS, color: NAVY }}>
                <Predicted name={s.name} query={query} />
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
              className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left"
              style={{ background: `${RED}08`, borderTop: results.length ? `1px solid ${NAVY}0D` : "none" }}
            >
              <span className="text-[13px]" style={{ fontFamily: SANS, color: NAVY }}>
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
        </div>
      )}

      {/* ── Atalhos pelo curso ── */}
      {!query && shortcuts.length > 0 && (
        <div className="mt-5">
          <p
            className="text-[9px] tracking-[0.18em] uppercase mb-2.5"
            style={{ fontFamily: MONO, color: NAVY, opacity: 0.4 }}
          >
            {course ? `Comuns em ${course}` : "Mais declaradas"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {shortcuts.map((name) => (
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
        </div>
      )}

      {/* ── Níveis ── */}
      {value.length > 0 && (
        <div className="mt-9">
          <div className="flex items-baseline justify-between mb-1.5">
            <Label>Nível de proficiência</Label>
            <span
              className="text-[10px] tracking-[0.14em] uppercase"
              style={{ fontFamily: MONO, color: NAVY, opacity: 0.4 }}
            >
              {value.length} {value.length === 1 ? "competência" : "competências"}
            </span>
          </div>
          <div style={{ border: `1px solid ${NAVY}15` }}>
            {value.map((s, i) => (
              <div
                key={s.name}
                className="flex items-center justify-between gap-4 px-4 py-2.5"
                style={{ borderTop: i > 0 ? `1px solid ${NAVY}10` : "none" }}
              >
                <span
                  className="text-[12px] truncate"
                  style={{ fontFamily: MONO, color: NAVY }}
                >
                  {s.name}
                </span>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className="hidden sm:inline text-[9px] tracking-[0.1em] uppercase"
                    style={{ fontFamily: MONO, color: NAVY, opacity: 0.35 }}
                  >
                    {LEVELS[s.level - 1]}
                  </span>
                  <LevelPicker
                    name={s.name}
                    value={s.level}
                    onChange={(level) => setLevel(s.name, level)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Catálogo completo, sob demanda ── */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowCatalog(!showCatalog)}
          className="text-[10px] tracking-[0.16em] uppercase transition-opacity hover:opacity-100 opacity-45"
          style={{ fontFamily: MONO, color: NAVY, borderBottom: `1px solid ${NAVY}` }}
        >
          {showCatalog ? "Ocultar catálogo" : `Ver catálogo completo (${ALL_SKILLS.length})`}
        </button>

        {showCatalog && (
          <div className="flex flex-col gap-4 mt-5">
            {SKILL_CATEGORIES.map((cat) => {
              const items = ALL_SKILLS.filter((s) => s.cat === cat && !has(s.name));
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <span
                    className="text-[9px] tracking-[0.18em] uppercase block mb-2"
                    style={{ fontFamily: MONO, color: RED, opacity: 0.7 }}
                  >
                    {cat}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((s) => (
                      <button
                        key={s.name}
                        type="button"
                        onClick={() => add(s.name)}
                        className="px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase transition-all"
                        style={{
                          fontFamily: MONO,
                          border: `1px solid ${NAVY}25`,
                          color: NAVY,
                          opacity: 0.6,
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-[10px] mt-6" style={{ fontFamily: SANS, color: NAVY, opacity: 0.4 }}>
        Não achou? Digite o nome e pressione Enter — a competência entra marcada
        como fora do catálogo. Backspace remove a última.
      </p>
    </div>
  );
}
