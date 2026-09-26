import { SkillPicker } from "./SkillPicker";
import { NAVY } from "@/styles/tokens";
import type { StudentSkill } from "@/types";

export function Step2({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  const skills: StudentSkill[] = data.skills || [];

  return (
    <div>
      <h2
        className="text-3xl mb-2"
        style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
      >
        Hard Skills
      </h2>
      <p
        className="text-sm mb-10"
        style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}
      >
        Busque ou escolha suas competências técnicas e ajuste o nível de
        proficiência. Elas são o principal critério do match com as demandas.
      </p>

      <SkillPicker value={skills} onChange={(s) => setData({ ...data, skills: s })} />
    </div>
  );
}
