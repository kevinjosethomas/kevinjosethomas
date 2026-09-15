"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { experiences } from "@/data/experiences";

const CLOSE_MS = 150;
const GROUPS = ["Pages", "Work", "Links"];

type Phase = "closed" | "open" | "closing";

interface PaletteItem {
  id: string;
  label: string;
  href: string;
  group: (typeof GROUPS)[number];
  hint?: string;
  external?: boolean;
  matchText: string;
}

interface IndexedItem {
  item: PaletteItem;
  index: number;
}

const ITEMS: PaletteItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    group: "Pages",
    matchText: "home index bio",
  },
  {
    id: "projects",
    label: "Work",
    href: "/work",
    group: "Pages",
    matchText: "projects portfolio",
  },
  ...experiences.map((experience) => ({
    id: `work-${experience.id}`,
    label: experience.title,
    href: `/work/${experience.id}`,
    group: "Work" as const,
    matchText: `${experience.title} ${experience.timeline}`,
  })),
  {
    id: "writing",
    label: "Writing",
    href: "https://knowledge.kevinjosethomas.com",
    group: "Links",
    external: true,
    matchText: "writing blog knowledge notes",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/kevinjosethomas",
    group: "Links",
    external: true,
    matchText: "x twitter",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/kevinjosethomas",
    group: "Links",
    external: true,
    matchText: "github code repos",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:kjthomas@uwaterloo.ca",
    group: "Links",
    hint: "kjthomas@uwaterloo.ca",
    matchText: "email contact mail uwaterloo",
  },
];

/** Case-insensitive ranking; -1 means "does not match". */
function matchScore(item: PaletteItem, query: string): number {
  if (!query) return 0;
  const label = item.label.toLowerCase();
  if (label.startsWith(query)) return 0;
  if (label.includes(query)) return 1;
  const haystack = `${item.label} ${item.matchText}`.toLowerCase();
  if (haystack.includes(query)) return 2;
  // Initials-style subsequence match ("pi" -> "Prime Intellect").
  let cursor = 0;
  for (const char of query) {
    const found = haystack.indexOf(char, cursor);
    if (found === -1) return -1;
    cursor = found + 1;
  }
  return 3;
}

