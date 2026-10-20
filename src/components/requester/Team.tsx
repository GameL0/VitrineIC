import { Avatar } from "@/components/app/Avatar";
import { PlusIcon } from "@/components/app/Icons";
import { PageHead } from "@/components/public/PageHead";
import { PAGE } from "@/components/public/layout";

export function Team() {
  const teamMembers = [
    { name: "João Pereira", role: "Desenvolvedor Backend", project: "Sistema de Monitoramento IoT", email: "joao.pereira@ic.ufal.br" },
    { name: "Ana Beatriz", role: "UX Designer", project: "App Mobile para Saúde Mental", email: "ana.beatriz@ic.ufal.br" },
  ];

  return (
    <main className={`${PAGE} pb-20`}>
      <PageHead
        eyebrow="Organização"
        title="Equipe."
        lead="Estudantes alocados nos seus projetos."
        aside={
          <button className="vt-btn vt-btn-primary self-start md:self-auto">
            <PlusIcon /> Convidar membro
          </button>
        }
      />

      {teamMembers.length === 0 ? (
        <p className="vt-card px-6 py-14 text-center font-sans text-sm text-navy/55">Sua equipe está vazia.</p>
      ) : (
        <ul className="vt-card divide-y divide-navy/8 overflow-hidden">
          {teamMembers.map((member) => (
            <li key={member.email} className="flex flex-wrap items-center gap-4 px-5 py-4 md:px-6">
              <Avatar name={member.name} />
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[15px] text-navy">{member.name}</p>
                <p className="truncate font-sans text-[13px] text-navy/55">{member.email}</p>
              </div>
              <p className="hidden font-sans text-[13px] text-navy/60 md:block">{member.project}</p>
              <span className="vt-pill">{member.role}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
