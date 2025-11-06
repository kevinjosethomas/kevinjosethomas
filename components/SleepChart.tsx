"use client";

import { useState } from "react";
import * as React from "react";
import InfoTooltip from "./InfoTooltip";

type SleepData = {
  date: string;
  start: string;
  end: string;
};

type SleepChartProps = {
  data: SleepData[];
};

type TooltipData = {
  date: string;
  start: string;
  end: string;
  duration: string;
  x: number;
  y: number;
};

function timeToMinutes(timeStr: string): number {
  const [time, period] = timeStr.split(" ");
  const [hoursStr, minutesStr] = time.split(":");
  let hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export default function SleepChart({ data }: SleepChartProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const baseHour = 22;
  const totalHours = 15;

  const timeLabels = [
    { label: "10PM", hour: 0, showLabel: false },
    { label: "1AM", hour: 3, showLabel: true },
    { label: "4AM", hour: 6, showLabel: true },
    { label: "7AM", hour: 9, showLabel: true },
    { label: "10AM", hour: 12, showLabel: true },
    { label: "1PM", hour: 15, showLabel: false },
  ];

  const last7Days = data?.slice(0, 7).reverse() || [];

  const sleepBars = last7Days.map((sleep) => {
    const startMinutes = timeToMinutes(sleep.start);
    const endMinutes = timeToMinutes(sleep.end);

    let startHour = startMinutes / 60;
    let endHour = endMinutes / 60;

    if (startHour < 13) {
      startHour += 24;
    }

    if (endHour < 13) {
      endHour += 24;
    }

    if (endHour < startHour) {
      endHour += 24;
    }

    const relativeStart = startHour - baseHour;
    const relativeEnd = endHour - baseHour;
    const duration = relativeEnd - relativeStart;

    const durationMinutes =
      endMinutes - startMinutes + (endMinutes < startMinutes ? 24 * 60 : 0);

    const topPercent = (relativeStart / totalHours) * 100;
    const heightPercent = (duration / totalHours) * 100;

    const dateParts = sleep.date.split(",");
    const dayOfWeek = dateParts[0];
    const dateStr = dateParts[1]?.trim();
    const formattedDate = `${dayOfWeek}, ${dateStr}`;

    return {
      day: dayOfWeek.slice(0, 3),
      topPercent,
      heightPercent,
      fullDate: formattedDate,
      start: sleep.start,
      end: sleep.end,
      durationMinutes,
    };
  });

  const handleBarHover = (
    bar: (typeof sleepBars)[0],
    index: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setFocusedIndex(index);
    const barRect = event.currentTarget.getBoundingClientRect();
    const containerRect = event.currentTarget
      .closest(".sleep-chart-outer")
      ?.getBoundingClientRect();

    if (containerRect) {
      setTooltip({
        date: bar.fullDate,
        start: bar.start,
        end: bar.end,
        duration: formatDuration(bar.durationMinutes),
        x: barRect.left - containerRect.left + barRect.width / 2,
        y: barRect.top - containerRect.top,
      });
    }
  };

  React.useEffect(() => {
    if (sleepBars.length > 0) {
      const firstBar = sleepBars[focusedIndex];
      const barElement = document.querySelector(
        `.sleep-bar-${focusedIndex}`,
      ) as HTMLElement;
      const containerElement = document.querySelector(
        ".sleep-chart-outer",
      ) as HTMLElement;

      if (barElement && containerElement) {
        const barRect = barElement.getBoundingClientRect();
        const containerRect = containerElement.getBoundingClientRect();
        setTooltip({
          date: firstBar.fullDate,
          start: firstBar.start,
          end: firstBar.end,
          duration: formatDuration(firstBar.durationMinutes),
          x: barRect.left - containerRect.left + barRect.width / 2,
          y: barRect.top - containerRect.top,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedIndex]);

  if (!data || data.length === 0) return null;

  return (
    <div className="sleep-chart-outer relative flex h-full w-full flex-col">
      <div className="sleep-chart-container relative flex h-full min-h-[300px] w-full overflow-hidden">
        <div className="relative flex flex-1 px-2">
          <div className="pointer-events-none absolute inset-0 -left-20">
            {/* Gridlines */}
            {timeLabels.map(({ label, hour }) => {
              if (hour === 0) return null;
              const topPercent = (hour / totalHours) * 100;
              return (
                <div
                  key={label}
                  className="absolute w-full border-t"
                  style={{
                    top: `${topPercent}%`,
                    right: "-2.5rem",
                    borderColor: "currentColor",
                    opacity: 0.1,
                  }}
                />
              );
            })}
          </div>

          <div className="relative flex flex-1">
            {sleepBars.map((bar, i) => (
              <div key={i} className="relative flex-1">
                {/* Sleep bars */}
                <div
                  className={`sleep-bar-${i} absolute right-2 left-2 overflow-hidden bg-black transition-all ${
                    focusedIndex === i
                      ? "border border-white/60"
                      : "border border-white/30"
                  }`}
                  style={{
                    top: `${bar.topPercent}%`,
                    height: `${bar.heightPercent}%`,
                  }}
                  onMouseEnter={(e) => handleBarHover(bar, i, e)}
                >
                  <div className="absolute top-0 left-0 h-full w-full bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time labels */}
        <div className="relative flex w-10 flex-col py-2 pl-2">
          {timeLabels.map(({ label, hour, showLabel }) => {
            if (!showLabel) return null;
            const topPercent = (hour / totalHours) * 100;
            return (
              <div
                key={label}
                className="text-secondary absolute text-left text-xs"
                style={{
                  top: `${topPercent}%`,
                  transform: "translateY(-50%)",
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-border flex items-center justify-between border-t px-4 py-2">
        <div />
        <p className="text-secondary text-sm">Time Spent Asleep (7d)</p>
        <InfoTooltip content="This chart visualizes my sleep habits over the last 7 days. My sleep data is sourced from my Apple Watch and is automatically synced to my tracker Google Sheet every morning." />
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="border-border pointer-events-none absolute z-50 flex w-32 flex-col border bg-black px-2 py-1 text-sm"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translate(-50%, -120%)",
          }}
        >
          <p className="text-secondary text-xs">{tooltip.date}</p>
          <p className="font-medium">{tooltip.duration}</p>
          <p className="text-secondary text-xs">
            {tooltip.start} - {tooltip.end}
          </p>
        </div>
      )}
    </div>
  );
}
