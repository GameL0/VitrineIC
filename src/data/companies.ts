/**
 * DADOS FICTÍCIOS — perfil público dos solicitantes que publicam demandas.
 *
 * A chave é o nome usado em `company` de `@/data/demands`; as demandas de cada
 * solicitante são derivadas de lá, não repetidas aqui.
 */
import type { RequesterKind } from "@/types";

export const REQUESTER_KIND_LABEL: Record<RequesterKind, string> = {
  empresa: "Empresa",
  ong: "ONG ou coletivo",
  orgao_publico: "Órgão público",
  professor: "Professor ou laboratório",
};

export interface Company {
  name: string;
  kind: RequesterKind;
  /** Rótulo exibido no perfil, ex.: "Empresa de Tecnologia". */
  type: string;
  /** Pessoa responsável pela conta. */
  contactName: string;
  /** Só aparece para o estudante depois do aceite dos dois lados. */
  contactEmail: string;
  city: string;
  since: string;
  site: string;
  description: string;
}

export const COMPANIES: Company[] = [
  {
    name: "TechBr Soluções",
    kind: "empresa",
    contactName: "Carlos Menezes",
    type: "Empresa de Tecnologia",
    city: "Maceió, AL",
    since: "2024",
    site: "techbr.com.br",
    contactEmail: "contato@techbr.com.br",
    description:
      "Integradora de sistemas industriais. Desenvolve monitoramento de linhas de produção com sensores e painéis para fábricas do Nordeste.",
  },
  {
    name: "Fintech Labs",
    kind: "empresa",
    contactName: "Juliana Prado",
    type: "Empresa de Tecnologia",
    city: "Recife, PE",
    since: "2025",
    site: "fintechlabs.io",
    contactEmail: "contato@fintechlabs.io",
    description:
      "Startup de produtos financeiros para pequenas empresas. Usa modelos preditivos para crédito, retenção e prevenção a fraudes.",
  },
  {
    name: "Consultoria GX",
    kind: "empresa",
    contactName: "Marcos Albuquerque",
    type: "Empresa Tradicional",
    city: "Maceió, AL",
    since: "2025",
    site: "consultoriagx.com.br",
    contactEmail: "contato@consultoriagx.com.br",
    description:
      "Consultoria contábil e financeira que quer automatizar a produção de relatórios recorrentes para seus clientes.",
  },
  {
    name: "EduCorpora",
    kind: "empresa",
    contactName: "Patrícia Lins",
    type: "Empresa de Tecnologia",
    city: "Arapiraca, AL",
    since: "2024",
    site: "educorpora.com",
    contactEmail: "contato@educorpora.com",
    description:
      "Plataforma de treinamento corporativo para equipes técnicas, com trilhas presenciais e a distância.",
  },
  {
    name: "DocScan Ltda",
    kind: "empresa",
    contactName: "Roberto Siqueira",
    type: "Empresa de Tecnologia",
    city: "Salvador, BA",
    since: "2025",
    site: "docscan.com.br",
    contactEmail: "contato@docscan.com.br",
    description:
      "Digitalização e extração de dados de documentos para cartórios e escritórios de advocacia.",
  },
];
