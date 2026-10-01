import { useState } from "react";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { StepIndicator } from "./StepIndicator";
import { NAVY, OFFWHITE } from "@/styles/tokens";

export function Onboarding({ onComplete }: { onComplete: (data: any) => void }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const next = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(formData);
  };

  const update = (partial: any) => setFormData({ ...formData, ...partial });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: OFFWHITE }}
    >
      {/* Top bar */}
      <div
        className="w-full px-8 md:px-16 py-4 flex items-center gap-3"
        style={{ borderBottom: `1px solid ${NAVY}15` }}
      >
        <img src="/logo.jpg" alt="Logo ConectaIC" className="w-6 h-6 object-contain rounded-[4px]" style={{ background: NAVY }} />
        <span
          className="text-[12px] tracking-[0.2em] uppercase font-semibold"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
        >
          VitrineIC
        </span>
        <span
          className="text-[9px] tracking-[0.18em] uppercase ml-2"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
        >
          · Configuração inicial
        </span>
      </div>

      <div className="flex-1 px-8 md:px-16 py-14 max-w-4xl w-full mx-auto">
        <StepIndicator current={step} />

        <div className="min-h-[420px]">
          {step === 0 && (
            <Step1
              data={formData}
              setData={update}
            />
          )}
          {step === 1 && (
            <Step2
              data={formData}
              setData={update}
            />
          )}
          {step === 2 && (
            <Step3
              data={formData}
              setData={update}
            />
          )}
          {step === 3 && (
            <Step4
              data={formData}
              setData={update}
            />
          )}
        </div>

        <div className="flex items-center justify-between mt-12 pt-6" style={{ borderTop: `1px solid ${NAVY}15` }}>
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase transition-opacity hover:opacity-80"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: step === 0 ? 0.3 : 1 }}
            disabled={step === 0}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Anterior
          </button>

          <div className="flex items-center gap-3">
            <span
              className="text-[9px] tracking-[0.14em]"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
            >
              {step + 1} / 4
            </span>
            <button
              onClick={next}
              className="flex items-center gap-3 px-8 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold transition-opacity hover:opacity-88"
              style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif", borderRadius: "10px" }}
            >
              {step === 3 ? "Concluir" : "Próximo"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
