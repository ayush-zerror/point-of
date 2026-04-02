"use client";
import gsap from 'gsap';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react'
const DEFAULT_PROJECTS = [
  {
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/021e2e203085493.6690e78c7a22d.png",
    name: "Contigo Tequila",
    slug: "contigo-tequila",
    description: "Bridging Mexico and India.",
    titles: ["Contigo", "Tequila"],
  },
  {
    coverImage: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/8bf51c209757845.67053c2f6afcf.png",
    name: "Typcaste",
    slug: "typcaste",
    description: "Breaking design's status quo.",
    titles: ["Typcaste"],
  },
  {
    coverImage: "https://www.wearepointof.com/projects/Label%20Ritu%20Kumar/image%20(1).webp",
    name: "Label Ritu Kumar",
    slug: "label-ritu-kumar",
    description: "Fashion empire meets the social generation.",
    titles: ["Label", "Ritu Kumar"],
  },
];
// clip-path constants — exact values from vanilla JS
const CLIP_VISIBLE = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const CLIP_HIDDEN_TOP = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";        // collapses to top
const CLIP_HIDDEN_BOTTOM = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"; // collapses to bottom

const toSlug = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");


const WorkSection = ({ projects = DEFAULT_PROJECTS }) => {
  const items = useMemo(
    () =>
      (projects ?? []).map((project) => ({
        ...project,
        slug:
          project.slug ||
          toSlug(project.name || (Array.isArray(project.titles) ? project.titles.join(" ") : "project")),
      })),
    [projects]
  );
  const containerRef = useRef(null);
  const touchStartYRef = useRef(null);
  const cooldownRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const currentIndexRef = useRef(0);

  const bgRefs = useRef([]);   // background <img> refs
  const centerRefs = useRef([]); // center (child) <img> refs
  const textRefs = useRef([]); // array of arrays of title refs per slide
  const descRefs = useRef([]); // description <p> refs per slide
  const counterRefs = useRef([]); // counter <span> refs per slide

  const [scrollDirection, setScrollDirection] = useState(null); // 'up' | 'down' | null
  const [activeIndex, setActiveIndex] = useState(0);

  const pad2 = (n) => String(n).padStart(2, "0");

  const applyTextCounterRestState = (activeIdx, forward) => {
    for (let i = 0; i < items.length; i++) {
      const h1s = textRefs.current[i];
      if (h1s?.length) {
        if (i === activeIdx) {
          gsap.set(h1s, { rotate: 0, y: "0%", opacity: 1 });
        } else {
          gsap.set(h1s, {
            rotate: forward ? 5 : -5,
            y: forward ? "100%" : "-100%",
            opacity: 0,
          });
        }
      }

      const desc = descRefs.current[i];
      if (desc) {
        if (i === activeIdx) {
          gsap.set(desc, { y: "0%", opacity: 1 });
        } else {
          gsap.set(desc, { y: forward ? "100%" : "-100%", opacity: 0 });
        }
      }

      const cnt = counterRefs.current[i];
      if (cnt) {
        if (i === activeIdx) {
          gsap.set(cnt, { top: "0%", opacity: 0.7 });
        } else {
          gsap.set(cnt, { top: forward ? "100%" : "-100%", opacity: 0 });
        }
      }
    }
  };

  useEffect(() => {
    if (!items.length) return;
    // Initial state: first visible, rest staged for scroll DOWN.
    applyTextCounterRestState(0, true);
  }, [items]);

  // Put BOTH "down" animations here so they run together.
  const runDownAnimations = () => {
    if (isAnimatingRef.current) return null;
    const total = items.length;
    if (!total) return null;

    const current = currentIndexRef.current % total;
    const next = (current + 1) % total;

    const bgCurrent = bgRefs.current[current];
    const bgNext = bgRefs.current[next];
    const ctrCurrent = centerRefs.current[current];
    const ctrNext = centerRefs.current[next];
    if (!bgCurrent || !bgNext || !ctrCurrent || !ctrNext) return null;

    const h1sPrev = textRefs.current[current];
    const h1sNext = textRefs.current[next];
    const descPrev = descRefs.current[current];
    const descNext = descRefs.current[next];
    const cntPrev = counterRefs.current[current];
    const cntNext = counterRefs.current[next];

    // Ensure a clean starting state for this step
    bgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        clipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
        webkitClipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
        zIndex: i === current ? 2 : 0,
      });
    });
    gsap.set(bgNext, { zIndex: 1, clipPath: CLIP_HIDDEN_BOTTOM, webkitClipPath: CLIP_HIDDEN_BOTTOM });

    // Center layer (child): inactive waits hidden at TOP (ready to enter from top on down)
    centerRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        clipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
        webkitClipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
        zIndex: i === current ? 2 : 0,
      });
    });
    gsap.set(ctrNext, { zIndex: 1, clipPath: CLIP_HIDDEN_TOP, webkitClipPath: CLIP_HIDDEN_TOP });

    // Prepare incoming text/counter (DOWN = forward)
    if (h1sNext?.length) gsap.set(h1sNext, { rotate: 5, y: "100%", opacity: 0 });
    if (descNext) gsap.set(descNext, { y: "100%", opacity: 0 });
    if (cntNext) gsap.set(cntNext, { top: "100%", opacity: 0 });

    isAnimatingRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        currentIndexRef.current = next;
        setActiveIndex(next);

        // Rest state after every animation (including wrap):
        bgRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, {
            clipPath: i === next ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
            webkitClipPath: i === next ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
            zIndex: i === next ? 1 : 0,
          });
        });

        // Center rest state after DOWN: inactive hidden at TOP
        centerRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, {
            clipPath: i === next ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
            webkitClipPath: i === next ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
            zIndex: i === next ? 1 : 0,
          });
        });

        applyTextCounterRestState(next, true);
        isAnimatingRef.current = false;
      },
      onInterrupt: () => {
        isAnimatingRef.current = false;
      },
    });

    // TODO: add your BG animation(s)
    tl.to(
      bgCurrent,
      {
        clipPath: CLIP_HIDDEN_TOP,
        webkitClipPath: CLIP_HIDDEN_TOP,
        duration: 1,
      },
      0
    );

    // TODO: add your 2nd animation(s) (child/text/etc)
    tl.to(
      bgNext,
      {
        clipPath: CLIP_VISIBLE,
        webkitClipPath: CLIP_VISIBLE,
        duration: 1,
      },
      0
    );

    // Center current exits to BOTTOM (opposite of BG)
    tl.to(
      ctrCurrent,
      {
        clipPath: CLIP_HIDDEN_BOTTOM,
        webkitClipPath: CLIP_HIDDEN_BOTTOM,
        duration: 1,
      },
      0
    );

    // Center next enters from TOP
    tl.to(
      ctrNext,
      {
        clipPath: CLIP_VISIBLE,
        webkitClipPath: CLIP_VISIBLE,
        duration: 1,
      },
      0
    );

    // --- Text + description + counter (DOWN) ---
    if (h1sPrev?.length) {
      tl.to(
        h1sPrev,
        {
          rotate: -5,
          y: "-100%",
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete() {
            gsap.set(h1sPrev, { rotate: 5, y: "100%" });
          },
        },
        0
      );
    }

    if (h1sNext?.length) {
      tl.to(
        h1sNext,
        {
          rotate: 0,
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        0
      );
    }

    if (descPrev) {
      tl.to(
        descPrev,
        { y: "-100%", opacity: 0, duration: 0.8, ease: "power2.out" },
        0
      );
    }
    if (descNext) {
      tl.to(
        descNext,
        { y: "0%", opacity: 1, duration: 0.8, ease: "power2.out" },
        0
      );
    }

    if (cntPrev) {
      tl.to(
        cntPrev,
        {
          top: "-100%",
          opacity: 0,
          duration: 0.8,
          onComplete() {
            gsap.set(cntPrev, { top: "100%", opacity: 0 });
          },
        },
        0
      );
    }
    if (cntNext) {
      tl.to(cntNext, { top: "0%", opacity: 0.7, duration: 0.8 }, 0);
    }

    return tl;
  };
  const runUpAnimations = () => {
    if (isAnimatingRef.current) return null;
    const total = items.length;
    if (!total) return null;

    const current = currentIndexRef.current % total;
    const prev = (current - 1 + total) % total;

    const bgCurrent = bgRefs.current[current];
    const bgPrev = bgRefs.current[prev];
    const ctrCurrent = centerRefs.current[current];
    const ctrPrev = centerRefs.current[prev];
    if (!bgCurrent || !bgPrev || !ctrCurrent || !ctrPrev) return null;

    const h1sPrev = textRefs.current[current];
    const h1sNext = textRefs.current[prev];
    const descPrev = descRefs.current[current];
    const descNext = descRefs.current[prev];
    const cntPrev = counterRefs.current[current];
    const cntNext = counterRefs.current[prev];

    // Ensure a clean starting state for this step
    bgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        // For UP: keep current visible; park others hidden at TOP
        clipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
        webkitClipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
        zIndex: i === current ? 2 : 0,
      });

    });
    gsap.set(bgPrev, { zIndex: 1, clipPath: CLIP_HIDDEN_TOP, webkitClipPath: CLIP_HIDDEN_TOP });

    // Center layer for UP: inactive waits hidden at BOTTOM (ready to enter from bottom on up)
    centerRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        clipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
        webkitClipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
        zIndex: i === current ? 2 : 0,
      });
    });
    gsap.set(ctrPrev, { zIndex: 1, clipPath: CLIP_HIDDEN_BOTTOM, webkitClipPath: CLIP_HIDDEN_BOTTOM });

    // Prepare incoming text/counter (UP = backward)
    if (h1sNext?.length) gsap.set(h1sNext, { rotate: -5, y: "-100%", opacity: 0 });
    if (descNext) gsap.set(descNext, { y: "-100%", opacity: 0 });
    if (cntNext) gsap.set(cntNext, { top: "-100%", opacity: 0 });

    isAnimatingRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        currentIndexRef.current = prev;
        setActiveIndex(prev);

        // Rest state after every animation (including wrap):
        bgRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, {
            clipPath: i === prev ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
            webkitClipPath: i === prev ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
            zIndex: i === prev ? 1 : 0,
          });
        });

        // Center rest state after UP: inactive hidden at BOTTOM
        centerRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, {
            clipPath: i === prev ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
            webkitClipPath: i === prev ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
            zIndex: i === prev ? 1 : 0,
          });
        });

        applyTextCounterRestState(prev, false);
        isAnimatingRef.current = false;
      },
      onInterrupt: () => {
        isAnimatingRef.current = false;
      },
    });

    // BG current exits to BOTTOM (mirror of down)
    tl.to(
      bgCurrent,
      {
        clipPath: CLIP_HIDDEN_BOTTOM,
        webkitClipPath: CLIP_HIDDEN_BOTTOM,
        duration: 1,
      },
      0
    );

    // BG prev enters from TOP
    tl.to(
      bgPrev,
      {
        clipPath: CLIP_VISIBLE,
        webkitClipPath: CLIP_VISIBLE,
        duration: 1,
      },
      0
    );

    // Center current exits to TOP (opposite of BG on UP)
    tl.to(
      ctrCurrent,
      {
        clipPath: CLIP_HIDDEN_TOP,
        webkitClipPath: CLIP_HIDDEN_TOP,
        duration: 1,
      },
      0
    );

    // Center prev enters from BOTTOM
    tl.to(
      ctrPrev,
      {
        clipPath: CLIP_VISIBLE,
        webkitClipPath: CLIP_VISIBLE,
        duration: 1,
      },
      0
    );

    // --- Text + description + counter (UP) ---
    if (h1sPrev?.length) {
      tl.to(
        h1sPrev,
        {
          rotate: 5,
          y: "100%",
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete() {
            gsap.set(h1sPrev, { rotate: -5, y: "-100%" });
          },
        },
        0
      );
    }

    if (h1sNext?.length) {
      tl.to(
        h1sNext,
        {
          rotate: 0,
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        0
      );
    }

    if (descPrev) {
      tl.to(
        descPrev,
        { y: "100%", opacity: 0, duration: 0.8, ease: "power2.out" },
        0
      );
    }
    if (descNext) {
      tl.to(
        descNext,
        { y: "0%", opacity: 1, duration: 0.8, ease: "power2.out" },
        0
      );
    }

    if (cntPrev) {
      tl.to(
        cntPrev,
        {
          top: "100%",
          opacity: 0,
          duration: 0.8,
          onComplete() {
            gsap.set(cntPrev, { top: "-100%", opacity: 0 });
          },
        },
        0
      );
    }
    if (cntNext) {
      tl.to(cntNext, { top: "0%", opacity: 0.7, duration: 0.8 }, 0);
    }

    return tl;
  };

  // Detect direction here only.
  // Replace the TODO blocks with your animations.
  const handleScrollDirection = (dir) => {
    if (!dir) return;
    if (isAnimatingRef.current) return;

    setScrollDirection(dir);

    if (dir === "up") {
      runUpAnimations();

      return;
    }

    if (dir === "down") {
      runDownAnimations();
      return;
    }
  };

  // Detect scroll up/down via wheel and swipe gestures on this section.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const dy = e.deltaY;
      if (Math.abs(dy) < 8) return;
      e.preventDefault();
      if (isAnimatingRef.current) return;
      if (Date.now() < cooldownRef.current) return;
      cooldownRef.current = Date.now() + 900;
      handleScrollDirection(dy > 0 ? "down" : "up");
    };

    const onTouchStart = (e) => {
      touchStartYRef.current = e.touches?.[0]?.clientY ?? null;
    };

    const onTouchEnd = (e) => {
      const startY = touchStartYRef.current;
      const endY = e.changedTouches?.[0]?.clientY;
      touchStartYRef.current = null;

      if (typeof startY !== 'number' || typeof endY !== 'number') return;
      const dy = endY - startY;
      if (Math.abs(dy) < 40) return;

      // Swipe up -> next -> 'down' gesture for our naming
      if (isAnimatingRef.current) return;
      if (Date.now() < cooldownRef.current) return;
      cooldownRef.current = Date.now() + 900;
      handleScrollDirection(dy < 0 ? "down" : "up");
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);



  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden touch-none select-none"
    >
      {/* ── Background slides ── */}
      <div className="absolute inset-0 z-0">
        {items.map((project, i) => (
          <img
            key={`bg-${i}`}
            src={project.coverImage}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
            ref={(el) => { bgRefs.current[i] = el; }}
            style={{
              clipPath: i === 0 ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
              WebkitClipPath: i === 0 ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
              willChange: "clip-path, transform",
              zIndex: i === 0 ? 1 : 0,
              filter: "brightness(35%)",
            }}
          />
        ))}
      </div>

      {/* ── Center foreground (inner-container) ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[56vw] h-[56vw] sm:w-[44vw] sm:h-[44vw] md:w-[34vw] md:h-[34vw] lg:w-[26vw] lg:h-[26vw] min-w-[150px] min-h-[150px] sm:min-w-[180px] sm:min-h-[180px] overflow-hidden z-20">
        {items.map((project, i) => (
          <Link
            key={`ctr-${i}`}
            href={`/work/${project.slug}`}
            className={`absolute inset-0 block ${i === activeIndex ? "pointer-events-auto" : "pointer-events-none"}`}
            aria-label={`Open ${project.name}`}
          >
            <img
              ref={(el) => { centerRefs.current[i] = el; }}
              src={project.coverImage}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                clipPath: i === 0 ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
                WebkitClipPath: i === 0 ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
                willChange: "clip-path",
                zIndex: i === 0 ? 1 : 0,
              }}
            />
          </Link>
        ))}
      </div>
      {/* ── Side text (animated overlay) ── */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {items.map((project, i) => (
          <div
            key={`text-${i}`}
            className="absolute left-4 right-4 top-[8%] sm:right-auto sm:left-8 sm:top-1/2 sm:-translate-y-1/2 md:left-12 lg:left-16 max-w-[min(460px,92vw)] sm:max-w-[min(500px,85vw)] text-center sm:text-left"
          >
            {(project.titles ?? [project.name]).map((title, ti) => (
              <div key={ti} className="overflow-hidden">
                <h2
                  ref={(el) => {
                    if (!textRefs.current[i]) textRefs.current[i] = [];
                    textRefs.current[i][ti] = el;
                  }}
                  className="text-white font-heading font-extralight tracking-[0.4px] leading-[1.08] text-[clamp(1.45rem,5.6vw,2.4rem)] sm:text-[clamp(1.85rem,5vw,3.4rem)]"
                  style={{
                    display: "inline-block",
                    willChange: "transform, opacity",
                    transform:
                      i === 0 ? "rotate(0deg) translateY(0%)" : "rotate(5deg) translateY(100%)",
                    opacity: i === 0 ? 1 : 0,
                  }}
                >
                  {title}
                </h2>
              </div>
            ))}

            <div className="overflow-hidden mt-2 sm:mt-3">
              <p
                ref={(el) => {
                  descRefs.current[i] = el;
                }}
                className="text-white/60 font-heading font-extralight leading-[1.55] tracking-[0.15px] text-xs sm:text-sm md:text-base max-w-[42ch] sm:max-w-[46ch]"
                style={{
                  willChange: "transform, opacity",
                  transform: i === 0 ? "translateY(0%)" : "translateY(100%)",
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom bar: animated counter (like ProjectClipReveal) ── */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-10 z-30 flex items-center gap-2 pointer-events-none">
        <div className="relative h-5 overflow-hidden min-w-8">
          {items.map((_, i) => (
            <span
              key={`cnt-${i}`}
              ref={(el) => {
                counterRefs.current[i] = el;
              }}
              className="absolute right-0 text-white text-sm font-heading font-extralight tracking-[0.3px] leading-[1.2] tabular-nums"
              style={{
                top: i === 0 ? "0%" : "100%",
                opacity: i === 0 ? 0.7 : 0,
                willChange: "top, opacity",
              }}
            >
              {pad2(i + 1)}
            </span>
          ))}
        </div>
        <span className="text-white/40 text-sm font-heading font-extralight tracking-[0.3px] leading-[1.2] tabular-nums">
          / {pad2(items.length)}
        </span>
      </div>


    </div>
  )
}

export default WorkSection