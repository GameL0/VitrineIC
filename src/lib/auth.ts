/**
 * SIMULAÇÃO de contas: cadastro, login e sessão vivem no estado do protótipo,
 * que é salvo no localStorage. Não há servidor nem criptografia; a senha fica
 * em texto puro. Serve para demonstrar o fluxo, não para proteger nada.
 */

import { DEMO_EMAIL, DEMO_PASSWORD } from "@/data/accounts";
import { REQUESTER_KIND_LABEL, type Company } from "@/data/companies";
import { getState, patchState, useVitrine, type VitrineState } from "./store";
import type { Account, RequesterKind, Role, Student } from "@/types";

export type AuthResult = { ok: true; account: Account } | { ok: false; error: string };

export const SIGN_IN_ERROR = "E-mail ou senha incorretos.";
export const DUPLICATE_EMAIL_ERROR = "Já existe uma conta com este e-mail.";

const today = () => new Date().toISOString().slice(0, 10);
const normalize = (email: string) => email.trim().toLowerCase();

function findAccount(email: string) {
  return getState().accounts.find((a) => a.email === normalize(email));
}

/** `role` restringe o login ao perfil da aba ou da página em que ele foi feito. */
export function signIn(email: string, password: string, role?: Role): AuthResult {
  const account = findAccount(email);
  if (!account || account.password !== password || (role && account.role !== role)) {
    return { ok: false, error: SIGN_IN_ERROR };
  }
  patchState({ session: { accountId: account.id } });
  return { ok: true, account };
}

export function signInDemo(role: Role) {
  return signIn(DEMO_EMAIL[role], DEMO_PASSWORD, role);
}

export function signOut() {
  patchState({ session: null });
}

function newAccount(role: Role, email: string, password: string, name: string, profileId: string): Account {
  return {
    id: `ACC-${Date.now().toString(36).toUpperCase()}`,
    role,
    email: normalize(email),
    password,
    name: name.trim(),
    profileId,
    createdAt: today(),
  };
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export interface StudentSignUp {
  name: string;
  email: string;
  unit: string;
  course: string;
  password: string;
}

/** Cria a conta e um perfil vazio; o onboarding preenche o resto. */
export function signUpStudent(data: StudentSignUp): AuthResult {
  if (findAccount(data.email)) return { ok: false, error: DUPLICATE_EMAIL_ERROR };

  const { students, accounts } = getState();
  const student: Student = {
    id: `STU-${String(students.length + 1).padStart(3, "0")}-${Date.now().toString(36).slice(-3)}`,
    name: data.name.trim(),
    initials: initialsOf(data.name),
    email: normalize(data.email),
    unit: data.unit,
    course: data.course,
    semester: "",
    gpa: "",
    bio: "",
    interests: [],
    skills: [],
    skillLevels: {},
    languages: [],
    projects: [],
    github: "",
    availability: "",
  };
  const account = newAccount("student", data.email, data.password, data.name, student.id);
  patchState({
    students: [...students, student],
    accounts: [...accounts, account],
    session: { accountId: account.id },
  });
  return { ok: true, account };
}

export interface RequesterSignUp {
  kind: RequesterKind;
  organization: string;
  city: string;
  contactName: string;
  site: string;
  email: string;
  password: string;
}

export function signUpRequester(data: RequesterSignUp): AuthResult {
  if (findAccount(data.email)) return { ok: false, error: DUPLICATE_EMAIL_ERROR };

  const { companies, accounts } = getState();
  if (companies.some((c) => c.name.toLowerCase() === data.organization.trim().toLowerCase())) {
    return { ok: false, error: "Já existe uma organização com este nome." };
  }
  const company: Company = {
    name: data.organization.trim(),
    kind: data.kind,
    type: REQUESTER_KIND_LABEL[data.kind],
    contactName: data.contactName.trim(),
    contactEmail: normalize(data.email),
    city: data.city.trim(),
    since: today().slice(0, 4),
    site: data.site.trim().replace(/^https?:\/\//, ""),
    description: "",
  };
  const account = newAccount("requester", data.email, data.password, data.contactName, company.name);
  patchState({
    companies: [...companies, company],
    accounts: [...accounts, account],
    session: { accountId: account.id },
  });
  return { ok: true, account };
}

/** Conta logada e o perfil ligado a ela. */
export function sessionOf(state: VitrineState) {
  const account = state.session && state.accounts.find((a) => a.id === state.session!.accountId);
  if (!account) return null;
  return {
    account,
    student: account.role === "student" ? state.students.find((s) => s.id === account.profileId) : undefined,
    company: account.role === "requester" ? state.companies.find((c) => c.name === account.profileId) : undefined,
  };
}

export function useSession() {
  return sessionOf(useVitrine());
}

/** Nome da organização logada; as áreas do solicitante só abrem com sessão. */
export function useCurrentRequester() {
  return useSession()?.company?.name ?? "";
}

/** Renomeia a pessoa da conta logada (perfil do solicitante, dados da conta do estudante). */
export function renameAccount(name: string) {
  const { session, accounts } = getState();
  if (!session) return;
  patchState({ accounts: accounts.map((a) => (a.id === session.accountId ? { ...a, name: name.trim() } : a)) });
}
