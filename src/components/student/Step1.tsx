import { useRef } from "react";
import { Input, Label, Rule, Tag, Select } from "./ui";
import { COURSES, INSTITUTION } from "@/data/institution";
import { NAVY, NAVY_MUTED } from "@/styles/tokens";

export function Step1({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const interests = [
    "Inteligência Artificial", "Engenharia de Software", "Redes & Sistemas",
    "Segurança da Informação", "Banco de Dados", "Computação Gráfica",
    "Sistemas Embarcados", "Bioinformática", "HCI & Design",
  ];
  const toggleInterest = (item: string) => {
    const curr: string[] = data.interests || [];
    setData({
      ...data,
      interests: curr.includes(item) ? curr.filter((x: string) => x !== item) : [...curr, item],
    });
  };

  return (
    <div>
      <h1
        className="text-3xl mb-2"
        style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
      >
        Perfil & Interesses
      </h1>
      <p className="text-sm mb-10" style={{ fontFamily: "Inter, sans-serif", color: NAVY_MUTED, fontWeight: 300 }}>
        Configure sua identidade na plataforma.
      </p>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Photo upload */}
        <div className="md:col-span-3">
          <Label>Foto de Perfil</Label>
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full aspect-square flex flex-col items-center justify-center gap-3 transition-all"
            style={{ border: `1px dashed ${NAVY}35` }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = NAVY)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${NAVY}35`)}
          >
            {data.photo ? (
              <img
                src={data.photo}
                alt="Foto"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <svg aria-hidden="true" width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ color: NAVY_MUTED }}>
                  <circle cx="14" cy="11" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M4 22c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span
                  className="text-[9px] tracking-[0.14em] uppercase text-center"
                  style={{ fontFamily: "Space Mono, monospace", color: NAVY_MUTED }}
                >
                  Carregar foto
                </span>
              </>
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" />
        </div>

        <div className="md:col-span-9 flex flex-col gap-5">
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Nome completo"
              placeholder="Ana Carolina Ferreira"
              value={data.name || ""}
              onChange={(v) => setData({ ...data, name: v })}
            />
            <Input
              label="Semestre atual"
              placeholder="4º semestre"
              mono
              value={data.semester || ""}
              onChange={(v) => setData({ ...data, semester: v })}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Select
              label="Curso"
              options={COURSES}
              value={data.course || ""}
              onChange={(v) => setData({ ...data, course: v })}
            />
            <Input
              label="E-mail institucional"
              type="email"
              placeholder={INSTITUTION.emailExample}
              mono
              value={data.email || ""}
              onChange={(v) => setData({ ...data, email: v })}
            />
          </div>
          <Input
            label="Bio curta"
            placeholder="Descreva brevemente seu percurso e objetivos..."
            textarea
            rows={3}
            value={data.bio || ""}
            onChange={(v) => setData({ ...data, bio: v })}
          />
        </div>
      </div>

      <Rule />

      <div>
        <Label>Áreas de interesse</Label>
        <p className="text-[11px] mb-4" style={{ fontFamily: "Inter, sans-serif", color: NAVY_MUTED }}>
          Selecione todas que se aplicam
        </p>
        <div className="flex flex-wrap gap-2">
          {interests.map((item) => (
            <Tag
              key={item}
              active={(data.interests || []).includes(item)}
              onClick={() => toggleInterest(item)}
            >
              {item}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
