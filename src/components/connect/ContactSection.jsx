"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GetInTouch from "./GetInTouch";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const rootRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: root,
            start: "top 90%",
            end: "top 30%",
            scrub: 0.3,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative md:h-[200vh]">

      {/* Sticky—Contact */}
      <div className="h-auto md:sticky md:top-0 md:h-screen z-10">
        <section id="contact-section" className="md:h-screen w-full relative">
          <div className="h-full flex items-center">
            <div className="w-full px-6 sm:px-10 md:pl-12 lg:pl-48 xl:pl-80 2xl:pl-120 md:pr-6  pb-16 sm:pb-20">

              {/* Scroll-animated vertical line */}
              <div
                ref={lineRef}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                className="w-px h-50 sm:h-72 lg:h-50 xl:h-72 z-30 bg-linear-to-b from-transparent to-foreground absolute -top-32 sm:top-3 lg:-top-4 xl:top-3 -translate-y-1/2 md:left-12 lg:left-[12rem] xl:left-[30.2rem]"
              >
                <span className="w-[3px] h-[3px] bg-foreground rounded-full absolute bottom-0 left-1/2 -translate-x-1/2" />
              </div>

              {/* Email */}
              <div className="mb-10 sm:mb-12 md:mb-16">
                <p className="para text-desc mb-3 md:mb-2">Email</p>
                <h2 className="heading-xl text-subheading break-words">
                  <a
                    href="mailto:think@wearepointof.com"
                    title="Email Point Of"
                    className="transition-colors duration-200 hover:text-heading"
                  >
                    think@wearepointof.com
                  </a>
                </h2>
              </div>

              {/* Bottom Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
                <div>
                  <h3 className="heading-md text-subheading mb-3 md:mb-4">Contact</h3>
                  <a
                    href="https://wa.me/919167991888"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Chat on WhatsApp"
                    className="para text-desc mb-2 block transition-colors duration-200 hover:text-heading"
                  >
                    (+91) 91679 91888
                  </a>
                  <a
                    href="https://wa.me/919167991888"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Chat on WhatsApp"
                    className="para text-desc flex items-center gap-2 transition-colors duration-200 hover:text-heading"
                  >
                    WhatsApp
                  </a>
                </div>

                <a
                  href="https://maps.app.goo.gl/kT1qQH69GXNvwQqB6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  title="Open Mumbai office in Google Maps"
                >
                  <h3 className="heading-md text-subheading mb-3 md:mb-4 transition-colors duration-200 group-hover:text-heading">Mumbai, India</h3>
                  <p className="para text-desc">Vaswani Chambers,</p>
                  <p className="para text-desc">Dr Annie Besant Rd, Worli,</p>
                  <p className="para text-desc">Mumbai, MH 400030</p>
                </a>

                <a
                  href="https://maps.app.goo.gl/Fqe7dUF8b8McqXdt6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  title="Open Barcelona office in Google Maps"
                >
                  <h3 className="heading-md text-subheading mb-3 md:mb-4 transition-colors duration-200 group-hover:text-heading">Barcelona, Spain</h3>
                  <p className="para text-desc">Carrer de Girona 179,</p>
                  <p className="para text-desc">Eixample, Barcelona</p>
                  <p className="para text-desc">Catalunya 08037</p>
                </a>

                <a
                  href="https://maps.app.goo.gl/bAnZraZc83nM5eLB7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  title="Open Austin office in Google Maps"
                >
                  <h3 className="heading-md text-subheading mb-3 md:mb-4 transition-colors duration-200 group-hover:text-heading">Austin, USA</h3>
                  <p className="para text-desc">Point Of Action LLC</p>
                  <p className="para text-desc">701 Tillery Street</p>
                  <p className="para text-desc">Unit 12, Suite 1996</p>
                  <p className="para text-desc">Austin TX 78702</p>
                </a>
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* Absolute—GetInTouch slides up over Contact */}
      <div className="w-full h-auto md:absolute md:bottom-0 md:left-0 md:h-screen z-20">
        <GetInTouch />
      </div>

    </div>
  );
};

export default ContactSection;