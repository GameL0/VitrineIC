import type * as React from "react";

/** Mensagem de erro de um campo, ligada ao input por `aria-describedby`. */
export function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={`${id}-error`} className="vt-field-error mt-1.5 font-sans text-xs text-terracotta">
      {children}
    </p>
  );
}

/** Atributos de acessibilidade do input com erro. */
export function invalidProps(id: string | undefined, error: string | undefined) {
  return error && id ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` } : {};
}

/** Dica cinza embaixo do campo, quando não há erro. */
export function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 font-sans text-xs text-navy/55">{children}</p>;
}
