"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type WebringMember = {
  name?: string;
  website: string;
};

function WaterlooWebring() {
  const [members, setMembers] = useState<WebringMember[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let alive = true;
    fetch("https://www.uwaterloo.network/api/webring?user=kevin-thomas")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { members?: WebringMember[] }) => {
        if (!alive || !d.members?.length) return;
        setMembers(d.members);
        setActiveIndex(Math.floor(Math.random() * d.members.length));
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (!members.length) {
        window.open("https://www.uwaterloo.network/?ref=kevin-thomas", "_blank", "noopener,noreferrer");
        return;
      }
      const i = (activeIndex + dir + members.length) % members.length;
      setActiveIndex(i);
      window.open(members[i].website, "_blank", "noopener,noreferrer");
    },
    [activeIndex, members],
  );

  return (
    <div className="flex items-center gap-1 rounded-full px-1 py-0.5 text-white">
      <button
        type="button"
        className="cursor-pointer rounded-full p-1 text-white/60 transition hover:text-white/80"
        aria-label="Previous"
        onClick={() => go(-1)}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M19 12H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 8L7 12L11 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full opacity-60 transition hover:opacity-80"
        aria-label="Open uwaterloo.network"
        onClick={() => window.open("https://www.uwaterloo.network/?ref=kevin-thomas", "_blank", "noopener,noreferrer")}
      >
        <Image src="/icons/uwaterloo-network.svg" alt="UWaterloo Webring" width={24} height={24} className="h-6 w-6 select-none" draggable={false} />
      </button>
      <button
        type="button"
        className="cursor-pointer rounded-full p-1 text-white/60 transition hover:text-white/80"
        aria-label="Next"
        onClick={() => go(1)}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M5 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 8L17 12L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-4 py-4 md:relative md:flex-row md:items-center md:justify-between md:gap-0 md:py-6">
      <div className="flex w-full items-center justify-between md:contents">
        <span>kjthomas@uwaterloo.ca</span>
        <div className="flex items-center justify-end gap-4">
          <Link href="https://x.com/kevinjosethomas" target="_blank">
            <Image
              src="/icons/x.svg"
              className="select-none"
              draggable={false}
              alt="X"
              width={20}
              height={20}
            />
          </Link>
          <Link href="https://github.com/kevinjosethomas" target="_blank">
            <Image
              src="/icons/github.svg"
              className="select-none"
              draggable={false}
              alt="GitHub"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
      <div className="hidden justify-center md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
        <WaterlooWebring />
      </div>
    </footer>
  );
}
