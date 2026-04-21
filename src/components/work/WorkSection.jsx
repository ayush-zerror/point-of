"use client";
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import GridButton from '../common/GridButton';
import WorkCard from './WorkCard';
import { Spiral as Hamburger } from "hamburger-react";
import caseStudy from '../../helper/case-study';

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


const WorkSection = ({ projects }) => {
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
  const isGridOpenRef = useRef(false);

  const bgRefs = useRef([]);      // background <img> refs
  const centerRefs = useRef([]);  // center (child) <img> refs
  const textRefs = useRef([]);    // array of arrays of title refs per slide
  const descRefs = useRef([]);    // gist <p> refs per slide
  const counterRefs = useRef([]); // counter <span> refs per slide
  const gridListRef = useRef(null);
  const filterOverlayRef = useRef(null);
  const filterPanelRef = useRef(null);

  const [scrollDirection, setScrollDirection] = useState(null); // 'up' | 'down' | null
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(() => ({
    services: new Set(),
    industry: new Set(),
    year: new Set(),
  }));

  const filterOptions = useMemo(() => {
    const uniq = (arr) => [...new Set(arr.filter(Boolean).map((v) => String(v).trim()).filter(Boolean))];

    const services = uniq(caseStudy.flatMap((p) => (Array.isArray(p?.filtersServices) ? p.filtersServices : [])));
    const industry = uniq(caseStudy.flatMap((p) => (Array.isArray(p?.filtersIndustry) ? p.filtersIndustry : [])));
    const years = uniq(caseStudy.map((p) => p?.filtersYear));

    const sortedYears = years.sort((a, b) => {
      const na = Number(a);
      const nb = Number(b);
      if (Number.isFinite(na) && Number.isFinite(nb)) return nb - na; // newest first
      return b.localeCompare(a);
    });

    return {
      services: services.sort((a, b) => a.localeCompare(b)),
      industry: industry.sort((a, b) => a.localeCompare(b)),
      year: sortedYears,
    };
  }, []);

  const pad2 = (n) => String(n).padStart(2, "0");

  useEffect(() => {
    isGridOpenRef.current = isGridOpen;
  }, [isGridOpen]);

  useEffect(() => {
    const overlay = filterOverlayRef.current;
    const panel = filterPanelRef.current;
    if (!overlay || !panel) return;

    const tl = gsap.timeline({ defaults: { overwrite: true } });

    if (isFilterOpen) {
      // 1) overlay fades in, 2) panel slides up
      tl.set(panel, { yPercent: 100 });
      tl.to(overlay, { opacity: 1, duration: 0.25, ease: "power2.out",
        onComplete: () => gsap.set(overlay, { pointerEvents: "auto" }),
       });
      tl.to(panel, { yPercent: 0, duration: 0.55, ease: "power3.inOut" });
    } else {
      // 1) panel slides down, 2) overlay fades out
      tl.set(panel, { yPercent: 0 });
      tl.to(panel, { yPercent: 100, duration: 0.45, ease: "power3.inOut" });
      tl.to(overlay, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: () => gsap.set(overlay, { pointerEvents: "none" }),
      });
    }

    return () => tl.kill();
  }, [isFilterOpen]);

  const toggleFilter = () => setIsFilterOpen((v) => !v);

  const toggleFilterItem = (group, value) => {
    setActiveFilters((prev) => {
      const nextGroup = new Set(prev[group]);
      if (nextGroup.has(value)) nextGroup.delete(value);
      else nextGroup.add(value);
      return { ...prev, [group]: nextGroup };
    });
  };

  const filteredCaseStudy = useMemo(() => {
    const hasServices = activeFilters.services.size > 0;
    const hasIndustry = activeFilters.industry.size > 0;
    const hasYear = activeFilters.year.size > 0;

    if (!hasServices && !hasIndustry && !hasYear) return caseStudy;

    return caseStudy.filter((p) => {
      if (hasServices) {
        const list = Array.isArray(p?.filtersServices) ? p.filtersServices : [];
        if (!list.some((v) => activeFilters.services.has(String(v)))) return false;
      }

      if (hasIndustry) {
        const list = Array.isArray(p?.filtersIndustry) ? p.filtersIndustry : [];
        if (!list.some((v) => activeFilters.industry.has(String(v)))) return false;
      }

      if (hasYear) {
        const y = p?.filtersYear;
        if (!activeFilters.year.has(String(y))) return false;
      }

      return true;
    });
  }, [activeFilters]);

  const onApplyFilters = () => {
    // Filter is already derived from state; this just closes the panel.
    setIsFilterOpen(false);
  };

  const onResetFilters = () => {
    setActiveFilters({ services: new Set(), industry: new Set(), year: new Set() });
  };

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

  const toggleGridList = () => {
    const el = gridListRef.current;
    if (!el) return;

    if (!isGridOpen) {
      el.scrollTop = 0;
      // Reset filters whenever grid view opens
      setActiveFilters({ services: new Set(), industry: new Set(), year: new Set() });
      setIsFilterOpen(false);
      // Make it effective immediately (avoid one "extra" wheel event)
      isGridOpenRef.current = true;
      // OPEN: bottom-collapsed -> fully visible
      gsap.fromTo(
        el,
        { clipPath: CLIP_HIDDEN_BOTTOM, webkitClipPath: CLIP_HIDDEN_BOTTOM },
        {
          clipPath: CLIP_VISIBLE,
          webkitClipPath: CLIP_VISIBLE,
          duration: 0.6,
          ease: "power3.inOut",
        }
      );
      setIsGridOpen(true);
    } else {
      // Allow gallery scroll immediately on close click
      isGridOpenRef.current = false;
      // CLOSE: fully visible -> top-collapsed
      gsap.to(el, {
        clipPath: CLIP_HIDDEN_TOP,
        webkitClipPath: CLIP_HIDDEN_TOP,
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => {
          // reset so next open always starts from bottom
          gsap.set(el, { clipPath: CLIP_HIDDEN_BOTTOM, webkitClipPath: CLIP_HIDDEN_BOTTOM });
        },
      });
      setIsGridOpen(false);
    }
  };

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

    tl.to(
      bgCurrent,
      { clipPath: CLIP_HIDDEN_TOP, webkitClipPath: CLIP_HIDDEN_TOP, duration: 1 },
      0
    );
    tl.to(
      bgNext,
      { clipPath: CLIP_VISIBLE, webkitClipPath: CLIP_VISIBLE, duration: 1 },
      0
    );

    // Center current exits to BOTTOM (opposite of BG)
    tl.to(
      ctrCurrent,
      { clipPath: CLIP_HIDDEN_BOTTOM, webkitClipPath: CLIP_HIDDEN_BOTTOM, duration: 1 },
      0
    );
    // Center next enters from TOP
    tl.to(
      ctrNext,
      { clipPath: CLIP_VISIBLE, webkitClipPath: CLIP_VISIBLE, duration: 1 },
      0
    );

    // --- Text + gist + counter (DOWN) ---
    if (h1sPrev?.length) {
      tl.to(
        h1sPrev,
        {
          rotate: -5, y: "-100%", opacity: 0, duration: 0.8, ease: "power2.out",
          onComplete() { gsap.set(h1sPrev, { rotate: 5, y: "100%" }); },
        },
        0
      );
    }
    if (h1sNext?.length) {
      tl.to(h1sNext, { rotate: 0, y: "0%", opacity: 1, duration: 0.8, ease: "power2.out" }, 0);
    }
    if (descPrev) {
      tl.to(descPrev, { y: "-100%", opacity: 0, duration: 0.8, ease: "power2.out" }, 0);
    }
    if (descNext) {
      tl.to(descNext, { y: "0%", opacity: 1, duration: 0.8, ease: "power2.out" }, 0);
    }
    if (cntPrev) {
      tl.to(
        cntPrev,
        {
          top: "-100%", opacity: 0, duration: 0.8,
          onComplete() { gsap.set(cntPrev, { top: "100%", opacity: 0 }); },
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
        clipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
        webkitClipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
        zIndex: i === current ? 2 : 0,
      });
    });
    gsap.set(bgPrev, { zIndex: 1, clipPath: CLIP_HIDDEN_TOP, webkitClipPath: CLIP_HIDDEN_TOP });

    // Center layer for UP: inactive waits hidden at BOTTOM
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

        bgRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, {
            clipPath: i === prev ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
            webkitClipPath: i === prev ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
            zIndex: i === prev ? 1 : 0,
          });
        });

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

    // BG current exits to BOTTOM
    tl.to(
      bgCurrent,
      { clipPath: CLIP_HIDDEN_BOTTOM, webkitClipPath: CLIP_HIDDEN_BOTTOM, duration: 1 },
      0
    );
    // BG prev enters from TOP
    tl.to(
      bgPrev,
      { clipPath: CLIP_VISIBLE, webkitClipPath: CLIP_VISIBLE, duration: 1 },
      0
    );

    // Center current exits to TOP
    tl.to(
      ctrCurrent,
      { clipPath: CLIP_HIDDEN_TOP, webkitClipPath: CLIP_HIDDEN_TOP, duration: 1 },
      0
    );
    // Center prev enters from BOTTOM
    tl.to(
      ctrPrev,
      { clipPath: CLIP_VISIBLE, webkitClipPath: CLIP_VISIBLE, duration: 1 },
      0
    );

    // --- Text + gist + counter (UP) ---
    if (h1sPrev?.length) {
      tl.to(
        h1sPrev,
        {
          rotate: 5, y: "100%", opacity: 0, duration: 0.8, ease: "power2.out",
          onComplete() { gsap.set(h1sPrev, { rotate: -5, y: "-100%" }); },
        },
        0
      );
    }
    if (h1sNext?.length) {
      tl.to(h1sNext, { rotate: 0, y: "0%", opacity: 1, duration: 0.8, ease: "power2.out" }, 0);
    }
    if (descPrev) {
      tl.to(descPrev, { y: "100%", opacity: 0, duration: 0.8, ease: "power2.out" }, 0);
    }
    if (descNext) {
      tl.to(descNext, { y: "0%", opacity: 1, duration: 0.8, ease: "power2.out" }, 0);
    }
    if (cntPrev) {
      tl.to(
        cntPrev,
        {
          top: "100%", opacity: 0, duration: 0.8,
          onComplete() { gsap.set(cntPrev, { top: "-100%", opacity: 0 }); },
        },
        0
      );
    }
    if (cntNext) {
      tl.to(cntNext, { top: "0%", opacity: 0.7, duration: 0.8 }, 0);
    }

    return tl;
  };

  const handleScrollDirection = (dir) => {
    if (!dir) return;
    if (isAnimatingRef.current) return;
    if (isGridOpenRef.current) return;

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

  useEffect(() => {
    const el = containerRef.current;
    const gridEl = gridListRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // ✅ FIX: Guard BEFORE preventDefault so grid can scroll natively.
      // When grid is open, return immediately — the event propagates normally
      // to the grid element and it scrolls as expected.
      if (isGridOpenRef.current) return;

      const dy = e.deltaY;
      if (Math.abs(dy) < 8) return;

      // Only call preventDefault when gallery is active (blocks page scroll)
      e.preventDefault();

      if (isAnimatingRef.current) return;
      if (Date.now() < cooldownRef.current) return;
      cooldownRef.current = Date.now() + 900;
      handleScrollDirection(dy > 0 ? "down" : "up");
    };

    // ✅ FIX: Stop wheel events inside the grid from bubbling up to the
    // container listener. Without this, even though we guard with
    // isGridOpenRef, the container's { passive: false } registration
    // can interfere with the grid's native scroll on some browsers.
    const stopGridPropagation = (e) => {
      e.stopPropagation();
    };

    const onTouchStart = (e) => {
      touchStartYRef.current = e.touches?.[0]?.clientY ?? null;
    };

    const onTouchEnd = (e) => {
      if (isGridOpenRef.current) return;
      const startY = touchStartYRef.current;
      const endY = e.changedTouches?.[0]?.clientY;
      touchStartYRef.current = null;

      if (typeof startY !== 'number' || typeof endY !== 'number') return;
      const dy = endY - startY;
      if (Math.abs(dy) < 40) return;

      if (isAnimatingRef.current) return;
      if (Date.now() < cooldownRef.current) return;
      cooldownRef.current = Date.now() + 900;
      // Swipe up = "down" in our naming (next slide)
      handleScrollDirection(dy < 0 ? "down" : "up");
    };

    // passive: false needed so we can call preventDefault in gallery mode
    el.addEventListener('wheel', onWheel, { passive: false });

    // ✅ Grid wheel events stop here — never reach the container listener
    gridEl?.addEventListener('wheel', stopGridPropagation, { passive: true });

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel);
      gridEl?.removeEventListener('wheel', stopGridPropagation);
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
          <Image
            width={1000}
            height={1000}
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
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[300px] md:min-w-[400px] aspect-square z-20 transition-opacity duration-300 ${isGridOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className='w-full h-full overflow-hidden'>
          {items.map((project, i) => (
            <Link
              key={`ctr-${i}`}
              href={`/work/${project.slug}`}
              className={`absolute inset-0 block ${i === activeIndex ? "pointer-events-auto" : "pointer-events-none"}`}
              aria-label={`Open ${project.name}`}
            >
              <Image
                width={1000}
                height={1000}
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

        {/* ── Bottom bar: animated counter ── */}
        <div
          className={`w-full flex items-center justify-between absolute top-full pt-4 left-0 transition-opacity duration-300 ${isGridOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <GridButton title={"GRID VIEW"} onClick={toggleGridList} className={"mt-0!"} />
          <div className="z-30 flex items-center gap-2 pointer-events-none">
            <div className="relative h-3.5 overflow-hidden min-w-8">
              {items.map((_, i) => (
                <span
                  key={`cnt-${i}`}
                  ref={(el) => { counterRefs.current[i] = el; }}
                  className="absolute right-0 text-white text-sm font-heading font-extralight tracking-[0.3px] leading-none tabular-nums"
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
      </div>

      {/* ── Grid / list overlay ── */}
      <div
        id='grid-list'
        ref={gridListRef}
        className='w-full h-full bg-background absolute top-0 left-0 z-30 overflow-y-auto'
        style={{
          clipPath: CLIP_HIDDEN_BOTTOM,
          WebkitClipPath: CLIP_HIDDEN_BOTTOM,
          willChange: "clip-path",
        }}
        data-lenis-prevent
      >
        {/* ── Bottom bar: grid close button ── */}
        <div className='w-full flex items-center justify-between fixed bottom-0 left-0 z-30 px-20 pb-10'>
          <GridButton title={"GALLERY VIEW"} onClick={toggleGridList} className={"mt-0!"} />
          <GridButton title={"FILTER"} onClick={toggleFilter} className={"mt-0!"} />
        </div>
        <div className="flex flex-wrap justify-between px-20">
          {filteredCaseStudy.map((project) => (
            <div key={project.slug} className='w-fit h-screen flex items-center justify-center'>
              <WorkCard
                slug={project.slug}
                title={project.title}
                image={project.coverImage}
                video={project.microanimation}
              />
            </div>
          ))}
        </div>
      </div>
      {/* ── Filter view ── */}
      <div
        ref={filterOverlayRef}
        className='w-full h-screen flex items-end opacity-0 pointer-events-none bg-background/30 backdrop-blur-xs absolute top-0 left-0 z-40'
      >
        {/* filter list */}
        <div
          ref={filterPanelRef}
          className='w-full h-1/2 relative bg-background will-change-transform'
        >
          <div className="h-full w-full px-8 sm:px-12 lg:px-20 py-8 text-white">
            <div className="absolute top-4 right-6 sm:right-10 lg:right-14">
              <Hamburger
                size={20}
                toggled={isFilterOpen}
                toggle={setIsFilterOpen}
                label="Close filter"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16">
              <div className="text-heading text-sm tracking-wide">
                Filter by:
              </div>

              <div>
                <div className="text-desc text-xs tracking-wide mb-4">Services</div>
                <ul className="filter-ul space-y-2 text-sm text-heading">
                  {filterOptions.services.map((label) => (
                    <li
                      key={label}
                      className={`hover:text-white cursor-pointer w-fit ${activeFilters.services.has(label) ? "active" : ""}`}
                      onClick={() => toggleFilterItem("services", label)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") toggleFilterItem("services", label);
                      }}
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-desc text-xs tracking-wide mb-4">Industry</div>
                <ul className="filter-ul space-y-2 text-sm text-heading">
                  {filterOptions.industry.map((label) => (
                    <li
                      key={label}
                      className={`hover:text-white cursor-pointer w-fit ${activeFilters.industry.has(label) ? "active" : ""}`}
                      onClick={() => toggleFilterItem("industry", label)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") toggleFilterItem("industry", label);
                      }}
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-desc text-xs tracking-wide mb-4">Year</div>
                <ul className="filter-ul space-y-2 text-sm text-heading">
                  {filterOptions.year.map((label) => (
                    <li
                      key={label}
                      className={`hover:text-white cursor-pointer w-fit ${activeFilters.year.has(label) ? "active" : ""}`}
                      onClick={() => toggleFilterItem("year", label)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") toggleFilterItem("year", label);
                      }}
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 sm:left-12 lg:left-16 right-8 sm:right-12 lg:right-16 flex items-center justify-between">
              <button
                type="button"
                className="heading-md text-heading transition-colors cursor-pointer"
                onClick={onApplyFilters}
              >
                View {filteredCaseStudy.length} projects →
              </button>
              <button
                type="button"
                className="heading-md text-heading transition-colors cursor-pointer"
                onClick={onResetFilters}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Side text (animated overlay) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
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
                    transform: i === 0 ? "rotate(0deg) translateY(0%)" : "rotate(5deg) translateY(100%)",
                    opacity: i === 0 ? 1 : 0,
                  }}
                >
                  {title}
                </h2>
              </div>
            ))}

            <div className="overflow-hidden mt-2 sm:mt-3">
              <p
                ref={(el) => { descRefs.current[i] = el; }}
                className="text-white/60 font-heading font-extralight leading-[1.55] tracking-[0.15px] text-xs sm:text-sm md:text-base max-w-[42ch] sm:max-w-[46ch]"
                style={{
                  willChange: "transform, opacity",
                  transform: i === 0 ? "translateY(0%)" : "translateY(100%)",
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                {project.gist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkSection;
