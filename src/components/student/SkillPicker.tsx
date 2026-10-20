import { useMemo, useRef, useState } from "react";
import { LevelPicker } from "./LevelPicker";
import { Label } from "./ui";
import {
  SUGGESTED_BY_COURSE,
  ALL_SKILLS,
  SKILL_CATEGORIES,
  canonicalSkill,
  foldSkill,
  isCustomSkill,
  searchSkills,
  suggestedFor,
} from "@/data/skills";
import type { SkillLevel, StudentSkill } from "@/types";

const DEFAULT_LEVEL: SkillLevel = 2;

/** Máximo de sugestões visíveis. Acima disso a escolha trava em vez de ajudar. */
const MAX_SUGGESTIONS = 8;

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="text-navy/55">
      <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

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
      <strong className="font-semibold">{name.slice(end)}</strong>
    </>
  );
}

/**
 * Seleção de competências em campo de tokens.
 *
 * Combina três padrões consolidados:
 *
 * 1. Lista com nível — as escolhidas viram linhas com o seletor de nível e
 *    um botão de remover, abaixo do campo de busca.
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
    <div>
      {/* ── Busca ── */}
      <div className="relative">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-navy/55"
        >
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlight(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Buscar competência (ex.: Python, React, Docker)"
          aria-label="Buscar competência"
          className="vt-input"
          // .vt-input fica fora das camadas do Tailwind; o respiro da lupa vai inline.
          style={{ paddingLeft: 40, height: 44 }}
        />
      </div>

      {/* ── Sugestões da busca: no máximo oito, sem rolagem ── */}
      {query && (results.length > 0 || canAddCustom) && (
        <div className="mt-2 flex flex-col rounded-xl border border-navy/10 bg-white p-1 shadow-[0_12px_32px_-12px_rgba(11,37,69,0.25)]">
          {results.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onMouseEnter={() => setHighlight(i)}
              onClick={() => add(s.name)}
              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                i === highlight ? "bg-navy/5" : ""
              }`}
            >
              <span className="font-sans text-sm text-navy">
                <Predicted name={s.name} query={query} />
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.08em] text-navy/55 sm:inline">
                  {s.cat}
                </span>
                <PlusIcon />
              </span>
            </button>
          ))}

          {canAddCustom && (
            <button
              type="button"
              onClick={() => add(canonical)}
              className="flex w-full items-center justify-between gap-3 rounded-lg bg-red/5 px-3 py-2 text-left"
            >
              <span className="font-sans text-sm text-navy">Adicionar “{canonical}”</span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-red">
                fora do catálogo
              </span>
            </button>
          )}
        </div>
      )}

      {/* ── Atalhos pelo curso ── */}
      {!query && shortcuts.length > 0 && (
        <div className="mt-5">
          <Label>{course && SUGGESTED_BY_COURSE[course] ? `Comuns em ${course}` : "Mais declaradas"}</Label>
          <div className="flex flex-wrap gap-1.5">
            {shortcuts.map((name) => (
              <button key={name} type="button" onClick={() => add(name)} className="vt-pill">
                <span className="text-red">+</span>
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Escolhidas, com nível ── */}
      {value.length > 0 && (
        <ul className="mt-7 border-t border-navy/8">
          {value.map((s) => (
            <li
              key={s.name}
              className="flex flex-col gap-3 border-b border-navy/8 py-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate font-sans text-[15px] text-navy">{s.name}</span>
                {isCustomSkill(s.name) && (
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-red">
                    fora do catálogo
                  </span>
                )}
              </span>
              <span className="flex items-center gap-2">
                <LevelPicker name={s.name} value={s.level} onChange={(level) => setLevel(s.name, level)} />
                <button
                  type="button"
                  onClick={() => remove(s.name)}
                  aria-label={`Remover ${s.name}`}
                  className="grid size-7 shrink-0 place-items-center rounded-md text-navy/55 transition-colors hover:bg-navy/5 hover:text-navy"
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

      {/* ── Catálogo completo, sob demanda ── */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowCatalog(!showCatalog)}
          className="font-mono text-[10px] uppercase tracking-[0.08em] text-navy/65 underline underline-offset-4 transition-colors hover:text-navy"
        >
          {showCatalog ? "Ocultar catálogo" : `Ver catálogo completo (${ALL_SKILLS.length})`}
        </button>

        {showCatalog && (
          <div className="mt-5 flex flex-col gap-4">
            {SKILL_CATEGORIES.map((cat) => {
              const items = ALL_SKILLS.filter((s) => s.cat === cat && !has(s.name));
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.08em] text-red">{cat}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((s) => (
                      <button key={s.name} type="button" onClick={() => add(s.name)} className="vt-pill">
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

      <p className="mt-5 font-sans text-xs text-navy/55">
        Não achou? Digite o nome e pressione Enter: a competência entra marcada como fora do catálogo.
        Backspace com a busca vazia remove a última.
      </p>
    </div>
  );
}
