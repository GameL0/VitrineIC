import { useState } from "react";
import { useModal } from "@/lib/useModal";
import { CompanyForm } from "./CompanyForm";
import { StudentForm } from "./StudentForm";
import { NAVY, NAVY_MUTED, OFFWHITE, RED } from "@/styles/tokens";

export function AuthModal({ onClose, onEnterStudent, onEnterCompany }: { onClose: () => void; onEnterStudent: () => void; onEnterCompany: () => void }) {
  const [role, setRole] = useState<"student" | "company">("student");
  const dialogRef = useModal(onClose);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(28,43,74,0.55)", backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-titulo"
        tabIndex={-1}
        className="relative w-full max-w-lg bg-[#F5F4F0]"
        style={{ border: `1.5px solid ${RED}`, outline: `1px solid ${RED}`, outlineOffset: "3px" }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-8 py-5"
          style={{ borderBottom: `1px solid ${NAVY}22` }}
        >
          <h2
            id="auth-modal-titulo"
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}
          >
            VitrineIC · Acesso
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center transition-colors"
            style={{ color: NAVY_MUTED }}
            aria-label="Fechar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" />
              <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Toggle */}
        <div className="px-8 pt-7 pb-0">
          <div
            role="tablist"
            aria-label="Tipo de acesso"
            onKeyDown={(e) => {
              if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
              e.preventDefault();
              setRole(role === "student" ? "company" : "student");
            }}
            className="flex w-full"
            style={{ border: `1px solid ${NAVY}`, position: "relative" }}
          >
            <button
              type="button"
              role="tab"
              id="aba-estudante"
              aria-selected={role === "student"}
              aria-controls="painel-acesso"
              tabIndex={role === "student" ? 0 : -1}
              onClick={() => setRole("student")}
              className="flex-1 py-3 text-[11px] tracking-[0.15em] uppercase font-medium transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                background: role === "student" ? NAVY : "transparent",
                color: role === "student" ? OFFWHITE : NAVY,
                borderRight: `1px solid ${NAVY}`,
              }}
            >
              Sou Estudante
            </button>
            <button
              type="button"
              role="tab"
              id="aba-empresa"
              aria-selected={role === "company"}
              aria-controls="painel-acesso"
              tabIndex={role === "company" ? 0 : -1}
              onClick={() => setRole("company")}
              className="flex-1 py-3 text-[11px] tracking-[0.15em] uppercase font-medium transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                background: role === "company" ? NAVY : "transparent",
                color: role === "company" ? OFFWHITE : NAVY,
              }}
            >
              Sou Empresa/Solicitante
            </button>
          </div>
          {/* Red accent underline on active */}
          <div className="flex w-full" style={{ height: "2px" }} aria-hidden="true">
            <div
              style={{
                flex: 1,
                background: role === "student" ? RED : "transparent",
                transition: "background 0.2s",
              }}
            />
            <div
              style={{
                flex: 1,
                background: role === "company" ? RED : "transparent",
                transition: "background 0.2s",
              }}
            />
          </div>
        </div>

        {/* Form area */}
        <div
          id="painel-acesso"
          role="tabpanel"
          aria-labelledby={role === "student" ? "aba-estudante" : "aba-empresa"}
          className="px-8 pt-6 pb-8"
        >
          {role === "student" ? <StudentForm onEnter={onEnterStudent} /> : <CompanyForm onEnter={onEnterCompany} />}
        </div>
      </div>
    </div>
  );
}
