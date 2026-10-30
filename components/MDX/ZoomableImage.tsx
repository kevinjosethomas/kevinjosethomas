"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ZoomableImageProps = {
  src?: string;
  alt?: string;
  className?: string;
};

// Renders an inline image that expands to a near-fullscreen lightbox on click.
// Click anywhere (or press Escape) to close.
export function ZoomableImage({
  src,
  alt = "",
  className = "",
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // The page scrolls on <html> (globals sets html { overflow-y: scroll }),
    // so lock the root element, not body.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`${className} cursor-zoom-in`}
        draggable={false}
        onClick={() => setOpen(true)}
      />
      {open &&
        // Portal to <body> so the overlay escapes any transformed ancestor
        // (a transform/filter on a parent would otherwise make `fixed`
        // resolve to that ancestor instead of the viewport).
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-[95vh] max-w-[95vw] select-none rounded-lg object-contain"
              draggable={false}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
