import Notion from "./notion";

import { Project, Hackathon } from "@/types";

async function FetchProjects() {
  const projects: Project[] = [];
  const projects_raw: any = await Notion.databases.query({
    database_id: "0cb59344e6b3442b8a375c949622aa90",
    sorts: [{ property: "order", direction: "ascending" }],
  });

  for (const project of projects_raw.results) {
    projects.push({
      order: project.properties.order.number,
      status: project.properties.status.status.name,
      slug: project.properties.slug.rich_text[0]?.plain_text,
      name: project.properties.name.title[0]?.plain_text,
      stat: project.properties.stat.multi_select.map((x: any) => ({
        label: x.name,
        color: x.color,
      })),
      tags: project.properties.tags.multi_select.map((x: any) => ({
        label: x.name,
        color: x.color,
      })),
      description: project.properties.description.rich_text[0]?.plain_text,
    });
  }

  return projects;
}

async function FetchHackathons() {
  const hackathons: Hackathon[] = [];
  const hackathons_raw: any = await Notion.databases.query({
    database_id: "7bdc9362f0534cad976a7eb25af8c32c",
    sorts: [{ property: "order", direction: "ascending" }],
  });

  for (const hackathon of hackathons_raw.results) {
    hackathons.push({
      order: hackathon.properties.order.number,
      winner: hackathon.properties.winner.checkbox,
      digital: hackathon.properties.digital.checkbox,
      prize: hackathon.properties.prize.rich_text[0]?.plain_text,
      name: hackathon.properties.name.title[0]?.plain_text,
      organizer: hackathon.properties.organizer.rich_text[0]?.plain_text,
      time: hackathon.properties.time.rich_text[0]?.plain_text,
      description: hackathon.properties.description.rich_text[0]?.plain_text,
    });
  }

  return hackathons;
}

export { FetchProjects, FetchHackathons };
