"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Spiral as Hamburger } from "hamburger-react";
import FullscreenMenu from "./FullscreenMenu";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com/wearepointof" },
    { name: "LinkedIn", href: "https://linkedin.com/company/wearepointof" },
    { name: "Behance", href: "https://www.behance.net/wearepointof" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navRef = useRef(null);
  const tl = useRef(null);
  const refP = useRef(null);
  const refOINT = useRef(null);
  const refO = useRef(null);
  const refF = useRef(null);
  const logoRef = useRef(null);

  // Fullscreen menu animation
  useEffect(() => {
    if (!navRef.current) return;
    gsap.set(navRef.current, {
      top: "-100vh",
      clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
    });
    tl.current = gsap.timeline({ paused: true });
    tl.current
      .to(navRef.current, {
        top: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power4.out",
      })
      .from(
        navRef.current.querySelectorAll(".nav-item"),
        { x: 50, opacity: 0, duration: 1.5, stagger: 0.1, ease: "power4.out" },
        "<"
      );
  }, []);

  // Menu open/close
  useEffect(() => {
    if (!tl.current) return;
    if (menuOpen) {
      tl.current.timeScale(1).play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current.timeScale(1.8).reverse();
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  // Scroll logo collapse
  useEffect(() => {
    if (!logoRef.current) return;

    let scrollTl;
    let resizeObserver;

    const buildTimeline = () => {
      // 1. Kill existing
      if (scrollTl) scrollTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());

      // 2. Hard reset every transform so measurements are clean
      gsap.set([refOINT.current, refF.current], { clearProps: "all" });
      gsap.set(refP.current, { clearProps: "all" });
      gsap.set(refO.current, { clearProps: "all" });
      const span = refP.current?.querySelector("span");
      if (span) gsap.set(span, { opacity: 0 });

      // 3. Measure after DOM settles
      const pRect  = refP.current.getBoundingClientRect();
      const oRect  = refO.current.getBoundingClientRect();

      const pWidth = pRect.width;
      const oWidth = oRect.width;

      // Gap = full width of OINT (space between P right edge and O left edge)
      const gap = oRect.left - pRect.right;

      // P shifts right by its own full width
      // O shifts left by a third of its own width
      // Together they converge symmetrically toward the navbar center
      const pShift =  pWidth;
      const oShift = -(oWidth / 3);

      // 4. Build timeline
      scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=400",
          scrub: true,
        },
      });

      // // Phase 1 — fade OINT + F out
      // scrollTl.to(
      //   [refOINT.current, refF.current],
      //   { opacity: 0, ease: "power2.out", duration: 0.5 },
      //   0
      // );

      // Phase 2 — collapse OINT width
      scrollTl.to(
        refOINT.current,
        { width: 0,opacity: 0, ease: "power2.inOut", duration: 0.5 },
        0.5
      );

      // Phase 2 — collapse F width
      scrollTl.to(
        refF.current,
        { width: 0,opacity: 0, ease: "power2.inOut", duration: 0.5 },
        0.5
      );

      // Phase 2 — P: move right + rise up
      scrollTl.to(
        refP.current,
        { x: pShift, y: "-100%", ease: "power2.inOut", duration: 0.5 },
        0.5
      );

      // Phase 2 — dot under P fades in
      if (span) {
        scrollTl.to(
          span,
          { opacity: 1, ease: "power2.inOut", duration: 0.5 },
          0.5
        );
      }

      // Phase 2 — O: nudge left to close the gap
      scrollTl.to(
        refO.current,
        { x: oShift, ease: "power2.inOut", duration: 0.5 },
        0.5
      );
    };

    // Small debounce on resize to avoid thrashing
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildTimeline, 100);
    };

    buildTimeline();

    resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.documentElement);

    return () => {
      clearTimeout(resizeTimer);
      if (scrollTl) scrollTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 text-foreground ${
          pathname === "/work" ? "" : "nav-gradient"
        }`}
      >
        <div className="relative z-30 flex items-center justify-between h-20 px-6 md:px-12">
          <div className="w-5" />

          <div className="absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setMenuOpen(false)}
              ref={logoRef}
            >
              {/* P */}
              <div ref={refP} className="relative flex-shrink-0">
                <Image
                  src="/logo/p.png"
                  alt="P"
                  width={180}
                  height={100}
                  className="h-[18px] w-auto invert object-contain"
                  priority
                />
                <span className="absolute left-0 opacity-0 top-full mt-1 w-1 h-1 bg-heading inline-block rounded-full" />
              </div>

              {/* OINT — fades then collapses */}
              <div
                ref={refOINT}
                className="flex-shrink-0 overflow-hidden"
                style={{ whiteSpace: "nowrap" }}
              >
                <Image
                  src="/logo/oint.png"
                  alt="OINT"
                  width={180}
                  height={100}
                  className="h-[18px] w-auto invert object-contain"
                  priority
                />
              </div>

              {/* O */}
              <div ref={refO} className="flex-shrink-0">
                <Image
                  src="/logo/o.png"
                  alt="O"
                  width={180}
                  height={100}
                  className="h-[18px] w-auto invert object-contain"
                  priority
                />
              </div>

              {/* F — fades then collapses */}
              <div ref={refF} className="flex-shrink-0 overflow-hidden">
                <Image
                  src="/logo/f.png"
                  alt="F"
                  width={180}
                  height={100}
                  className="h-[18px] w-auto invert object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          <Hamburger toggled={menuOpen} toggle={setMenuOpen} size={20} />
        </div>

        <FullscreenMenu
          ref={navRef}
          pathname={pathname}
          setMenuOpen={setMenuOpen}
          socialLinks={socialLinks}
        />
      </nav>
    </>
  );
}