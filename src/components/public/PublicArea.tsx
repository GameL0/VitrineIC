import { Impact } from "./Impact";
import { ProjectDetail } from "./ProjectDetail";
import { ProjectsCatalog } from "./ProjectsCatalog";
import { PublicNav } from "./PublicNav";
import { PublicProfile } from "./PublicProfile";
import { StudentsDirectory } from "./StudentsDirectory";
import { navSection, type PublicRoute } from "./routes";
import { OFFWHITE } from "@/styles/tokens";

/** Casca das páginas públicas: nav fixa mais a tela da rota atual. */
export default function PublicArea({
  route,
  onNavigate,
  onHome,
  onSignIn,
}: {
  route: PublicRoute;
  onNavigate: (r: PublicRoute) => void;
  onHome: () => void;
  onSignIn: () => void;
}) {
  return (
    <div style={{ background: OFFWHITE, minHeight: "100vh" }}>
      <PublicNav
        view={navSection(route)}
        onNavigate={(view) => onNavigate({ view })}
        onHome={onHome}
        onSignIn={onSignIn}
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
        <Impact onOpenProjects={() => onNavigate({ view: "projects" })} />
      )}
    </div>
  );
}
