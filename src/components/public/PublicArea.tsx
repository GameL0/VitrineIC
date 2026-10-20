import { Impact } from "./Impact";
import { ProjectDetail } from "./ProjectDetail";
import { ProjectsCatalog } from "./ProjectsCatalog";
import { PublicFooter } from "./PublicFooter";
import { PublicNav } from "./PublicNav";
import { PublicProfile } from "./PublicProfile";
import { StudentsDirectory } from "./StudentsDirectory";
import { navSection, type PublicRoute } from "./routes";

/** Casca das páginas públicas: nav fixa, a tela da rota atual e o rodapé. */
export default function PublicArea({
  route,
  onNavigate,
  onHome,
  onSignIn,
  onAdmin,
}: {
  route: PublicRoute;
  onNavigate: (r: PublicRoute) => void;
  onHome: () => void;
  onSignIn: () => void;
  onAdmin: () => void;
}) {
  return (
    <div className="min-h-screen bg-offwhite">
      <PublicNav
        view={navSection(route)}
        onNavigate={(view) => onNavigate({ view })}
        onHome={onHome}
        onSignIn={onSignIn}
        onAdmin={onAdmin}
      />

      {route.view === "projects" && (
        <ProjectsCatalog onOpenProject={(id) => onNavigate({ view: "project", id })} />
      )}

      {route.view === "project" && (
        <ProjectDetail
          id={route.id}
          onBack={() => onNavigate({ view: "projects" })}
          onOpenProfile={(id) => onNavigate({ view: "profile", id })}
          onSignIn={onSignIn}
        />
      )}

      {route.view === "students" && (
        <StudentsDirectory onOpenProfile={(id) => onNavigate({ view: "profile", id })} />
      )}

      {route.view === "profile" && (
        <PublicProfile
          id={route.id}
          onBack={() => onNavigate({ view: "students" })}
          onOpenProject={(id) => onNavigate({ view: "project", id })}
        />
      )}

      {route.view === "impact" && (
        <Impact />
      )}

      <PublicFooter onNavigate={(view) => onNavigate({ view })} onSignIn={onSignIn} onAdmin={onAdmin} />
    </div>
  );
}
