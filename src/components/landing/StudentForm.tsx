import { SignInForm } from "./SignInForm";
import { INSTITUTION } from "@/data/institution";
import { ufalEmail } from "@/lib/validate";
import type { Role } from "@/types";

/** Login do estudante: só e-mail da UFAL. */
export function StudentForm({ onSignedIn }: { onSignedIn: (role: Role) => void }) {
  return (
    <SignInForm
      role="student"
      emailLabel="E-mail institucional"
      emailPlaceholder={INSTITUTION.emailExample}
      checkEmail={ufalEmail}
      onSignedIn={onSignedIn}
    />
  );
}
