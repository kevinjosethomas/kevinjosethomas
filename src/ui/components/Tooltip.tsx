"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  content: string;
  number: number;
  className?: string;
}

export default function Tooltip({ content, number, className = "" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipWidth = 280; // Fixed width for calculation
      const viewportWidth = window.innerWidth;
      const padding = 16;
      
      // Calculate optimal left position
      let left = rect.left + rect.width / 2 - tooltipWidth / 2;
      
      // Ensure tooltip stays within viewport bounds
      if (left < padding) {
        left = padding;
      } else if (left + tooltipWidth > viewportWidth - padding) {
        left = viewportWidth - tooltipWidth - padding;
      }
      
      setPosition({
        top: rect.bottom + window.scrollY + 12,
        left: left + window.scrollX,
      });
    }
    setIsVisible(true);
  };

  const hideTooltip = () => setIsVisible(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        hideTooltip();
      }
    };

    if (isVisible) {
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [isVisible]);

  return (
    <>
      <sup
        ref={triggerRef}
        className={`cursor-help text-xs text-white/50 transition-colors hover:text-white/70 ${className}`}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={showTooltip}
        onTouchStart={showTooltip}
      >
        {number}
      </sup>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 rounded border border-white/40 bg-black px-3 py-2 text-xs text-white shadow-lg"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: '280px',
              maxWidth: 'calc(100vw - 2rem)',
              pointerEvents: 'none',
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}