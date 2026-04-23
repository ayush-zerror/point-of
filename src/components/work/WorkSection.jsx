"use client";
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import GridButton from '../common/GridButton';
import WorkGridOverlay from "./WorkGridOverlay";
import WorkFilterPanel from "./WorkFilterPanel";

const CLIP_VISIBLE       = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const CLIP_HIDDEN_TOP    = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
const CLIP_HIDDEN_BOTTOM = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

// BG scale/objectPosition states
// DOWN: current exits  → scale 1, 50% 50% → 50% -20%  (drifts up)
//       next  enters   → scale 1.5, 50% 20% → 50% 50%  (zooms out, settles)
// UP:   current exits  → scale 1, 50% 50% → 50% 20%   (drifts down)
//       next  enters   → scale 1.5, 50% -20% → 50% 50% (zooms out, settles)
const BG_REST            = { scale: 1,   objectPosition: "50% 50%"  };
const BG_EXIT_DOWN       = { scale: 1.5, objectPosition: "50% 20%" };
const BG_ENTER_DOWN_FROM = { scale: 1.5, objectPosition: "50% 20%"  };
const BG_EXIT_UP         = { scale: 1.5, objectPosition: "50% 20%"  };
const BG_ENTER_UP_FROM   = { scale: 1.5, objectPosition: "50% 20%" };

// Center scale/objectPosition states (same behavior as BG)
const CTR_REST            = BG_REST;
const CTR_EXIT_DOWN       = BG_EXIT_DOWN;
const CTR_ENTER_DOWN_FROM = BG_ENTER_DOWN_FROM;
const CTR_EXIT_UP         = BG_EXIT_UP;
const CTR_ENTER_UP_FROM   = BG_ENTER_UP_FROM;

const toSlug = (value = "") =>
  String(value).toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");


