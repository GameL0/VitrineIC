import { Divider, InputField, SSOButton } from "./ui";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

export function CompanyForm({ onEnter }: { onEnter: () => void }) {
  return (
    <div>
      <p
        className="text-[11px] tracking-[0.15em] uppercase mb-5"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.45 }}
      >
        Acesso Corporativo
      </p>
      <div className="flex flex-col gap-2.5">
        <SSOButton
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 14V6l7-4 7 4v8H2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <rect x="6.5" y="10" width="5" height="4" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          }
          label="Entrar com E-mail Corporativo"
          sub="SSO · SAML 2.0 suportado"
        />
        <SSOButton
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="4" width="16" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1 8h16" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="4.5" cy="12" r="1" fill="currentColor" opacity="0.5" />
            </svg>
          }
          label="Continuar com LinkedIn"
          sub="Autenticação OAuth 2.0"
        />
        <SSOButton
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M9 5.5V9l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          }
          label="Continuar com Google"
          sub="conta Google Workspace ou pessoal"
        />
      </div>
      <Divider label="ou e-mail corporativo" />
      <InputField label="E-mail corporativo" type="email" placeholder="nome@empresa.com.br" />
      <InputField label="Senha" type="password" placeholder="••••••••" />
      <button
        onClick={onEnter}
        className="w-full py-3 text-[11px] tracking-[0.18em] uppercase font-semibold transition-all mt-1"
        style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Acessar Plataforma
      </button>
      <p
        className="text-center text-[11px] mt-4"
        style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.45 }}
      >
        Primeira vez?{" "}
        <button className="underline underline-offset-2" style={{ color: RED }}>
          Criar conta empresarial
        </button>
      </p>
    </div>
  );
}
