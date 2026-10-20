import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

/**
 * Cabeçalho das páginas públicas: rótulo, título grande e parágrafo de apoio.
 * `aside` fica à direita no desktop (a busca do diretório, por exemplo).
 */
export function PageHead({
  eyebrow,
  title,
  lead,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-8 pt-12 pb-10 md:flex-row md:items-end md:justify-between md:pt-16 md:pb-12">
      <div className="flex flex-col gap-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display text-[40px] font-medium leading-none tracking-[-0.035em] text-navy md:text-page">
          {title}
        </h1>
        {lead && <p className="max-w-[560px] font-sans text-lead font-light text-navy/65">{lead}</p>}
      </div>
      {aside}
    </header>
  );
}
