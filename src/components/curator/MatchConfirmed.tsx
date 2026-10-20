import { Label, Mono, SkillTag } from "./ui";
import { scoreStudent } from "@/lib/match";
import { Avatar } from "@/components/app/Avatar";
import { ArrowIcon, CheckIcon } from "@/components/app/Icons";
import { Eyebrow } from "@/components/public/Eyebrow";
import { PAGE } from "@/components/public/layout";
import { useVitrine } from "@/lib/store";
import type { Demand, Interest, Student } from "@/types";

export function MatchConfirmed({
  demand,
  student,
  suggestion,
  onBack,
}: {
  demand: Demand;
  student: Student;
  suggestion: Interest;
  onBack: () => void;
}) {
  const { interests } = useVitrine();
  const score = scoreStudent(student, demand);
  // Lê da base para refletir o andamento se alguém responder durante a sessão.
  const current = interests.find((i) => i.id === suggestion.id) ?? suggestion;
  const passed = (s: Interest["status"][]) => s.includes(current.status);

  return (
    <main className={`${PAGE} flex flex-col items-center py-14 md:py-20`}>
      <span className="grid size-14 place-items-center rounded-2xl bg-moss/10 text-moss">
        <CheckIcon />
      </span>
      <div className="mt-8">
        <Eyebrow>Sugestão · {current.id}</Eyebrow>
      </div>
      <h1 className="mt-5 text-center font-display text-[40px] font-medium leading-none tracking-[-0.035em] text-navy md:text-page">
        Sugestão <span className="text-red">enviada</span>.
      </h1>

      <section className="vt-card mt-10 grid w-full max-w-[880px] overflow-hidden md:grid-cols-2">
        <div className="border-b border-navy/8 p-6 md:border-r md:border-b-0 md:p-8">
          <Label>Demanda</Label>
          <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-navy">{demand.title}</h3>
          <Mono dim>
            {demand.id} · {demand.company}
          </Mono>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {demand.skills.map((s) => <SkillTag key={s}>{s}</SkillTag>)}
          </div>
        </div>
        <div className="p-6 md:p-8">
          <Label>Estudante sugerido</Label>
          <div className="flex items-center gap-3">
            <Avatar name={student.name} size="lg" />
            <div>
              <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-navy">{student.name}</h3>
              <Mono dim>
                {student.course} · {student.semester}
              </Mono>
            </div>
          </div>
          <p className="mt-5 flex items-baseline gap-2">
            <span className="font-display text-[28px] font-medium text-navy">{score}%</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-navy/55">compatibilidade técnica</span>
          </p>
        </div>
      </section>

      <section className="vt-card mt-6 w-full max-w-[880px] p-6 md:p-8">
        <Eyebrow>Próximos passos</Eyebrow>
        <ul className="mt-4 divide-y divide-navy/8">
          {[
            { done: true, text: "Sugestão enviada ao estudante com a sua justificativa" },
            {
              done: passed(["aguardando_solicitante", "contato_liberado", "recusado_solicitante"]),
              text: "Estudante aceita a sugestão",
            },
            { done: passed(["contato_liberado"]), text: "Solicitante aceita o estudante" },
            { done: passed(["contato_liberado"]), text: "Contato liberado para os dois; a curadoria só vê que foi liberado" },
          ].map((item) => (
            <li key={item.text} className="flex items-center gap-3 py-3">
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-full border ${
                  item.done ? "border-moss bg-moss text-white" : "border-navy/20"
                }`}
              >
                {item.done && <CheckIcon />}
              </span>
              <span className={`font-sans text-sm ${item.done ? "text-navy/75" : "text-navy/45"}`}>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={onBack} className="vt-btn vt-btn-primary">
          Voltar à fila <ArrowIcon />
        </button>
      </div>
    </main>
  );
}
