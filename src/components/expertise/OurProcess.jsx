"use client";

import React, { useRef } from "react";
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

  // Mobile refs — outer wrap for exit tween; inner group for motionPath only (avoids transform fights)
  const mobileCircleWrapRef = useRef(null);
  const mobileCircleGroupRef = useRef(null);
  const mobileCircleRef = useRef(null);
  const mobilePathRef = useRef(null);
  const mobileStepsRef = useRef([]);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const mm = gsap.matchMedia();

    // lg (1024px) and up: wide desktop journey — unchanged behavior
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const pathScroller = sectionRef.current;
        const panel = svgContainerRef.current;
        const circle = circleRef.current;
        const circleShadow = circleShadowRef.current;
        const path = pathRef.current;
        const newCircle = dotRef.current;
        const textElements = textsRef.current;
        const circleGroup = [circle, circleShadow];

        if (!path || !circle) return;

        const circleBounds = circle.getBoundingClientRect();
        newCircle.style.width = `${circleBounds.width}px`;
        newCircle.style.height = `${circleBounds.height}px`;

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
      });

      return () => ctx.revert();
    });

    // < lg: phones + tablets — vertical scroll path (not the wide desktop canvas)
    mm.add("(max-width: 1023px)", () => {
      const onLoadRefresh = () => ScrollTrigger.refresh();
      const ctx = gsap.context(() => {
        const circle = mobileCircleRef.current;
        const path = mobilePathRef.current;
        const steps = mobileStepsRef.current;
        const circleGroup = mobileCircleGroupRef.current;
        const circleWrap = mobileCircleWrapRef.current;

        if (!circle || !path || !circleGroup || !circleWrap || steps.length === 0)
          return;

        const isTablet =
          typeof window !== "undefined" &&
          window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches;
        const scrubMotion = isTablet ? 0.32 : 0.25;
        const scrubPin = isTablet ? 0.42 : 0.35;
        const pinEnd = isTablet ? "+=165%" : "+=150%";

        gsap.set(circleWrap, { y: 0, opacity: 1, force3D: true });
        gsap.set(circleGroup, {
          force3D: true,
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
            start: 0,
            end: 0,
          },
        });

        const motionPathCommon = {
          path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        };

        function updateTextGlow() {
          const circleY =
            circle.getBoundingClientRect().top +
            circle.getBoundingClientRect().height / 2;
          let closestStep = null;
          let minDistance = Infinity;

          steps.forEach((step) => {
            if (!step) return;
            const texts = step.querySelectorAll("text");
            if (texts.length === 0) return;
            let sumY = 0;
            texts.forEach((text) => {
              const textY =
                text.getBoundingClientRect().top +
                text.getBoundingClientRect().height / 2;
              sumY += textY;
            });
            const avgY = sumY / texts.length;
            const distanceY = Math.abs(circleY - avgY);
            if (distanceY < minDistance) {
              minDistance = distanceY;
              closestStep = step;
            }
          });

          steps.forEach((step) => {
            if (!step) return;
            const texts = step.querySelectorAll("text");
            const isFocused = step === closestStep;
          gsap.set(texts, {
            opacity: isFocused ? 1 : 0.2,
            fill: isFocused ? "var(--color-heading)" : "var(--color-desc)",
          });
          });
        }

        gsap.to(circleGroup, {
          scrollTrigger: {
            trigger: "#svg-mobile",
            start: "top top",
            end: "bottom bottom",
            scrub: scrubMotion,
            invalidateOnRefresh: true,
            onUpdate: updateTextGlow,
          },
          motionPath: {
            ...motionPathCommon,
            end: 1,
          },
          ease: "none",
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#svg-mobile",
              start: "bottom 95%",
              end: pinEnd,
              scrub: scrubPin,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .to(circleWrap, {
            y: isTablet ? "+=620" : "+=700",
            ease: "none",
            duration: 1,
            force3D: true,
          })
          .to(circleWrap, {
            opacity: 0,
            duration: 0.4,
            ease: "none",
            force3D: true,
          });

        requestAnimationFrame(onLoadRefresh);
        window.addEventListener("load", onLoadRefresh);
      });

      return () => {
        window.removeEventListener("load", onLoadRefresh);
        ctx.revert();
      };
    });

    return () => mm.revert();
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

      {/* ─── DESKTOP SECTION (original, unchanged) ─── */}
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
        className="our-process-desktop"
      >
        <style>{`
          .our-process-desktop { display: none !important; }
          .our-process-mobile  { display: block !important; }
          @media (min-width: 1024px) {
            .our-process-desktop { display: block !important; }
            .our-process-mobile  { display: none !important; }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .our-process-scroll-svg-wrap {
              max-width: min(92vw, 920px);
              margin-left: auto;
              margin-right: auto;
            }
            #svg-mobile .our-process-scroll-path {
              stroke-width: 22;
            }
            #svg-mobile g.step > text:nth-of-type(1) {
              font-size: 36px;
            }
            #svg-mobile g.step > text:nth-of-type(n + 2) {
              font-size: 22px;
            }
            #svg-mobile .our-process-scroll-dot {
              r: 14;
            }
            #svg-mobile .our-process-scroll-glow {
              r: 180;
            }
          }
        `}</style>

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
                x: 22,
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
                    className="jp2 jp5 jp6 text-desc! para"
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            ))}
          </svg>
        </div>
      </section>

      {/* ─── MOBILE SECTION ─── */}
      <div
        className="our-process-mobile"
        style={{ width: "100%", height: "auto", backgroundColor: "black" }}
      >
        <div className="our-process-scroll-svg-wrap">
        <svg
          id="svg-mobile"
          width="741"
          height="3200"
          viewBox="0 0 741 3200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            <radialGradient
              id="shadowFill"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="20%" stopColor="#f2f2ee" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#f2f2ee" stopOpacity="0" />
            </radialGradient>
          </defs>

          <style>{`
            .jp4 { fill: var(--color-heading); }
            .jp6 { fill: var(--color-desc); }
          `}</style>

          {/* Snake Path */}
          <path
            ref={mobilePathRef}
            className="theLine our-process-scroll-path"
            d="M186.5 205C186.502 707.686 594.002 386.741 594.002 682.78C594.002 954.439 148.509 889.427 148.504 1139.03C148.499 1388.63 594.002 1288.21 594.002 1497.76C594.002 1757.23 148.503 1617.91 148.505 1844.3C148.507 2013.79 583 2118 583 2264.5C583 2411 544.5 2484.47 188 2566.5C188 2566.5 59.5 2597 46 2697"
            stroke="#292929"
            strokeWidth="16"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />

          {/* Step 1 — Discovery */}
          <g className="step" data-step="1" ref={(el) => (mobileStepsRef.current[0] = el)}>
            <text x="300" y="235.704" className="jp2 jp4 heading-lg text-heading fill-current">Discovery</text>
            <text x="300" y="278.31" className="jp2 jp5 jp6 text-desc! para fill-current">We dive deep into your brand,</text>
            <text x="300" y="316.621" className="jp2 jp5 jp6 text-desc! para fill-current">business, and objectives to create</text>
            <text x="300" y="354.932" className="jp2 jp5 jp6 text-desc! para fill-current">a clear and strategic roadmap</text>
            <text x="300" y="393.243" className="jp2 jp5 jp6 text-desc! para fill-current">that aligns with your goals.</text>
          </g>

          {/* Step 2 — Strategy */}
          <g className="step" data-step="2" ref={(el) => (mobileStepsRef.current[1] = el)}>
            <text x="109" y="650.159" className="jp2 jp4 heading-lg text-heading fill-current">Strategy</text>
            <text x="109" y="692.765" className="jp2 jp5 jp6 text-desc! para fill-current">We align brand strategy with</text>
            <text x="109" y="731.075" className="jp2 jp5 jp6 text-desc! para fill-current">your vision—backed by</text>
            <text x="109" y="769.387" className="jp2 jp5 jp6 text-desc! para fill-current">research, insight, and</text>
            <text x="109" y="807.698" className="jp2 jp5 jp6 text-desc! para fill-current">creative clarity.</text>
          </g>

          {/* Step 3 — Creative Development */}
          <g className="step" data-step="3" ref={(el) => (mobileStepsRef.current[2] = el)}>
            <text x="270" y="1068.1" className="jp2 jp4 heading-lg text-heading fill-current">Creative Development</text>
            <text x="270" y="1110.7" className="jp2 jp5 jp6 text-desc! para fill-current">We explore design references,</text>
            <text x="270" y="1149.01" className="jp2 jp5 jp6 text-desc! para fill-current">create moodboards, and</text>
            <text x="270" y="1187.32" className="jp2 jp5 jp6 text-desc! para fill-current">define a shared visual</text>
            <text x="270" y="1225.64" className="jp2 jp5 jp6 text-desc! para fill-current">direction.</text>
          </g>

          {/* Step 4 — Design & Refine */}
          <g className="step" data-step="4" ref={(el) => (mobileStepsRef.current[3] = el)}>
            <text x="109" y="1459.33" className="jp2 jp4 heading-lg text-heading fill-current">Design &amp; Refine</text>
            <text x="109" y="1501.94" className="jp2 jp5 jp6 text-desc! para fill-current">We design, present concepts,</text>
            <text x="109" y="1540.25" className="jp2 jp5 jp6 text-desc! para fill-current">and refine them through</text>
            <text x="109" y="1578.56" className="jp2 jp5 jp6 text-desc! para fill-current">collaborative rounds of</text>
            <text x="109" y="1616.87" className="jp2 jp5 jp6 text-desc! para fill-current">feedback.</text>
          </g>

          {/* Step 5 — Optimisation & Handoff */}
          <g className="step" data-step="5" ref={(el) => (mobileStepsRef.current[4] = el)}>
            <text x="290" y="1800.65" className="jp2 jp4 heading-lg text-heading fill-current">Optimisation &amp; Handoff</text>
            <text x="290" y="1843.25" className="jp2 jp5 jp6 text-desc! para fill-current">We package up final assets,</text>
            <text x="290" y="1881.56" className="jp2 jp5 jp6 text-desc! para fill-current">document everything, and</text>
            <text x="290" y="1919.88" className="jp2 jp5 jp6 text-desc! para fill-current">ensure your team is set up</text>
            <text x="290" y="1958.19" className="jp2 jp5 jp6 text-desc! para fill-current">to scale.</text>
          </g>

          {/* Step 6 — Media Production */}
          <g className="step" data-step="6" ref={(el) => (mobileStepsRef.current[5] = el)}>
            <text x="50" y="2141.96" className="jp2 jp4 heading-lg text-heading fill-current">Media Production</text>
            <text x="50" y="2184.57" className="jp2 jp5 jp6 text-desc! para fill-current">Production that captures</text>
            <text x="50" y="2222.88" className="jp2 jp5 jp6 text-desc! para fill-current">and conveys brand narratives</text>
            <text x="50" y="2261.19" className="jp2 jp5 jp6 text-desc! para fill-current">with precision, ensuring clarity</text>
            <text x="50" y="2299.5" className="jp2 jp5 jp6 text-desc! para fill-current">and engagement across platforms.</text>
          </g>

          {/* Step 7 — Support */}
          <g className="step" data-step="7" ref={(el) => (mobileStepsRef.current[6] = el)}>
            <text x="274" y="2709.66" className="jp2 jp4 heading-lg text-heading fill-current">Support</text>
            <text x="274" y="2752.27" className="jp2 jp5 jp6 text-desc! para fill-current">Need more? We offer ongoing</text>
            <text x="274" y="2790.58" className="jp2 jp5 jp6 text-desc! para fill-current">design support through flexible,</text>
            <text x="274" y="2828.89" className="jp2 jp5 jp6 text-desc! para fill-current">collaborative retainer</text>
            <text x="274" y="2867.2" className="jp2 jp5 jp6 text-desc! para fill-current">options.</text>
          </g>

          {/* Circle: outer wrap = exit motion; inner = motionPath (separate transforms = smooth scroll sync) */}
          <g id="circleWrap" ref={mobileCircleWrapRef} style={{ willChange: "transform" }}>
            <g id="circleGroup" ref={mobileCircleGroupRef} style={{ willChange: "transform" }}>
              <circle
                ref={mobileCircleRef}
                className="theCircle our-process-scroll-dot"
                r="11"
                fill="white"
              />
              <circle
                className="theCircleShadow our-process-scroll-glow"
                r="150"
                opacity="0.05"
                fill="url(#shadowFill)"
              />
            </g>
          </g>
        </svg>
        </div>
      </div>
    </>
  );
};

export default OurProcess;
