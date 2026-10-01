import { NAVY, OFFWHITE } from "@/styles/tokens";

export function Team() {
  const teamMembers = [
    { name: "João Pereira", role: "Desenvolvedor Backend", project: "Sistema de Monitoramento IoT", email: "joao.pereira@ic.ufal.br" },
    { name: "Ana Beatriz", role: "UX Designer", project: "App Mobile para Saúde Mental", email: "ana.beatriz@ic.ufal.br" },
  ];

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl mb-3" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>
          Minha Equipe
        </h1>
        <p className="text-[13px] max-w-xl" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}>
          Veja os estudantes que estão atualmente alocados em seus projetos.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4" style={{ background: OFFWHITE, borderRadius: "12px", border: `1px solid ${NAVY}15` }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full" style={{ background: NAVY }}>
                <span className="text-[16px]" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: OFFWHITE }}>{member.name.charAt(0)}</span>
              </div>
              <div>
                <span className="text-[16px] font-medium block mb-1" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>{member.name}</span>
                <span className="text-[10px] opacity-60 uppercase tracking-wider block" style={{ fontFamily: "Space Mono, monospace", color: NAVY }}>{member.role}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[12px] block mb-1" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.8 }}>{member.project}</span>
              <span className="text-[10px] opacity-50" style={{ fontFamily: "Space Mono, monospace", color: NAVY }}>{member.email}</span>
            </div>
          </div>
        ))}
        {teamMembers.length === 0 && <p className="text-[12px] opacity-50" style={{ fontFamily: "Inter, sans-serif", color: NAVY }}>Sua equipe está vazia.</p>}
      </div>
    </div>
  );
}
