import { Inbox as InboxView } from "@/components/app/Inbox";
import { MOSS, OCHRE, SLATE } from "@/styles/tokens";

/** DADOS FICTÍCIOS — mensagens da caixa de entrada do solicitante. */
export const INBOX_MESSAGES = [
  {
    id: "req-1",
    type: "NOVO INTERESSE",
    project: "App Mobile para Saúde Mental",
    from: "Ana Beatriz",
    time: "Hoje, 09:30",
    unread: true,
    content: "Olá! Vi a sua demanda e me identifiquei muito com o projeto. Tenho experiência em React Native e gostaria de colaborar. Podemos agendar um bate-papo?"
  },
  {
    id: "req-2",
    type: "RECOMENDAÇÃO",
    project: "Sistema de Monitoramento IoT",
    from: "Curadoria VitrineIC",
    time: "Ontem, 14:15",
    unread: true,
    content: "A curadoria analisou sua demanda e sugere fortemente o perfil de João Pereira, que possui grande expertise em Python e IoT. O estudante já foi notificado."
  },
  {
    id: "req-3",
    type: "SISTEMA",
    project: "Demanda VIC-2026-0041",
    from: "VitrineIC",
    time: "Há 3 dias",
    unread: false,
    content: "Sua demanda 'Sistema de Monitoramento IoT' foi aprovada e publicada no catálogo com sucesso. Em breve você começará a receber candidaturas e sugestões da curadoria."
  }
];

export function Inbox() {
  return (
    <InboxView
      initial={INBOX_MESSAGES}
      typeColors={{ "NOVO INTERESSE": OCHRE, "RECOMENDAÇÃO": MOSS, SISTEMA: SLATE }}
    />
  );
}
