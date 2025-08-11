"use client";

import { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  content: string;
  number: number;
  className?: string;
}

export default function Tooltip({ content, number, className = "" }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom",
    middleware: [offset(16), flip(), shift({ padding: 16 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { 
    move: false,
    delay: { open: 100, close: 0 }
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
    role,
  ]);

  return (
    <span className="relative inline-block">
      <sup
        ref={refs.setReference}
        className={`cursor-help text-xs text-white/50 transition-colors hover:text-white/70 ${className}`}
        {...getReferenceProps()}
      >
        {number}
      </sup>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            ref={refs.setFloating}
            style={floatingStyles}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="z-50 w-64 max-w-sm rounded border border-white/40 bg-black px-3 py-2 text-xs text-white shadow-lg"
            {...getFloatingProps()}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      )}
    </span>
  );
}