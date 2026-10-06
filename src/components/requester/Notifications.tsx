import { useState } from "react";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import { Input } from "./ui";

export function Notifications() {
  const initialNotifications = [
    {
      id: "req-1",
      type: "NOVO INTERESSE",
      project: "App Mobile para Saúde Mental",
      from: "Ana Beatriz",
      time: "Hoje, 09:30",
      unread: true,
      content: "Olá! Vi a sua demanda e me identifiquei muito com o projeto. Tenho experiência em React Native e gostaria de colaborar. Podemos agendar um bate-papo?"
    },
    {
      id: "req-2",
      type: "RECOMENDAÇÃO",
      project: "Sistema de Monitoramento IoT",
      from: "Curadoria VitrineIC",
      time: "Ontem, 14:15",
      unread: true,
      content: "A curadoria analisou sua demanda e sugere fortemente o perfil de João Pereira, que possui grande expertise em Python e IoT. O estudante já foi notificado."
    },
    {
      id: "req-3",
      type: "SISTEMA",
      project: "Demanda VIC-2026-0041",
      from: "VitrineIC",
      time: "Há 3 dias",
      unread: false,
      content: "Sua demanda 'Sistema de Monitoramento IoT' foi aprovada e publicada no catálogo com sucesso. Em breve você começará a receber matches."
    }
  ];

  const [notifs, setNotifs] = useState(initialNotifications);
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
          style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}
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
                className="text-[10px] tracking-widest uppercase mb-3 inline-block font-bold"
                style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: selected.type !== "SISTEMA" ? RED : `${NAVY}80` }}
              >
                {selected.type}
              </span>
              <h2 className="text-3xl mb-2" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>
                {selected.project}
              </h2>
              <p className="text-[14px]" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.6 }}>
                Enviado por <strong style={{ fontWeight: 600 }}>{selected.from}</strong> em {selected.time}
              </p>
            </div>
            <div
              className="w-12 h-12 flex-shrink-0 flex items-center justify-center"
              style={{
                background: selected.type !== "SISTEMA" ? `${RED}15` : `${NAVY}10`,
                color: selected.type !== "SISTEMA" ? RED : NAVY,
                borderRadius: "12px",
              }}
            >
              {selected.type !== "SISTEMA" ? (
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
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY }}>
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
                style={{ background: NAVY, color: OFFWHITE, fontFamily: "Geist, Inter, system-ui, sans-serif", borderRadius: "8px" }}
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
      <div className="mb-10">
        <h1
          className="text-4xl mb-3"
          style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}
        >
          Notificações
        </h1>
        <p
          className="text-[14px] max-w-xl"
          style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.6, fontWeight: 300 }}
        >
          Mantenha-se atualizado sobre candidaturas, recomendações e aprovações das suas demandas.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setFilter("todas")}
              className="flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors text-left"
              style={{
                background: filter === "todas" ? `${NAVY}10` : "transparent",
                color: NAVY,
              }}
            >
              <span className="text-[13px] font-medium" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif" }}>
                Todas
              </span>
            </button>
            <button
              onClick={() => setFilter("nao-lidas")}
              className="flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors text-left"
              style={{
                background: filter === "nao-lidas" ? `${NAVY}10` : "transparent",
                color: NAVY,
              }}
            >
              <span className="text-[13px] font-medium" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif" }}>
                Não lidas
              </span>
              {unreadCount > 0 && (
                <span
                  className="px-2 py-0.5 text-[10px] font-bold rounded-full"
                  style={{ background: RED, color: OFFWHITE, fontFamily: "Geist Mono, ui-monospace, monospace" }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-[10px] tracking-[0.16em] uppercase"
              style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}
            >
              {filteredNotifs.length} {filteredNotifs.length === 1 ? "mensagem" : "mensagens"}
            </span>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[10px] tracking-[0.16em] uppercase font-bold transition-opacity hover:opacity-70"
                style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY }}
              >
                Marcar todas como lidas
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {filteredNotifs.map((n, i) => {
              const originalIndex = notifs.findIndex(x => x.id === n.id);
              return (
                <div
                  key={n.id}
                  onClick={() => openNotif(originalIndex)}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-6 cursor-pointer transition-all hover:-translate-y-[2px]"
                  style={{
                    background: OFFWHITE,
                    border: `1px solid ${n.unread ? NAVY : `${NAVY}15`}`,
                    borderRadius: "12px",
                    boxShadow: n.unread ? "0 4px 20px rgba(26,25,21,0.08)" : "none",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {n.unread ? (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: RED }} />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: `${NAVY}20` }} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className="text-[9px] tracking-widest uppercase font-bold"
                          style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: n.type !== "SISTEMA" ? RED : `${NAVY}60` }}
                        >
                          {n.type}
                        </span>
                        <span
                          className="text-[10px]"
                          style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.5 }}
                        >
                          · {n.time}
                        </span>
                      </div>
                      <h3
                        className="text-[16px] mb-1"
                        style={{
                          fontFamily: "Inter Tight, Geist, system-ui, sans-serif",
                          color: NAVY,
                          fontWeight: n.unread ? "bold" : "normal"
                        }}
                      >
                        {n.project}
                      </h3>
                      <p
                        className="text-[13px] line-clamp-1"
                        style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.7 }}
                      >
                        {n.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredNotifs.length === 0 && (
              <div
                className="py-16 text-center"
                style={{ border: `1px dashed ${NAVY}20`, borderRadius: "12px" }}
              >
                <p
                  className="text-[13px]"
                  style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.5 }}
                >
                  Nenhuma notificação encontrada.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
