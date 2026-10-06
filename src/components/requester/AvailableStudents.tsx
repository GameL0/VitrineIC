import { useState } from "react";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import { STUDENTS } from "@/data/students";
import { Label, SelectField } from "./ui";


function StudentMatchCard({ student, onClick }: { student: any, onClick: () => void }) {
  const matchScore = Math.floor(Math.random() * (95 - 60) + 60);

  return (
    <div
      style={{ border: `1px solid ${NAVY}20`, borderRadius: "16px", overflow: "hidden", background: OFFWHITE }}
      className="transition-all"
    >
      <div
        className="grid px-6 py-6 gap-6 cursor-pointer hover:bg-black/5"
        style={{ gridTemplateColumns: "64px 1fr auto" }}
        onClick={onClick}
      >
        <div
          className="w-16 h-16 flex items-center justify-center flex-shrink-0 rounded-[12px]"
          style={{ background: NAVY }}
        >
          <span
            className="text-lg"
            style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: OFFWHITE }}
          >
            {student.name.charAt(0)}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h3
              className="text-xl"
              style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}
            >
              {student.name}
            </h3>
            <div
              className="px-2 py-0.5 flex items-center gap-1.5"
              style={{ border: `1px solid ${RED}`, background: `${RED}08`, borderRadius: "6px" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: RED }} />
              <span
                className="text-[9px] tracking-[0.14em] uppercase"
                style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: RED }}
              >
                Match {matchScore}%
              </span>
            </div>
          </div>
          <p
            className="text-[11px] mb-3"
            style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}
          >
            {student.course} · {student.semester}º Semestre
          </p>
          <div className="flex flex-wrap gap-1.5">
            {student.skills.slice(0, 5).map((s: string) => (
              <span
                key={s}
                className="px-2 py-1 text-[9px] tracking-[0.1em] uppercase flex items-center gap-1.5"
                style={{
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  color: NAVY,
                  border: `1px solid ${NAVY}22`,
                  opacity: 0.75,
                  borderRadius: "6px"
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                {s}
              </span>
            ))}
            {student.skills.length > 5 && (
              <span className="px-2 py-0.5 text-[9px] tracking-[0.12em] uppercase" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
                +{student.skills.length - 5}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <div className="flex flex-col items-end gap-1">
            <span
              className="text-[9px] tracking-[0.14em] uppercase"
              style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}
            >
              Compatibilidade
            </span>
            <div className="flex items-end gap-[3px]">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "4px",
                    height: `${6 + i * 2}px`,
                    background: i < Math.round(matchScore / 10) ? NAVY : `${NAVY}18`,
                  }}
                />
              ))}
            </div>
          </div>
          <button
            className="text-[9px] tracking-[0.14em] uppercase flex items-center gap-1.5 mt-4 transition-opacity hover:opacity-70"
            style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}
          >
            Ver perfil completo
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3l3 4 3-4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}


