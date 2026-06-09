"use client";

import { useState } from "react";
import type { WorkHourHeatmapData } from "@/lib/work";

type ProductiveHoursChartProps = {
  data: WorkHourHeatmapData[];
};

type HoveredCell = WorkHourHeatmapData & {
  x: number;
  y: number;
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

function formatHour(hour: number): string {
  if (hour === 0) return "12a";
  if (hour === 12) return "12p";
  if (hour > 12) return `${hour - 12}p`;
  return `${hour}a`;
}

function getCellColor(minutes: number, maxMinutes: number): string {
  if (minutes === 0) return "rgba(255, 255, 255, 0.05)";

  const intensity = minutes / Math.max(maxMinutes, 1);
  if (intensity > 0.75) return "rgba(127, 178, 140, 0.75)";
  if (intensity > 0.5) return "rgba(106, 152, 128, 0.58)";
  if (intensity > 0.25) return "rgba(106, 152, 128, 0.38)";
  return "rgba(106, 152, 128, 0.2)";
}

export default function ProductiveHoursChart({
  data,
}: ProductiveHoursChartProps) {
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null);
  const maxMinutes = Math.max(
    ...data.map((entry) => entry.totalMinutes),
    1,
  );
  const cellMap = new Map<string, WorkHourHeatmapData>();
  data.forEach((entry) => {
    cellMap.set(`${entry.dayIndex}-${entry.hour}`, entry);
  });
  const cells = DAYS.flatMap((day, dayIndex) =>
    Array.from({ length: 24 }, (_, hour) => {
      const firstCell = cellMap.get(`${dayIndex}-0`);
      const cellDay = firstCell?.day || day;
      return (
        cellMap.get(`${dayIndex}-${hour}`) || {
          dayIndex,
          day: cellDay,
          hour,
          totalMinutes: 0,
          sessionCount: 0,
        }
      );
    }),
  );

  return (
    <div className="relative flex h-full flex-col">
      <div className="border-border flex h-14 items-center justify-between border-b px-4">
        <p className="text-sm font-medium">Most Productive Hours</p>
      </div>
      <div className="flex min-h-[160px] flex-1 px-4 py-4 md:min-h-0">
        <div
          className="grid min-h-0 flex-1 gap-[2px]"
          style={{
            gridTemplateColumns: "repeat(24, minmax(0, 1fr))",
            gridTemplateRows: "repeat(7, minmax(0, 1fr))",
          }}
        >
          {cells.map((cell) => (
            <div
              key={`${cell.dayIndex}-${cell.hour}`}
              className="h-full w-full rounded-[2px] transition-colors"
              style={{
                backgroundColor: getCellColor(cell.totalMinutes, maxMinutes),
              }}
              onMouseEnter={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setHoveredCell({
                  ...cell,
                  x: rect.left + rect.width / 2,
                  y: rect.top,
                });
              }}
              onMouseLeave={() => setHoveredCell(null)}
            />
          ))}
        </div>
      </div>

      {hoveredCell && (
        <div
          className="border-border pointer-events-none fixed z-50 border bg-black px-3 py-2 text-sm"
          style={{
            left: hoveredCell.x,
            top: hoveredCell.y - 8,
            transform: "translate(-50%, -100%)",
          }}
        >
          <p className="text-secondary mb-1 text-xs">
            {hoveredCell.day} {formatHour(hoveredCell.hour)}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-secondary text-xs">Time:</p>
            <p className="text-xs font-medium">
              {hoveredCell.totalMinutes > 0
                ? formatMinutes(hoveredCell.totalMinutes)
                : "none"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
