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
  const buttonWrapRef = useRef(null);
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

      const words = gsap.utils.toArray(".word");

      // ── MOBILE: no pin, auto height, words animate as you scroll ──────────
      if (isMobile) {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }).to(words, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
        });

        return () => {
          split1.revert();
          split2.revert();
        };
      }

      // ── DESKTOP: pinned with circle handoff animation ──────────────────────
      const buttonLink = buttonWrapRef.current?.querySelector("a, button");
      const buttonDot = buttonLink?.children?.[0];
      const buttonText = buttonLink?.children?.[1];

      const getButtonHandoff = () => {
        const dotRect = buttonDot?.getBoundingClientRect();
        const textRect = buttonText?.getBoundingClientRect();

        if (!dotRect || !textRect) {
          return {
            textShiftX: 0,
            dotStartX: window.innerWidth * 0.5,
            dotStartY: window.innerHeight * 0.5,
            dotSize: 8,
          };
        }

        const textShiftX = dotRect.left - textRect.left;

        return {
          textShiftX,
          dotStartX: dotRect.left + textRect.width + 14,
          dotStartY: dotRect.top + dotRect.height / 2,
          dotSize: dotRect.width,
        };
      };

      if (circle2) {
        gsap.set(circle2, {
          position: "fixed",
          left: () => getButtonHandoff().dotStartX,
          top: () => getButtonHandoff().dotStartY,
          width: () => getButtonHandoff().dotSize,
          height: () => getButtonHandoff().dotSize,
          xPercent: -50,
          yPercent: -50,
          scale: 0,
          opacity: 0,
          autoRound: false,
        });
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "top -140%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(words, {
          opacity: 1,
          stagger: 0.15,
        })
        .set(
          circle2,
          {
            left: () => getButtonHandoff().dotStartX,
            top: () => getButtonHandoff().dotStartY,
            width: () => getButtonHandoff().dotSize,
            height: () => getButtonHandoff().dotSize,
            scale: 0,
            opacity: 0,
          },
          "handoff"
        )
        .to(
          buttonDot,
          {
            scale: 0,
            opacity: 0,
            transformOrigin: "50% 50%",
            duration: 0.8,
            ease: "power2.out",
          },
          "handoff"
        )
        .to(
          buttonText,
          {
            x: () => getButtonHandoff().textShiftX,
            duration: 0.8,
            ease: "power2.out",
          },
          "handoff"
        )
        .to(
          circle2,
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
            autoRound: false,
          },
          "handoff+=0.35"
        )
        .to(
          circle2,
          {
            left: () => window.innerWidth * 0.5,
            top: () => getButtonHandoff().dotStartY,
            width: 20,
            height: 20,
            duration: 1.2,
            ease: "power2.inOut",
            autoRound: false,
          },
          "handoff+=0.8"
        )
        .to(circle2, {
          duration: 0.35,
          ease: "none",
        });

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
      className="w-full mix-blend-difference px-6 py-6 md:px-20 md:py-24 flex flex-col justify-center md:h-screen"
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
            storytelling. Building for India and beyond.
          </p>
        </div>

        <div ref={buttonWrapRef}>
          <Button
            title={"Explore our Work"}
            onClick={() => {
              router.push("/about");
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutStudio;