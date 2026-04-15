"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HashScrollToId({ offset = 0 } = {}) {
  const pathname = usePathname();

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash || hash.length < 2) return;

    const id = decodeURIComponent(hash.slice(1));
    const el = document.getElementById(id);
    if (!el) return;

    // Wait a tick for layout + any smooth-scroll libs to initialize.
    const t = setTimeout(() => {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }, 50);

    return () => clearTimeout(t);
  }, [pathname, offset]);

  return null;
}

