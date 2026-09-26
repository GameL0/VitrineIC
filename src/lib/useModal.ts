import { useEffect, useRef } from "react";

/** Elementos que podem receber foco dentro de um diálogo. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Comportamento de diálogo modal: trava o scroll do corpo, fecha no Escape,
 * move o foco para dentro ao abrir, prende o Tab e devolve o foco a quem abriu.
 *
 * Devolve a ref que deve ir no contêiner do diálogo — o que tem
 * `role="dialog"` e `aria-modal="true"`.
 */
export function useModal(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.body.classList.add("modal-open");

    // Foco inicial: o primeiro elemento focável, ou o próprio diálogo.
    const node = ref.current;
    const first = node?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? node)?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !node) return;

      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (items.length === 0) return;

      const edge = e.shiftKey ? items[0] : items[items.length - 1];
      if (document.activeElement === edge || !node.contains(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? items[items.length - 1] : items[0]).focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKey);
      opener?.focus?.();
    };
  }, [onClose]);

  return ref;
}
