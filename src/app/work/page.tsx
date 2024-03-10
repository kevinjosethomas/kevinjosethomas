import Container from "./components/Container";
import { FetchHackathons, FetchProjects } from "@/api/work";

export default async function Work() {
  const projects = await FetchProjects();
  const hackathons = await FetchHackathons();

  return <Container projects={projects} hackathons={hackathons} />;
}
