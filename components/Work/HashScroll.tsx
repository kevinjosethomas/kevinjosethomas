"use client";

import { useEffect, useLayoutEffect } from "react";

export default function HashScroll() {
  useLayoutEffect(() => {
    if (window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const scroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return true;
      }
      return false;
    };

    const timer = setTimeout(scroll, 500);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
