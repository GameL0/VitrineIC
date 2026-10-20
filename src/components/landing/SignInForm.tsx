import { useState, type FormEvent } from "react";
import { FormAlert, InputField } from "./ui";
import { ArrowIcon } from "@/components/app/Icons";
import { signIn } from "@/lib/auth";
import { email as emailRule, first, required, useValidation } from "@/lib/validate";
import type { Role } from "@/types";

/**
 * Login por e-mail e senha, usado pelas duas abas do modal e pela página da
 * curadoria. `checkEmail` é a regra do e-mail do papel (UFAL ou qualquer um).
 */
export function SignInForm({
  role,
  emailLabel,
  emailPlaceholder,
  checkEmail = emailRule,
  submitLabel = "Acessar",
  onSignedIn,
  dark = false,
}: {
  role: Role;
  emailLabel: string;
  emailPlaceholder: string;
  checkEmail?: (v: string) => string | null;
  submitLabel?: string;
  onSignedIn: (role: Role) => void;
  dark?: boolean;
}) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [failure, setFailure] = useState<string | null>(null);

  const { validate, field } = useValidation<"email" | "password">(() => ({
    email: first(required(values.email, "Digite seu e-mail."), checkEmail(values.email)),
    password: required(values.password, "Digite sua senha."),
  }));

  const set = (patch: Partial<typeof values>) => {
    setValues({ ...values, ...patch });
    setFailure(null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const result = signIn(values.email, values.password, role);
    if (result.ok) onSignedIn(result.account.role);
    else setFailure(`${result.error} Confira os dados${role === "curator" ? "." : " ou crie uma conta."}`);
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      {failure && <FormAlert>{failure}</FormAlert>}
      <InputField
        label={emailLabel}
        type="email"
        autoComplete="email"
        placeholder={emailPlaceholder}
        value={values.email}
        onChange={(v) => set({ email: v })}
        dark={dark}
        {...field("email")}
      />
      <InputField
        label="Senha"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={values.password}
        onChange={(v) => set({ password: v })}
        dark={dark}
        {...field("password")}
      />
      <button
        type="submit"
        className={`vt-btn ${dark ? "vt-btn-cream" : "vt-btn-primary"} mt-2 h-11 w-full justify-center`}
      >
        {submitLabel} <ArrowIcon />
      </button>
    </form>
  );
}
