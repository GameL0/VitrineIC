import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { MatchScreen } from "./MatchScreen";
import { NavBar } from "./NavBar";
import { NewDemandWizard } from "./NewDemandWizard";
import { SuccessScreen } from "./SuccessScreen";
import { SkipLink } from "@/components/SkipLink";
import { OFFWHITE } from "@/styles/tokens";

export default function RequesterArea({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<"dashboard" | "new" | "success" | "matches">("dashboard");
  const [protocol, setProtocol] = useState("");

  const handleSetView = (v: string) => setView(v as typeof view);

  return (
    <div style={{ background: OFFWHITE, minHeight: "100vh" }}>
      <SkipLink />
      <NavBar view={view} setView={handleSetView} onBack={onBack} />
      <main id="conteudo" tabIndex={-1}>
        {view === "dashboard" && (
          <Dashboard
            onNew={() => setView("new")}
            onViewMatch={() => setView("matches")}
          />
        )}
        {view === "new" && (
          <NewDemandWizard
            onSuccess={(p) => {
              setProtocol(p);
              setView("success");
            }}
          />
        )}
        {view === "success" && (
          <SuccessScreen
            protocol={protocol}
            onDashboard={() => setView("dashboard")}
          />
        )}
        {view === "matches" && <MatchScreen />}
      </main>
    </div>
  );
}
