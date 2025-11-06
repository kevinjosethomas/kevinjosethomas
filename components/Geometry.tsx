"use client";

import { useEffect, useId, useRef, useState } from "react";

type ShapeId = "circle" | "diamond" | "triangle";

const SHAPES: ShapeId[] = ["circle", "diamond", "triangle"];

const pickNextShape = (current: ShapeId) => {
  if (SHAPES.length <= 1) {
    return current;
  }

  let next = current;
  while (next === current) {
    next = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  }

  return next;
};

const renderShape = (shape: ShapeId) => {
  switch (shape) {
    case "circle":
      return (
        <svg
          key="circle"
          viewBox="0 0 100 100"
          className="text-border h-full w-full"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="49.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      );
    case "diamond":
      return (
        <svg
          key="diamond"
          viewBox="0 0 100 100"
          className="text-border h-full w-full"
          aria-hidden="true"
        >
          <polygon
            points="50 0.5, 99.5 50, 50 99.5, 0.5 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      );
    case "triangle":
      return (
        <svg
          key="triangle"
          viewBox="0 0 100 100"
          className="text-border h-full w-full"
          aria-hidden="true"
        >
          <polygon
            points="50 0.5, 99.5 99.5, 0.5 99.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default function Geometry() {
  const [shape, setShape] = useState<ShapeId>("diamond");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const meshPatternId = `mesh-${useId()}`;

  const stopCycling = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startCycling = () => {
    if (timerRef.current) return;

    setShape((current) => pickNextShape(current));
    timerRef.current = setInterval(() => {
      setShape((current) => pickNextShape(current));
    }, 220);
  };

  useEffect(() => {
    setShape(SHAPES[Math.floor(Math.random() * SHAPES.length)]);

    return () => stopCycling();
  }, []);

  return (
    <div className="relative col-span-2 flex aspect-square h-full w-full items-center justify-center px-16 select-none">
      <div className="relative flex h-full flex-col items-center justify-center py-16">
        {/* Content */}
        <div
          className="group border-border/60 bg-background/70 focus:ring-border/80 relative flex aspect-square h-full w-full items-center justify-center overflow-hidden border transition-colors duration-500 ease-out focus:ring-2 focus:outline-none"
          onMouseEnter={startCycling}
          onMouseLeave={stopCycling}
          onFocus={startCycling}
          onBlur={stopCycling}
          tabIndex={0}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {renderShape(shape)}
          </div>
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 160 160" className="h-full w-full">
              <defs>
                <pattern
                  id={meshPatternId}
                  x="0"
                  y="0"
                  width="0.2"
                  height="0.2"
                  patternUnits="objectBoundingBox"
                >
                  <path
                    d="M0 0H1V1H0z"
                    fill="currentColor"
                    className="text-border/30"
                  />
                </pattern>
              </defs>
              <rect
                width="160"
                height="160"
                fill={`url(#${meshPatternId})`}
                className="text-border/20"
              />
            </svg>
          </div>
        </div>
        {/* Top gridline */}
        <div className="bg-border absolute top-16 -left-16 h-px w-[calc(100%+128px)]" />
        {/* Bottom gridline */}
        <div className="bg-border absolute bottom-16 -left-16 h-px w-[calc(100%+128px)]" />
        {/* Left gridline */}
        <div className="bg-border absolute top-0 -left-16 h-[calc(100%+64px)] w-px" />
        {/* Closer gridline */}
        <div className="bg-border absolute top-0 left-0 h-[calc(100%+64px)] w-px" />
        {/* Right gridline */}
        <div className="bg-border absolute top-0 right-0 h-[calc(100%+64px)] w-px" />
      </div>
    </div>
  );
}
