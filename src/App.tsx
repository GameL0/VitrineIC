import { useState } from "react";
import { AuthModal } from "@/components/landing/AuthModal";
import LandingPage from "@/components/landing/LandingPage";
import PublicArea from "@/components/public/PublicArea";
import type { PublicRoute } from "@/components/public/routes";
import CuratorArea from "@/components/curator/CuratorArea";
import RequesterArea from "@/components/requester/RequesterArea";
import StudentArea from "@/components/student/StudentArea";

/**
 * Raiz da aplicação: landing, páginas públicas e as três áreas logadas.
 *
 * Não há roteador — o destino é estado local e não existe URL por tela.
 * Ver docs/analise-frontend.md, seção 2.
 */
type Route =
  | { area: "landing" }
  | { area: "public"; route: PublicRoute }
  | { area: "student" }
  | { area: "requester" }
  | { area: "curator" };

export default function App() {
  const [route, setRoute] = useState<Route>({ area: "landing" });
  const [modalOpen, setModalOpen] = useState(false);

  const toLanding = () => setRoute({ area: "landing" });
  const openSignIn = () => setModalOpen(true);

  const enter = (area: "student" | "requester") => {
    setModalOpen(false);
    setRoute({ area } as Route);
  };

  if (route.area === "student") return <StudentArea onBack={toLanding} />;
  if (route.area === "requester") return <RequesterArea onBack={toLanding} />;
  if (route.area === "curator") return <CuratorArea onBack={toLanding} />;

  return (
    <>
      {route.area === "landing" ? (
        <LandingPage
          onSignIn={openSignIn}
          onAdmin={() => setRoute({ area: "curator" })}
          onNavigate={(publicRoute) => setRoute({ area: "public", route: publicRoute })}
        />
      ) : (
        <PublicArea
          route={route.route}
          onNavigate={(publicRoute) => setRoute({ area: "public", route: publicRoute })}
          onHome={toLanding}
          onSignIn={openSignIn}
        />
      )}

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
