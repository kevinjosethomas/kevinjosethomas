import Banner from "@/ui/components/Banner";
import { FetchOpensource } from "@/api/work";
import Container from "./components/Container";
import { AWARDS, PROJECTS, HACKATHONS } from "@/data";

export default async function Work() {
  const OPENSOURCE = await FetchOpensource();

  return (
    <div className="flex w-full flex-row items-start justify-between">
      <Container
        AWARDS={AWARDS}
        PROJECTS={PROJECTS}
        HACKATHONS={HACKATHONS}
        OPENSOURCE={OPENSOURCE}
      />
      <Banner src="2" alt="Work" />
    </div>
  );
}
