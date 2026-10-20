import { useEffect, type ReactNode } from "react";
import { CloseIcon } from "./Icons";
import { Eyebrow } from "@/components/public/Eyebrow";

/**
 * Modal branco centralizado sobre fundo navy desfocado, no mesmo padrão do
 * modal de acesso. Fecha pelo X, pelo Esc ou clicando fora.
 */
export function Modal({
  eyebrow,
  title,
  onClose,
  children,
  width = "max-w-[520px]",
}: {
  eyebrow: string;
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
  width?: string;
}) {
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
      className="fixed inset-0 z-50 flex overflow-y-auto bg-navy/55 p-4 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`relative m-auto w-full ${width} rounded-3xl bg-white p-6 shadow-[0_40px_80px_-24px_rgba(11,37,69,0.45)] sm:p-8`}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 grid size-8 place-items-center rounded-lg text-navy/55 transition-colors hover:bg-navy/5 hover:text-navy"
        >
          <CloseIcon />
        </button>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 mb-6 font-display text-2xl font-medium tracking-[-0.02em] text-navy">{title}</h2>
        {children}
      </div>
    </div>
  );
}
