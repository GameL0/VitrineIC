import { useEffect, useState } from "react";
import { CompanyForm } from "./CompanyForm";
import { StudentForm } from "./StudentForm";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

export function AuthModal({ onClose, onEnterStudent, onEnterCompany }: { onClose: () => void; onEnterStudent: () => void; onEnterCompany: () => void }) {
  const [role, setRole] = useState<"student" | "company">("student");

  useEffect(() => {
    document.body.classList.add("modal-open");
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(28,43,74,0.55)", backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-lg"
        style={{ background: OFFWHITE, border: `1.5px solid ${RED}`, borderRadius: "20px", overflow: "hidden" }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-8 py-5"
          style={{ borderBottom: `1px solid ${NAVY}22` }}
        >
          <span
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
          >
            VitrineIC · Acesso
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center transition-colors"
            style={{ color: NAVY, opacity: 0.4 }}
            aria-label="Fechar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" />
              <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Toggle */}
        <div className="px-8 pt-7 pb-0">
          <div className="flex w-full gap-3">
            <button
              onClick={() => setRole("student")}
              className="flex-1 py-3 text-[11px] tracking-[0.15em] uppercase font-medium transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                background: role === "student" ? NAVY : "transparent",
                color: role === "student" ? OFFWHITE : NAVY,
                border: `1px solid ${NAVY}`,
                borderRadius: "10px",
              }}
            >
              Sou Estudante
            </button>
            <button
              onClick={() => setRole("company")}
              className="flex-1 py-3 text-[11px] tracking-[0.15em] uppercase font-medium transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                background: role === "company" ? NAVY : "transparent",
                color: role === "company" ? OFFWHITE : NAVY,
                border: `1px solid ${NAVY}`,
                borderRadius: "10px",
              }}
            >
              Sou Empresa/Solicitante
            </button>
          </div>

        </div>

        {/* Form area */}
        <div className="px-8 pt-6 pb-8">
          {role === "student" ? <StudentForm onEnter={onEnterStudent} /> : <CompanyForm onEnter={onEnterCompany} />}
        </div>
      </div>
    </div>
  );
}
