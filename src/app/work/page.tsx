import Container from "./components/Container";
import { FetchHackathons, FetchProjects, FetchAwards } from "@/api/work";

export default async function Work() {
  const projects = await FetchProjects();
  const hackathons = await FetchHackathons();

  const awards = await FetchAwards();

  return (
    <Container projects={projects} hackathons={hackathons} awards={awards} />
  );
}
