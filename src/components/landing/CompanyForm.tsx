import { SignInForm } from "./SignInForm";
import type { Role } from "@/types";

/** Login do solicitante: qualquer e-mail de contato. */
export function CompanyForm({ onSignedIn }: { onSignedIn: (role: Role) => void }) {
  return (
    <SignInForm
      role="requester"
      emailLabel="E-mail de contato"
      emailPlaceholder="nome@organizacao.com.br"
      onSignedIn={onSignedIn}
    />
  );
}
