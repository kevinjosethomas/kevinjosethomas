"use client";

import { useEffect, useRef, useState } from "react";

type TooltipProps = {
  content: string;
  number: number;
};

export default function Tooltip({ content, number }: TooltipProps) {
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const updatePosition = () => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Calculate centered position
      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      const tooltipHalfWidth = tooltipRect.width / 2;
      const idealLeft = triggerCenter - tooltipHalfWidth;
      const idealRight = triggerCenter + tooltipHalfWidth;

      // Check if tooltip would overflow
      if (idealLeft < 16) {
        // Align to left edge with padding
        setTooltipStyle({
          left: "0",
          right: "auto",
          transform: "none",
          marginLeft: `${16 - triggerRect.left}px`,
        });
      } else if (idealRight > viewportWidth - 16) {
        // Align to right edge with padding
        setTooltipStyle({
          left: "auto",
          right: "0",
          transform: "none",
          marginRight: `${triggerRect.right - viewportWidth + 16}px`,
        });
      } else {
        // Use default centered position
        setTooltipStyle({
          left: "50%",
          right: "auto",
          transform: "translateX(-50%)",
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
      <sup
        ref={triggerRef}
        tabIndex={0}
        className="text-secondary cursor-help text-xs transition-colors group-focus-within:text-white/80 group-hover:text-white/80 focus:outline-none"
      >
        {number}
      </sup>
      <span
        className="absolute top-full left-1/2 z-50 hidden -translate-x-1/2 pt-2 group-focus-within:block group-hover:block group-focus-visible:block group-active:block"
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
