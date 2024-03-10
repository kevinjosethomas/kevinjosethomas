import Banner from "@/ui/components/Banner";
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
    <div className="flex w-full flex-row items-start justify-between">
      <Container
        projects={projects}
        hackathons={hackathons}
        awards={awards}
        opensource={opensource}
      />
      <Banner src="/images/banners/2L.png" alt="Work" />
    </div>
  );
}
