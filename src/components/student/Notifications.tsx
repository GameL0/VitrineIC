import { useState } from "react";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import { notifications as initialNotifications } from "@/data/notifications";
import { Input } from "./ui";

export function Notifications() {
  const [notifs, setNotifs] = useState(initialNotifications.map(n => ({ ...n, content: "Olá estudante! Vimos que seu perfil se alinha perfeitamente com a demanda XYZ, em especial pela sua proficiência nas linguagens requeridas. Gostaríamos de marcar uma breve conversa para detalhar o projeto. Tem disponibilidade nesta semana?" })));
  const [filter, setFilter] = useState<"todas" | "nao-lidas">("todas");
  const [selected, setSelected] = useState<any>(null);
  const [reply, setReply] = useState("");

  const unreadCount = notifs.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, unread: false })));
  };

  const openNotif = (index: number) => {
    const original = notifs[index];
    const newNotifs = [...notifs];
    newNotifs[index].unread = false;
    setNotifs(newNotifs);
    setSelected(original);
  };

  const filteredNotifs = filter === "todas" ? notifs : notifs.filter((n) => n.unread);

  if (selected) {
    return (
      <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
        <button
          onClick={() => { setSelected(null); setReply(""); }}
          className="flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80 mb-8"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Voltar para Notificações
        </button>

        <div
          className="p-8"
          style={{ background: OFFWHITE, border: `1px solid ${NAVY}30`, borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-start justify-between mb-8 pb-8" style={{ borderBottom: `1px solid ${NAVY}15` }}>
            <div>
              <span
                className="text-[10px] tracking-widest uppercase mb-3 inline-block"
                style={{ fontFamily: "Space Mono, monospace", color: selected.type === "CONVITE" ? RED : `${NAVY}80` }}
              >
                {selected.type}
              </span>
              <h2 className="text-3xl mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
                {selected.project}
              </h2>
              <p className="text-[14px]" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.6 }}>
                Enviado por <strong style={{ fontWeight: 600 }}>{selected.from}</strong> em {selected.time}
              </p>
            </div>
            <div
              className="w-12 h-12 flex-shrink-0 flex items-center justify-center"
              style={{
                background: selected.type === "CONVITE" ? `${RED}15` : `${NAVY}10`,
                color: selected.type === "CONVITE" ? RED : NAVY,
                borderRadius: "12px",
              }}
            >
              {selected.type === "CONVITE" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>

          <div className="mb-10">
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "Inter, sans-serif", color: NAVY }}>
              {selected.content}
            </p>
          </div>

          <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${NAVY}15` }}>
            <Input
              label="Responder mensagem"
              placeholder="Escreva sua resposta..."
              textarea
              rows={4}
              value={reply}
              onChange={setReply}
            />
            <div className="mt-4 flex justify-end">
              <button
                className="px-8 py-3 text-[10px] tracking-[0.16em] uppercase font-semibold transition-all hover:opacity-90"
                style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif", borderRadius: "8px" }}
              >
                Enviar Resposta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1
            className="text-4xl md:text-[44px] leading-tight"
            style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
          >
            Notificações
          </h1>
          <p
            className="text-base mt-2"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, color: `${NAVY}99` }}
          >
            Fique por dentro das atualizações do seu perfil e propostas.
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="text-[12px] uppercase tracking-widest transition-opacity hover:opacity-70 underline underline-offset-4"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
        >
          Marcar todas como lidas
        </button>
      </div>

      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setFilter("todas")}
          className="px-4 py-2 text-[12px] transition-all"
          style={{
            fontFamily: "Inter, sans-serif",
            background: filter === "todas" ? NAVY : "transparent",
            color: filter === "todas" ? OFFWHITE : NAVY,
            border: filter === "todas" ? "none" : `1px solid ${NAVY}30`,
            borderRadius: "6px",
          }}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("nao-lidas")}
          className="px-4 py-2 text-[12px] transition-all flex items-center gap-2"
          style={{
            fontFamily: "Inter, sans-serif",
            background: filter === "nao-lidas" ? NAVY : "transparent",
            color: filter === "nao-lidas" ? OFFWHITE : NAVY,
            border: filter === "nao-lidas" ? "none" : `1px solid ${NAVY}30`,
            borderRadius: "6px",
          }}
        >
          Não lidas ({unreadCount})
        </button>
      </div>

      <div
        className="w-full flex flex-col"
        style={{
          background: "transparent",
          borderRadius: "16px",
          border: `1px solid ${NAVY}15`,
          overflow: "hidden",
        }}
      >
        {filteredNotifs.length === 0 ? (
          <div className="p-10 text-center" style={{ color: `${NAVY}60`, fontFamily: "Inter" }}>
            Nenhuma notificação encontrada.
          </div>
        ) : (
          filteredNotifs.map((n, i) => {
            const originalIndex = notifs.findIndex(x => x === n);
            return (
              <button
                key={i}
                onClick={() => openNotif(originalIndex)}
                className="w-full text-left p-6 transition-all flex flex-col md:flex-row md:items-center gap-4"
                style={{
                  background: n.unread ? `${NAVY}05` : OFFWHITE,
                  borderBottom: i < filteredNotifs.length - 1 ? `1px solid ${NAVY}10` : "none",
                }}
              >
                {/* Ícone */}
                <div
                  className="w-12 h-12 flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: n.type === "CONVITE" ? `${RED}15` : `${NAVY}10`,
                    color: n.type === "CONVITE" ? RED : NAVY,
                    borderRadius: "12px",
                  }}
                >
                  {n.type === "CONVITE" ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>

                {/* Central Block */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] tracking-widest uppercase"
                      style={{ fontFamily: "Space Mono, monospace", color: n.type === "CONVITE" ? RED : `${NAVY}80` }}
                    >
                      {n.type}
                    </span>
                    {n.unread && (
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: RED }} />
                    )}
                  </div>
                  <h4 className="text-[15px] font-medium mb-1" style={{ fontFamily: "Inter, sans-serif", color: NAVY }}>
                    {n.project}
                  </h4>
                  <p className="text-[13px] truncate max-w-[300px] md:max-w-md" style={{ fontFamily: "Inter, sans-serif", color: `${NAVY}80` }}>
                    {n.content}
                  </p>
                </div>

                {/* Timestamp */}
                <div className="text-[11px] uppercase flex flex-col items-end gap-2" style={{ fontFamily: "Space Mono, monospace", color: `${NAVY}50` }}>
                  {n.time}
                  <span className="text-[9px] text-blue-500 opacity-60">Ver mensagem</span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
