import { useRef } from "react";
import { SkillPicker } from "./SkillPicker";
import { Label } from "./ui";
import { NAVY, RED } from "@/styles/tokens";
import type { StudentSkill } from "@/types";

export function Step2({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const skills: StudentSkill[] = data.skills || [];
  const certsTech = data.certificadosTech || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).map((f) => f.name);
    setData({ ...data, certificadosTech: [...certsTech, ...files] });
  };

  const removeFile = (idx: number) => {
    setData({ ...data, certificadosTech: certsTech.filter((_: any, i: number) => i !== idx) });
  };

  return (
    <div>
      <h2
        className="text-3xl mb-2"
        style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}
      >
        Competências Técnicas
      </h2>
      <p
        className="text-sm mb-10"
        style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.8, fontWeight: 300 }}
      >
        Digite para buscar ou use os atalhos. As competências técnicas são o
        principal critério do match com as demandas.
      </p>

      <SkillPicker
        value={skills}
        course={data.course}
        onChange={(s) => setData({ ...data, skills: s })}
      />

      <div className="max-w-3xl mt-10">
        <Label>Certificados (Opcional)</Label>
        <p className="text-[11px] mb-4" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.8, fontWeight: 500 }}>
          Armazene aqui seus certificados técnicos em PDF.
        </p>
        
        {certsTech.length > 0 && (
          <div className="flex flex-col gap-2 mb-4">
            {certsTech.map((d: string, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3"
                style={{ border: `1px solid ${NAVY}40`, borderRadius: "8px" }}
              >
                <div className="flex items-center gap-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: NAVY, opacity: 0.8 }}>
                    <rect x="1.5" y="1" width="9" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
                    <path d="M4 4.5h5M4 7h5M4 9.5h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                  <span
                    className="text-[11px]"
                    style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY }}
                  >
                    {d}
                  </span>
                </div>
                <button
                  onClick={() => removeFile(i)}
                  style={{ color: NAVY, opacity: 0.6 }}
                  className="hover:opacity-100 transition-opacity"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => fileRef.current?.click()}
          className="w-full py-6 flex flex-col items-center gap-3 transition-all"
          style={{ border: `2px dashed ${NAVY}50`, borderRadius: "8px" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = NAVY)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${NAVY}50`)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color: NAVY, opacity: 0.6 }}>
            <path d="M11 14V4M7 8l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M4 17h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span
            className="text-[10px] tracking-[0.14em] uppercase font-semibold"
            style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.8 }}
          >
            Anexar certificado
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
