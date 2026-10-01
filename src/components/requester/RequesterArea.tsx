import { useState } from "react";
import { MyDemands } from "./MyDemands";
import { MatchScreen } from "./MatchScreen";
import { NavBar } from "./NavBar";
import { NewDemandWizard } from "./NewDemandWizard";
import { SuccessScreen } from "./SuccessScreen";
import { Profile } from "./Profile";
import { AvailableStudents } from "./AvailableStudents";
import { Team } from "./Team";
import { Notifications } from "./Notifications";
import { OFFWHITE } from "@/styles/tokens";

export default function RequesterArea({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<"dashboard" | "new" | "success" | "matches" | "profile" | "available_students" | "team" | "notifications">("available_students");
  const [protocol, setProtocol] = useState("");

  const handleSetView = (v: string) => setView(v as typeof view);

  return (
    <div style={{ background: OFFWHITE, minHeight: "100vh" }}>
      <NavBar view={view} setView={handleSetView} onBack={onBack} />
      
      {view === "available_students" && (
        <AvailableStudents />
      )}

      {view === "dashboard" && (
        <MyDemands
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

      {view === "matches" && <MatchScreen onBack={() => setView("dashboard")} />}

      {view === "team" && <Team />}
      
      {view === "notifications" && <Notifications />}

      {view === "profile" && <Profile />}
    </div>
  );
}
