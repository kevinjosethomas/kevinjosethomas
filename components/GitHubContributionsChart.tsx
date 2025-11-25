"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { GitHubContributionsData } from "@/lib/github";

type GitHubContributionsChartProps = {
  data: GitHubContributionsData;
};

const LEVEL_COLORS: Record<string, string> = {
  NONE: "#161b22",
  FIRST_QUARTILE: "#0e4429",
  SECOND_QUARTILE: "#006d32",
  THIRD_QUARTILE: "#26a641",
  FOURTH_QUARTILE: "#39d353",
};

function parseDateString(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export default function GitHubContributionsChart({
  data,
}: GitHubContributionsChartProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [data]);

  const {
    totalContributions,
    avgPerDay,
    currentStreak,
    longestStreak,
    totalDays,
  } = useMemo(() => {
    if (!data.weeks || data.weeks.length === 0) {
      return {
        totalContributions: 0,
        avgPerDay: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalDays: 0,
      };
    }

    const allDays = data.weeks.flatMap((week) => week.contributionDays);

    const total = allDays.reduce((sum, day) => sum + day.contributionCount, 0);
    const avg = allDays.length > 0 ? total / allDays.length : 0;

    const allDaysSorted = [...allDays].sort(
      (a, b) =>
        parseDateString(b.date).getTime() - parseDateString(a.date).getTime(),
    );

    let current = 0;
    let longest = 0;
    let tempStreak = 0;

    const daysForCurrentStreak =
      allDaysSorted.length > 0 && allDaysSorted[0].contributionCount === 0
        ? allDaysSorted.slice(1)
        : allDaysSorted;

    for (const day of daysForCurrentStreak) {
      if (day.contributionCount > 0) {
        current++;
      } else {
        break;
      }
    }

    for (const day of [...allDaysSorted].reverse()) {
      if (day.contributionCount > 0) {
        tempStreak++;
        longest = Math.max(longest, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    return {
      totalContributions: total,
      avgPerDay: avg,
      currentStreak: current,
      longestStreak: longest,
      totalDays: allDays.length,
    };
  }, [data]);

  const formatDate = (dateStr: string) => {
    const date = parseDateString(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const yearsActive = totalDays > 0 ? Math.ceil(totalDays / 365) : 0;

  if (!data.weeks || data.weeks.length === 0) {
    return (
      <div className="flex h-full flex-col">
        <div className="border-border flex h-14 items-center justify-between border-b px-4">
          <p className="text-sm font-medium">GitHub Contributions</p>
        </div>
        <div className="flex min-h-[200px] flex-1 items-center justify-center">
          <p className="text-secondary text-sm">
            No contribution data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-border flex h-14 items-center justify-between border-b px-4">
        <p className="text-sm font-medium">GitHub Contributions</p>
        <p className="text-secondary text-xs">
          {totalContributions.toLocaleString()} contributions • {yearsActive}{" "}
          year{yearsActive !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex min-w-0 flex-1 items-center overflow-x-auto p-4"
        >
          <div className="flex gap-[3px]">
            {data.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.contributionDays.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="h-[14px] w-[14px] shrink-0 cursor-pointer rounded-[2px] transition-all hover:ring-1 hover:ring-white/50"
                    style={{
                      backgroundColor:
                        LEVEL_COLORS[day.contributionLevel] ||
                        LEVEL_COLORS.NONE,
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredDay({
                        date: day.date,
                        count: day.contributionCount,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-border flex shrink-0 flex-col border-l">
          {/* <div className="border-border flex flex-1 flex-col items-center justify-center border-b px-6">
            <p className="text-base font-semibold">{avgPerDay.toFixed(1)}</p>
            <p className="text-secondary text-xs">Commits/day</p>
          </div> */}
          <div className="border-border flex flex-1 flex-col items-center justify-center border-b px-6">
            <p className="text-lg font-semibold">{currentStreak}</p>
            <p className="text-secondary text-xs">Current streak</p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center px-6">
            <p className="text-lg font-semibold">{longestStreak}</p>
            <p className="text-secondary text-xs">Longest streak</p>
          </div>
        </div>
      </div>

      {hoveredDay && (
        <div
          className="border-border pointer-events-none fixed z-50 border bg-black px-3 py-2 text-sm"
          style={{
            left: hoveredDay.x,
            top: hoveredDay.y - 8,
            transform: "translate(-50%, -100%)",
          }}
        >
          <p className="font-medium">
            {hoveredDay.count} contribution{hoveredDay.count !== 1 ? "s" : ""}
          </p>
          <p className="text-secondary text-xs">
            {formatDate(hoveredDay.date)}
          </p>
        </div>
      )}
    </div>
  );
}
