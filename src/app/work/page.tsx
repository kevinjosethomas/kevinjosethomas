import Container from "./components/Container";
import {
  FetchHackathons,
  FetchProjects,
  FetchAwards,
  FetchOpensource,
} from "@/api/work";

export default async function Work() {
  const projects = await FetchProjects();
  const hackathons = await FetchHackathons();
  const awards = await FetchAwards();
  const opensource = await FetchOpensource();

  return (
    <Container
      projects={projects}
      hackathons={hackathons}
      awards={awards}
      opensource={opensource}
    />
  );
}
