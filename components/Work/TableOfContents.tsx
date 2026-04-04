"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const rafRef = useRef<number>(0);

  const collectHeadings = useCallback(() => {
    const article = document.querySelector(".prose-content");
    if (!article) return;

    const elements = article.querySelectorAll("h2[id], h3[id]");
    const items: TocItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: el.tagName === "H2" ? 2 : 3,
    }));

    if (items.length > 0) {
      setHeadings(items);
    }
  }, []);

  const updateActiveHeading = useCallback(() => {
    const article = document.querySelector(".prose-content");
    if (!article) return;

    const elements = Array.from(article.querySelectorAll("h2[id], h3[id]"));
    if (elements.length === 0) return;

    let current = elements[0].id;
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 140) {
        current = el.id;
      }
    }

    setActiveId(current);
  }, []);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateActiveHeading);
  }, [updateActiveHeading]);

  useEffect(() => {
    collectHeadings();
    updateActiveHeading();

    const observer = new MutationObserver(() => {
      collectHeadings();
      updateActiveHeading();
    });

    const article = document.querySelector(".prose-content");
    if (article) {
      observer.observe(article, { childList: true, subtree: true });
    }

    const timer = setTimeout(() => {
      collectHeadings();
      updateActiveHeading();
    }, 500);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [collectHeadings, updateActiveHeading, onScroll]);

  if (headings.length === 0) return null;

  return (
    <nav className="flex flex-col gap-1.5">
      {headings.map((heading) => {
        const isActive = heading.id === activeId;
        return (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(heading.id)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`text-xs whitespace-nowrap transition-colors duration-150 ${
              heading.level === 3 ? "pl-4" : ""
            } ${isActive ? "text-white" : "text-white/25 hover:text-white/50"}`}
          >
            {heading.text}
          </a>
        );
      })}
    </nav>
  );
}
