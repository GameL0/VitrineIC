import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

export function NavBar({
  view,
  setView,
  onBack,
}: {
  view: string;
  setView: (v: string) => void;
  onBack: () => void;
}) {
  const navItems = [
    { id: "available_students", label: "Estudantes Disponíveis" },
    { id: "dashboard", label: "Minhas Demandas" },
    { id: "new", label: "Nova Demanda" },
    { id: "team", label: "Equipe" },
    { id: "profile", label: "Meu Perfil" },
    { id: "notifications", label: "Notificações" },
  ];
  return (
    <nav
      className="w-full flex items-center justify-between px-8 md:px-12 py-4 sticky top-0 z-30"
      style={{ background: OFFWHITE, borderBottom: `1px solid ${NAVY}15` }}
    >
      <div className="flex items-center gap-3">
        <img src="/logo.jpg" alt="Logo ConectaIC" className="w-6 h-6 object-contain rounded-[4px]" style={{ background: NAVY }} />
        <span
          className="text-[12px] tracking-[0.2em] uppercase font-semibold"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
        >
          VitrineIC
        </span>
        <span
          className="text-[9px] tracking-[0.18em] uppercase ml-2"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
        >
          · Área do Solicitante
        </span>
      </div>
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase transition-all"
            style={{
              fontFamily: "Inter, sans-serif",
              color: NAVY,
              background: view === item.id ? `${NAVY}08` : "transparent",
              borderRadius: "10px",
              fontWeight: view === item.id ? 600 : 400
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        className="text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80 opacity-50 flex items-center gap-2"
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
