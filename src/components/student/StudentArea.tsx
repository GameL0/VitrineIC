import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { Lab } from "./Lab";
import { NavBar } from "./NavBar";
import { Onboarding } from "./Onboarding";
import { Input } from "./ui";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";

export default function StudentArea({ onBack }: { onBack: () => void }) {
  const [onboarded, setOnboarded] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [view, setView] = useState("dashboard");

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
      <NavBar view={view} setView={setView} onBack={onBack} />
      {view === "dashboard" && <Dashboard profile={profile} />}
      {view === "lab" && <Lab />}
      {view === "profile" && (
        <div className="px-8 md:px-12 py-10 max-w-screen-xl mx-auto">
          <div className="mb-10">
            <p
              className="text-[9px] tracking-[0.22em] uppercase mb-2 flex items-center gap-2"
              style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.4 }}
            >
              <span className="inline-block w-4" style={{ height: "1px", background: RED }} />
              Perfil
            </p>
            <h1
              className="text-4xl"
              style={{ fontFamily: "DM Serif Display, Georgia, serif", color: NAVY }}
            >
              Meu Perfil
            </h1>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-5">
              <Input label="Nome completo" value={profile?.name || ""} onChange={() => {}} />
              <Input label="Curso" value={profile?.course || ""} onChange={() => {}} />
              <Input label="Semestre" value={profile?.semester || ""} mono onChange={() => {}} />
              <Input label="Bio" value={profile?.bio || ""} textarea onChange={() => {}} />
            </div>
            <div className="flex flex-col gap-5">
              <Input label="GitHub" value={profile?.github || ""} mono onChange={() => {}} />
              <Input label="LinkedIn" value={profile?.linkedin || ""} mono onChange={() => {}} />
              <Input label="Lattes" value={profile?.lattes || ""} mono onChange={() => {}} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
