import { useState } from "react";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import { Input, SelectField, Label } from "./ui";

const TYPES = [
  "Professor Pesquisador",
  "Empresa de Tecnologia",
  "Empresa Tradicional",
  "Órgão Público",
  "Autônomo/Pessoa Física",
  "Outro",
];

export function Profile() {
  const [data, setData] = useState({
    name: "Ana Silva",
    email: "ana.silva@empresa.com",
    phone: "(11) 99999-9999",
    type: "Empresa de Tecnologia",
    description: "Empresa focada no desenvolvimento de soluções escaláveis em nuvem para o setor da saúde.",
    photo: ""
  });

  return (
    <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p
            className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: NAVY, opacity: 0.5 }}
          >
            <span className="inline-block w-4 rounded-full" style={{ height: "2px", background: RED }} />
            Configurações
          </p>
          <h1
            className="text-4xl"
            style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}
          >
            Perfil do Solicitante
          </h1>
        </div>
        <button
          className="px-8 py-3 text-[10px] tracking-[0.16em] uppercase font-semibold transition-all hover:opacity-90"
          style={{ background: NAVY, color: OFFWHITE, fontFamily: "Geist, Inter, system-ui, sans-serif", borderRadius: "10px" }}
        >
          Salvar Alterações
        </button>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-8 flex flex-col gap-10">
          <div className="flex flex-col gap-5 p-8" style={{ background: OFFWHITE, border: `1px solid ${NAVY}20`, borderRadius: "16px" }}>
            <h3 className="text-xl mb-2" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>Informações da Conta</h3>
            <div className="grid md:grid-cols-2 gap-5">
              <Input label="Nome / Razão Social" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
              <Input label="E-mail de Contato" value={data.email} onChange={(v) => setData({ ...data, email: v })} mono />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <Input label="Telefone para Contato" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} mono />
              <SelectField label="Tipo de Entidade" options={TYPES} value={data.type} onChange={(v) => setData({ ...data, type: v })} />
            </div>
            <Input label="Descrição do Solicitante" textarea rows={4} value={data.description} onChange={(v) => setData({ ...data, description: v })} />
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center p-8" style={{ background: OFFWHITE, border: `1px solid ${NAVY}20`, borderRadius: "16px" }}>
            <div
              className="w-32 h-32 rounded-full mb-4 flex items-center justify-center bg-gray-200 overflow-hidden"
              style={{ border: `1px solid ${NAVY}30` }}
            >
              {data.photo ? (
                <img src={data.photo} alt="Foto de Perfil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl" style={{ fontFamily: "Inter Tight, Geist, system-ui, sans-serif", color: NAVY }}>AS</span>
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
                label="Site ou Links Adicionais"
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
