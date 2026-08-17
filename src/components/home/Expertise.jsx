"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import Button from "../common/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { expertiseItems } from "@/helper/expertise-items";
gsap.registerPlugin(ScrollTrigger);

const LAST_IDX = expertiseItems.length - 1;
const EXPERTISE_SCROLL_START = 0.02;
const EXPERTISE_SCROLL_END = 0.82;

export default function Expertise() {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const bulletWrapRefs = useRef([]);
  const itemDotRefs = useRef([]);
  const titleRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const activeIndexRef = useRef(-1);
  const prevIndexRef = useRef(-1);
  const router = useRouter();
  const isBottomHandoffRef = useRef(false);
  const introDoneRef = useRef(false);
  const skipDotAnimRef = useRef(false);
  const [bottomHandoff, setBottomHandoff] = useState(false);

  // Used only after the last item—travels to viewport center
  const travelCircleRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (isMobile) return;
    return scrollYProgress.on("change", (v) => {
      if (isBottomHandoffRef.current) return;

      // Don't open Branding until the AboutStudio dot has arrived and swapped.
      if (!introDoneRef.current) {
        if (activeIndexRef.current !== -1) setActiveIndex(-1);
        return;
      }

      if (v < EXPERTISE_SCROLL_START) {
        if (activeIndexRef.current !== 0) {
          setActiveIndex(0);
          prevIndexRef.current = 0;
        }
        return;
      }
      const adjusted = Math.min(
        0.999,
        Math.max(0, (v - EXPERTISE_SCROLL_START) / (EXPERTISE_SCROLL_END - EXPERTISE_SCROLL_START))
      );
      const rawIndex = Math.min(LAST_IDX, Math.floor(adjusted * expertiseItems.length));
      const prev = prevIndexRef.current;
      const next =
        prev === -1 ? rawIndex
        : rawIndex > prev + 1 ? prev + 1
        : rawIndex < prev - 1 ? prev - 1
        : rawIndex;
      prevIndexRef.current = next;
      setActiveIndex(next);
    });
  }, [scrollYProgress, isMobile]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (!skipDotAnimRef.current) return;
    const id = requestAnimationFrame(() => {
      skipDotAnimRef.current = false;
    });
    return () => cancelAnimationFrame(id);
  }, [activeIndex]);

  useLayoutEffect(() => {
    if (isMobile) return;
    if (!ref.current) return;

    const circle2 = document.querySelector("#circle2");
    const travelCircle = travelCircleRef.current;

    if (travelCircle) gsap.set(travelCircle, { opacity: 0, scale: 1 });

    const ctx = gsap.context(() => {
      let forwardOrigin = null;

      const aboutStudioDotOrigin = () => ({
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.8,
      });

      const getItemTarget = (index) => {
        const wrap = bulletWrapRefs.current[index];
        const title = titleRefs.current[index];
        if (!wrap) return null;
        const wrapRect = wrap.getBoundingClientRect();
        const titleRect = title?.getBoundingClientRect();
        return {
          x: wrapRect.left + wrapRect.width / 2,
          y: titleRect
            ? titleRect.top + titleRect.height / 2
            : wrapRect.top + wrapRect.height / 2,
        };
      };

      const placeCircle2 = (x, y, opacity = 1) => {
        if (!circle2) return;
        gsap.set(circle2, {
          position: "fixed",
          left: x,
          top: y,
          xPercent: -50,
          yPercent: -50,
          width: 20,
          height: 20,
          scale: 1,
          zIndex: 30,
          autoRound: false,
          opacity,
        });
      };

      const restoreCircle2ToAboutStudio = () => {
        const origin = aboutStudioDotOrigin();
        placeCircle2(origin.x, origin.y, 1);
        if (circle2) gsap.set(circle2, { zIndex: 0 });
      };

      const hideItemDot = (index) => {
        const dot = itemDotRefs.current[index];
        if (dot) gsap.set(dot, { scale: 0, transformOrigin: "50% 50%" });
      };

      const showItemDot = (index) => {
        const dot = itemDotRefs.current[index];
        if (dot) gsap.set(dot, { scale: 1, transformOrigin: "50% 50%" });
      };

      // ── 1. Incoming dot travels to Branding (items stay closed). On arrival,
      //     swap instantly onto Branding's own dot, then open the item.
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        end: "top top",
        scrub: 1,
        invalidateOnRefresh: true,

        onRefresh: () => {
          forwardOrigin = aboutStudioDotOrigin();
        },

        onEnter: () => {
          introDoneRef.current = false;
          setActiveIndex(-1);
          hideItemDot(0);
          forwardOrigin = aboutStudioDotOrigin();
          if (circle2) {
            const r = circle2.getBoundingClientRect();
            forwardOrigin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
          }
        },

        onUpdate: (self) => {
          if (!circle2) return;
          if (!forwardOrigin) forwardOrigin = aboutStudioDotOrigin();

          const target = getItemTarget(0);
          if (!target) return;

          // Travel at full opacity—no fade, no item dot yet.
          placeCircle2(
            forwardOrigin.x + (target.x - forwardOrigin.x) * self.progress,
            forwardOrigin.y + (target.y - forwardOrigin.y) * self.progress,
            1
          );
        },

        onLeave: () => {
          const target = getItemTarget(0);
          if (target) placeCircle2(target.x, target.y, 1);

          // Same paint: hide traveler and snap Branding's dot on — one continuous dot.
          skipDotAnimRef.current = true;
          showItemDot(0);
          if (circle2) gsap.set(circle2, { opacity: 0, left: -9999, top: -9999, zIndex: 0 });

          introDoneRef.current = true;
          prevIndexRef.current = 0;
          setActiveIndex(0);
        },

        onEnterBack: () => {
          introDoneRef.current = false;
          skipDotAnimRef.current = true;
          const target = getItemTarget(0);
          hideItemDot(0);
          if (target) placeCircle2(target.x, target.y, 1);
          setActiveIndex(-1);
          prevIndexRef.current = -1;
        },

        onLeaveBack: () => {
          restoreCircle2ToAboutStudio();
        },
      });

      // ── 2. After last item, travel circle moves to viewport center ──
      const lastWrap = bulletWrapRefs.current[LAST_IDX];
      if (!lastWrap || !travelCircle) return;

      let fromCenter = { x: 0, y: 0, ready: false };

      const captureFrom = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const target = getItemTarget(LAST_IDX);
            if (!target) return;
            fromCenter.x = target.x;
            fromCenter.y = target.y;
            fromCenter.ready = true;
          });
        });
      };

      const placeTravelAtLastItem = () => {
        const target = getItemTarget(LAST_IDX);
        if (!target) return;
        gsap.set(travelCircle, {
          left: target.x,
          top: target.y,
          scale: 1,
          opacity: 1,
        });
      };

      ScrollTrigger.create({
        trigger: ref.current,
        start: "bottom bottom",
        end: "bottom 50%",
        scrub: 1,
        invalidateOnRefresh: true,

        onEnter: () => {
          if (activeIndexRef.current !== LAST_IDX) return;
          isBottomHandoffRef.current = true;
          setBottomHandoff(true);
          captureFrom();
          placeTravelAtLastItem();
        },

        onEnterBack: () => {
          isBottomHandoffRef.current = true;
          setBottomHandoff(true);
          captureFrom();
          setActiveIndex(LAST_IDX);
          prevIndexRef.current = LAST_IDX;
        },

        onUpdate: (self) => {
          if (activeIndexRef.current !== LAST_IDX && !isBottomHandoffRef.current) return;
          if (!fromCenter.ready) return;

          const toX = window.innerWidth * 0.5;
          const toY = window.innerHeight * 0.5;

          gsap.set(travelCircle, {
            left: fromCenter.x + (toX - fromCenter.x) * self.progress,
            top: fromCenter.y + (toY - fromCenter.y) * self.progress,
            opacity: 1,
          });
        },

        onLeaveBack: () => {
          isBottomHandoffRef.current = false;
          setBottomHandoff(false);
          fromCenter.ready = false;
          if (travelCircle) gsap.set(travelCircle, { opacity: 0 });
          setActiveIndex(LAST_IDX);
          prevIndexRef.current = LAST_IDX;
        },

        onLeave: () => {
          if (activeIndexRef.current !== LAST_IDX && !isBottomHandoffRef.current) return;
          isBottomHandoffRef.current = true;
          setBottomHandoff(true);
          gsap.set(travelCircle, {
            left: window.innerWidth * 0.5,
            top: window.innerHeight * 0.5,
            opacity: 1,
          });
        },
      });

      // ── 3. Travel circle shrink + centerDot fade in ──
      const centerDot = document.querySelector("#centerDot");
      ScrollTrigger.create({
        trigger: ref.current,
        start: "bottom 25%",
        end: "bottom top",
        scrub: 1,
        onEnterBack: () => {
          isBottomHandoffRef.current = true;
          setBottomHandoff(true);
          gsap.set(travelCircle, {
            left: window.innerWidth * 0.5,
            top: window.innerHeight * 0.5,
            scale: 0,
            opacity: 1,
          });
          setActiveIndex(LAST_IDX);
          prevIndexRef.current = LAST_IDX;
          if (centerDot) gsap.set(centerDot, { opacity: 0 });
        },
        onUpdate: (self) => {
          if (self.direction < 0) {
            isBottomHandoffRef.current = true;
            setBottomHandoff(true);
            gsap.set(travelCircle, {
              left: window.innerWidth * 0.5,
              top: window.innerHeight * 0.5,
              scale: 1 - self.progress,
              opacity: 1,
            });
            if (centerDot) gsap.set(centerDot, { opacity: 0 });
            return;
          }

          isBottomHandoffRef.current = true;
          setBottomHandoff(true);

          gsap.set(travelCircle, {
            scale: 1 - self.progress,
            opacity: 1,
          });
          if (centerDot) {
            gsap.set(centerDot, { opacity: self.progress });
          }
        },
        onLeave: () => {
          isBottomHandoffRef.current = true;
          setBottomHandoff(true);
          gsap.set(travelCircle, { scale: 0, opacity: 1 });
          if (centerDot) gsap.set(centerDot, { opacity: 1 });
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <section id="page3" className="relative h-[400vh] bg-background cursor-default" ref={ref}>
      <div
        ref={travelCircleRef}
        style={{
          position: "fixed",
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: "var(--color-secondary, #E8E8E1)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          opacity: 0,
          zIndex: 0,
        }}
      />

      <div className="sticky top-0 h-screen flex items-start">
        <div className="w-full px-4 sm:px-10 md:px-16 lg:px-20 mx-auto pt-[22vh] pb-12 flex">

          <div className="w-1/2 flex flex-col justify-between">
            <h2 className="heading-xl text-heading">Expertise</h2>
            <div>
              <Button title="Explore our expertise" onClick={() => {
                router.push("/expertise");
              }} />
            </div>
          </div>

          <div className="w-1/2 relative pl-6 flex flex-col justify-start gap-6">
            {expertiseItems.map((item, i) => {
              const isActive = i === activeIndex;
              const showDot = isActive && !(bottomHandoff && i === LAST_IDX);
              return (
                <div key={i} className="relative border-b border-white/20 pb-6">
                  <div className="relative">
                    <div
                      ref={(el) => (bulletWrapRefs.current[i] = el)}
                      className="absolute -left-8.5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                    >
                      <motion.div
                        ref={(el) => (itemDotRefs.current[i] = el)}
                        initial={false}
                        animate={{ scale: showDot ? 1 : 0 }}
                        transition={
                          skipDotAnimRef.current
                            ? { duration: 0 }
                            : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                        }
                        className="h-full w-full origin-center rounded-full bg-secondary"
                      />
                    </div>

                    <Link
                      ref={(el) => (titleRefs.current[i] = el)}
                      href={`/expertise/${item.slug}`}
                      className={`group block text-left hover:text-heading cursor-pointer heading-lg transition-colors duration-300 ${isActive ? "text-subheading" : "text-desc"}`}
                      title={item.title}
                    >
                      <span className="inline-flex items-center">
                        <span>{item.title}</span>
                        <span className="inline-flex items-center ml-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.293 5.293a1 1 0 011.414 0l4.293 4.293a1 1 0 010 1.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" fill="currentColor"/>
                          </svg>
                        </span>
                      </span>
                    </Link>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <p className="para text-desc mt-4 max-w-xl">{item.content}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
