/** Link "voltar" no topo das páginas de detalhe. */
export function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 font-sans text-[13px] text-navy/65 transition-colors hover:text-navy"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M12 7H2M6 3 2 7l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      {label}
    </button>
  );
}
