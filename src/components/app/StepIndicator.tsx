/** Passos com traço no topo, preenchido até o passo atual (o atual em vermelho). */
export function StepIndicator({ steps, current }: { steps: readonly string[]; current: number }) {
  return (
    <ol className="grid gap-2 md:gap-4" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((label, i) => {
        const reached = i <= current;
        return (
          <li
            key={label}
            aria-current={i === current ? "step" : undefined}
            className={`border-t-2 pt-4 transition-colors ${reached ? "border-navy" : "border-navy/13"}`}
          >
            <p
              className={`font-display text-[15px] font-medium ${
                i === current ? "text-red" : reached ? "text-navy" : "text-navy/40"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className={`mt-1 font-sans text-[11px] leading-tight md:text-[13px] ${reached ? "text-navy" : "text-navy/40"}`}>
              {label}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
