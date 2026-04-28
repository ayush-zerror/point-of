"use client";

import {
  useRef,
  useLayoutEffect,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import WorkCard from "../work/WorkCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurWork({ posts = [] }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const buttonCircleRef = useRef(null);
  const buttonArrowRef = useRef(null);
  const buttonTextRef = useRef(null);
  const buttonUnderlineRef = useRef(null);

  const [maxTranslate, setMaxTranslate] = useState(0);

  // Store the natural (unscaled) resting offset of the button circle
  // relative to the track origin — computed once on mount/resize
  const naturalOffsetRef = useRef(0);

  useLayoutEffect(() => {
    const calculate = () => {
      if (!trackRef.current || !buttonCircleRef.current) return;

      const track = trackRef.current;
      const circle = buttonCircleRef.current;

      const trackRect = track.getBoundingClientRect();
      const circleRect = circle.getBoundingClientRect();

      // Natural center of the button circle relative to track left edge
      // We read this when merged=false so the circle is still 8px
      const circleCenterInTrack =
        circleRect.left - trackRect.left + circleRect.width / 2;

      const viewportCenter = window.innerWidth / 2;

      // How far the track needs to scroll so circle reaches viewport center
      const translate = circleCenterInTrack - viewportCenter;
      setMaxTranslate(translate);

      // The natural screen position of the circle when x=0
      const naturalScreenX = circleRect.left + circleRect.width / 2;
      naturalOffsetRef.current = naturalScreenX - viewportCenter;
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !trackRef.current ||
      !buttonCircleRef.current ||
      !buttonTextRef.current ||
      !buttonUnderlineRef.current
    )
      return;

    const track = trackRef.current;
    const circle = buttonCircleRef.current;
    const arrow = buttonArrowRef.current;
    const textEl = buttonTextRef.current;
    const underlineEl = buttonUnderlineRef.current;
    const centerDot = document.querySelector("#centerDot");
      const cards = gsap.utils.toArray(track.querySelectorAll(".work-card"));

    const ctx = gsap.context(() => {
      // ---------- EDIT TIMINGS HERE ----------
      const DUR_SCROLL_TO_CENTER = 1.5; // horizontal slide
      const DUR_GROW = 0.4; // circle + centerDot to 40
      const DUR_HOLD_40 = 0.25; // holds at 40 on reverse/forward
      const DUR_TEXT_HIDE = 0.35; // text + underline fade
      const DUR_DOT_SCALE = 6; // centerDot "scale" (size up)
      const DOT_SCALE_SIZE = 50; // px (adjust as needed)
      // --------------------------------------

      // Initial states (so timeline is deterministic)
      gsap.set(track, { x: 0 });
      gsap.set(circle, { width: 8, height: 8 });
      if (arrow) gsap.set(arrow, { opacity: 0, scale: 0.4 });
      gsap.set(textEl, { opacity: 1 });
      gsap.set(underlineEl, { width: "100%", opacity: 1 });
      if (centerDot) gsap.set(centerDot, { opacity: 0 });

      // One master timeline (horizontal slide → grow → hide text → dot scales)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1) Horizontal slide until button circle reaches viewport center
      tl.to(track, { x: () => -maxTranslate, duration: DUR_SCROLL_TO_CENTER, ease: "none" }, 0);

      // 2) Button circle + CenterDot become 40px
      tl.to(
        circle,
        { width: 40, height: 40, duration: DUR_GROW, ease: "power2.out" },
        `>${0}`
      );
      if (centerDot) {
        tl.to(centerDot, { opacity: 1, duration: 0.2, ease: "power2.out" }, "<");
        tl.to(
          centerDot,
          { width: 40, height: 40, duration: DUR_GROW, ease: "power2.out" },
          "<"
        );
      }
      if (arrow) {
        tl.to(
          arrow,
          { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" },
          "<+0.12"
        );
      }

      // Hold at 40px for a bit (helps reverse feel)
      if (centerDot) {
        tl.to(centerDot, { width: 40, height: 40, duration: DUR_HOLD_40, ease: "none" });
      } else {
        tl.to({}, { duration: DUR_HOLD_40 });
      }

      // 3) Text + underline disappear (and circle fades too, per your spec)
      tl.to(
        textEl,
        { opacity: 0, duration: DUR_TEXT_HIDE, ease: "power2.out" },
        "hide"
      );
      tl.to(
        underlineEl,
        { width: "0%", opacity: 0, duration: DUR_TEXT_HIDE, ease: "power2.out" },
        "hide"
      );
      tl.to(circle, { opacity: 0, duration: 0.25, ease: "power2.out" }, "hide+=0.05");

      // 4) CenterDot scales (size up) after text is gone
      if (centerDot) {
        tl.to(
          centerDot,
          {
            scale: DOT_SCALE_SIZE,
            duration: DUR_DOT_SCALE,
            ease: "power2.out",
          },
          "hide+=0.25"
        );
      }

      // Cards move out while scaling
      if (cards.length) {
        tl.to(
          cards,
          {
            y: -100,
            opacity: 0,
            duration: DUR_DOT_SCALE - 3,
            ease: "power2.out",
            stagger: 0.03,
          },
          "hide+=0.25"
        );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [maxTranslate]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* TRACK */}
        <div
          ref={trackRef}
          className="flex items-center gap-22 px-6 sm:px-10 md:px-16 lg:px-20"
        >
          {/* CARDS */}
          {(posts ?? []).map((post, index) => (
            <div
              key={post.slug ?? index}
              className="shrink-0 w-[85vw] max-w-[380px] sm:w-auto sm:max-w-none"
            >
              <WorkCard
                slug={post.slug}
                title={post.title}
                image={post.coverImage}
                video={post.microanimation}
              />
            </div>
          ))}

          {/* BUTTON */}
          <div className="min-w-[220px] sm:min-w-[300px] md:min-w-[400px] flex items-center justify-center ml-10 sm:ml-24 md:ml-40">
            <Link
              href="/work"
              className="group cursor-pointer flex items-center gap-3 text-sm font-semibold uppercase tracking-wide"
              title="View all work"
            >
              {/* BUTTON CIRCLE */}
              <span
                ref={buttonCircleRef}
                className="relative flex items-center justify-center rounded-full"
              >
                <svg
                  ref={buttonArrowRef}
                  style={{
                    opacity: 0,
                    transform: "scale(0.4)",
                  }}
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>

              {/* TEXT */}
              <span ref={buttonTextRef} className="relative whitespace-nowrap">
                VIEW ALL WORK
                <span
                  ref={buttonUnderlineRef}
                  className="absolute right-0 -bottom-1 h-px bg-white transition-all duration-300"
                  style={{ width: "100%" }}
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
