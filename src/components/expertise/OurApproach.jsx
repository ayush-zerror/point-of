"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurApproach = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // ─── DESKTOP only ───
        if (window.innerWidth > 1024) {
            const aptl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#page4",
                    start: "top top",
                    end: "top -300%",
                    scrub: 1,
                    pin: true,
                },
            });

            aptl
                // STEP 1
                .fromTo(
                    "#page4 > h2, .apr-circle2, .apr-circle3",
                    { opacity: 0 },
                    { opacity: 1, duration: 0.2 }
                )
                .fromTo(
                    "#step-three",
                    { backgroundColor: "transparent" },
                    { backgroundColor: "#ffffff2f" }
               
                )
                .fromTo(
                    ".apr-circle1",
                    { backgroundColor: "#cbcbcb", borderColor: "#cbcbcb" },
                    { backgroundColor: "#cbcbcb", borderColor: "#cbcbcb", duration: 0.3 },
                    "a"
                )
                .fromTo(
                    ".approach1",
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.5 },
                    "a"
                )

                // STEP 2
                .fromTo(
                    ".approach2",
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.5 },
                    "b"
                )
                .fromTo(
                    ".step-loader-bar",
                    { width: "0%" },
                    { width: "50%", duration: 0.5 },
                    "b"
                )
                .fromTo(
                    ".apr-circle2",
                    { backgroundColor: "#cbcbcb", borderColor: "#cbcbcb" },
                    { backgroundColor: "#cbcbcb", borderColor: "#cbcbcb", duration: 0.2, delay: 0.5 },
                    "b"
                )
                .to(".apr-circle1-inner", { opacity: 0 }, "b")

                // STEP 3
                .fromTo(
                    ".approach3",
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 0.5 },
                    "c"
                )
                .fromTo(
                    ".step-loader-bar",
                    { width: "50%" },
                    { width: "100%", duration: 0.5 },
                    "c"
                )
                .fromTo(
                    ".apr-circle3",
                    { backgroundColor: "#cbcbcb", borderColor: "#cbcbcb" },
                    { backgroundColor: "#cbcbcb", borderColor: "#cbcbcb", duration: 0.2, delay: 0.5 },
                    "c"
                )

                // STEP 4
                .fromTo(
                    "#approach-content h5, #page4 > h2, .step-loader-bar",
                    { opacity: 1 },
                    { opacity: 0, duration: 0.5 },
                    "d"
                )
                .fromTo(
                    "#step-three",
                    { backgroundColor: "#cbcbcb" },
                    { backgroundColor: "transparent", duration: 0.5 },
                    "d"
                );

            // ── CENTER BLOOM ─────────────────────────────────────────
            const page4 = document.querySelector("#page4");
            const circles = document.querySelectorAll(".aprCir");
            const h2s = document.querySelectorAll("#approach-content h2");

            const page4Rect = page4.getBoundingClientRect();
            const centerX = page4Rect.left + page4Rect.width / 2 + window.scrollX;
            const centerY = page4Rect.top + page4Rect.height / 2 + window.scrollY;

            const targetDiameterPx = window.innerWidth * 0.3;
            const r = targetDiameterPx / 2;
            const side = r * 0.6;
            const h = (Math.sqrt(3) / 2) * side;
            const yShift = r * 0.03;

            const offsets = [
                { x: -side / 2, y: -h / 3 + yShift },
                { x: side / 2, y: -h / 3 + yShift },
                { x: 0, y: (2 * h) / 3 + yShift },
            ];

            circles.forEach((circle, i) => {
                aptl.to(
                    circle,
                    {
                        position: "fixed",
                        left: "50%",
                        top: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginLeft: 0,
                        marginTop: 0,
                        xPercent: -50,
                        yPercent: -50,
                        x: offsets[i].x,
                        y: offsets[i].y,
                        width: "30vw",
                        height: "30vw",
                        backgroundColor: "transparent",
                        duration: 0.8,
                        ease: "power2.out",
                        delay: 0.5,
                    },
                    "d"
                );
            });

            h2s.forEach((h2, i) => {
                const rect = h2.getBoundingClientRect();
                const h2X = rect.left + rect.width / 2 + window.scrollX;
                const h2Y = rect.top + rect.height / 2 + window.scrollY;

                aptl.to(
                    h2,
                    {
                        x: centerX - h2X,
                        y: centerY - h2Y + i * 35,
                        duration: 0.8,
                        ease: "power2.out",
                        delay: 0.5,
                    },
                    "d"
                );
            });
        }

        // ─── MOBILE / TABLET: fade-up each card on scroll ───
        if (window.innerWidth <= 1024) {
            gsap.utils.toArray(".approach-card-mobile").forEach((card) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }

    }, []);

    return (
        <>
            <style>{`
                .approach-desktop { display: flex; }
                .approach-mobile  { display: none;  }
                @media (max-width: 1024px) {
                    .approach-desktop { display: none  !important; }
                    .approach-mobile  { display: block !important; }
                }
            `}</style>

            {/* ─── DESKTOP (original, completely unchanged) ─── */}
            <div
                id="page4"
                ref={containerRef}
                className="approach-desktop relative z-8 h-screen w-full flex-col justify-center px-[6vw] py-[2.3vw]"
            >
                <h2 className="heading-xl mb-[6vw] text-heading">Our Approach</h2>

                <div id="approach-wrap" className="w-full">
                    <div
                        id="step-three"
                        className="relative mb-[4vw] h-[2px] w-[72%]"
                        style={{ backgroundColor: "transparent" }}
                    >
                        {/* Circle 1 — left: 0, vertically centered with negative margin */}
                        <div
                            className="aprCir apr-circle1 absolute rounded-full origin-center"
                            style={{
                                left: 0,
                                top: "50%",
                                marginTop: -12.5,
                                width: 25,
                                height: 25,
                                backgroundColor: "#cbcbcb",
                                border: "1px solid #cbcbcb",
                            }}
                        >
                            <div
                                className="apr-circle1-inner h-full w-full rounded-full"
                                style={{
                                    backgroundColor: "#cbcbcb",
                                    border: "1px solid #cbcbcb",
                                }}
                            />
                        </div>

                        {/* Circle 2 — centered, marginLeft instead of -translateX-1/2 */}
                        <div
                            className="aprCir apr-circle2 absolute rounded-full origin-center"
                            style={{
                                left: "50%",
                                marginLeft: -12.5,
                                top: "50%",
                                marginTop: -12.5,
                                width: 25,
                                height: 25,
                                backgroundColor: "#cbcbcb",
                                border: "1px solid #cbcbcb",
                            }}
                        />

                        {/* Circle 3 — right: 0, vertically centered */}
                        <div
                            className="aprCir apr-circle3 absolute rounded-full origin-center"
                            style={{
                                right: 0,
                                top: "50%",
                                marginTop: -12.5,
                                width: 25,
                                height: 25,
                                backgroundColor: "#cbcbcb",
                                border: "1px solid #cbcbcb",
                            }}
                        />

                        <div
                            className="step-loader-bar absolute left-0 top-0 h-full"
                            style={{ width: "0%", backgroundColor: "#cbcbcb" }}
                        />
                    </div>

                    <div
                        id="approach-content"
                        className="flex w-full items-start justify-between"
                    >
                        <div className="approach1 w-[28%] opacity-0">
                            <h2 className="heading-md mb-[2vw] w-fit">Strategy</h2>
                            <h5 className="para mb-[1vw] text-desc">
                                We collaborate closely to uncover your brand's vision,
                                audience, and market position—building a strategy that
                                drives real results.
                            </h5>
                            <h5 className="para2a para text-desc">
                                By the end, you'll have a clear roadmap to grow your
                                brand—whether it's industry disruption or becoming a
                                household name.
                            </h5>
                        </div>

                        <div className="approach2 w-[28%] opacity-0">
                            <h2 className="heading-md mb-[2vw] w-fit">Design</h2>
                            <h5 className="para mb-[1vw] text-desc">
                                Our bold, purpose-driven designs are crafted to make an
                                impact. From typography to color, everything is chosen to
                                communicate clearly and beautifully.
                            </h5>
                            <h5 className="para2a para text-desc">
                                We bring balance, clarity, and intention together to help
                                your brand stand out—and connect beyond first impressions.
                            </h5>
                        </div>

                        <div className="approach3 w-[28%] opacity-0">
                            <h2 className="heading-md mb-[2vw] w-fit">Technology</h2>
                            <h5 className="para mb-[1vw] text-desc">
                                Beyond aesthetics, we focus on how your brand performs
                                across platforms—crafting seamless, intelligent experiences
                                that adapt in real time.
                            </h5>
                            <h5 className="para2a para text-desc">
                                Guided by design and powered by AI, every interaction is
                                built for clarity, consistency, and connection across
                                screens, spaces, and systems.
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── MOBILE / TABLET ─── */}
            <div className="approach-mobile w-full px-6 py-[14vw]">
                <h2 className="heading-xl mb-[12vw] text-heading">Our Approach</h2>

                {/* Card 1 — Strategy */}
                <div className="approach-card-mobile mb-[12vw]" style={{ opacity: 0 }}>
                    <div className="mb-[5vw] flex items-center gap-3">
                        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#cbcbcb", flexShrink: 0 }} />
                        <div style={{ flex: 1, height: 1, backgroundColor: "#cbcbcb", opacity: 0.25 }} />
                        <span className="para text-desc" style={{ opacity: 0.45, fontSize: "clamp(11px,3vw,13px)" }}>01</span>
                    </div>
                    <h2 className="heading-md mb-[4vw] w-fit">Strategy</h2>
                    <h5 className="para mb-[3vw] text-desc">
                        We collaborate closely to uncover your brand's vision,
                        audience, and market position—building a strategy that
                        drives real results.
                    </h5>
                    <h5 className="para2a para text-desc">
                        By the end, you'll have a clear roadmap to grow your
                        brand—whether it's industry disruption or becoming a
                        household name.
                    </h5>
                </div>

                {/* Card 2 — Design */}
                <div className="approach-card-mobile mb-[12vw]" style={{ opacity: 0 }}>
                    <div className="mb-[5vw] flex items-center gap-3">
                        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#cbcbcb", flexShrink: 0 }} />
                        <div style={{ flex: 1, height: 1, backgroundColor: "#cbcbcb", opacity: 0.25 }} />
                        <span className="para text-desc" style={{ opacity: 0.45, fontSize: "clamp(11px,3vw,13px)" }}>02</span>
                    </div>
                    <h2 className="heading-md mb-[4vw] w-fit">Design</h2>
                    <h5 className="para mb-[3vw] text-desc">
                        Our bold, purpose-driven designs are crafted to make an
                        impact. From typography to color, everything is chosen to
                        communicate clearly and beautifully.
                    </h5>
                    <h5 className="para2a para text-desc">
                        We bring balance, clarity, and intention together to help
                        your brand stand out—and connect beyond first impressions.
                    </h5>
                </div>

                {/* Card 3 — Technology */}
                <div className="approach-card-mobile" style={{ opacity: 0 }}>
                    <div className="mb-[5vw] flex items-center gap-3">
                        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#cbcbcb", flexShrink: 0 }} />
                        <div style={{ flex: 1, height: 1, backgroundColor: "#cbcbcb", opacity: 0.25 }} />
                        <span className="para text-desc" style={{ opacity: 0.45, fontSize: "clamp(11px,3vw,13px)" }}>03</span>
                    </div>
                    <h2 className="heading-md mb-[4vw] w-fit">Technology</h2>
                    <h5 className="para mb-[3vw] text-desc">
                        Beyond aesthetics, we focus on how your brand performs
                        across platforms—crafting seamless, intelligent experiences
                        that adapt in real time.
                    </h5>
                    <h5 className="para2a para text-desc">
                        Guided by design and powered by AI, every interaction is
                        built for clarity, consistency, and connection across
                        screens, spaces, and systems.
                    </h5>
                </div>
            </div>
        </>
    );
};

export default OurApproach;
