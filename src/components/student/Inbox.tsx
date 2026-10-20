import { Inbox as InboxView } from "@/components/app/Inbox";
import { notifications } from "@/data/notifications";
import { MOSS, RED, SLATE } from "@/styles/tokens";

const CONTENT =
  "Olá estudante! Vimos que seu perfil se alinha perfeitamente com a demanda XYZ, em especial pela sua proficiência nas linguagens requeridas. Gostaríamos de marcar uma breve conversa para detalhar o projeto. Tem disponibilidade nesta semana?";

export function Inbox() {
  return (
    <InboxView
      initial={notifications.map((n) => ({ ...n, content: CONTENT }))}
      typeColors={{ CONVITE: RED, "VISUALIZAÇÃO": SLATE, MENSAGEM: MOSS }}
    />
  );
}