const WorkSection = ({ projects }) => {
  const items = useMemo(
    () => (projects ?? []).map((project) => ({
      ...project,
      slug: project.slug || toSlug(project.name || (Array.isArray(project.titles) ? project.titles.join(" ") : "project")),
    })),
    [projects]
  );

  const containerRef    = useRef(null);
  const touchStartYRef  = useRef(null);
  const cooldownRef     = useRef(0);
  const isAnimatingRef  = useRef(false);
  const currentIndexRef = useRef(0);
  const isGridOpenRef   = useRef(false);

  // clip-path lives on the WRAPPER div — separate from the img
  const bgWrapRefs   = useRef([]);   // wrapper divs  (clip-path animated here)
  const bgRefs       = useRef([]);   // <img> elements (scale + objectPosition animated here)
  const centerRefs   = useRef([]);   // center wrapper divs (clip-path)
  const centerImgRefs = useRef([]);  // center <img> elements (no extra anim needed)
  const textRefs     = useRef([]);
  const descRefs     = useRef([]);
  const counterRefs  = useRef([]);
  const gridListRef      = useRef(null);
  const filterOverlayRef = useRef(null);
  const filterPanelRef   = useRef(null);

  const [activeIndex,   setActiveIndex]   = useState(0);
  const [isGridOpen,    setIsGridOpen]    = useState(false);
  const [isFilterOpen,  setIsFilterOpen]  = useState(false);
  const [activeFilters, setActiveFilters] = useState(() => ({
    services: new Set(), industry: new Set(), year: new Set(),
  }));

  const filterOptions = useMemo(() => {
    const uniq = (arr) => [...new Set(arr.filter(Boolean).map((v) => String(v).trim()).filter(Boolean))];
    const base = projects ?? [];
    const services = uniq(base.flatMap((p) => Array.isArray(p?.filtersServices) ? p.filtersServices : []));
    const industry = uniq(base.flatMap((p) => Array.isArray(p?.filtersIndustry) ? p.filtersIndustry : []));
    const years    = uniq(base.map((p) => p?.filtersYear))
      .sort((a, b) => { const na = Number(a), nb = Number(b); return (isFinite(na) && isFinite(nb)) ? nb - na : b.localeCompare(a); });
    return {
      services: services.sort((a, b) => a.localeCompare(b)),
      industry: industry.sort((a, b) => a.localeCompare(b)),
      year: years,
    };
  }, [projects]);

  const pad2 = (n) => String(n).padStart(2, "0");

  useEffect(() => { isGridOpenRef.current = isGridOpen; }, [isGridOpen]);

  // Filter panel animation
  useEffect(() => {
    const overlay = filterOverlayRef.current;
    const panel   = filterPanelRef.current;
    if (!overlay || !panel) return;
    const tl = gsap.timeline({ defaults: { overwrite: true } });
    if (isFilterOpen) {
      tl.set(panel, { yPercent: 100 });
      tl.to(overlay, { opacity: 1, duration: 0.25, ease: "power2.out", onComplete: () => gsap.set(overlay, { pointerEvents: "auto" }) });
      tl.to(panel,   { yPercent: 0, duration: 0.55, ease: "power3.inOut" });
    } else {
      tl.set(panel, { yPercent: 0 });
      tl.to(panel,   { yPercent: 100, duration: 0.45, ease: "power3.inOut" });
      tl.to(overlay, { opacity: 0,   duration: 0.25, ease: "power2.inOut", onComplete: () => gsap.set(overlay, { pointerEvents: "none" }) });
    }
    return () => tl.kill();
  }, [isFilterOpen]);

  const toggleFilter     = () => setIsFilterOpen((v) => !v);
  const toggleFilterItem = (group, value) => {
    setActiveFilters((prev) => {
      const next = new Set(prev[group]);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...prev, [group]: next };
    });
  };

  const filteredCaseStudy = useMemo(() => {
    const { services, industry, year } = activeFilters;
    const base = projects ?? [];
    if (!services.size && !industry.size && !year.size) return base;
    return base.filter((p) => {
      if (services.size && !( Array.isArray(p?.filtersServices) ? p.filtersServices : []).some((v) => services.has(String(v)))) return false;
      if (industry.size && !( Array.isArray(p?.filtersIndustry) ? p.filtersIndustry : []).some((v) => industry.has(String(v)))) return false;
      if (year.size    && !year.has(String(p?.filtersYear))) return false;
      return true;
    });
  }, [activeFilters, projects]);

  const onApplyFilters = () => setIsFilterOpen(false);
  const onResetFilters = () => setActiveFilters({ services: new Set(), industry: new Set(), year: new Set() });

  // ── helpers ──────────────────────────────────────────────────
  const applyTextCounterRestState = (activeIdx, forward) => {
    for (let i = 0; i < items.length; i++) {
      const h1s = textRefs.current[i];
      if (h1s?.length) {
        if (i === activeIdx) gsap.set(h1s, { rotate: 0, y: "0%", opacity: 1 });
        else                 gsap.set(h1s, { rotate: forward ? 5 : -5, y: forward ? "100%" : "-100%", opacity: 0 });
      }
      const desc = descRefs.current[i];
      if (desc) {
        if (i === activeIdx) gsap.set(desc, { y: "0%", opacity: 1 });
        else                 gsap.set(desc, { y: forward ? "100%" : "-100%", opacity: 0 });
      }
      const cnt = counterRefs.current[i];
      if (cnt) {
        if (i === activeIdx) gsap.set(cnt, { top: "0%", opacity: 0.7 });
        else                 gsap.set(cnt, { top: forward ? "100%" : "-100%", opacity: 0 });
      }
    }
  };

  const applyBgRestState = () => {
    bgRefs.current.forEach((el) => {
      if (el) gsap.set(el, { scale: BG_REST.scale, objectPosition: BG_REST.objectPosition });
    });

  };

  const applyCenterRestState = () => {
    centerImgRefs.current.forEach((el) => {
      if (el) gsap.set(el, { scale: CTR_REST.scale, objectPosition: CTR_REST.objectPosition });
    });
  };

  useEffect(() => {
    if (!items.length) return;
    applyTextCounterRestState(0, true);
    applyBgRestState();
    applyCenterRestState();
  }, [items]);

  // ── grid toggle ──────────────────────────────────────────────
  const toggleGridList = () => {
    const el = gridListRef.current;
    if (!el) return;
    if (!isGridOpen) {
      el.scrollTop = 0;
      setActiveFilters({ services: new Set(), industry: new Set(), year: new Set() });
      setIsFilterOpen(false);
      isGridOpenRef.current = true;
      gsap.fromTo(el,
        { clipPath: CLIP_HIDDEN_BOTTOM, webkitClipPath: CLIP_HIDDEN_BOTTOM },
        { clipPath: CLIP_VISIBLE,       webkitClipPath: CLIP_VISIBLE,       duration: 0.6, ease: "power3.inOut" }
      );
      setIsGridOpen(true);
    } else {
      isGridOpenRef.current = false;
      gsap.to(el, {
        clipPath: CLIP_HIDDEN_TOP, webkitClipPath: CLIP_HIDDEN_TOP, duration: 0.55, ease: "power3.inOut",
        onComplete: () => gsap.set(el, { clipPath: CLIP_HIDDEN_BOTTOM, webkitClipPath: CLIP_HIDDEN_BOTTOM }),
      });
      setIsGridOpen(false);
    }
  };

  // ── DOWN ─────────────────────────────────────────────────────
  const runDownAnimations = () => {
    if (isAnimatingRef.current) return null;
    const total = items.length;
    if (!total) return null;

    const current = currentIndexRef.current % total;
    const next    = (current + 1) % total;

    const bgWrapCurrent = bgWrapRefs.current[current];
    const bgWrapNext    = bgWrapRefs.current[next];
    const bgCurrent     = bgRefs.current[current];
    const bgNext        = bgRefs.current[next];
    const ctrCurrent    = centerRefs.current[current];
    const ctrNext       = centerRefs.current[next];
    const ctrImgCurrent = centerImgRefs.current[current];
    const ctrImgNext    = centerImgRefs.current[next];
    if (!bgWrapCurrent || !bgWrapNext || !bgCurrent || !bgNext || !ctrCurrent || !ctrNext || !ctrImgCurrent || !ctrImgNext) return null;

    const h1sPrev = textRefs.current[current];
    const h1sNext = textRefs.current[next];
    const descPrev = descRefs.current[current];
    const descNext = descRefs.current[next];
    const cntPrev  = counterRefs.current[current];
    const cntNext  = counterRefs.current[next];

    // clip-path starting states — on wrappers
    bgWrapRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        clipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
        webkitClipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
        zIndex: i === current ? 2 : 0,
      });
    });
    gsap.set(bgWrapNext, { zIndex: 1, clipPath: CLIP_HIDDEN_BOTTOM, webkitClipPath: CLIP_HIDDEN_BOTTOM });

    centerRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        clipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
        webkitClipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
        zIndex: i === current ? 2 : 0,
      });
    });
    gsap.set(ctrNext, { zIndex: 1, clipPath: CLIP_HIDDEN_TOP, webkitClipPath: CLIP_HIDDEN_TOP });

    // scale + objectPosition starting states — on images
    gsap.set(bgCurrent, { scale: BG_REST.scale,            objectPosition: BG_REST.objectPosition });
    gsap.set(bgNext,    { scale: BG_ENTER_DOWN_FROM.scale, objectPosition: BG_ENTER_DOWN_FROM.objectPosition });

    // Center zoom + object-position (DOWN)
    gsap.set(ctrImgCurrent, { scale: CTR_REST.scale,            objectPosition: CTR_REST.objectPosition });
    gsap.set(ctrImgNext,    { scale: CTR_ENTER_DOWN_FROM.scale, objectPosition: CTR_ENTER_DOWN_FROM.objectPosition });

    if (h1sNext?.length) gsap.set(h1sNext, { rotate: 5, y: "100%", opacity: 0 });
    if (descNext) gsap.set(descNext, { y: "100%", opacity: 0 });
    if (cntNext)  gsap.set(cntNext,  { top: "100%", opacity: 0 });

    isAnimatingRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        currentIndexRef.current = next;
        setActiveIndex(next);
        bgWrapRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, {
            clipPath: i === next ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
            webkitClipPath: i === next ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
            zIndex: i === next ? 1 : 0,
          });
        });
        centerRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, {
            clipPath: i === next ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
            webkitClipPath: i === next ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
            zIndex: i === next ? 1 : 0,
          });
        });
        applyBgRestState();
        applyCenterRestState();
        applyTextCounterRestState(next, true);
        isAnimatingRef.current = false;
      },
      onInterrupt: () => { isAnimatingRef.current = false; },
    });

    // clip-path on wrappers
    tl.to(bgWrapCurrent, { clipPath: CLIP_HIDDEN_TOP, webkitClipPath: CLIP_HIDDEN_TOP, duration: 1 }, 0);
    tl.to(bgWrapNext,    { clipPath: CLIP_VISIBLE,    webkitClipPath: CLIP_VISIBLE,    duration: 1 }, 0);
    tl.to(ctrCurrent,    { clipPath: CLIP_HIDDEN_BOTTOM, webkitClipPath: CLIP_HIDDEN_BOTTOM, duration: 1 }, 0);
    tl.to(ctrNext,       { clipPath: CLIP_VISIBLE,       webkitClipPath: CLIP_VISIBLE,       duration: 1 }, 0);

    // scale + objectPosition on images
    tl.to(bgCurrent, { scale: BG_EXIT_DOWN.scale, objectPosition: BG_EXIT_DOWN.objectPosition, duration: 1, ease: "power2.inOut" }, 0);
    tl.to(bgNext,    { scale: BG_REST.scale,       objectPosition: BG_REST.objectPosition,      duration: 1, ease: "power2.inOut" }, 0);

    tl.to(ctrImgCurrent, { scale: CTR_EXIT_DOWN.scale, objectPosition: CTR_EXIT_DOWN.objectPosition, duration: 1, ease: "power2.inOut" }, 0);
    tl.to(ctrImgNext,    { scale: CTR_REST.scale,      objectPosition: CTR_REST.objectPosition,      duration: 1, ease: "power2.inOut" }, 0);

    // text
    if (h1sPrev?.length) {
      tl.to(h1sPrev, { rotate: -5, y: "-100%", opacity: 0, duration: 0.8, ease: "power2.out",
        onComplete() { gsap.set(h1sPrev, { rotate: 5, y: "100%" }); } }, 0);
    }
    if (h1sNext?.length) tl.to(h1sNext, { rotate: 0, y: "0%", opacity: 1, duration: 0.8, ease: "power2.out" }, 0);
    if (descPrev)  tl.to(descPrev,  { y: "-100%", opacity: 0, duration: 0.8, ease: "power2.out" }, 0);
    if (descNext)  tl.to(descNext,  { y: "0%",    opacity: 1, duration: 0.8, ease: "power2.out" }, 0);
    if (cntPrev) {
      tl.to(cntPrev, { top: "-100%", opacity: 0, duration: 0.8,
        onComplete() { gsap.set(cntPrev, { top: "100%", opacity: 0 }); } }, 0);
    }
    if (cntNext) tl.to(cntNext, { top: "0%", opacity: 0.7, duration: 0.8 }, 0);

    return tl;
  };

  // ── UP ───────────────────────────────────────────────────────
  const runUpAnimations = () => {
    if (isAnimatingRef.current) return null;
    const total = items.length;
    if (!total) return null;

    const current = currentIndexRef.current % total;
    const prev    = (current - 1 + total) % total;

    const bgWrapCurrent = bgWrapRefs.current[current];
    const bgWrapPrev    = bgWrapRefs.current[prev];
    const bgCurrent     = bgRefs.current[current];
    const bgPrev        = bgRefs.current[prev];
    const ctrCurrent    = centerRefs.current[current];
    const ctrPrev       = centerRefs.current[prev];
    const ctrImgCurrent = centerImgRefs.current[current];
    const ctrImgPrev    = centerImgRefs.current[prev];
    if (!bgWrapCurrent || !bgWrapPrev || !bgCurrent || !bgPrev || !ctrCurrent || !ctrPrev || !ctrImgCurrent || !ctrImgPrev) return null;

    const h1sPrev = textRefs.current[current];
    const h1sNext = textRefs.current[prev];
    const descPrev = descRefs.current[current];
    const descNext = descRefs.current[prev];
    const cntPrev  = counterRefs.current[current];
    const cntNext  = counterRefs.current[prev];

    bgWrapRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        clipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
        webkitClipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
        zIndex: i === current ? 2 : 0,
      });
    });
    gsap.set(bgWrapPrev, { zIndex: 1, clipPath: CLIP_HIDDEN_TOP, webkitClipPath: CLIP_HIDDEN_TOP });

    centerRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        clipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
        webkitClipPath: i === current ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
        zIndex: i === current ? 2 : 0,
      });
    });
    gsap.set(ctrPrev, { zIndex: 1, clipPath: CLIP_HIDDEN_BOTTOM, webkitClipPath: CLIP_HIDDEN_BOTTOM });

    gsap.set(bgCurrent, { scale: BG_REST.scale,          objectPosition: BG_REST.objectPosition });
    gsap.set(bgPrev,    { scale: BG_ENTER_UP_FROM.scale, objectPosition: BG_ENTER_UP_FROM.objectPosition });

    // Center zoom + object-position (UP)
    gsap.set(ctrImgCurrent, { scale: CTR_REST.scale,        objectPosition: CTR_REST.objectPosition });
    gsap.set(ctrImgPrev,    { scale: CTR_ENTER_UP_FROM.scale, objectPosition: CTR_ENTER_UP_FROM.objectPosition });

    if (h1sNext?.length) gsap.set(h1sNext, { rotate: -5, y: "-100%", opacity: 0 });
    if (descNext) gsap.set(descNext, { y: "-100%", opacity: 0 });
    if (cntNext)  gsap.set(cntNext,  { top: "-100%", opacity: 0 });

    isAnimatingRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        currentIndexRef.current = prev;
        setActiveIndex(prev);
        bgWrapRefs.current.forEach((el, i) => {
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
        applyBgRestState();
        applyCenterRestState();
        applyTextCounterRestState(prev, false);
        isAnimatingRef.current = false;
      },
      onInterrupt: () => { isAnimatingRef.current = false; },
    });

    tl.to(bgWrapCurrent, { clipPath: CLIP_HIDDEN_BOTTOM, webkitClipPath: CLIP_HIDDEN_BOTTOM, duration: 1 }, 0);
    tl.to(bgWrapPrev,    { clipPath: CLIP_VISIBLE,       webkitClipPath: CLIP_VISIBLE,       duration: 1 }, 0);
    tl.to(ctrCurrent,    { clipPath: CLIP_HIDDEN_TOP,    webkitClipPath: CLIP_HIDDEN_TOP,    duration: 1 }, 0);
    tl.to(ctrPrev,       { clipPath: CLIP_VISIBLE,       webkitClipPath: CLIP_VISIBLE,       duration: 1 }, 0);

    tl.to(bgCurrent, { scale: BG_EXIT_UP.scale, objectPosition: BG_EXIT_UP.objectPosition, duration: 1, ease: "power2.inOut" }, 0);
    tl.to(bgPrev,    { scale: BG_REST.scale,     objectPosition: BG_REST.objectPosition,    duration: 1, ease: "power2.inOut" }, 0);

    tl.to(ctrImgCurrent, { scale: CTR_EXIT_UP.scale, objectPosition: CTR_EXIT_UP.objectPosition, duration: 1, ease: "power2.inOut" }, 0);
    tl.to(ctrImgPrev,    { scale: CTR_REST.scale,    objectPosition: CTR_REST.objectPosition,    duration: 1, ease: "power2.inOut" }, 0);

    if (h1sPrev?.length) {
      tl.to(h1sPrev, { rotate: 5, y: "100%", opacity: 0, duration: 0.8, ease: "power2.out",
        onComplete() { gsap.set(h1sPrev, { rotate: -5, y: "-100%" }); } }, 0);
    }
    if (h1sNext?.length) tl.to(h1sNext, { rotate: 0, y: "0%", opacity: 1, duration: 0.8, ease: "power2.out" }, 0);
    if (descPrev)  tl.to(descPrev,  { y: "100%",  opacity: 0, duration: 0.8, ease: "power2.out" }, 0);
    if (descNext)  tl.to(descNext,  { y: "0%",    opacity: 1, duration: 0.8, ease: "power2.out" }, 0);
    if (cntPrev) {
      tl.to(cntPrev, { top: "100%", opacity: 0, duration: 0.8,
        onComplete() { gsap.set(cntPrev, { top: "-100%", opacity: 0 }); } }, 0);
    }
    if (cntNext) tl.to(cntNext, { top: "0%", opacity: 0.7, duration: 0.8 }, 0);

    return tl;
  };

  const handleScrollDirection = (dir) => {
    if (!dir || isAnimatingRef.current || isGridOpenRef.current) return;
    if (dir === "up")   runUpAnimations();
    if (dir === "down") runDownAnimations();
  };

  useEffect(() => {
    const el     = containerRef.current;
    const gridEl = gridListRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (isGridOpenRef.current) return;
      const dy = e.deltaY;
      if (Math.abs(dy) < 8) return;
      e.preventDefault();
      if (isAnimatingRef.current) return;
      if (Date.now() < cooldownRef.current) return;
      cooldownRef.current = Date.now() + 900;
      handleScrollDirection(dy > 0 ? "down" : "up");
    };

    const stopGridPropagation = (e) => { e.stopPropagation(); };

    const onTouchStart = (e) => { touchStartYRef.current = e.touches?.[0]?.clientY ?? null; };
    const onTouchEnd   = (e) => {
      if (isGridOpenRef.current) return;
      const startY = touchStartYRef.current;
      const endY   = e.changedTouches?.[0]?.clientY;
      touchStartYRef.current = null;
      if (typeof startY !== 'number' || typeof endY !== 'number') return;
      const dy = endY - startY;
      if (Math.abs(dy) < 40) return;
      if (isAnimatingRef.current) return;
      if (Date.now() < cooldownRef.current) return;
      cooldownRef.current = Date.now() + 900;
      handleScrollDirection(dy < 0 ? "down" : "up");
    };

    el.addEventListener('wheel',      onWheel,              { passive: false });
    gridEl?.addEventListener('wheel', stopGridPropagation,  { passive: true  });
    el.addEventListener('touchstart', onTouchStart,         { passive: true  });
    el.addEventListener('touchend',   onTouchEnd,           { passive: true  });

    return () => {
      el.removeEventListener('wheel',      onWheel);
      gridEl?.removeEventListener('wheel', stopGridPropagation);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend',   onTouchEnd);
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
          // clip-path is on THIS wrapper div
          <div
            key={`bg-wrap-${i}`}
            ref={(el) => { bgWrapRefs.current[i] = el; }}
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: i === 0 ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
              WebkitClipPath: i === 0 ? CLIP_VISIBLE : CLIP_HIDDEN_BOTTOM,
              willChange: "clip-path",
              zIndex: i === 0 ? 1 : 0,
            }}
          >
            {/* scale + objectPosition is on THIS image */}
            <Image
              width={1920}
              height={1080}
              key={`bg-${i}`}
              src={project.coverImage}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover"
              ref={(el) => { bgRefs.current[i] = el; }}
              style={{
                willChange: "transform, object-position",
                scale: 1,
                objectPosition: "50% 50%",
                filter: "brightness(35%)",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Center foreground ── */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[300px] md:min-w-[400px] aspect-square z-20 transition-opacity duration-300 ${isGridOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="w-full h-full overflow-hidden">
          {items.map((project, i) => (
            // clip-path on this Link wrapper
            <Link
              key={`ctr-${i}`}
              href={`/work/${project.slug}`}
              ref={(el) => { centerRefs.current[i] = el; }}
              className={`absolute group inset-0 block overflow-hidden ${i === activeIndex ? "pointer-events-auto" : "pointer-events-none"}`}
              aria-label={`Open ${project.name}`}
              title={`Open ${project.name}`}
              style={{
                clipPath: i === 0 ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
                WebkitClipPath: i === 0 ? CLIP_VISIBLE : CLIP_HIDDEN_TOP,
                willChange: "clip-path",
                zIndex: i === 0 ? 1 : 0,
              }}
            >
              <Image
                width={1000}
                height={1000}
                ref={(el) => { centerImgRefs.current[i] = el; }}
                src={project.coverImage}
                alt={project.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  willChange: "transform, object-position",
                  scale: 1,
                  objectPosition: "50% 50%",
                }}
              />
              <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <video src={project.microanimation} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </Link>
          ))}
        </div>

        {/* Counter bar */}
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
                  style={{ top: i === 0 ? "0%" : "100%", opacity: i === 0 ? 0.7 : 0, willChange: "top, opacity" }}
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

      <WorkGridOverlay
        gridListRef={gridListRef}
        toggleGridList={toggleGridList}
        toggleFilter={toggleFilter}
        projects={filteredCaseStudy}
      />

      <WorkFilterPanel
        filterOverlayRef={filterOverlayRef}
        filterPanelRef={filterPanelRef}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        filterOptions={filterOptions}
        activeFilters={activeFilters}
        toggleFilterItem={toggleFilterItem}
        viewCount={filteredCaseStudy.length}
        onApply={onApplyFilters}
        onReset={onResetFilters}
      />

      {/* ── Side text ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {items.map((project, i) => (
          <div
            key={`text-${i}`}
            className="absolute left-4 right-4 top-[10%] sm:right-auto sm:left-8 sm:top-1/2 sm:-translate-y-1/2 md:left-12 lg:left-16 max-w-[min(460px,92vw)] sm:max-w-[min(500px,85vw)] text-left"
          >
            {(project.titles ?? [project.name]).map((title, ti) => (
              <div key={ti} className="overflow-hidden">
                <h2
                  ref={(el) => {
                    if (!textRefs.current[i]) textRefs.current[i] = [];
                    textRefs.current[i][ti] = el;
                  }}
                  className="text-white font-heading font-extralight tracking-[0.4px] leading-[1.08] text-[clamp(1.45rem,5.6vw,2.4rem)] sm:text-[clamp(1.85rem,5vw,3.4rem)] whitespace-nowrap max-w-full overflow-hidden text-ellipsis"
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
