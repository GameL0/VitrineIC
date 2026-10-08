import { NAVY, RED } from "@/styles/tokens";

export function StepIndicator({ current }: { current: number }) {
  const steps = [
    { n: "01", label: "Perfil & Interesses" },
    { n: "02", label: "Técnicas" },
    { n: "03", label: "Idiomas" },
    { n: "04", label: "Portfólio" },
  ];
  return (
    <div className="flex items-center gap-0 mb-14">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className="text-[22px] leading-none transition-all"
                style={{
                  fontFamily: "Inter Tight, Geist, system-ui, sans-serif",
                  color: i < current ? RED : i === current ? NAVY : `${NAVY}30`,
                }}
              >
                {s.n}
              </span>
            </div>
            <span
              className="text-[9px] tracking-[0.16em] uppercase whitespace-nowrap"
              style={{
                fontFamily: "Geist Mono, ui-monospace, monospace",
                color: i === current ? NAVY : `${NAVY}30`,
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
        </div>
      ))}
    </div>
  );
}
