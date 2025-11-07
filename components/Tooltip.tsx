"use client";

import { useId } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

type TooltipProps = {
  content: string;
  number: number;
};

export default function Tooltip({ content, number }: TooltipProps) {
  const tooltipId = useId();

  return (
    <>
      <sup
        data-tooltip-id={tooltipId}
        tabIndex={0}
        className="text-secondary cursor-help text-xs transition-colors hover:text-white/80 focus:text-white/80 focus:outline-none"
      >
        {number}
      </sup>
      <ReactTooltip
        id={tooltipId}
        place="bottom"
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
