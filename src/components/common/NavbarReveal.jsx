"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function NavbarReveal() {
  useEffect(() => {
    const navEl = document.getElementById("site-nav");
    if (!navEl) return;

    gsap.killTweensOf(navEl);
    gsap.set(navEl, { pointerEvents: "auto" });
    gsap.fromTo(
      navEl,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
        clearProps: "transform",
      }
    );
  }, []);

  return null;
}

