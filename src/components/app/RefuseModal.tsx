import { useState } from "react";
import { Modal } from "./Modal";

/**
 * Confirma a recusa de um interesse e pede o motivo, que fica visível ao
 * solicitante e à curadoria (nunca ao estudante).
 */
export function RefuseModal({
  title,
  onClose,
  onConfirm,
}: {
  title: string;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  return (
    <Modal eyebrow="Recusar" title={title} onClose={onClose}>
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.08em] text-navy/65">
        Motivo (opcional)
      </label>
      <textarea
        rows={3}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Ajuda a curadoria a sugerir melhor da próxima vez."
        className="vt-input"
      />
      <p className="mt-2 font-sans text-xs text-navy/50">Visível ao solicitante e à curadoria.</p>
      <div className="mt-8 flex items-center justify-end gap-3">
        <button onClick={onClose} className="rounded-[10px] px-3 py-2 font-sans text-sm text-navy/65 transition-colors hover:text-navy">
          Cancelar
        </button>
        <button onClick={() => onConfirm(reason)} className="vt-btn vt-btn-danger">
          Confirmar recusa
        </button>
      </div>
    </Modal>
  );
}
