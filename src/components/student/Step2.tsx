import { LanguagePicker } from "./LanguagePicker";
import { SkillPicker } from "./SkillPicker";
import { NAVY, NAVY_MUTED, RED } from "@/styles/tokens";
import type { StudentLanguage, StudentSkill } from "@/types";

const MONO = "Space Mono, monospace";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[9px] tracking-[0.22em] uppercase mb-4 flex items-center gap-2"
      style={{ fontFamily: MONO, color: NAVY_MUTED }}
    >
      <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
      {children}
    </p>
  );
}

export function Step2({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  const skills: StudentSkill[] = data.skills || [];
  const languages: StudentLanguage[] = data.languages || [];

  return (
    <div>
      <h1
        className="text-3xl mb-2"
        style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
      >
        Competências
      </h1>
      <p
        className="text-sm mb-10"
        style={{ fontFamily: "Inter, sans-serif", color: NAVY_MUTED, fontWeight: 300 }}
      >
        Digite para buscar ou use os atalhos. As competências técnicas são o
        principal critério do match com as demandas.
      </p>

      <SectionTitle>Técnicas</SectionTitle>
      <SkillPicker
        value={skills}
        course={data.course}
        onChange={(s) => setData({ ...data, skills: s })}
      />

      <div className="max-w-3xl my-10" style={{ height: "1px", background: `${NAVY}15` }} />

      <SectionTitle>Idiomas</SectionTitle>
      <LanguagePicker
        value={languages}
        onChange={(l) => setData({ ...data, languages: l })}
      />
    </div>
  );
}
