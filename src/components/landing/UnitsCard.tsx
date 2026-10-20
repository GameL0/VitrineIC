import { useEffect, useState, type ReactNode } from "react";
import { INSTITUTION, UNITS } from "@/data/institution";

/** Tempo que cada unidade fica na tela e duração da troca (ver .vt-unit-* no index.css). */
const ROTATE_MS = 2600;
const SWAP_MS = 800;

type Unit = (typeof UNITS)[number];

/**
 * Índice da unidade atual e da que está saindo (enquanto a troca anima).
 * Com prefers-reduced-motion fica parado na primeira.
 */
function useRotatingUnit() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let current = 0;
    let swapTimer: number | undefined;
    const interval = window.setInterval(() => {
      const next = (current + 1) % UNITS.length;
      setPrev(current);
      setIndex(next);
      current = next;
      window.clearTimeout(swapTimer);
      swapTimer = window.setTimeout(() => setPrev(null), SWAP_MS);
    }, ROTATE_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(swapTimer);
    };
  }, []);

  return { index, prev };
}

/**
 * Empilha na mesma célula a unidade que sai e a que entra, para as duas
 * animarem ao mesmo tempo (uma sobe e some, a outra sobe e aparece).
 */
function Crossfade({
  index,
  prev,
  render,
  className = "",
}: {
  index: number;
  prev: number | null;
  render: (unit: Unit) => ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid ${className}`}>
      {prev !== null && (
        <div key={`out-${prev}`} aria-hidden="true" className="vt-unit-out [grid-area:1/1]">
          {render(UNITS[prev])}
        </div>
      )}
      <div key={`in-${index}`} className={`[grid-area:1/1] ${prev !== null ? "vt-unit-in" : ""}`}>
        {render(UNITS[index])}
      </div>
    </div>
  );
}

/** 120 px até 3 letras; menor nas siglas longas, para nunca quebrar linha. */
function acronymSize(short: string) {
  if (short.length <= 3) return 120;
  if (short.length <= 5) return 96;
  return 76;
}

/**
 * Cartão azul do hero com a sigla rotativa das unidades da universidade.
 * `compact` é a faixa que aparece no celular, abaixo dos botões do hero.
 */
export function UnitsCard({ variant = "full" }: { variant?: "full" | "compact" }) {
  const { index, prev } = useRotatingUnit();
  const label = `Unidades da ${INSTITUTION.university}`;

  if (variant === "compact") {
    return (
      <div role="group" aria-label={label} className="vt-stone flex h-28 items-center rounded-2xl p-5">
        <Crossfade
          index={index}
          prev={prev}
          className="min-w-0 flex-1 items-center"
          render={(unit) => (
            <div aria-live="off" className="flex min-w-0 items-center gap-4">
              <p className="shrink-0 whitespace-nowrap font-display text-[48px] font-medium leading-[0.85] tracking-[-0.05em] text-offwhite/95">
                {unit.short}
                <span className="text-sky">.</span>
              </p>
              <div className="min-w-0">
                <p className="line-clamp-3 font-sans text-[13px] leading-[1.3] text-offwhite">{unit.name}</p>
                <p className="mt-0.5 font-sans text-xs font-light text-offwhite/60">
                  e todas as unidades da {INSTITUTION.universityShort}
                </p>
              </div>
            </div>
          )}
        />
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={label}
      className="vt-stone flex h-[567px] flex-col justify-between rounded-3xl p-9"
    >
      <span className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-400/35 bg-emerald-400/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-emerald-300">
        <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        Vitrine aberta
      </span>

      <div aria-live="off">
        <Crossfade
          index={index}
          prev={prev}
          className="h-[102px] items-end"
          render={(unit) => (
            <p
              className="whitespace-nowrap font-display font-medium leading-[0.85] tracking-[-0.05em] text-offwhite/95"
              style={{ fontSize: acronymSize(unit.short) }}
            >
              {unit.short}
              <span className="text-sky">.</span>
            </p>
          )}
        />
        <div className="mt-6 border-t border-offwhite/12 pt-5">
          <Crossfade
            index={index}
            prev={prev}
            render={(unit) => <p className="font-sans text-[15px] text-offwhite">{unit.name}</p>}
          />
          <p className="mt-1 font-sans text-sm font-light text-offwhite/60">
            e todas as unidades da {INSTITUTION.universityShort}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-sky">
            {INSTITUTION.city} — {INSTITUTION.state}
          </p>
        </div>
      </div>
    </div>
  );
}
