/**
 * Score de compatibilidade entre estudante e demanda.
 *
 * Percentual das skills da demanda cobertas pelo estudante, por igualdade de
 * string sem diferenciar maiúsculas. Ver docs/analise-frontend.md, seção 5.
 */

import { STUDENTS } from "@/data/students";
import type { Demand } from "@/types";

export function scoreStudent(student: typeof STUDENTS[0], demand: Demand): number {
  const matched = student.skills.filter((s) =>
    demand.skills.some((ds) => ds.toLowerCase() === s.toLowerCase())
  ).length;
  return Math.round((matched / demand.skills.length) * 100);
}
