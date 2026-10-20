/**
 * DADOS FICTÍCIOS — contas de demonstração.
 *
 * SIMULAÇÃO: as senhas ficam em texto puro e as contas criadas no cadastro vão
 * para o localStorage do navegador. Não use senha real.
 */
import type { Account } from "@/types";

export const DEMO_PASSWORD = "demo1234";

export const DEMO_ACCOUNTS: Account[] = [
  {
    id: "ACC-001",
    role: "student",
    email: "estudante@ic.ufal.br",
    password: DEMO_PASSWORD,
    name: "Rafael Moreira Santos",
    profileId: "STU-001",
    createdAt: "2026-03-01",
  },
  {
    id: "ACC-002",
    role: "requester",
    email: "contato@techbr.com.br",
    password: DEMO_PASSWORD,
    name: "Carlos Menezes",
    profileId: "TechBr Soluções",
    createdAt: "2026-03-01",
  },
  {
    id: "ACC-003",
    role: "curator",
    email: "curadoria@ic.ufal.br",
    password: DEMO_PASSWORD,
    name: "Coordenação da ACE1",
    profileId: "",
    createdAt: "2026-03-01",
  },
];

/** E-mail da conta de exemplo de cada perfil, para os botões de demonstração. */
export const DEMO_EMAIL: Record<Account["role"], string> = {
  student: "estudante@ic.ufal.br",
  requester: "contato@techbr.com.br",
  curator: "curadoria@ic.ufal.br",
};
