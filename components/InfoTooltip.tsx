"use client";

import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

type InfoTooltipProps = {
  content: string;
};

let tooltipIdCounter = 0;

export default function InfoTooltip({ content }: InfoTooltipProps) {
  const tooltipId = `info-tooltip-${tooltipIdCounter++}`;

  return (
    <>
      <button
        data-tooltip-id={tooltipId}
        tabIndex={0}
        className="text-secondary flex h-5 w-5 cursor-help items-center justify-center rounded-full transition-colors hover:text-white/80 focus:text-white/80 focus:outline-none"
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
      <ReactTooltip
        id={tooltipId}
        place="top"
        content={content}
        className="border-border border"
        opacity={1}
        noArrow
        style={{
          backgroundColor: "black",
          color: "rgb(163 163 163)",
          borderRadius: "0",
          padding: "0.5rem 0.75rem",
          fontSize: "0.75rem",
          lineHeight: "1.625",
          maxWidth: "18rem",
          width: "18rem",
          textAlign: "left",
          zIndex: 50,
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        }}
      />
    </>
  );
}
