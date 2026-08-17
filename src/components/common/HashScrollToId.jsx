"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getTargetId() {
  if (typeof window === "undefined") return "";
  const fromHash = window.location.hash?.slice(1);
  if (fromHash) return decodeURIComponent(fromHash);
  try {
    return sessionStorage.getItem("scroll-to-id") || "";
  } catch {
    return "";
  }
}

function scrollToHash(offset = 0) {
  if (typeof window === "undefined") return false;

  const id = getTargetId();
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -offset, duration: 1.15 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  try {
    sessionStorage.removeItem("scroll-to-id");
  } catch {
    /* ignore */
  }
  return true;
}

export default function HashScrollToId({ offset = 0 } = {}) {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      scrollToHash(offset);
    };

    const timers = [50, 150, 350, 700, 1200].map((ms) => setTimeout(run, ms));
    window.addEventListener("hashchange", run);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      window.removeEventListener("hashchange", run);
    };
  }, [pathname, offset]);

  return null;
}
