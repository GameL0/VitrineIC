import { useState } from "react";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import { Input, Select, MultiSelect, Label } from "./ui";
import { SkillPicker } from "./SkillPicker";
import { LanguagePicker } from "./LanguagePicker";
import { COURSES } from "@/data/institution";
import type { StudentSkill, StudentLanguage } from "@/types";

export function Profile({ profile, onSave }: { profile: any; onSave: (d: any) => void }) {
  const [data, setData] = useState(profile || {
    photo: "",
    name: "",
    matricula: "",
    phone: "",
    course: "",
    semester: "",
    bio: "",
    interests: [],
    skills: [],
    languages: []
  });

  const interestsList = [
    "Inteligência Artificial", "Engenharia de Software", "Redes & Sistemas",
    "Segurança da Informação", "Banco de Dados", "Computação Gráfica",
    "Sistemas Embarcados", "Bioinformática", "HCI & Design",
  ];

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p
            className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.5 }}
          >
            <span className="inline-block w-4 rounded-full" style={{ height: "2px", background: RED }} />
            Configurações
          </p>
          <h1
            className="text-4xl"
            style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
          >
            Meu Perfil
          </h1>
        </div>
        <button
          onClick={() => onSave(data)}
          className="px-8 py-3 text-[10px] tracking-[0.16em] uppercase font-semibold transition-all hover:opacity-90"
          style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif", borderRadius: "10px" }}
        >
          Salvar Alterações
        </button>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        {/* Left Col */}
        <div className="md:col-span-8 flex flex-col gap-10">
          
          <div className="flex flex-col gap-5 p-8" style={{ background: OFFWHITE, border: `1px solid ${NAVY}20`, borderRadius: "16px" }}>
            <h3 className="text-xl mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>Informações Básicas</h3>
            <div className="grid md:grid-cols-2 gap-5">
              <Input label="Nome completo" value={data.name || ""} onChange={(v) => setData({ ...data, name: v })} />
              <Input label="Telefone para Contato" placeholder="(00) 00000-0000" value={data.phone || ""} onChange={(v) => setData({ ...data, phone: v })} mono />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <Input label="Matrícula" value={data.matricula || ""} onChange={(v) => setData({ ...data, matricula: v })} mono />
              <Select label="Curso" options={COURSES} value={data.course || ""} onChange={(v) => setData({ ...data, course: v })} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <Select
                label="Semestre atual"
                options={Array.from({ length: 14 }, (_, i) => `${i + 1}º semestre`)}
                value={data.semester || ""}
                onChange={(v) => setData({ ...data, semester: v })}
              />
            </div>
            <Input label="Bio" textarea rows={4} value={data.bio || ""} onChange={(v) => setData({ ...data, bio: v })} />
          </div>

          <div className="flex flex-col gap-5 p-8" style={{ background: OFFWHITE, border: `1px solid ${NAVY}20`, borderRadius: "16px" }}>
            <h3 className="text-xl mb-2" style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}>Áreas e Competências</h3>
            <div className="mb-4">
              <MultiSelect
                label="Áreas de interesse"
                options={interestsList}
                value={data.interests || []}
                onChange={(v) => setData({ ...data, interests: v })}
              />
            </div>
            
            <div className="mb-6">
              <SkillPicker
                value={data.skills || []}
                course={data.course}
                onChange={(s: StudentSkill[]) => setData({ ...data, skills: s })}
              />
            </div>

            <div>
              <Label>Competências de Idiomas</Label>
              <LanguagePicker
                value={data.languages || []}
                onChange={(l: StudentLanguage[]) => setData({ ...data, languages: l })}
              />
            </div>
          </div>

        </div>

        {/* Right Col */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center p-8" style={{ background: OFFWHITE, border: `1px solid ${NAVY}20`, borderRadius: "16px" }}>
            <div
              className="w-32 h-32 rounded-full mb-4 flex items-center justify-center bg-gray-200 overflow-hidden"
              style={{ border: `1px solid ${NAVY}30` }}
            >
              {data.photo ? (
                <img src={data.photo} alt="Foto de Perfil" className="w-full h-full object-cover" />
              ) : (
                <svg width="40" height="40" viewBox="0 0 28 28" fill="none" style={{ color: NAVY, opacity: 0.5 }}>
                  <circle cx="14" cy="11" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M4 22c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <button
              className="px-4 py-2 text-[10px] tracking-[0.1em] uppercase font-medium cursor-pointer"
              style={{ border: `1px solid ${NAVY}40`, color: NAVY, borderRadius: "8px" }}
            >
              Alterar Foto
            </button>
            <div className="w-full mt-6">
              <Input
                label="Links Adicionais (GitHub, LinkedIn, Site)"
                placeholder="https://..."
                value={(data as any).links || ""}
                onChange={(v) => setData({ ...data, links: v } as any)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
