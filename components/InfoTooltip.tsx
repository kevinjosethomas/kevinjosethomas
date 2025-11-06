"use client";

import { useEffect, useRef, useState } from "react";

type InfoTooltipProps = {
  content: string;
};

export default function InfoTooltip({ content }: InfoTooltipProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const updatePosition = () => {
      if (!buttonRef.current || !tooltipRef.current) return;

      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Calculate ideal position (right-aligned)
      const idealLeft = buttonRect.right - tooltipRect.width;
      const idealRight = buttonRect.right;

      // Check if tooltip would overflow on the left
      if (idealLeft < 16) {
        // Align to left edge with padding
        setTooltipStyle({
          left: "auto",
          right: "auto",
          transform: "none",
          marginLeft: `${16 - buttonRect.left}px`,
        });
      } else if (idealRight > viewportWidth - 16) {
        // Align to right edge with padding
        setTooltipStyle({
          left: "auto",
          right: "0",
          transform: "none",
        });
      } else {
        // Use default right-aligned position
        setTooltipStyle({
          left: "auto",
          right: "0",
          transform: "none",
        });
      }
    };

    // Update position when tooltip is shown
    const observer = new MutationObserver(updatePosition);
    if (tooltipRef.current?.parentElement) {
      observer.observe(tooltipRef.current.parentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    // Update on resize
    window.addEventListener("resize", updatePosition);
    updatePosition();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    <span className="group relative inline-flex">
      <button
        ref={buttonRef}
        tabIndex={0}
        className="text-secondary flex h-5 w-5 cursor-help items-center justify-center rounded-full transition-colors group-focus-within:text-white/80 group-hover:text-white/80 focus:outline-none"
        aria-label="More information"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>
      <span
        className="absolute right-0 bottom-full z-50 hidden pb-2 group-focus-within:block group-hover:block group-focus-visible:block group-active:block"
        style={tooltipStyle}
      >
        <span
          ref={tooltipRef}
          className="border-border text-secondary block w-72 max-w-[calc(100vw-2rem)] rounded border bg-black px-3 py-2 text-left text-xs leading-relaxed shadow-lg"
        >
          {content}
        </span>
      </span>
    </span>
  );
}
