/**
 * Estado compartilhado do protótipo: estudantes, solicitantes, contas, sessão,
 * demandas, interesses e o selo "em projeto". Fica fora dos componentes para
 * que uma candidatura feita na área do estudante apareça na do solicitante e
 * na da curadoria.
 *
 * SIMULAÇÃO: cada mudança é salva no localStorage (`@/lib/persist`), então
 * recarregar a página mantém contas, sessão e interesses. `resetDemo()` volta
 * aos dados de `@/data`.
 */

import { useSyncExternalStore } from "react";
import { DEMO_ACCOUNTS } from "@/data/accounts";
import { COMPANIES, type Company } from "@/data/companies";
import { DEMANDS } from "@/data/demands";
import { INTERESTS } from "@/data/interests";
import { STUDENTS } from "@/data/students";
import { initialStatus, nextStatus } from "./interest";
import { load, reset, save } from "./persist";
import type {
  Account,
  Demand,
  DemandStatus,
  Interest,
  InterestOrigin,
  InterestSide,
  Student,
} from "@/types";

export interface Session {
  accountId: string;
}

export interface VitrineState {
  students: Student[];
  companies: Company[];
  accounts: Account[];
  session: Session | null;
  demands: Demand[];
  interests: Interest[];
  /** Selo "em projeto" por id de estudante. */
  inProject: Record<string, boolean>;
}

function seed(): VitrineState {
  return {
    students: STUDENTS,
    companies: COMPANIES,
    accounts: DEMO_ACCOUNTS,
    session: null,
    demands: DEMANDS,
    interests: INTERESTS,
    inProject: Object.fromEntries(STUDENTS.map((s) => [s.id, !!s.inProject])),
  };
}

let state: VitrineState = { ...seed(), ...load<Partial<VitrineState>>() };

const listeners = new Set<() => void>();

function update(patch: Partial<VitrineState>) {
  state = { ...state, ...patch };
  save(state);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useVitrine() {
  return useSyncExternalStore(subscribe, () => state);
}

/** Leitura e escrita cruas, para `@/lib/auth`. */
export function getState() {
  return state;
}

export function patchState(patch: Partial<VitrineState>) {
  update(patch);
}

/** Apaga o que foi salvo neste navegador e volta aos dados de exemplo. */
export function resetDemo() {
  reset();
  state = seed();
  listeners.forEach((l) => l());
}

/* ── Estudantes e projetos ── */

export function findStudent(id: string) {
  return state.students.find((s) => s.id === id);
}

/** Projetos de todos os estudantes, achatados para o catálogo público. */
export function allProjects(students: Student[] = state.students) {
  return students.flatMap((student) => student.projects.map((project) => ({ ...project, student })));
}

export type ProjectWithStudent = ReturnType<typeof allProjects>[number];

export function findProject(id: string) {
  return allProjects().find((p) => p.id === id);
}

/** E-mail institucional, liberado ao solicitante só depois do aceite dos dois lados. */
export function studentEmail(student: Student) {
  return student.email;
}

export function updateStudent(id: string, patch: Partial<Student>) {
  update({ students: state.students.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
}

/* ── Solicitantes ── */

export function findCompany(name: string) {
  return state.companies.find((c) => c.name === name);
}

/** E-mail de contato, liberado ao estudante só depois do aceite dos dois lados. */
export function companyEmail(name: string) {
  return findCompany(name)?.contactEmail ?? "—";
}

export function updateCompany(name: string, patch: Partial<Company>) {
  update({ companies: state.companies.map((c) => (c.name === name ? { ...c, ...patch } : c)) });
}

/* ── Demandas ── */

export function addDemand(demand: Demand) {
  update({ demands: [demand, ...state.demands] });
}

export function setDemandStatus(id: string, status: DemandStatus) {
  update({ demands: state.demands.map((d) => (d.id === id ? { ...d, status } : d)) });
}

export function removeDemand(id: string) {
  update({ demands: state.demands.filter((d) => d.id !== id) });
}

/* ── Interesses ── */

/** Interesse ainda vivo (não recusado) entre o estudante e a demanda, se houver. */
export function findActiveInterest(interests: Interest[], demandId: string, studentId: string) {
  return interests.find(
    (i) =>
      i.demandId === demandId &&
      i.studentId === studentId &&
      i.status !== "recusado_estudante" &&
      i.status !== "recusado_solicitante",
  );
}

/**
 * Abre um interesse por uma das três portas. Não duplica: se já houver um
 * interesse vivo entre o estudante e a demanda, devolve esse.
 */
export function createInterest(
  demandId: string,
  studentId: string,
  origin: InterestOrigin,
  justification?: string,
): Interest {
  const existing = findActiveInterest(state.interests, demandId, studentId);
  if (existing) return existing;

  const interest: Interest = {
    id: `INT-${String(Date.now()).slice(-4)}`,
    demandId,
    studentId,
    origin,
    justification: justification?.trim() || undefined,
    status: initialStatus(origin),
    createdAt: "agora",
  };
  update({ interests: [interest, ...state.interests] });
  return interest;
}

/**
 * Resposta de um dos lados. Quando o contato é liberado, a demanda passa a
 * "contato liberado"; a curadoria só observa.
 */
export function respondInterest(id: string, side: InterestSide, accept: boolean, refusalReason?: string) {
  const current = state.interests.find((i) => i.id === id);
  if (!current) return;

  const status = nextStatus(current.status, current.origin, side, accept);
  const interests = state.interests.map((i) =>
    i.id === id ? { ...i, status, refusalReason: accept ? i.refusalReason : refusalReason?.trim() || undefined } : i,
  );
  const demands =
    status === "contato_liberado"
      ? state.demands.map((d) => (d.id === current.demandId ? { ...d, status: "contato_liberado" as const } : d))
      : state.demands;
  update({ interests, demands });
}

/* ── Selo "em projeto" ── */

export function setInProject(studentId: string, value: boolean) {
  update({ inProject: { ...state.inProject, [studentId]: value } });
}
