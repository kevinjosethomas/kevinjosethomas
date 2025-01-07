import { cache } from "react";

import GitHub from "./github";
import { RepositoryInterface } from "@/types";

export const FetchOpensource = cache(async () => {
  const repos: RepositoryInterface[] = [];
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
});
