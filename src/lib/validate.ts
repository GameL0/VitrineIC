/**
 * Validação de formulário, igual em todo o site:
 * - o erro aparece ao enviar e, a partir daí, some campo a campo conforme a
 *   pessoa corrige;
 * - o input recebe `aria-invalid` e a mensagem fica logo abaixo, ligada por
 *   `aria-describedby` (ver `FieldError`);
 * - o foco vai para o primeiro campo com erro.
 *
 * Cada regra devolve a mensagem de erro ou `null`.
 */

import { useId, useState } from "react";
import { isUfalEmail } from "@/data/institution";

export const required = (v: string, message: string) => (v.trim() ? null : message);
export const minLength = (v: string, n: number) => (v.length >= n ? null : `Mínimo de ${n} caracteres.`);
export const maxLength = (v: string, n: number) => (v.length <= n ? null : `Máximo de ${n} caracteres.`);
export const ufalEmail = (v: string) => (isUfalEmail(v) ? null : "Use seu e-mail da UFAL, terminado em .ufal.br.");
export const email = (v: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : "E-mail inválido.");
export const sameAs = (v: string, other: string) => (v === other ? null : "As senhas não conferem.");
export const digits = (v: string) => (/^\d*$/.test(v.trim()) ? null : "Use só números.");

/** Primeira mensagem não nula de uma lista de regras. */
export const first = (...results: (string | null)[]) => results.find(Boolean) ?? null;

export type Errors<K extends string> = Partial<Record<K, string | null>>;

/**
 * `check` recalcula os erros a cada render; eles só ficam visíveis depois da
 * primeira tentativa de envio.
 */
export function useValidation<K extends string>(check: () => Errors<K>) {
  const formId = useId();
  const [submitted, setSubmitted] = useState(false);
  const all = check();
  const errors: Errors<K> = submitted ? all : {};

  const id = (name: K) => `${formId}-${name}`;

  /** Marca o envio, foca o primeiro campo inválido e diz se pode seguir. */
  const validate = () => {
    setSubmitted(true);
    const firstInvalid = (Object.keys(all) as K[]).find((k) => all[k]);
    if (firstInvalid) document.getElementById(id(firstInvalid))?.focus();
    return !firstInvalid;
  };

  /** Props de acessibilidade do input e da mensagem de um campo. */
  const field = (name: K) => ({ id: id(name), error: errors[name] ?? undefined });

  return { errors, validate, field, reset: () => setSubmitted(false) };
}
