"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Tempus from "@studio-freight/tempus";
import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    lenis.current = new Lenis({
      smoothWheel: !prefersReducedMotion,
      duration: prefersReducedMotion ? 0 : 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: !prefersReducedMotion,
      smoothTouch: !prefersReducedMotion,
      direction: "vertical",
      gestureDirection: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Keep ScrollTrigger in sync with Lenis
    lenis.current.on("scroll", ScrollTrigger.update);

    function onFrame(time) {
      if (lenis.current) lenis.current.raf(time);
    }

    const unsubscribe = Tempus.add(onFrame);

    // Resize handling without polling
    const ro = new ResizeObserver(() => {
      if (!lenis.current) return;
      lenis.current.resize();
      ScrollTrigger.refresh();
    });
    ro.observe(document.documentElement);

    return () => {
      unsubscribe();
      ro.disconnect();

      if (lenis.current) {
        lenis.current.off("scroll", ScrollTrigger.update);
        lenis.current.destroy();
        lenis.current = null;
      }
    };
  }, []);

  return null;
}