"use client";

import React, {  useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

const OurProcess = () => {
  const sectionRef = useRef(null);
  const svgContainerRef = useRef(null);
  const circleRef = useRef(null);
  const circleShadowRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const textsRef = useRef([]);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth <= 767) return;

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const pathScroller = sectionRef.current;
    const panel = svgContainerRef.current;
    const circle = circleRef.current;
    const circleShadow = circleShadowRef.current;
    const path = pathRef.current;
    const newCircle = dotRef.current;
    const textElements = textsRef.current;
    const circleGroup = [circle, circleShadow];

    if (!path || !circle) return;

    // Size the dot overlay to match the SVG circle
    const circleBounds = circle.getBoundingClientRect();
    newCircle.style.width = `${circleBounds.width}px`;
    newCircle.style.height = `${circleBounds.height}px`;

    // Initial text opacities
    gsap.set(textElements, { opacity: 0.1 });
    gsap.set(textElements[0], { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pathScroller,
        scroller: "body",
        start: "top 0%",
        end: "top -350%",
        scrub: 1,
        pin: true,
      },
    });

    tl.to(
      circleGroup,
      {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          start: 0,
          end: 1,
        },
        duration: 4,
        ease: "none",
        onUpdate: () => {
          const circleX =
            circle.getBoundingClientRect().left +
            circle.getBoundingClientRect().width / 2;

          textElements.forEach((text) => {
            if (!text) return;
            const textX =
              text.getBoundingClientRect().left +
              text.getBoundingClientRect().width / 2;
            const distanceX = Math.abs(circleX - textX);
            const opacity = Math.max(
              0.1,
              1 - distanceX / (window.innerWidth / 2.2)
            );
            gsap.to(text, { opacity, immediateRender: false });
          });
        },
      },
      "a"
    )
      .to(
        panel,
        {
          x: "-112.8vw",
          duration: 3,
        },
        "a"
      )
      .to(
        panel,
        {
          y: "-100vh",
          duration: 1.5,
          delay: 2.5,
        },
        "a"
      )
      .to(circleGroup, {
        y: "+=800",
        ease: "bounce.out",
        duration: 0.6,
      })
      .to(circleGroup, {
        opacity: 0,
        duration: 0,
      });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Dot overlay */}
      <div
        ref={dotRef}
        style={{
          width: "25px",
          height: "25px",
          borderRadius: "50%",
          top: 0,
          left: 0,
          position: "fixed",
          backgroundColor: "#f2f2ee",
          zIndex: 999999,
          transition: "none",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Section */}
      <section
        ref={sectionRef}
        style={{
          height: "100vh",
          paddingTop: "10vh",
          paddingBottom: 0,
          width: "100vw",
          overflow: "hidden",
          backgroundColor: "black",
          position: "relative",
          zIndex: 9,
        }}
      >
        <div
          ref={svgContainerRef}
          style={{ width: "200vw", height: "200vh" }}
        >
          <svg
            version="1.1"
            className="journeyPath--desktop"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 3501.8 1885"
            style={{
              enableBackground: "new 0 0 3501.8 1885",
              overflow: "visible",
            }}
            xmlSpace="preserve"
          >
            <defs>
              <filter
                id="shadow"
                x="-5000%"
                y="-5000%"
                width="10000%"
                height="10000%"
              >
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="200"
                  floodColor="#f2f2ee"
                  floodOpacity="1"
                />
              </filter>
              <radialGradient
                id="whiteToTransparent"
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop
                  offset="20%"
                  style={{ stopColor: "#f2f2ee", stopOpacity: 0.5 }}
                />
                <stop
                  offset="70%"
                  style={{ stopColor: "#f2f2ee", stopOpacity: 0 }}
                />
              </radialGradient>
            </defs>

            <style>{`
              .jp1 {
                fill: none;
                stroke: #121212cc;
                stroke-width: 26;
                stroke-miterlimit: 10;
                stroke-linecap: round;
              }
              .jp3 { fill: #f2f2ee; }
              .jp4 {
                fill: var(--color-heading);
              }
              .jp6 {
                fill: var(--color-desc);
              }
            `}</style>

            <g>
              <path
                ref={pathRef}
                className="theLine jp1"
                d="M268,452C379.3,443.2,445,436.8,511,430.4c65.6-6.4,134.6,10.4,192.6,39.4c20.9,10.4,40.8,22.5,59.6,36
                c49.9,35.9,82,75.4,125.4,112.4c42.3,36.4,96.1,67.9,150.4,85.5c170.7,59,270.4-69.1,352.7-227.9c30.2-56.4,53.3-114.8,91.2-164.9
                c97.3-130.1,301.5-137.1,435.1-25.7c46.4,37.9,85.6,87.5,130.9,126.8c144.5,132,317.3,42.2,445.7-65.5
                c39.8-33.2,73.1-68.9,109.6-104.6c129.4-132.2,293.2-187,461.6-155.6c86.3,15.4,161.9,57,227.4,114
                c274.5,235.8,302.7,652.8,72.1,909.9c-308.6,312.8-549.9,161.2-901.2,266.8c-193,58-161.2,47.4-368.1,136.8"
              />
            </g>

            {/* Moving circle */}
            <circle
              ref={circleRef}
              className="theCircle jp3"
              cx="673.1"
              cy="530.9"
              r="14"
              filter="url(#shadow)"
              transform="matrix(1,0,0,1,-602.49999,105.09976)"
            />

            {/* Glow shadow */}
            <circle
              ref={circleShadowRef}
              style={{ opacity: 0.2 }}
              className="theCircleShadow"
              cx="693.1"
              cy="530.9"
              r="220"
              fill="url(#whiteToTransparent)"
              transform="matrix(1,0,0,1,-622.50006,105.09968)"
            />

            {/* Text labels */}
            {[
              {
                transform: "matrix(1 0 0 1 230.7241 182.4585)",
                title: "Discovery",
                lines: [
                  "We dig deep into your brand, business, and goals",
                  "to craft a thoughtful project roadmap.",
                ],
                x: 80,
              },
              {
                transform: "matrix(1 0 0 1 744.5525 327.1489)",
                title: "Strategy",
                lines: [
                  "We align brand strategy with your vision—backed",
                  "by research, insight, and creative clarity.",
                ],
                x: 100,
              },
              {
                transform: "matrix(1 0 0 1 1413.1023 443.2568)",
                title: "Creative Development",
                lines: [
                  "We explore design references, create moodboards,",
                  "and define a shared visual direction.",
                ],
                x: 120,
              },
              {
                transform: "matrix(1 0 0 1 1917.6821 113.2364)",
                title: "Design & Refine",
                lines: [
                  "We design, present concepts, and refine them",
                  "through collaborative rounds of feedback.",
                ],
                x: 120,
              },
              {
                transform: "matrix(1 0 0 1 2690.7517 208.5494)",
                title: "Optimisation & Handoff",
                lines: [
                  "We package up final assets, document everything,",
                  "and ensure your team is set up to scale.",
                ],
                x: 120,
              },
              {
                transform: "matrix(1 0 0 1 2849.9114 703.7327)",
                title: "Media Production",
                lines: [
                  "Production that captures and conveys",
                  "brand narratives with precision, ensuring",
                  "clarity and engagement across platforms.",
                ],
                x: 0,
              },
              {
                transform: "matrix(1 0 0 1 2296.9211 1015.5708)",
                title: "Support",
                lines: [
                  "Need more? We offer ongoing design support",
                  "through flexible, collaborative retainer options.",
                ],
                x: 0,
              },
            ].map((item, i) => (
              <text
                key={i}
                ref={(el) => (textsRef.current[i] = el)}
                transform={item.transform}
                style={{ opacity: 0.1 }}
              >
                <tspan x={item.x} y="22.1" className="jp2 jp4 heading-lg text-heading">
                  {item.title}
                </tspan>
                {item.lines.map((line, j) => (
                  <tspan
                    key={j}
                    x={item.x}
                    y={58.1 + j * 28}
                    className="jp2 jp5 jp6 !text-desc !para"
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            ))}
          </svg>
        </div>
      </section>
    </>
  );
};

export default OurProcess;