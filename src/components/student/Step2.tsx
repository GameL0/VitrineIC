import { ProficiencyBars } from "./ProficiencyBars";
import { Label, Tag } from "./ui";
import { ALL_SKILLS, LEVELS } from "@/data/skills";
import { NAVY, RED } from "@/styles/tokens";

export function Step2({
  data,
  setData,
}: {
  data: any;
  setData: (d: any) => void;
}) {
  const skills: { name: string; level: number }[] = data.skills || [];

  const hasSkill = (name: string) => skills.find((s) => s.name === name);

  const toggleSkill = (name: string) => {
    if (hasSkill(name)) {
      setData({ ...data, skills: skills.filter((s) => s.name !== name) });
    } else {
      setData({ ...data, skills: [...skills, { name, level: 2 }] });
    }
  };

  const setLevel = (name: string, level: number) => {
    setData({
      ...data,
      skills: skills.map((s) => (s.name === name ? { ...s, level } : s)),
    });
  };

  const categories = [...new Set(ALL_SKILLS.map((s) => s.cat))];

  return (
    <div>
      <h2
        className="text-3xl mb-2"
        style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
      >
        Hard Skills
      </h2>
      <p className="text-sm mb-10" style={{ fontFamily: "Inter, sans-serif", color: NAVY, opacity: 0.5, fontWeight: 300 }}>
        Selecione suas competências técnicas e indique o nível de proficiência.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Selector */}
        <div>
          <Label>Selecionar competências</Label>
          <div className="flex flex-col gap-4 mt-3">
            {categories.map((cat) => (
              <div key={cat}>
                <span
                  className="text-[9px] tracking-[0.18em] uppercase block mb-2"
                  style={{ fontFamily: "Space Mono, monospace", color: RED, opacity: 0.7 }}
                >
                  {cat}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_SKILLS.filter((s) => s.cat === cat).map((s) => (
                    <Tag
                      key={s.name}
                      active={!!hasSkill(s.name)}
                      onClick={() => toggleSkill(s.name)}
                    >
                      {s.name}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Level configuration */}
        <div>
          <Label>Nível de proficiência</Label>
          {skills.length === 0 ? (
            <div
              className="flex items-center justify-center h-32 mt-3"
              style={{ border: `1px dashed ${NAVY}25` }}
            >
              <span
                className="text-[10px] tracking-[0.14em] uppercase"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}
              >
                Selecione skills ao lado
              </span>
            </div>
          ) : (
            <div className="flex flex-col mt-3" style={{ border: `1px solid ${NAVY}15` }}>
              {skills.map((s, i) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: i < skills.length - 1 ? `1px solid ${NAVY}10` : "none" }}
                >
                  <div>
                    <span
                      className="text-[12px] font-medium block"
                      style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
                    >
                      {s.name}
                    </span>
                    <span
                      className="text-[9px]"
                      style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.35 }}
                    >
                      {LEVELS[s.level - 1]}
                    </span>
                  </div>
                  <ProficiencyBars level={s.level} onChange={(l) => setLevel(s.name, l)} />
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center gap-6">
            {LEVELS.map((l, i) => (
              <div key={l} className="flex items-center gap-1.5">
                <div className="flex gap-[2px] items-end h-3">
                  {[1, 2, 3, 4].map((b) => (
                    <div
                      key={b}
                      style={{
                        width: "5px",
                        height: `${b * 3 + 1}px`,
                        background: b <= i + 1 ? NAVY : `${NAVY}22`,
                      }}
                    />
                  ))}
                </div>
                <span
                  className="text-[9px]"
                  style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
                >
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
