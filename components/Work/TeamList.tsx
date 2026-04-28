"use client";

import { useState } from "react";
import type { TeamMember } from "@/types";

const VISIBLE_COUNT = 3;

interface TeamListProps {
  team: TeamMember[];
  teamSuffix?: string;
}

function MemberLink({ member }: { member: TeamMember }) {
  if (member.href) {
    return (
      <a
        href={member.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary w-fit text-sm leading-relaxed underline decoration-white/20 underline-offset-2 transition-colors hover:text-white hover:decoration-white/60"
      >
        {member.name}
      </a>
    );
  }
  return (
    <span className="text-secondary w-fit text-sm leading-relaxed">
      {member.name}
    </span>
  );
}

export default function TeamList({ team, teamSuffix }: TeamListProps) {
  const [open, setOpen] = useState(false);

  const visible = team.slice(0, VISIBLE_COUNT);
  const overflow = team.slice(VISIBLE_COUNT);

  return (
    <div className="flex flex-col">
      {visible.map((member) => (
        <MemberLink key={member.name} member={member} />
      ))}
      {overflow.length > 0 && (
        <div
          className="relative w-fit"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={`Show ${overflow.length} more team member${overflow.length === 1 ? "" : "s"}`}
            className="text-secondary cursor-pointer text-sm leading-relaxed tracking-widest transition-colors hover:text-white"
          >
            ...
          </button>
          {open && (
            <div className="absolute top-full left-0 z-20 pt-1">
              <div className="flex min-w-[160px] flex-col rounded-md border border-white/10 bg-black/95 px-3 py-2 shadow-lg backdrop-blur-md">
                {overflow.map((member) => (
                  <MemberLink key={member.name} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {teamSuffix && (
        <p className="text-secondary text-sm leading-relaxed">{teamSuffix}</p>
      )}
    </div>
  );
}
