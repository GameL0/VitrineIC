import { Divider, InputField, SSOButton } from "./ui";
import { INSTITUTION } from "@/data/institution";
import { NAVY, NAVY_MUTED, OFFWHITE, RED } from "@/styles/tokens";

export function StudentForm({ onEnter }: { onEnter: () => void }) {
  return (
    <div>
      <p
        className="text-[11px] tracking-[0.15em] uppercase mb-5"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}
      >
        Acesso Institucional
      </p>
      <div className="flex flex-col gap-2.5">
        <SSOButton
          icon={
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 9h8M9 5v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          }
          label="Entrar com SSO Institucional"
          sub={INSTITUTION.domain}
        />
        <SSOButton
          icon={
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" />
              <path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          }
          label="Entrar com E-mail Acadêmico"
          sub={INSTITUTION.emailExample}
        />
      </div>
      <Divider label="ou" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onEnter();
        }}
      >
        <InputField autoComplete="username" label="E-mail acadêmico" type="email" placeholder={INSTITUTION.emailExample} />
        <InputField autoComplete="current-password" label="Senha" type="password" placeholder="••••••••" />
        <button
          type="submit"
          className="w-full py-3 text-[11px] tracking-[0.18em] uppercase font-semibold transition-all mt-1"
          style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onFocus={(e) => (e.currentTarget.style.opacity = "0.88")}
          onBlur={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Acessar
        </button>
      </form>
      <p
        className="text-center text-[11px] mt-4"
        style={{ fontFamily: "Inter, sans-serif", color: NAVY_MUTED }}
      >
        Não tem conta?{" "}
        <button type="button" className="underline underline-offset-2" style={{ color: RED }}>
          Cadastrar como estudante
        </button>
      </p>
    </div>
  );
}
