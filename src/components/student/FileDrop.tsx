import { useRef } from "react";

/**
 * Lista de arquivos anexados mais a área tracejada para anexar outros.
 * Guarda só os nomes, como o restante do onboarding.
 */
export function FileDrop({
  title,
  hint,
  accept,
  files,
  onAdd,
  onRemove,
}: {
  title: string;
  hint: string;
  accept: string;
  files: string[];
  onAdd: (names: string[]) => void;
  onRemove: (index: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2">
      {files.map((name, i) => (
        <div
          key={`${name}-${i}`}
          className="flex items-center justify-between gap-3 rounded-[10px] border border-navy/13 bg-white px-4 py-3"
        >
          <span className="flex min-w-0 items-center gap-3">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-navy/55">
              <rect x="2.5" y="1" width="9" height="12" rx="1" stroke="currentColor" strokeWidth="1.1" />
              <path d="M5 4.5h4M5 7h4M5 9.5h2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            <span className="truncate font-mono text-[11px] text-navy">{name}</span>
          </span>
          <button
            type="button"
            onClick={() => onRemove(i)}
            aria-label={`Remover ${name}`}
            className="grid size-7 shrink-0 place-items-center rounded-md text-navy/55 transition-colors hover:bg-navy/5 hover:text-navy"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center gap-2 rounded-2xl border border-dashed border-navy/20 px-6 py-9 transition-colors hover:border-navy/50"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="text-navy/55">
          <path d="M9 12V3M5.5 6.5 9 3l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 12v2.5h12V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-sans text-sm text-navy">{title}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-navy/55">{hint}</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => {
          onAdd(Array.from(e.target.files || []).map((f) => f.name));
          e.target.value = "";
        }}
      />
    </div>
  );
}
