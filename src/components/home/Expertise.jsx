"use client";

import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import Button from "../common/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: "Branding",
    content:
      "We craft brand identities that are strategic, emotionally resonant, and built to last. From research and positioning to visual systems and tone of voice, we help businesses stand out and stay consistent across every touchpoint.",
  },
  {
    title: "Website",
    content:
      "We craft brand identities that are strategic, emotionally resonant, and built to last. From research and positioning to visual systems and tone of voice, we help businesses stand out and stay consistent across every touchpoint.",
  },
  {
    title: "Marketing",
    content:
      "We craft brand identities that are strategic, emotionally resonant, and built to last. From research and positioning to visual systems and tone of voice, we help businesses stand out and stay consistent across every touchpoint.",
  },
  {
    title: "Print",
    content:
      "We craft brand identities that are strategic, emotionally resonant, and built to last. From research and positioning to visual systems and tone of voice, we help businesses stand out and stay consistent across every touchpoint.",
  },
];

const LAST_IDX = items.length - 1;

export default function Expertise() {
  const ref = useRef(null);
  const bulletRefs = useRef([]);
  const bulletWrapRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const activeIndexRef = useRef(-1);
  const prevIndexRef = useRef(-1);

  const forwardOrigin = useRef({ x: 0, y: 0 });
  const handedOff = useRef(false);
  // Tracks whether last bullet is currently fixed/traveling (blocks bullet cycling)
  const lastBulletIsFixed = useRef(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // ── Accordion index from scroll ──
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v < 0.1) {
        setActiveIndex(-1);
        prevIndexRef.current = -1;
        return;
      }
      const adjusted = (v - 0.1) / 0.9;
      const rawIndex = Math.min(LAST_IDX, Math.floor(adjusted * items.length));
      const prev = prevIndexRef.current;
      const next =
        prev === -1 ? rawIndex
        : rawIndex > prev + 1 ? prev + 1
        : rawIndex < prev - 1 ? prev - 1
        : rawIndex;
      prevIndexRef.current = next;
      setActiveIndex(next);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // ── Bullet scale cycling ──
  useEffect(() => {
    bulletRefs.current.forEach((b, i) => {
      if (!b) return;
      // Skip bullet 0 until circle has handed off
      if (i === 0 && !handedOff.current) return;
      // Skip last bullet while it's traveling to center
      if (i === LAST_IDX && lastBulletIsFixed.current) return;

      gsap.to(b, {
        scale: i === activeIndex ? 1 : 0,
        duration: 0.25,
        ease: "power2.out",
        overwrite: true,
      });
    });
  }, [activeIndex]);

  // ── GSAP animations ──
  useLayoutEffect(() => {
    if (!ref.current) return;

    // Snapshot circle2 origin at mount — immutable
    const circle = document.querySelector("#circle2");
    if (circle) {
      const r = circle.getBoundingClientRect();
      forwardOrigin.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }

    // All bullets start at scale 0
    bulletRefs.current.forEach((b) => {
      if (b) gsap.set(b, { scale: 0, opacity: 1 });
    });

    const ctx = gsap.context(() => {

      // ── 1. Circle2 → bullet0 travel ──
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 95%",
        end: "top top",
        scrub: 1,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const circle = document.querySelector("#circle2");
          const bullet0 = bulletRefs.current[0];
          if (!circle || !bullet0) return;

          const p = self.progress;
          const { x: fromX, y: fromY } = forwardOrigin.current;

          const r = bullet0.getBoundingClientRect();
          const toX = r.left + r.width / 2;
          const toY = r.top + r.height / 2;

          const moveP = Math.min(p / 0.8, 1);
          gsap.set(circle, {
            position: "fixed",
            left: fromX + (toX - fromX) * moveP,
            top: fromY + (toY - fromY) * moveP,
            xPercent: -50,
            yPercent: -50,
            autoRound: false,
          });

          const fadeP = Math.max(0, (p - 0.8) / 0.2);
          gsap.set(circle, { opacity: 1 - fadeP });
          gsap.set(bullet0, { scale: fadeP });
        },

        onLeave: () => {
          handedOff.current = true;
          const circle = document.querySelector("#circle2");
          if (circle) gsap.set(circle, { opacity: 0, left: -9999, top: -9999 });
          const b0 = bulletRefs.current[0];
          if (b0) gsap.set(b0, { scale: 1 });
          setActiveIndex(0);
        },

        onEnterBack: () => {
          handedOff.current = false;
          const circle = document.querySelector("#circle2");
          const bullet0 = bulletRefs.current[0];

          // Hide circle off-screen first
          if (circle) gsap.set(circle, { opacity: 0, left: -9999, top: -9999 });

          // Kill all bullets
          bulletRefs.current.forEach((b) => {
            if (b) gsap.set(b, { scale: 0 });
          });

          // Place circle at bullet0 silently after layout frame
          requestAnimationFrame(() => {
            if (!circle || !bullet0) return;
            const r = bullet0.getBoundingClientRect();
            gsap.set(circle, {
              position: "fixed",
              left: r.left + r.width / 2,
              top: r.top + r.height / 2,
              xPercent: -50,
              yPercent: -50,
              opacity: 1,
              autoRound: false,
            });
          });

          setActiveIndex(-1);
          prevIndexRef.current = -1;
        },
      });

      // ── 2. Last bullet → viewport center ──
      const lastWrap = bulletWrapRefs.current[LAST_IDX];
      const lastBullet = bulletRefs.current[LAST_IDX];
      if (!lastWrap || !lastBullet) return;

      // Stable flow position — measured once per enter, after pin settles
      const from = { x: 0, y: 0, ready: false };

      const captureFrom = () => {
        // Must clear fixed props before measuring natural position
        lastBulletIsFixed.current = false;
        gsap.set(lastWrap, { clearProps: "all" });
        // Restore scale that bullet cycling may have set
        gsap.set(lastBullet, { scale: 1 });

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Double rAF: first frame clears, second frame has reflow
            const r = lastWrap.getBoundingClientRect();
            from.x = r.left + r.width / 2;
            from.y = r.top + r.height / 2;
            from.ready = true;
          });
        });
      };

      ScrollTrigger.create({
        trigger: ref.current,
        start: "bottom bottom",
        end: "bottom 50%",
        scrub: 1,
        invalidateOnRefresh: true,

        onRefresh: () => {
          if (!lastBulletIsFixed.current) {
            from.ready = false;
            gsap.set(lastWrap, { clearProps: "all" });
            gsap.set(lastBullet, { scale: activeIndexRef.current === LAST_IDX ? 1 : 0 });
          }
        },

        onEnter: () => {
          if (activeIndexRef.current !== LAST_IDX) return;
          captureFrom();
        },

        onEnterBack: () => {
          // Coming back down from center — restore to flow position cleanly
          captureFrom();
        },

        onUpdate: (self) => {
          if (activeIndexRef.current !== LAST_IDX) {
            if (lastBulletIsFixed.current) {
              lastBulletIsFixed.current = false;
              gsap.set(lastWrap, { clearProps: "all" });
              gsap.set(lastBullet, { scale: 0 });
            }
            return;
          }
          if (!from.ready) return;

          lastBulletIsFixed.current = true;
          const toX = window.innerWidth * 0.5;
          const toY = window.innerHeight * 0.5;

          gsap.set(lastWrap, {
            position: "fixed",
            left: from.x + (toX - from.x) * self.progress,
            top: from.y + (toY - from.y) * self.progress,
            xPercent: -50,
            yPercent: -50,
            zIndex: 9999,
          });
        },

        onLeaveBack: () => {
          lastBulletIsFixed.current = false;
          from.ready = false;
          gsap.set(lastWrap, { clearProps: "all" });
          gsap.set(lastBullet, { scale: 1 }); // last accordion still active
        },

        onLeave: () => {
          if (activeIndexRef.current !== LAST_IDX) return;
          lastBulletIsFixed.current = true;
          gsap.set(lastWrap, {
            position: "fixed",
            left: window.innerWidth * 0.5,
            top: window.innerHeight * 0.5,
            xPercent: -50,
            yPercent: -50,
            zIndex: 9999,
          });
        },
      });

      // ── 3. Last bullet shrink + centerDot fade ──
      const centerDot = document.querySelector("#centerDot");
      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 25%",
          end: "bottom top",
          scrub: 1,
        },
      })
        .to(lastWrap, { scale: 0, ease: "none" }, "a")
        .to(centerDot, { opacity: 1, ease: "none" }, "a");

    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="page3" className="relative h-[300vh] cursor-default" ref={ref}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full px-4 sm:px-10 md:px-16 lg:px-20 mx-auto py-12 md:py-16 flex">

          {/* LEFT */}
          <div className="w-1/2 flex flex-col justify-between">
            <h1 className="heading-xl text-heading">Expertise</h1>
            <div>
              <Button title="KNOW MORE" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-1/2 relative pl-6 flex flex-col justify-start gap-6">
            {items.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <div key={i} className="relative border-b border-white/20 pb-6">
                  <div className="relative">
                    <div
                      ref={(el) => (bulletWrapRefs.current[i] = el)}
                      className="absolute -left-8.5 top-1/2 -translate-y-1/2 w-5 h-5"
                    >
                      <div
                        ref={(el) => (bulletRefs.current[i] = el)}
                        className="w-full h-full rounded-full bg-heading"
                      />
                    </div>

                    <h2 className={`cursor-pointer heading-lg transition-colors duration-300 ${isActive ? "text-subheading" : "text-desc"}`}>
                      {item.title}
                    </h2>
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