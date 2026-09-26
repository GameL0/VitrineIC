import { NAVY, NAVY_MUTED, RED } from "@/styles/tokens";

export function StepIndicator({ current }: { current: number }) {
  const steps = [
    { n: "01", label: "Perfil & Interesses" },
    { n: "02", label: "Competências" },
    { n: "03", label: "Portfólio" },
  ];
  return (
    <ol
      className="flex items-center gap-0 mb-14"
      style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: "3.5rem" }}
    >
      {steps.map((s, i) => (
        <li key={i} className="flex items-center" aria-current={i === current ? "step" : undefined}>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className="text-[22px] leading-none transition-all"
                style={{
                  fontFamily: "DM Serif Display, Georgia, serif",
                  color: i < current ? RED : i === current ? NAVY : NAVY_MUTED,
                }}
              >
                {s.n}
              </span>
            </div>
            <span
              className="text-[9px] tracking-[0.16em] uppercase whitespace-nowrap"
              style={{
                fontFamily: "Space Mono, monospace",
                color: i === current ? NAVY : NAVY_MUTED,
              }}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="mx-6 mt-[-12px] flex-shrink-0"
              style={{
                width: "60px",
                height: "1px",
                background: i < current ? RED : `${NAVY}20`,
                transition: "background 0.3s",
              }}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
