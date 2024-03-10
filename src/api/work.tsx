import Notion from "./notion";
import GitHub from "./github";

import { Project, Hackathon, Award, Repository } from "@/types";

async function FetchProjects() {
  const projects: Project[] = [];
  const projects_raw: any = await Notion.databases.query({
    database_id: "0cb59344e6b3442b8a375c949622aa90",
    sorts: [{ property: "order", direction: "descending" }],
  });

  for (const project of projects_raw.results) {
    projects.push({
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
    sorts: [{ property: "order", direction: "descending" }],
  });

  for (const hackathon of hackathons_raw.results) {
    hackathons.push({
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

async function FetchAwards() {
  const awards: Award[] = [];
  const awards_raw: any = await Notion.databases.query({
    database_id: "ebad95f0019c4e29beb075a8b5a8c407",
    sorts: [{ property: "order", direction: "descending" }],
  });

  for (const award of awards_raw.results) {
    awards.push({
      name: award.properties.name.title[0]?.plain_text,
      organizer: award.properties.organizer.rich_text[0]?.plain_text,
      time: award.properties.time.rich_text[0]?.plain_text,
      description: award.properties.description.rich_text[0]?.plain_text,
    });
  }

  return awards;
}

async function FetchOpensource() {
  const repos: Repository[] = [];
  const repos_raw = (
    await GitHub.request("GET /users/{username}/repos", {
      username: "kevinjosethomas",
      per_page: 100,
    })
  ).data.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);

  for (const repo of repos_raw) {
    repos.push({
      name: repo.name,
      description: repo.description as string,
      stars: repo.stargazers_count as number,
      forks: repo.forks as number,
      language: repo.language as string,
      url: repo.html_url,
    });
  }

  return repos;
}

export { FetchProjects, FetchHackathons, FetchAwards, FetchOpensource };
