/**
 * DADOS FICTÍCIOS — avisos curtos do sino das áreas logadas.
 *
 * Diferem das mensagens da caixa de entrada: são uma linha sobre o andamento
 * de uma vaga, uma vaga nova ou alguém interessado, e levam à tela relacionada.
 */
export type UpdateKind = "processo" | "vaga" | "estudantes" | "interesse";

export interface Update {
  id: string;
  kind: UpdateKind;
  text: string;
  time: string;
  unread: boolean;
  /** Tela da área que o aviso abre ao ser clicado. */
  target: string;
}

export const STUDENT_UPDATES: Update[] = [
  {
    id: "su-1",
    kind: "interesse",
    text: "TechBr Soluções liberou o contato da sua candidatura.",
    time: "há 2h",
    unread: true,
    target: "interests",
  },
  {
    id: "su-2",
    kind: "processo",
    text: "A curadoria sugeriu você para Análise Preditiva de Churn em SaaS.",
    time: "há 5h",
    unread: true,
    target: "interests",
  },
  {
    id: "su-3",
    kind: "vaga",
    text: "Nova vaga aberta: Automação de Relatórios com LLM.",
    time: "há 1d",
    unread: false,
    target: "opportunities",
  },
  {
    id: "su-4",
    kind: "processo",
    text: "Classificador de Imagens Médicas foi publicado pela curadoria.",
    time: "há 3d",
    unread: false,
    target: "projects",
  },
];

export const REQUESTER_UPDATES: Update[] = [
  {
    id: "ru-1",
    kind: "interesse",
    text: "Isadora Lima Costa se candidatou a Sistema de Monitoramento IoT para Fábricas.",
    time: "há 1h",
    unread: true,
    target: "matches",
  },
  {
    id: "ru-2",
    kind: "processo",
    text: "A curadoria sugeriu Fernanda Oliveira Braga para Sistema de Monitoramento IoT.",
    time: "ontem",
    unread: true,
    target: "matches",
  },
  {
    id: "ru-3",
    kind: "estudantes",
    text: "3 novos estudantes disponíveis com a stack das suas demandas.",
    time: "há 2d",
    unread: false,
    target: "available_students",
  },
];
