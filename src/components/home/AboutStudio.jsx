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
  const router = useRouter();
  useLayoutEffect(() => {
    if (!sectionRef.current || !p1Ref.current || !p2Ref.current) return;

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

      if (circle2) {
        gsap.set(circle2, { opacity: 0, x: 0, y: 0 });
      }

      // Fade in circle
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "top 0%",
          scrub: 1,
        },
      }).to(circle2, {
        opacity: 1,
        ease: "power2.out",
        duration: 1,
      });

      // Main pinned animation
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "top -140%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
        .to(words, {
          opacity: 1,
          stagger: 0.15,
        })
        .to(
          circle2,
          {
            width: "20px",
            height: "20px",
            duration: 8,
            autoRound: false,
          },
        );


      // cleanup splits inside context
      return () => {
        split1.revert();
        split2.revert();
      };
    }, sectionRef);

    return () => ctx.revert(); // 🔥 cleans GSAP + ScrollTrigger properly
  }, []);

  return (
    <section
      ref={sectionRef}
      id="page2"
      className="w-full mix-blend-difference h-screen px-6 md:px-20 py-24 flex flex-col justify-center"
    >
      <div className="mx-auto">
        <div className="max-w-5xl space-y-12">
          <p
            ref={p1Ref}
            className="relative z-12  heading-xl [font-kerning:none]"
          >
            Point Of is an independent consultancy based in Mumbai, rethinking
            how brands connect with culture and people.
          </p>

          <p
            ref={p2Ref}
            className="relative z-12  heading-xl [font-kerning:none]"
          >
            We work at the intersection of design, strategy, and
            technology—crafting identities that balance innovation with timeless
            storytelling. Building for India and beyond.
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