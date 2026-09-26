import { useState } from "react";
import { ConnectionEstablished } from "./ConnectionEstablished";
import { Dashboard } from "./Dashboard";
import { Invitations } from "./Invitations";
import { Lab } from "./Lab";
import { NavBar } from "./NavBar";
import { Onboarding } from "./Onboarding";
import { Input } from "./ui";
import { CURRENT_STUDENT_ID, INVITATIONS } from "@/data/invitations";
import { NAVY, OFFWHITE, RED } from "@/styles/tokens";
import type { Invitation } from "@/types";

export default function StudentArea({ onBack }: { onBack: () => void }) {
  const [onboarded, setOnboarded] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [view, setView] = useState("dashboard");
  const [invitations, setInvitations] = useState<Invitation[]>(
    INVITATIONS.filter((i) => i.studentId === CURRENT_STUDENT_ID),
  );
  const [accepted, setAccepted] = useState<Invitation | null>(null);

  const pendingCount = invitations.filter((i) => i.status === "pendente").length;

  const setStatus = (id: string, status: Invitation["status"]) => {
    const next = invitations.map((i) => (i.id === id ? { ...i, status } : i));
    setInvitations(next);
    return next.find((i) => i.id === id) ?? null;
  };

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
        setView={(v) => {
          setAccepted(null);
          setView(v);
        }}
        onBack={onBack}
        pendingInvites={pendingCount}
      />

      {view === "dashboard" && (
        <Dashboard profile={profile} onOpenInvitations={() => setView("invitations")} />
      )}

      {view === "invitations" &&
        (accepted ? (
          <ConnectionEstablished
            invitation={accepted}
            onInvitations={() => setAccepted(null)}
          />
        ) : (
          <Invitations
            invitations={invitations}
            onAccept={(id) => setAccepted(setStatus(id, "aceito"))}
            onDecline={(id) => setStatus(id, "recusado")}
          />
        ))}

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