export function AvailableStudents() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState("");

  const MY_DEMANDS = [
    "Sistema de Monitoramento IoT",
    "App Mobile para Saúde Mental"
  ];

  if (selectedStudent) {
    return (
      <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
        <button
          onClick={() => setSelectedStudent(null)}
          className="flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80 mb-8"
          style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Voltar para Estudantes Disponíveis
        </button>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Column - Profile Summary */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div className="p-8 flex flex-col items-center text-center" style={{ background: OFFWHITE, border: `1px solid ${NAVY}20`, borderRadius: "16px" }}>
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
                style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter Tight, Geist, system-ui, sans-serif", fontSize: "32px" }}
              >
                {selectedStudent.name.charAt(0)}
              </div>
              <h2 className="text-2xl mb-1" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>
                {selectedStudent.name}
              </h2>
              <p className="text-[12px] mb-4" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
                {selectedStudent.course} · {selectedStudent.semester}º Semestre
              </p>
              <button
                onClick={() => setShowOfferModal(true)}
                className="w-full py-3 text-[10px] tracking-[0.16em] uppercase font-semibold transition-all hover:opacity-90"
                style={{ background: RED, color: OFFWHITE, fontFamily: "Geist, Inter, system-ui, sans-serif", borderRadius: "10px" }}
              >
                Fazer Oferta
              </button>
            </div>

            <div className="p-8" style={{ background: OFFWHITE, border: `1px solid ${NAVY}20`, borderRadius: "16px" }}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
                Competências Técnicas
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedStudent.skills.map((s: any) => (
                  <span
                    key={s.name}
                    className="px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase"
                    style={{
                      fontFamily: "Geist Mono, ui-monospace, monospace",
                      color: NAVY,
                      border: `1px solid ${NAVY}30`,
                      borderRadius: "6px",
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>

              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
                Idiomas
              </h3>
              <div className="flex flex-wrap gap-2">
                 <span className="px-2.5 py-1 text-[10px] tracking-[0.1em] uppercase" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, border: `1px solid ${NAVY}30`, borderRadius: "6px" }}>
                    Inglês (Avançado)
                 </span>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            <div className="p-8" style={{ background: OFFWHITE, border: `1px solid ${NAVY}20`, borderRadius: "16px" }}>
              <h3 className="text-xl mb-4" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>Sobre</h3>
              <p className="text-[14px] leading-relaxed" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.7 }}>
                {selectedStudent.bio || "Estudante altamente engajado e em busca de novos desafios em desenvolvimento de software e inteligência artificial."}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: NAVY, opacity: 0.5 }}>
                  <rect x="1" y="2" width="7" height="8" rx="0.5" stroke="currentColor" strokeWidth="1" />
                  <path d="M5 1h5v5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M5 7l5-5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
                <span className="text-[10px]" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
                  github.com/{selectedStudent.name.split(" ")[0].toLowerCase()}
                </span>
              </div>
            </div>

            <div className="p-8" style={{ background: OFFWHITE, border: `1px solid ${NAVY}20`, borderRadius: "16px" }}>
              <h3 className="text-xl mb-6" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>Projetos e Experiências</h3>
              
              <div className="flex flex-col gap-6">
                <div style={{ borderLeft: `2px solid ${NAVY}20`, paddingLeft: "16px" }}>
                  <span className="text-[10px] uppercase tracking-widest mb-1 block" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: RED }}>
                    Em Andamento
                  </span>
                  <h4 className="text-lg font-medium mb-2" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>
                    API RESTful para E-commerce
                  </h4>
                  <p className="text-[13px] leading-relaxed" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.6 }}>
                    Construção de microsserviços usando Node.js e banco de dados PostgreSQL.
                  </p>
                </div>
                
                <div style={{ borderLeft: `2px solid ${NAVY}20`, paddingLeft: "16px" }}>
                  <span className="text-[10px] uppercase tracking-widest mb-1 block" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}>
                    Concluído (2025)
                  </span>
                  <h4 className="text-lg font-medium mb-2" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>
                    App Mobile de Mobilidade Urbana
                  </h4>
                  <p className="text-[13px] leading-relaxed" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.6 }}>
                    Desenvolvimento de aplicativo em React Native para otimizar rotas de ônibus fretados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offer Modal */}
        {showOfferModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(26,25,21,0.55)", backdropFilter: "blur(2px)" }}>
            <div className="w-full max-w-md p-8" style={{ background: OFFWHITE, borderRadius: "20px" }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>Fazer Oferta</h2>
                <button onClick={() => setShowOfferModal(false)} style={{ color: NAVY, opacity: 0.5 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
              <p className="text-[13px] mb-6" style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.7 }}>
                Selecione para qual das suas demandas ativas você deseja enviar um convite a este estudante.
              </p>
              <SelectField
                label="Selecione a Demanda"
                options={MY_DEMANDS}
                value={selectedDemand}
                onChange={setSelectedDemand}
              />
              <button
                onClick={() => {
                  alert("Convite enviado com sucesso!");
                  setShowOfferModal(false);
                }}
                className="w-full mt-6 py-3 text-[10px] tracking-[0.16em] uppercase font-semibold transition-all hover:opacity-90"
                style={{ background: RED, color: OFFWHITE, fontFamily: "Geist, Inter, system-ui, sans-serif", borderRadius: "10px" }}
              >
                Enviar Convite
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="mb-10">
        <p
          className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
          style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}
        >
          <span className="inline-block w-4 rounded-full" style={{ height: "2px", background: RED }} />
          Banco de Talentos
        </p>
        <h1
          className="text-4xl mb-3"
          style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}
        >
          Estudantes Disponíveis
        </h1>
        <p
          className="text-[14px] max-w-2xl"
          style={{ fontFamily: "Geist, Inter, system-ui, sans-serif", color: NAVY, opacity: 0.55, fontWeight: 300 }}
        >
          Explore os perfis de estudantes do instituto e confira o grau de compatibilidade (Match)
          com suas demandas. Faça convites diretos abrindo o perfil.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {STUDENTS.slice(0, 10).map((s) => (
          <StudentMatchCard key={s.id} student={s} onClick={() => setSelectedStudent(s)} />
        ))}
      </div>
    </div>
  );
}
