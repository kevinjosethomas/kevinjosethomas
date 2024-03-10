import Notion from "@/api/notion";

import { Project as ProjectType } from "./types";
import Project from "./components/Project";

export default async function Work() {
  const projects: ProjectType[] = [];
  const projects_raw: any = await Notion.databases.query({
    database_id: "0cb59344e6b3442b8a375c949622aa90",
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  for (const project of projects_raw.results) {
    projects.push({
      order: project.properties.Order.number,
      status: project.properties.Status.status.name,
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

  return (
    <div className="flex flex-col w-7/12 items-start gap-4">
      {projects.map((project, i) => (
        <Project key={i} {...project} />
      ))}
    </div>
  );
}
