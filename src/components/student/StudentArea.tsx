import { useState } from "react";
import { Opportunities } from "./Opportunities";
import { Projects } from "./Projects";
import { Profile } from "./Profile";
import { NavBar } from "./NavBar";
import { Notifications } from "./Notifications";
import { Onboarding } from "./Onboarding";
import { Input } from "./ui";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import { notifications as initialNotifications } from "@/data/notifications";

export default function StudentArea({ onBack }: { onBack: () => void }) {
  const [onboarded, setOnboarded] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [view, setView] = useState("opportunities");

  const unreadCount = initialNotifications.filter((n) => n.unread).length;

  if (!onboarded) {
    return (
      <Onboarding
        onComplete={(data) => {
          setProfile(data);
          setOnboarded(true);
        }}
      />
    );
  }

  return (
    <div style={{ background: OFFWHITE, minHeight: "100vh" }}>
      <NavBar
        view={view}
        setView={setView}
        onBack={onBack}
        unreadCount={unreadCount}
      />

      {view === "opportunities" && (
        <Opportunities profile={profile} onOpenNotifications={() => setView("notifications")} />
      )}

      {view === "projects" && <Projects />}

      {view === "notifications" && <Notifications />}

      {view === "profile" && (
        <Profile profile={profile} onSave={(d) => setProfile(d)} />
      )}
    </div>
  );
}
