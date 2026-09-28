import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

export function NavBar({
  view,
  setView,
  onBack,
  unreadCount = 0,
}: {
  view: string;
  setView: (v: string) => void;
  onBack: () => void;
  unreadCount?: number;
}) {
  const navItems = [
    { id: "opportunities", label: "Oportunidades" },
    { id: "projects", label: "Meus Projetos" },
    { id: "notifications", label: "Notificações" },
    { id: "profile", label: "Perfil" },
  ];
  return (
    <nav
      className="w-full flex items-center justify-between px-8 md:px-12 py-4 sticky top-0 z-30"
      style={{ background: OFFWHITE, borderBottom: `1px solid ${NAVY}15` }}
    >
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 flex-shrink-0" style={{ background: NAVY, borderRadius: "6px" }} />
        <span
          className="text-[12px] tracking-[0.2em] uppercase font-semibold"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
        >
          VitrineIC
        </span>
        <span
          className="text-[9px] tracking-[0.18em] uppercase ml-2 hidden md:inline-block"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
        >
          · Área do Estudante
        </span>
      </div>
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase transition-all flex items-center gap-2"
            style={{
              fontFamily: "Inter, sans-serif",
              color: NAVY,
              background: view === item.id ? `${NAVY}08` : "transparent",
              borderRadius: "10px",
              fontWeight: view === item.id ? 600 : 400
            }}
          >
            {item.label}
            {item.id === "notifications" && unreadCount > 0 && (
              <span
                className="px-1.5 py-0.5 text-[8px] rounded-[5px]"
                style={{ fontFamily: "Space Mono, monospace", background: RED, color: OFFWHITE }}
              >
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        className="text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-100 opacity-40 flex items-center gap-2"
        style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        Sair
      </button>
    </nav>
  );
}
