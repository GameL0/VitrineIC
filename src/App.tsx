import { useState } from "react";
import { AuthModal } from "@/components/landing/AuthModal";
import LandingPage from "@/components/landing/LandingPage";
import CuratorArea from "@/components/curator/CuratorArea";
import RequesterArea from "@/components/requester/RequesterArea";
import StudentArea from "@/components/student/StudentArea";

/**
 * Raiz da aplicação: landing page pública e roteamento entre as três áreas.
 *
 * Não há roteador — a área ativa é estado local e não existe URL por tela.
 * Ver docs/analise-frontend.md, seção 2.
 */
type Area = "landing" | "student" | "requester" | "curator";

export default function App() {
  const [area, setArea] = useState<Area>("landing");
  const [modalOpen, setModalOpen] = useState(false);

  const backToLanding = () => setArea("landing");

  if (area === "student") return <StudentArea onBack={backToLanding} />;
  if (area === "requester") return <RequesterArea onBack={backToLanding} />;
  if (area === "curator") return <CuratorArea onBack={backToLanding} />;

  const enter = (next: Area) => {
    setModalOpen(false);
    setArea(next);
  };

  return (
    <>
      <LandingPage
        onSignIn={() => setModalOpen(true)}
        onAdmin={() => setArea("curator")}
      />
      {modalOpen && (
        <AuthModal
          onClose={() => setModalOpen(false)}
          onEnterStudent={() => enter("student")}
          onEnterCompany={() => enter("requester")}
        />
      )}
    </>
  );
}
