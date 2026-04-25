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
// Match the Framer Motion accordion transition duration
const ACCORDION_DURATION_MS = 400;

export default function Expertise() {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const bulletWrapRefs = useRef([]);   // position anchors (invisible divs)
  const titleRefs = useRef([]);         // title elements — for accurate Y center
  const [activeIndex, setActiveIndex] = useState(-1);
  const activeIndexRef = useRef(-1);
  const prevIndexRef = useRef(-1);
  const router = useRouter();
  const moveTimerRef = useRef(null);   // debounce timer for accordion settle

  // The one traveling circle — positioned fixed, moved via GSAP
  const travelCircleRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => {
      mq.removeEventListener?.("change", onChange);
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // ── Accordion index from scroll ──
  useEffect(() => {
    if (isMobile) return;
    return scrollYProgress.on("change", (v) => {
      if (v < 0.1) {
        setActiveIndex(-1);
        prevIndexRef.current = -1;
        return;
      }
      const adjusted = (v - 0.1) / 0.9;
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

  // ── Move the travel circle ONLY after accordion has fully opened ──
  // Wait ACCORDION_DURATION_MS so layout is settled, then do one clean move.
  // No intermediate position = no bounce.
  useEffect(() => {
    if (isMobile) return;
    const circle = travelCircleRef.current;
    if (!circle) return;
    if (activeIndex < 0) return; // handled by circle2 handoff

    // Cancel any previous pending move + kill in-progress tweens so
    // the circle holds its current position while waiting
    if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
    gsap.killTweensOf(circle, "left,top");

    const wrap = bulletWrapRefs.current[activeIndex];
    const title = titleRefs.current[activeIndex];
    if (!wrap || !title) return;

    // Single deferred move — fires only after accordion animation completes
    moveTimerRef.current = setTimeout(() => {
      const wrapRect = wrap.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();

      const targetX = wrapRect.left + wrapRect.width / 2;
      const targetY = titleRect.top + titleRect.height / 2;

      gsap.to(circle, {
        left: targetX,
        top: targetY,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    }, ACCORDION_DURATION_MS);
  }, [activeIndex, isMobile]);

  // ── GSAP animations — circle2 handoff + last bullet travel to center ──
  useLayoutEffect(() => {
    if (isMobile) return;
    if (!ref.current) return;

    const circle2 = document.querySelector("#circle2");
    const travelCircle = travelCircleRef.current;

    // Travel circle starts hidden
    if (travelCircle) gsap.set(travelCircle, { opacity: 0 });

    const ctx = gsap.context(() => {

      // ── 1. circle2 morphs into the travel circle at bullet0 ──
      // forwardOrigin is captured LAZILY on first onUpdate (not at mount)
      // so it always reflects circle2's true position at scroll-entry time,
      // regardless of what AboutStudio's GSAP timeline did to it.
      let forwardOrigin = null;

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 95%",
        end: "top top",
        scrub: 1,
        invalidateOnRefresh: true,

        onRefresh: () => {
          // On resize/invalidate, reset so next onEnter re-captures fresh coords.
          forwardOrigin = null;
        },

        onEnter: () => {
          // Capture circle2's real position the moment the user enters this zone.
          // At this point AboutStudio has finished animating it to the dot center.
          if (circle2) {
            const r = circle2.getBoundingClientRect();
            forwardOrigin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
          }
        },

        onEnterBack: () => {
          // Re-capture the TRUE resting position of circle2 (= lastDot center)
          // NOT from circle2 itself which may be mid-animation.
          const lastDot = document.querySelector("[data-last-dot]");
          if (lastDot) {
            const r = lastDot.getBoundingClientRect();
            forwardOrigin = { x: window.innerWidth / 2, y: r.top + r.height / 2 };
          } else if (circle2) {
            const r = circle2.getBoundingClientRect();
            forwardOrigin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
          }
        },

        onUpdate: (self) => {
          if (!circle2 || !travelCircle) return;
          // If we somehow hit onUpdate before onEnter (scrub edge case), capture now.
          if (!forwardOrigin) {
            const r = circle2.getBoundingClientRect();
            forwardOrigin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
          }
          const p = self.progress;

          const wrap0 = bulletWrapRefs.current[0];
          if (!wrap0) return;
          const r = wrap0.getBoundingClientRect();
          const toX = r.left + r.width / 2;
          const toY = r.top + r.height / 2;

          const moveP = Math.min(p / 0.8, 1);

          // circle2 travels from its captured origin toward bullet0
          gsap.set(circle2, {
            position: "fixed",
            left: forwardOrigin.x + (toX - forwardOrigin.x) * moveP,
            top: forwardOrigin.y + (toY - forwardOrigin.y) * moveP,
            xPercent: -50,
            yPercent: -50,
            autoRound: false,
            opacity: 1,
          });

          // As circle2 arrives, fade it out and fade travel circle in
          const fadeP = Math.max(0, (p - 0.8) / 0.2);
          gsap.set(circle2, { opacity: 1 - fadeP });

          // Position travel circle at bullet0 and fade it in
          gsap.set(travelCircle, {
            left: toX,
            top: toY,
            opacity: fadeP,
          });
        },

        onLeave: () => {
          // circle2 disappears, travel circle fully visible at bullet0
          if (circle2) gsap.set(circle2, { opacity: 0, left: -9999, top: -9999 });
          const wrap0 = bulletWrapRefs.current[0];
          if (wrap0 && travelCircle) {
            const r = wrap0.getBoundingClientRect();
            gsap.set(travelCircle, {
              left: r.left + r.width / 2,
              top: r.top + r.height / 2,
              opacity: 1,
            });
          }
          setActiveIndex(0);
        },

        onEnterBack: () => {
          // Scrolling back up — hide travel circle.
          // Restore circle2 to screen center X + lastDot's Y so it overlays
          // exactly where AboutStudio left it (not wrap0 which has a different Y).
          if (travelCircle) gsap.set(travelCircle, { opacity: 0 });

          if (circle2) {
            // Try to read lastDot position from AboutStudio via a data attribute
            // or fall back to forwardOrigin which was captured on the way down.
            const lastDot = document.querySelector("[data-last-dot]");
            if (lastDot) {
              const r = lastDot.getBoundingClientRect();
              gsap.set(circle2, {
                position: "fixed",
                left: window.innerWidth / 2,
                top: r.top + r.height / 2,
                xPercent: -50,
                yPercent: -50,
                opacity: 1,
                autoRound: false,
              });
            } else if (forwardOrigin) {
              gsap.set(circle2, {
                position: "fixed",
                left: forwardOrigin.x,
                top: forwardOrigin.y,
                xPercent: -50,
                yPercent: -50,
                opacity: 1,
                autoRound: false,
              });
            }
          }

          setActiveIndex(-1);
          prevIndexRef.current = -1;
        },
      });

      // ── 2. Travel circle moves to viewport center on last item ──
      const lastWrap = bulletWrapRefs.current[LAST_IDX];
      if (!lastWrap || !travelCircle) return;

      let fromCenter = { x: 0, y: 0, ready: false };

      const captureFrom = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const r = lastWrap.getBoundingClientRect();
            fromCenter.x = r.left + r.width / 2;
            fromCenter.y = r.top + r.height / 2;
            fromCenter.ready = true;
          });
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
          captureFrom();
        },

        onEnterBack: () => {
          captureFrom();
        },

        onUpdate: (self) => {
          if (activeIndexRef.current !== LAST_IDX) return;
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
          fromCenter.ready = false;
          // Snap back to last wrap position
          const r = lastWrap.getBoundingClientRect();
          gsap.set(travelCircle, {
            left: r.left + r.width / 2,
            top: r.top + r.height / 2,
            opacity: 1,
          });
        },

        onLeave: () => {
          if (activeIndexRef.current !== LAST_IDX) return;
          gsap.set(travelCircle, {
            left: window.innerWidth * 0.5,
            top: window.innerHeight * 0.5,
            opacity: 1,
          });
        },
      });

      // ── 3. Travel circle shrink + centerDot fade in ──
      const centerDot = document.querySelector("#centerDot");
      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 25%",
          end: "bottom top",
          scrub: 1,
        },
      })
        .to(travelCircle, { scale: 0, ease: "none" }, "a")
        .to(centerDot, { opacity: 1,  ease: "none" }, "a");

    }, ref);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <section id="page3" className="relative h-[300vh] cursor-default" ref={ref}>
      {/* Single traveling circle — absolutely positioned fixed in viewport */}
      <div
        ref={travelCircleRef}
        style={{
          position: "fixed",
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: "var(--color-heading, #fff)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          opacity: 0,
        }}
      />

      <div className="sticky top-0 h-screen flex items-start">
        <div className="w-full px-4 sm:px-10 md:px-16 lg:px-20 mx-auto pt-[22vh] pb-12 flex">

          {/* LEFT */}
          <div className="w-1/2 flex flex-col justify-between">
            <h2 className="heading-xl text-heading">Expertise</h2>
            <div>
              <Button title="Explore our expertise" onClick={() => {
                router.push("/expertise");
              }} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-1/2 relative pl-6 flex flex-col justify-start gap-6">
            {expertiseItems.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <div key={i} className="relative border-b border-white/20 pb-6">
                  <div className="relative">
                    {/* Invisible anchor — X position for the traveling circle */}
                    <div
                      ref={(el) => (bulletWrapRefs.current[i] = el)}
                      className="absolute -left-8.5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />

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
