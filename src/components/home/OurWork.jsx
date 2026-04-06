"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  useRef,
  useLayoutEffect,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import WorkCard from "../work/WorkCard";

const posts = [
  {
    slug: "project-1",
    title: "Project One",
    video: "https://www.wearepointof.com/videos/Contigo_v4.mp4",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/021e2e203085493.6690e78c7a22d.png",
  },
  {
    slug: "project-2",
    title: "Project Two",
    video: "https://www.wearepointof.com/videos/Chhaya%20Jain_v3.mp4",
    image: "https://www.wearepointof.com/home/chhaya.png",
  },
  {
    slug: "project-3",
    title: "Project Three",
    video: "https://www.wearepointof.com/videos/typcaste_v2.mp4",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/8bf51c209757845.67053c2f6afcf.png",
  },
  {
    slug: "project-4",
    title: "Project Four",
    video: "https://www.wearepointof.com/videos/Jadau.mp4",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/930dd1224112355.Y3JvcCwxMTE2LDg3MywxNDAsMA.png",
  },
  {
    slug: "project-5",
    title: "Project Five",
    video: "https://www.wearepointof.com/videos/Whitehues_v2.mp4",
    image: "https://www.wearepointof.com/home/whitehues.png",
  },
];

export default function OurWork() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const buttonCircleRef = useRef(null);

  const [maxTranslate, setMaxTranslate] = useState(0);

  // Store the natural (unscaled) resting offset of the button circle
  // relative to the track origin — computed once on mount/resize
  const naturalOffsetRef = useRef(0);

  const [merged, setMerged] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

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

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  // replace setMerged inside useMotionValueEvent with this:
  useMotionValueEvent(x, "change", (latestX) => {
    const dist = Math.abs(naturalOffsetRef.current + latestX);

    setMerged(prev => {
      const next = (() => {
        if (!prev && dist <= 1) return true;
        if (prev && dist > 8) return false;
        return prev;
      })();

      if (next !== prev) {
        // Tell the global CenterDot to grow/shrink
        window.dispatchEvent(new CustomEvent("ourwork:merge", { detail: { merged: next } }));
      }

      return next;
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh]"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">

        {/* TRACK */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-center gap-22 px-4 sm:px-10 md:px-16 lg:px-20"
        >
          {/* CARDS */}
          {posts.map((post, index) => (
            <WorkCard key={index} post={post} />
          ))}

          {/* BUTTON */}
          <div className="min-w-[300px] md:min-w-[400px] flex items-center justify-center ml-40">
            <Link href="/work" className="group cursor-pointer flex items-center gap-3 text-sm font-semibold uppercase tracking-wide">

              {/* BUTTON CIRCLE */}
              <span
                ref={buttonCircleRef}
                className="relative flex items-center justify-center rounded-full opacity-0 bg-white"
                style={{
                  width: merged ? "40px" : "8px",
                  height: merged ? "40px" : "8px",
                  transition: "width 0.5s cubic-bezier(0.22,1,0.36,1), height 0.5s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <svg
                  style={{
                    opacity: merged ? 1 : 0,
                    transform: merged ? "scale(1)" : "scale(0.4)",
                    transition: "opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s",
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
              <span
                className="relative whitespace-nowrap"
                style={{
                  opacity: merged ? 0 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                VIEW ALL WORK
                <span
                  className="absolute right-0 -bottom-1 h-px bg-white transition-all duration-300"
                  style={{ width: merged ? "0%" : "100%" }}
                />
              </span>
            </Link>
          </div>
        </motion.div>


      </div>
    </section>
  );
}