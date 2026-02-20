"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type WebringMember = {
  name?: string;
  website: string;
};

const WEBRING_HOME = "https://www.uwaterloo.network";
const WEBRING_API = `${WEBRING_HOME}/api/webring?user=kevin-thomas`;

function WaterlooWebring() {
  const [members, setMembers] = useState<WebringMember[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    fetch(WEBRING_API)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { members?: WebringMember[] }) => {
        if (!isMounted) return;
        if (Array.isArray(data.members) && data.members.length > 0) {
          setMembers(data.members);
          setActiveIndex(Math.floor(Math.random() * data.members.length));
        }
      })
      .catch(() => {
        // Swallow network errors – we can still show the hub link.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const hasMembers = members.length > 0;

  const openInNewTab = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const navigate = useCallback(
    (direction: -1 | 1) => {
      if (!hasMembers) {
        openInNewTab(WEBRING_HOME);
        return;
      }

      const nextIndex =
        (activeIndex + direction + members.length) % members.length;
      setActiveIndex(nextIndex);

      const target = members[nextIndex];
      if (target?.website) {
        openInNewTab(target.website);
      } else {
        openInNewTab(WEBRING_HOME);
      }
    },
    [activeIndex, hasMembers, members, openInNewTab],
  );

  return (
    <div className="flex items-center gap-1 rounded-full px-1 py-0.5 text-white">
      <button
        type="button"
        className="cursor-pointer rounded-full p-1 text-[11px] text-white/60 transition hover:text-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Visit previous Waterloo Network site"
        onClick={() => navigate(-1)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          <path
            d="M19 12H7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 8L7 12L11 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full opacity-60 transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Open uwaterloo.network"
        onClick={() => openInNewTab(WEBRING_HOME)}
      >
        <Image
          src="/icons/uwaterloo-network.svg"
          alt="UWaterloo Webring"
          width={24}
          height={24}
          className="h-6 w-6 select-none"
          draggable={false}
        />
      </button>
      <button
        type="button"
        className="cursor-pointer rounded-full p-1 text-[11px] text-white/60 transition hover:text-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Visit next Waterloo Network site"
        onClick={() => navigate(1)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          <path
            d="M5 12H17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 8L17 12L13 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-4 py-4 md:relative md:flex-row md:items-center md:justify-between md:gap-0 md:py-6">
      <div className="flex w-full items-center justify-between md:contents">
        <span>kjthomas [at] uwaterloo [dot] ca</span>
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
      <div className="flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
        <WaterlooWebring />
      </div>
    </footer>
  );
}
