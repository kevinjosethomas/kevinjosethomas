import { cache } from "react";

import Notion from "./notion";
import { Paper } from "@/types";

export const FetchPapers = cache(async () => {
  const papers: Paper[] = [];
  const papers_raw: any = await Notion.databases.query({
    database_id: "8df9fbccdc4f49a6986db036aaae466d",
    sorts: [{ property: "order", direction: "descending" }],
  });

  for (const paper of papers_raw.results) {
    papers.push({
      order: paper.properties.order.number,
      name: paper.properties.name.title[0]?.plain_text,
      date: paper.properties.date.rich_text[0]?.plain_text,
      tags: paper.properties.tags.multi_select.map((x: any) => ({
        label: x.name,
        color: x.color,
      })),
    });
  }

  return papers;
});
