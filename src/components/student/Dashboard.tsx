import { Label } from "./ui";
import { notifications } from "@/data/notifications";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

export function Dashboard({ profile }: { profile: any }) {
  const name = profile?.name || "Ana C. Ferreira";
  const course = profile?.course || "Eng. de Computação";
  const semester = profile?.semester || "4º semestre";
  const skills: { name: string; level: number }[] = profile?.skills || [
    { name: "Python", level: 4 },
    { name: "React", level: 3 },
    { name: "PyTorch", level: 2 },
  ];

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      {/* Page title */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p
            className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
          >
            <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
            Dashboard
          </p>
          <h1
            className="text-4xl"
            style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
          >
            Bem-vindo, {name.split(" ")[0]}.
          </h1>
        </div>
        <span
          className="text-[10px] tracking-[0.14em]"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}
        >
          {new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        {/* Profile card */}
        <div className="md:col-span-4" style={{ border: `1px solid ${NAVY}18` }}>
          <div className="px-6 py-5" style={{ borderBottom: `1px solid ${NAVY}12` }}>
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ background: NAVY }}
              >
                <span
                  className="text-base"
                  style={{ fontFamily: "DM Serif Display, Georgia, serif", color: OFFWHITE }}
                >
                  {name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
                </span>
              </div>
              <div>
                <p
                  className="text-[14px] font-semibold leading-tight"
                  style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
                >
                  {name}
                </p>
                <p
                  className="text-[11px] mt-0.5"
                  style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.45 }}
                >
                  {course} · {semester}
                </p>
              </div>
            </div>
            <div style={{ height: "1px", background: `${NAVY}10`, margin: "0 0 16px" }} />
            <p
              className="text-[12px] leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.55, fontWeight: 300 }}
            >
              {profile?.bio || "Estudante de graduação com interesse em IA aplicada e sistemas distribuídos. Buscando projetos de iniciação científica."}
            </p>
          </div>

          <div className="px-6 py-4" style={{ borderBottom: `1px solid ${NAVY}12` }}>
            <Label>Competências</Label>
            <div className="flex flex-col gap-2 mt-2">
              {skills.slice(0, 5).map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <span
                    className="text-[11px]"
                    style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.7 }}
                  >
                    {s.name}
                  </span>
                  <div className="flex gap-[3px] items-end">
                    {[1, 2, 3, 4].map((b) => (
                      <div
                        key={b}
                        style={{
                          width: "6px",
                          height: `${b * 3 + 2}px`,
                          background: b <= s.level ? NAVY : `${NAVY}18`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-4">
            <Label>Perfil público</Label>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
              <span
                className="text-[11px]"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
              >
                vitrine.ic.unicamp.br/u/{name.split(" ")[0].toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="md:col-span-5" style={{ border: `1px solid ${NAVY}18` }}>
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: `1px solid ${NAVY}12` }}
          >
            <div className="flex items-center gap-2">
              <Label>Notificações</Label>
              <span
                className="px-1.5 py-0.5 text-[9px]"
                style={{
                  background: RED,
                  color: OFFWHITE,
                  fontFamily: "Space Mono, monospace",
                  marginBottom: "6px",
                }}
              >
                {notifications.filter((n) => n.unread).length}
              </span>
            </div>
            <button
              className="text-[9px] tracking-[0.14em] uppercase transition-opacity hover:opacity-80"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
            >
              Marcar lidas
            </button>
          </div>
          <div>
            {notifications.map((n, i) => (
              <div
                key={i}
                className="px-6 py-4 transition-colors cursor-pointer"
                style={{
                  borderBottom: i < notifications.length - 1 ? `1px solid ${NAVY}08` : "none",
                  background: n.unread ? `${NAVY}04` : "transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = `${NAVY}07`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = n.unread ? `${NAVY}04` : "transparent")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {n.unread && (
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: RED }}
                      />
                    )}
                    {!n.unread && <div className="w-1.5 flex-shrink-0" />}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[9px] tracking-[0.16em] uppercase px-1.5 py-0.5"
                          style={{
                            fontFamily: "Space Mono, monospace",
                            color: n.type === "CONVITE" ? RED : NAVY,
                            border: `1px solid ${n.type === "CONVITE" ? RED : `${NAVY}25`}`,
                            opacity: n.type === "CONVITE" ? 1 : 0.6,
                          }}
                        >
                          {n.type}
                        </span>
                      </div>
                      <p
                        className="text-[12px] font-medium"
                        style={{ fontFamily: "Inter, sans-serif", color: NAVY }}
                      >
                        {n.project}
                      </p>
                      <p
                        className="text-[11px] mt-0.5"
                        style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.45 }}
                      >
                        {n.from}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-[9px] flex-shrink-0 mt-0.5"
                    style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}
                  >
                    {n.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Public preview */}
        <div className="md:col-span-3" style={{ border: `1px solid ${NAVY}18` }}>
          <div
            className="px-5 py-4"
            style={{ borderBottom: `1px solid ${NAVY}12`, background: NAVY }}
          >
            <Label>
              <span style={{ color: OFFWHITE, opacity: 0.5 }}>Preview público</span>
            </Label>
          </div>
          <div className="p-5" style={{ background: `${NAVY}04` }}>
            {/* Mini card preview */}
            <div className="bg-white p-4" style={{ border: `1px solid ${NAVY}15`, boxShadow: "0 2px 8px rgba(28,43,74,0.06)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 flex items-center justify-center" style={{ background: NAVY }}>
                  <span className="text-[10px]" style={{ fontFamily: "DM Serif Display", color: OFFWHITE }}>
                    {name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold" style={{ fontFamily: "Inter", color: NAVY }}>{name}</p>
                  <p className="text-[9px]" style={{ fontFamily: "Space Mono", color: NAVY, opacity: 0.4 }}>{course}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {skills.slice(0, 3).map((s) => (
                  <span
                    key={s.name}
                    className="text-[8px] px-1.5 py-0.5 tracking-wide"
                    style={{ fontFamily: "Space Mono", color: NAVY, border: `1px solid ${NAVY}25`, opacity: 0.7 }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
              <div style={{ height: "1px", background: `${NAVY}10` }} className="mb-2" />
              <p className="text-[8px]" style={{ fontFamily: "Space Mono", color: NAVY, opacity: 0.3 }}>
                vitrine.ic.unicamp.br/u/{name.split(" ")[0].toLowerCase()}
              </p>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <Label>Visibilidade</Label>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
                  <span className="text-[9px]" style={{ fontFamily: "Space Mono", color: NAVY, opacity: 0.5 }}>Público</span>
                </div>
              </div>
              {[
                { label: "Visualizações", val: "34" },
                { label: "Convites", val: "2" },
                { label: "Buscas", val: "12" },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between py-1.5" style={{ borderTop: `1px solid ${NAVY}10` }}>
                  <span className="text-[9px]" style={{ fontFamily: "Space Mono", color: NAVY, opacity: 0.4 }}>{m.label}</span>
                  <span className="text-[11px] font-bold" style={{ fontFamily: "DM Serif Display", color: NAVY }}>{m.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
