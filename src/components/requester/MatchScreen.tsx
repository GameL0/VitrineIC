import { useState } from "react";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import { PublicProfile } from "@/components/public/PublicProfile";

export function MatchScreen({ onBack }: { onBack?: () => void }) {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Mock atualizado para demonstrar estudantes que aceitaram e os que demonstraram interesse
  const [applicantStatuses, setApplicantStatuses] = useState([
    { id: "std-1", name: "João Pereira", status: "Aceitou convite", type: "accepted", color: "#16a34a", course: "Engenharia da Computação · 5º sem" },
    { id: "std-2", name: "Maria Clara", status: "Em aguardo", type: "waiting", color: "#eab308", course: "Ciência da Computação · 7º sem" },
    { id: "std-3", name: "Carlos Silva", status: "Interesse enviado", type: "interested", color: "#3b82f6", course: "Inteligência Artificial · 3º sem" },
    { id: "std-4", name: "Ana Beatriz", status: "Interesse enviado", type: "interested", color: "#3b82f6", course: "Ciência da Computação · 4º sem" },
  ]);

  if (selectedStudentId) {
    return <PublicProfile id={selectedStudentId} onBack={() => setSelectedStudentId(null)} onOpenProject={() => {}} />;
  }

  const acceptedOrWaiting = applicantStatuses.filter(s => s.type === "accepted" || s.type === "waiting");
  const interested = applicantStatuses.filter(s => s.type === "interested");

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="mb-10">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-6 text-[10px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.6 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Voltar para Minhas Demandas
          </button>
        )}
        <p
          className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
          style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
        >
          <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
          Status das Solicitações
        </p>
        <h1
          className="text-4xl mb-3"
          style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
        >
          Estudantes Conectados
        </h1>
        <p
          className="text-[13px] max-w-xl"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}
        >
          Acompanhe o status das conexões que a curadoria estabeleceu, bem como estudantes que demonstraram interesse diretamente no seu projeto.
        </p>
      </div>

      {/* Convites da Curadoria */}
      <h3 className="text-xl mb-4 mt-8" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>Recomendações da Curadoria</h3>
      <div className="flex flex-col gap-4 mb-10">
        {acceptedOrWaiting.map((student) => (
          <div key={student.id} onClick={() => setSelectedStudentId(student.id)} className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4 cursor-pointer hover:-translate-y-1 transition-all" style={{ background: OFFWHITE, borderRadius: "12px", border: `1px solid ${NAVY}15` }}>
            <div>
              <span className="text-[16px] font-medium block mb-1" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>{student.name}</span>
              <span className="text-[10px] opacity-60" style={{ fontFamily: "Space Mono, monospace", color: NAVY }}>{student.course}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 text-[11px] uppercase font-bold tracking-widest rounded-[8px]" style={{ fontFamily: "Space Mono, monospace", background: `${student.color}15`, color: student.color, border: `1px solid ${student.color}40` }}>
                {student.status}
              </span>
              {student.type === "accepted" && (
                <button
                  onClick={(e) => { e.stopPropagation(); alert("Abrindo modal de contato..."); }}
                  className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase font-bold rounded-[8px] transition-opacity hover:opacity-85"
                  style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
                >
                  Entrar em contato
                </button>
              )}
            </div>
          </div>
        ))}
        {acceptedOrWaiting.length === 0 && <p className="text-[12px] opacity-50" style={{ fontFamily: "Inter, sans-serif", color: NAVY }}>Nenhum estudante recomendado ainda.</p>}
      </div>

      {/* Interessados Diretos */}
      <h3 className="text-xl mb-4" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>Candidatos Voluntários (Interessados)</h3>
      <div className="flex flex-col gap-4">
        {interested.map((student) => (
          <div key={student.id} onClick={() => setSelectedStudentId(student.id)} className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4 cursor-pointer hover:-translate-y-1 transition-all" style={{ background: OFFWHITE, borderRadius: "12px", border: `1px solid ${NAVY}15` }}>
            <div>
              <span className="text-[16px] font-medium block mb-1" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>{student.name}</span>
              <span className="text-[10px] opacity-60" style={{ fontFamily: "Space Mono, monospace", color: NAVY }}>{student.course}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 text-[11px] uppercase font-bold tracking-widest rounded-[8px]" style={{ fontFamily: "Space Mono, monospace", background: `${student.color}15`, color: student.color, border: `1px solid ${student.color}40` }}>
                {student.status}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setApplicantStatuses(applicantStatuses.map(s => s.id === student.id ? { ...s, type: "accepted", status: "Aceitou convite", color: "#16a34a" } : s));
                  }}
                  className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase font-bold rounded-[8px] transition-opacity hover:opacity-85"
                  style={{ background: "#16a34a", color: OFFWHITE, fontFamily: "Inter, sans-serif" }}
                >
                  Aceitar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setApplicantStatuses(applicantStatuses.filter(s => s.id !== student.id));
                  }}
                  className="px-4 py-2 text-[10px] tracking-[0.16em] uppercase font-bold rounded-[8px] transition-opacity hover:opacity-85"
                  style={{ border: `1px solid #dc2626`, color: "#dc2626", background: "transparent", fontFamily: "Inter, sans-serif" }}
                >
                  Recusar
                </button>
              </div>
            </div>
          </div>
        ))}
        {interested.length === 0 && <p className="text-[12px] opacity-50" style={{ fontFamily: "Inter, sans-serif", color: NAVY }}>Nenhum novo interessado.</p>}
      </div>

      <div
        className="mt-8 px-6 py-5 flex items-center gap-4"
        style={{ border: `1px dashed ${NAVY}20`, borderRadius: "12px" }}
        >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: NAVY, opacity: 0.5, flexShrink: 0 }}>
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.1" />
          <path d="M8 5v4M8 11v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <p
          className="text-[11px] leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}
        >
          Novos matches são notificados por e-mail. Após confirmar interesse, o estudante
          receberá seus dados de contato e o projeto poderá ser formalizado.
        </p>
      </div>
    </div>
  );
}
