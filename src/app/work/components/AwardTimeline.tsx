"use client";

import Award from "./Award";
import { AwardInterface } from "@/types";

export default function AwardTimeline({
  awards,
}: {
  awards: AwardInterface[];
}) {
  return (
    <div className="relative flex flex-col">
      <div className="absolute left-4 top-2 h-[calc(100%-16px)] w-0.5 bg-white bg-opacity-20" />
      <div className="flex flex-col gap-8">
        {awards.map((award, index) => (
          <Award key={index} {...award} order={index} />
        ))}
      </div>
    </div>
  );
}
