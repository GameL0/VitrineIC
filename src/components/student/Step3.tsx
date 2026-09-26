import { useRef } from "react";
import { Input, Label } from "./ui";
import { NAVY, NAVY_MUTED } from "@/styles/tokens";

export function Step3({ data, setData }: { data: any; setData: (d: any) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1
        className="text-3xl mb-2"
        style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
      >
        Portfólio
      </h1>
      <p className="text-sm mb-10" style={{ fontFamily: "Inter, sans-serif", color: NAVY_MUTED, fontWeight: 300 }}>
        Vincule seus repositórios e trabalhos anteriores.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-5">
          <Input
            label="GitHub"
            placeholder="github.com/usuario"
            mono
            value={data.github || ""}
            onChange={(v) => setData({ ...data, github: v })}
          />
          <Input
            label="LinkedIn"
            placeholder="linkedin.com/in/usuario"
            mono
            value={data.linkedin || ""}
            onChange={(v) => setData({ ...data, linkedin: v })}
          />
          <Input
            label="Site / Portfólio"
            placeholder="seusite.dev"
            mono
            value={data.site || ""}
            onChange={(v) => setData({ ...data, site: v })}
          />
          <Input
            label="Lattes"
            placeholder="lattes.cnpq.br/xxxxxxxx"
            mono
            value={data.lattes || ""}
            onChange={(v) => setData({ ...data, lattes: v })}
          />
        </div>

        <div>
          <Label>Trabalhos anteriores</Label>
          <div className="flex flex-col gap-2 mb-4">
            {(data.docs || []).map((d: string, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3"
                style={{ border: `1px solid ${NAVY}20` }}
              >
                <div className="flex items-center gap-3">
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: NAVY_MUTED }}>
                    <rect x="1.5" y="1" width="9" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
                    <path d="M4 4.5h5M4 7h5M4 9.5h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                  <span
                    className="text-[11px]"
                    style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
                  >
                    {d}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setData({ ...data, docs: (data.docs || []).filter((_: any, j: number) => j !== i) })
                  }
                  style={{ color: NAVY_MUTED }}
                  className="hover:opacity-70 transition-opacity"
                >
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => fileRef.current?.click()}
            className="w-full py-8 flex flex-col items-center gap-3 transition-all"
            style={{ border: `1px dashed ${NAVY}30` }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = NAVY)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${NAVY}30`)}
          >
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color: NAVY_MUTED }}>
              <path d="M11 14V4M7 8l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M4 17h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span
              className="text-[10px] tracking-[0.14em] uppercase"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}
            >
              Adicionar documento
            </span>
            <span
              className="text-[10px]"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}
            >
              PDF, DOCX, ZIP · máx. 20 MB
            </span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.docx,.zip"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || []).map((f) => f.name);
              setData({ ...data, docs: [...(data.docs || []), ...files] });
            }}
          />
        </div>
      </div>
    </div>
  );
}
