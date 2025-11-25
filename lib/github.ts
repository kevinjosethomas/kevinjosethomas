export type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type GitHubContributionsData = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "kevinjosethomas";

function parseDateString(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

async function fetchContributionsForYear(
  from: string,
  to: string,
): Promise<{ totalContributions: number; weeks: ContributionWeek[] } | null> {
  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME, from, to },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.errors) {
      return null;
    }

    const calendar =
      data.data.user.contributionsCollection.contributionCalendar;

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    };
  } catch {
    return null;
  }
}

async function getAccountCreationDate(): Promise<Date> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        createdAt
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username: GITHUB_USERNAME },
    }),
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0]?.message || "GraphQL error");
  }

  return new Date(data.data.user.createdAt);
}

export async function fetchGitHubContributions(): Promise<GitHubContributionsData> {
  if (!GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN not set, returning empty contributions");
    return { totalContributions: 0, weeks: [] };
  }

  try {
    const createdAt = await getAccountCreationDate();
    const now = new Date();

    const years: { from: string; to: string }[] = [];
    let currentYear = now.getFullYear();
    const startYear = createdAt.getFullYear();

    while (currentYear >= startYear) {
      const yearStart = new Date(currentYear, 0, 1);
      const yearEnd = new Date(currentYear, 11, 31, 23, 59, 59);

      const from =
        yearStart < createdAt
          ? createdAt.toISOString()
          : yearStart.toISOString();
      const to = yearEnd > now ? now.toISOString() : yearEnd.toISOString();

      years.push({ from, to });
      currentYear--;
    }

    const results = await Promise.all(
      years.map(({ from, to }) => fetchContributionsForYear(from, to)),
    );

    const validResults = results.filter(
      (r): r is { totalContributions: number; weeks: ContributionWeek[] } =>
        r !== null,
    );

    const daysByDate = new Map<string, ContributionDay>();
    let totalContributions = 0;

    for (const result of validResults.reverse()) {
      totalContributions += result.totalContributions;
      for (const week of result.weeks) {
        for (const day of week.contributionDays) {
          if (!daysByDate.has(day.date)) {
            daysByDate.set(day.date, day);
          }
        }
      }
    }

    const allDays = Array.from(daysByDate.values()).sort(
      (a, b) =>
        parseDateString(a.date).getTime() - parseDateString(b.date).getTime(),
    );

    const weeks: ContributionWeek[] = [];
    let currentWeek: ContributionDay[] = [];

    for (const day of allDays) {
      const dayOfWeek = parseDateString(day.date).getDay();

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push({ contributionDays: currentWeek });
        currentWeek = [];
      }

      currentWeek.push(day);
    }

    if (currentWeek.length > 0) {
      weeks.push({ contributionDays: currentWeek });
    }

    return {
      totalContributions,
      weeks,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    return { totalContributions: 0, weeks: [] };
  }
}
