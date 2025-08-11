"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  content: string;
  number: number;
  className?: string;
}

export default function Tooltip({
  content,
  number,
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative -mx-1 -my-0.5 inline-block px-1 py-0.5"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <sup
        className={`cursor-help text-xs text-white/50 transition-colors hover:text-white/70 ${className}`}
      >
        {number}
      </sup>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute -left-[9rem] top-6 z-50 mt-2 flex w-72 flex-col rounded border border-white/40 bg-black px-3 py-2 text-xs text-white"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
