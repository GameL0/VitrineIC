import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import { MatchConfirmed } from "./MatchConfirmed";
import { Matchmaking } from "./Matchmaking";
import { MatchmakingHub } from "./MatchmakingHub";
import { NavBar } from "./NavBar";
import { Triage } from "./Triage";
import { Mono } from "./ui";
import { DEMANDS } from "@/data/demands";
import { STUDENTS } from "@/data/students";
import { NAVY, OFFWHITE } from "@/styles/tokens";
import type { Demand } from "@/types";

export default function CuratorArea({ onBack }: { onBack: () => void }) {
  const [demands, setDemands] = useState<Demand[]>(DEMANDS);
  const [view, setView] = useState<"triage" | "matchmaking_hub" | "matchmaking" | "confirm" | "confirmed">("triage");
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS[0] | null>(null);

  const goToMatch = (d: Demand) => {
    setSelectedDemand(d);
    setView("matchmaking");
  };

  const goToConfirm = (s: typeof STUDENTS[0]) => {
    setSelectedStudent(s);
    setView("confirm");
  };

  const doConfirm = () => {
    if (selectedDemand) {
      setDemands(demands.map((d) => d.id === selectedDemand.id ? { ...d, status: "matched" } : d));
    }
    setView("confirmed");
  };

  return (
    <div style={{ background: OFFWHITE, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar view={view} setView={setView} onBack={onBack} demands={demands} />

      {view === "triage" && (
        <Triage
          demands={demands}
          setDemands={setDemands}
        />
      )}

      {view === "matchmaking_hub" && (
        <MatchmakingHub
          demands={demands}
          onSelect={goToMatch}
        />
      )}

      {view === "matchmaking" && selectedDemand && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", height: "calc(100vh - 57px)" }}>
          {/* Sub-header */}
          <div
            className="flex items-center justify-between px-8 py-3 flex-shrink-0"
            style={{ borderBottom: `1px solid ${NAVY}12` }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView("matchmaking_hub")}
                className="flex items-center gap-2 text-[9px] tracking-[0.16em] uppercase transition-opacity hover:opacity-80 opacity-40"
                style={{ fontFamily: "Space Mono, monospace", color: NAVY }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M8 5H2M4.5 2.5L2 5l2.5 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
                Análise de Matches
              </button>
              <span style={{ color: NAVY, opacity: 0.2, fontSize: 12 }}>/</span>
              <span className="text-[9px] tracking-[0.16em] uppercase" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.6 }}>
                Matchmaking
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px]" style={{ fontFamily: "Space Mono, monospace", color: NAVY, opacity: 0.3 }}>
                {selectedDemand.id}
              </span>
              <span className="text-[9px] px-2 py-0.5" style={{ fontFamily: "Space Mono, monospace", color: NAVY, border: `1px solid ${NAVY}20`, opacity: 0.5 }}>
                {selectedDemand.skills.length} requisitos
              </span>
            </div>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <Matchmaking demand={selectedDemand} onConfirm={goToConfirm} />
          </div>
        </div>
      )}

      {view === "confirmed" && selectedDemand && selectedStudent && (
        <MatchConfirmed
          demand={selectedDemand}
          student={selectedStudent}
          onBack={() => setView("matchmaking_hub")}
        />
      )}

      {view === "confirm" && selectedDemand && selectedStudent && (
        <ConfirmModal
          demand={selectedDemand}
          student={selectedStudent}
          onClose={() => setView("matchmaking")}
          onConfirm={doConfirm}
        />
      )}
    </div>
  );
}