function ExternalArrow() {
  return (
    <svg
      className="h-3 w-3 text-neutral-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export default function CommandPalette() {
  const router = useRouter();
  const uid = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("closed");
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const { groups, flat } = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const grouped: { group: (typeof GROUPS)[number]; items: IndexedItem[] }[] =
      [];
    const flatItems: IndexedItem[] = [];
    for (const group of GROUPS) {
      const entries = ITEMS.filter((item) => item.group === group)
        .map((item) => ({ item, score: matchScore(item, normalized) }))
        .filter((entry) => entry.score >= 0)
        .sort((a, b) => a.score - b.score)
        .map((entry) => ({ item: entry.item, index: 0 }));
      for (const entry of entries) {
        entry.index = flatItems.length;
        flatItems.push(entry);
      }
      grouped.push({ group, items: entries });
    }
    return {
      groups: grouped.filter((group) => group.items.length > 0),
      flat: flatItems,
    };
  }, [query]);

  const closePalette = useCallback(() => {
    setPhase((current) => (current === "open" ? "closing" : current));
  }, []);

  const activate = useCallback(
    (item: PaletteItem) => {
      closePalette();
      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else if (item.href.startsWith("mailto:")) {
        window.location.href = item.href;
      } else {
        router.push(item.href);
      }
    },
    [closePalette, router],
  );

  // Global Cmd+K / Ctrl+K shortcut, always armed but lightweight.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.altKey || event.shiftKey) return;
      if (event.key.toLowerCase() !== "k") return;
      if (event.repeat) return;
      event.preventDefault();
      if (phase === "open") {
        closePalette();
      } else {
        setQuery("");
        setActiveIndex(0);
        setPhase("open");
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [phase, closePalette]);

  // Palette keyboard navigation, attached only while open.
  useEffect(() => {
    if (phase !== "open") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePalette();
        return;
      }
      if (event.key === "Tab") {
        event.preventDefault();
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        setActiveIndex(0);
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        setActiveIndex(Math.max(0, flat.length - 1));
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) =>
          flat.length === 0 ? 0 : (current + 1) % flat.length,
        );
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) =>
          flat.length === 0 ? 0 : (current - 1 + flat.length) % flat.length,
        );
        return;
      }
      if (event.key === "Enter") {
        const entry = flat[activeIndex];
        if (!entry) return;
        event.preventDefault();
        activate(entry.item);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [phase, flat, activeIndex, activate, closePalette]);

  // Focus the input while open.
  useEffect(() => {
    if (phase === "open") {
      inputRef.current?.focus();
    }
  }, [phase]);

  // Unmount after the exit animation finishes.
  useEffect(() => {
    if (phase !== "closing") return;
    const timer = setTimeout(() => setPhase("closed"), CLOSE_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  // Lock page scroll while the palette exists on screen.
  useEffect(() => {
    if (phase === "closed") return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousPaddingRight = root.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      root.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPaddingRight;
    };
  }, [phase]);

  // Keep the active item in view.
  useEffect(() => {
    if (phase === "closed") return;
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, flat, phase]);

  if (phase === "closed") {
    return <div id="command-palette-root" />;
  }

  return (
    <div id="command-palette-root">
      <div className="fixed inset-0 z-50">
        <div
          aria-hidden="true"
          data-state={phase === "closing" ? "closing" : "open"}
          className="cmdk-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm"
          onMouseDown={closePalette}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          data-state={phase === "closing" ? "closing" : "open"}
          className="cmdk-panel absolute inset-x-0 top-[12vh] mx-auto flex w-[min(32rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-white/10 bg-neutral-950 shadow-[0_24px_70px_rgba(0,0,0,0.65)]"
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-4">
            <svg
              className="h-4 w-4 shrink-0 text-neutral-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              placeholder="Search pages, work, and links…"
              aria-label="Search commands"
              role="combobox"
              aria-expanded="true"
              aria-controls={`${uid}-list`}
              aria-activedescendant={
                flat.length > 0 ? `${uid}-option-${activeIndex}` : undefined
              }
              aria-autocomplete="list"
              spellCheck={false}
              autoComplete="off"
              className="h-12 w-full bg-transparent text-[15px] text-white outline-none placeholder:text-neutral-600"
            />
            <kbd className="shrink-0 rounded-md border border-white/10 px-1.5 py-0.5 font-[family-name:var(--font-geist-mono)] text-[10px] font-medium text-neutral-500">
              esc
            </kbd>
          </div>
          <div
            ref={listRef}
            className="max-h-[min(24rem,50vh)] overflow-y-auto overscroll-contain p-2"
          >
            {flat.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-neutral-500">
                No results
              </p>
            ) : (
              <div id={`${uid}-list`} role="listbox" aria-label="Commands">
                {groups.map((group) => (
                  <div
                    key={group.group}
                    role="group"
                    aria-labelledby={`${uid}-group-${group.group}`}
                  >
                    <div
                      id={`${uid}-group-${group.group}`}
                      className="px-3 pt-2 pb-1 text-[10px] font-semibold tracking-widest text-neutral-500 uppercase"
                    >
                      {group.group}
                    </div>
                    {group.items.map(({ item, index }) => (
                      <div
                        key={item.id}
                        id={`${uid}-option-${index}`}
                        role="option"
                        aria-selected={index === activeIndex}
                        onMouseMove={() => {
                          if (activeIndex !== index) setActiveIndex(index);
                        }}
                        onClick={() => activate(item)}
                        className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm ${
                          index === activeIndex
                            ? "bg-white/10 text-white"
                            : "text-neutral-300"
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        <span className="flex shrink-0 items-center gap-1.5">
                          {item.hint ? (
                            <span className="font-[family-name:var(--font-geist-mono)] text-xs text-neutral-500">
                              {item.hint}
                            </span>
                          ) : null}
                          {item.external ? <ExternalArrow /> : null}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 font-[family-name:var(--font-geist-mono)] text-[11px] text-neutral-600">
            <span>↑↓ navigate</span>
            <span>↵ open · esc close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
