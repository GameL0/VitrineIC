import { NAVY } from "@/styles/tokens";

export function ProficiencyBars({ level, onChange }: { level: number; onChange: (l: number) => void }) {
  return (
    <div className="flex gap-[3px] items-end h-4">
      {[1, 2, 3, 4].map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className="transition-all"
          style={{
            width: "8px",
            height: `${l * 4 + 4}px`,
            background: l <= level ? NAVY : `${NAVY}22`,
          }}
        />
      ))}
    </div>
  );
}
