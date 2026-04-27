"use client";

import React, { useLayoutEffect, useRef } from "react";
import Button from "../common/Button";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const AboutStudio = () => {
  const sectionRef = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  const lastDotRef = useRef(null);
  const router = useRouter();

  useLayoutEffect(() => {
    if (!sectionRef.current || !p1Ref.current || !p2Ref.current) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const ctx = gsap.context(() => {
      const circle2 = document.querySelector("#circle2");

      const split1 = new SplitType(p1Ref.current, {
        types: "words",
        wordClass: "word",
      });

      const split2 = new SplitType(p2Ref.current, {
        types: "words",
        wordClass: "word",
      });

      const words = gsap.utils.toArray([
        ...(p1Ref.current?.querySelectorAll?.(".word") || []),
        ...(p2Ref.current?.querySelectorAll?.(".word") || []),
      ]);

      // ── Mobile: no circle animation ──
      if (isMobile) {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "top -140%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        }).to(words, {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
        });

        return () => {
          split1.revert();
          split2.revert();
        };
      }

      // ── Desktop: position circle2 at lastDot's Y, then fade in on approach ──
      if (circle2) {
        // Align circle2 Y to lastDot so no hardcoded top% needed.
        // Done after first paint so getBoundingClientRect is accurate.
        requestAnimationFrame(() => {
          if (!lastDotRef.current || !circle2) return;
          const dotRect = lastDotRef.current.getBoundingClientRect();
          const dotCenterY = dotRect.top + dotRect.height / 2;
          // circle2 is fixed + translated -50% so set top = dotCenterY directly
          gsap.set(circle2, { top: dotCenterY, opacity: 0, x: 0, y: 0 });
        });
      }

      // Approach fade-in: circle2 appears as section scrolls into view.
      // onLeaveBack: hide circle2 again if user scrolls back above this zone.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 20%",
        end: "top 0%",
        scrub: 1,
        animation: gsap.timeline().to(circle2, {
          opacity: 1,
          ease: "power2.out",
          duration: 1,
        }),
        onLeaveBack: () => {
          // Re-hide circle2 and fully restore lastDot when scrolled above section
          gsap.set(circle2, { opacity: 0 });
          if (lastDotRef.current) gsap.set(lastDotRef.current, { opacity: 1, x: 0 });
        },
      });

      // ── Desktop: main pinned timeline ──
      // Structure (all on scrub):
      //   0  → word stagger opacity reveal
      //   after words → lastDot travels to horizontal center (Y stays, only X moves)
      //   after arrive → circle2 is already there, lastDot fades to opacity 0
      //   → circle2 grows to 20px (existing behaviour)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "top -200%",   // slightly more scroll room for the extra steps
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Reveal words
      tl.to(words, {
        opacity: 1,
        stagger: 0.15,
        ease: "none",
      });

      // 2. lastDot slides to horizontal center of viewport
      //    We animate `x` by the delta from its current position to center.
      //    We use a function-based value so it's calculated at scroll-start
      //    (after pin locks the layout).
      tl.to(
        lastDotRef.current,
        {
          x: () => {
            if (!lastDotRef.current) return 0;
            const rect = lastDotRef.current.getBoundingClientRect();
            const dotCenterX = rect.left + rect.width / 2;
            const screenCenterX = window.innerWidth / 2;
            return screenCenterX - dotCenterX;
          },
          duration: 6,
          ease: "power2.inOut",
          invalidateOnRefresh: true,
        },
        // small overlap so it starts just as the last word finishes
        "-=1"
      );

      // 3. Snap circle2 to exact center (same x/y as lastDot) so they overlay,
      //    then fade lastDot out — visually one seamless dot at center.
      //    circle2 left is already 50vw (from CSS). We only need to sync its top
      //    to the lastDot's current viewport Y, which hasn't moved (only X moved).
      tl.call(() => {
        if (!lastDotRef.current || !circle2) return;
        const rect = lastDotRef.current.getBoundingClientRect();
        const dotCenterY = rect.top + rect.height / 2;
        // Instantly place circle2 exactly on top of lastDot before fade starts
        gsap.set(circle2, {
          top: dotCenterY,
          opacity: 0,
        });
      });

      tl.to(
        lastDotRef.current,
        {
          opacity: 0,
          duration: 3,
          ease: "none",
        }
      );

      // 4. circle2 grows to 20px bullet size (original behaviour)
      tl.to(
        circle2,
        {
          width: "20px",
          height: "20px",
          duration: 8,
          opacity: 1,
          autoRound: false,
        }
      ,"-=3");

      return () => {
        split1.revert();
        split2.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="page2"
      className="w-full h-screen px-4 md:px-20 py-24 flex flex-col justify-center"
    >
      <div className="mx-auto">
        <div className="max-w-5xl space-y-12">
          <p
            ref={p1Ref}
            className="relative z-12 heading-xl [font-kerning:none]"
          >
            Point Of is an independent consultancy based in Mumbai, rethinking
            how brands connect with culture and people.
          </p>

          <p
            ref={p2Ref}
            className="relative z-12 heading-xl [font-kerning:none]"
          >
            We work at the intersection of design, strategy, and
            technology—crafting identities that balance innovation with timeless
            storytelling. Building for India and beyond
            <span
              ref={lastDotRef}
              data-last-dot
              className="inline-block bg-heading rounded-full leading-0 w-1.5 h-1.5"
              aria-hidden="true"
            />
          </p>
        </div>

        <Button
          title={"Explore our Work"}
          onClick={() => {
            router.push("/about");
          }}
        />
      </div>
    </section>
  );
};

export default AboutStudio;
