import Notion from "@/api/notion";

import { Project as ProjectType } from "./types";
import Project from "./components/Project";

export default async function Work() {
  const projects: ProjectType[] = [];
  const projects_raw: any = await Notion.databases.query({
    database_id: "0cb59344e6b3442b8a375c949622aa90",
    sorts: [{ property: "order", direction: "ascending" }],
  });

  for (const project of projects_raw.results) {
    projects.push({
      order: project.properties.order.number,
      status: project.properties.status.status.name,
      slug: project.properties.slug.rich_text[0].plain_text,
      name: project.properties.name.title[0].plain_text,
      stat: project.properties.stat.multi_select.map((x: any) => ({
        label: x.name,
        color: x.color,
      })),
      tags: project.properties.tags.multi_select.map((x: any) => ({
        label: x.name,
        color: x.color,
      })),
      description: project.properties.description.rich_text[0].plain_text,
    });
  }

  const hackathons = [];
  const hackathons_raw: any = await Notion.databases.query({
    database_id: "7bdc9362f0534cad976a7eb25af8c32c",
    sorts: [{ property: "order", direction: "ascending" }],
  });

  for (const hackathon of hackathons_raw.results) {
    hackathons.push({
      order: hackathon.properties.order.number,
      winner: hackathon.properties.winner.checkbox,
      digital: hackathon.properties.digital.checkbox,
      prize: hackathon.properties.prize.rich_text[0].plain_text,
      name: hackathon.properties.name.title[0].plain_text,
      organizer: hackathon.properties.organizer.rich_text[0].plain_text,
      time: hackathon.properties.time.rich_text[0].plain_text,
      description: hackathon.properties.description.rich_text[0].plain_text,
    });
  }

  return (
    <div className="flex flex-col w-7/12 items-start gap-4">
      {projects.map((project, i) => (
        <Project key={i} {...project} />
      ))}
    </div>
  );
}
