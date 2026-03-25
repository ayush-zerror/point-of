"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Tempus from "@studio-freight/tempus";
import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";

export default function SmoothScroller() {
  const lenis = useRef(null);
  const pathname = usePathname();

  // Reset scroll on route change
  useEffect(() => {
    if (lenis.current) {
      lenis.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  useLayoutEffect(() => {
    lenis.current = new Lenis({
      smoothWheel: true,
      duration: 1.2,
    });

    const resize = setInterval(() => {
      if (lenis.current) lenis.current.resize();
    }, 150);

    function onFrame(time) {
      if (lenis.current) lenis.current.raf(time);
    }

    const unsubscribe = Tempus.add(onFrame);

    return () => {
      unsubscribe();
      clearInterval(resize);

      if (lenis.current) {
        lenis.current.destroy();
        lenis.current = null;
      }
    };
  }, []);

  return null;
}