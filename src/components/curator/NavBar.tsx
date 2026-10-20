import { AreaNav } from "@/components/app/AreaNav";
import { useSession } from "@/lib/auth";
import type { Demand } from "@/types";

export type CuratorTab = "triage" | "matchmaking_hub" | "interests";

/**
 * Barra da curadoria, no modelo do Figma. O matchmaking fica sob "Análise de
 * matches"; "Acompanhamento" mostra todos os interesses, só para leitura.
 */
export function NavBar({
  view,
  setView,
  onBack,
  demands,
}: {
  view: string;
  setView: (v: CuratorTab) => void;
  onBack: () => void;
  demands: Demand[];
}) {
  const session = useSession();
  const newCount = demands.filter((d) => d.status === "nova").length;
  const active = view === "triage" || view === "interests" ? view : "matchmaking_hub";

  return (
    <AreaNav
      items={[
        { id: "triage", label: "Análise de projetos", badge: newCount },
        { id: "matchmaking_hub", label: "Análise de matches" },
        { id: "interests", label: "Acompanhamento" },
      ]}
      active={active}
      onSelect={(id) => setView(id as CuratorTab)}
      avatar={session?.account.name ?? "Curadoria"}
      onExit={onBack}
      extra={
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.08em] text-red/80 sm:inline">Admin</span>
      }
    />
  );
}
