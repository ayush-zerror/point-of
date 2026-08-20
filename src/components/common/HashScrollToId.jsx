"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { HASH_SCROLL_OFFSET, scrollToHashTarget } from "@/helper/scrollToHash";

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

function scrollToHash(offset = HASH_SCROLL_OFFSET) {
  const id = getTargetId();
  if (!id) return false;
  return scrollToHashTarget(id, { offset });
}

export default function HashScrollToId({ offset = HASH_SCROLL_OFFSET } = {}) {
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
