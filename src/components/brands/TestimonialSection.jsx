"use client";
import React from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";
import Button from "../common/Button";
import { testimonials } from "@/helper/testimonials";

const TestimonialSection = () => {
  return (
    <section className="w-full py-14 sm:py-16 md:py-24 px-6 sm:px-10 md:px-12  lg:px-20 overflow-hidden">
      <div className="w-full cursor-grab">
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          pagination={{ type: "progressbar" }}
          navigation
          className="testimonial-swiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-14 items-center max-w-5xl mx-auto px-2 sm:px-6 md:px-10 lg:px-0 pb-6 sm:pb-8 md:pb-20">
                {/*
                  pb-16 on md+ = 64px gap between card bottom and progress bar on desktop
                  pb-8  on sm  = room for arrows beside image on tablet
                  pb-6  on xs  = compact mobile
                */}

                {/* LEFT IMAGE */}
                <div className="w-full flex justify-center md:justify-start">
                  <div className="w-full max-w-[220px] xs:max-w-[260px] sm:max-w-[320px] md:max-w-sm relative group overflow-hidden">
                    <Image
                      width={1000}
                      height={1000}
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-square object-cover"
                    />

                    {item.microanimation && (
                      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <video
                          src={item.microanimation}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="max-w-xl text-center md:text-left">
                  <h3 className="heading-lg text-subheading mb-2 sm:mb-3">
                    {item.name}
                  </h3>

                  <p className="para text-desc mb-4 sm:mb-5 md:mb-6">
                    {item.role}
                  </p>

                  <p className="para text-desc mb-6 md:mb-8">
                    {item.text}
                  </p>

                  <div className="flex justify-center md:justify-start">
                    <Button title={item.brand} />
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        /* ── Progress bar ──────────────────────────────── */
        .testimonial-swiper .swiper-pagination-progressbar {
          background: #1f1f1f;
          height: 2px;
          top: auto !important;
          bottom: 0 !important;
        }

        .testimonial-swiper .swiper-pagination-progressbar-fill {
          background: white;
        }

        /* ── Desktop nav arrows (≥768px) ──────────────── */
        .testimonial-swiper .swiper-button-prev,
        .testimonial-swiper .swiper-button-next {
          width: 38px;
          height: 38px;
          color: white;
          opacity: 0.75;
          top: 50%;
          transform: translateY(-50%);
          transition: opacity 0.25s ease, transform 0.25s ease;
          background: none;
          border: none;
          border-radius: 0;
        }

        .testimonial-swiper .swiper-button-prev:hover,
        .testimonial-swiper .swiper-button-next:hover {
          opacity: 1;
          transform: translateY(-50%) scale(1.08);
          background: none;
        }

        .testimonial-swiper .swiper-button-prev::after,
        .testimonial-swiper .swiper-button-next::after {
          font-size: 14px;
          font-weight: 700;
          color: white;
        }

        .testimonial-swiper .swiper-button-disabled {
          opacity: 0.25 !important;
          cursor: not-allowed;
        }

        /* ── Mobile (<768px): arrows beside image ─────── */
        @media (max-width: 767px) {

          /* ── Base mobile arrow styles ─── */
          .testimonial-swiper .swiper-button-prev,
          .testimonial-swiper .swiper-button-next {
            /* No circle, no background, no border */
            background: none !important;
            border: none !important;
            border-radius: 0 !important;
            backdrop-filter: none !important;

            width: 24px;
            height: 24px;
            opacity: 0.7;

            /*
              Image is centered. On small phones image = 220px → half = 110px.
              Arrows are vertically centered at the image midpoint = top 110px.
              Override per breakpoint below.
            */
            top: 110px;
            transform: translateY(-50%);
            transition: opacity 0.2s ease;
          }

          .testimonial-swiper .swiper-button-prev:hover,
          .testimonial-swiper .swiper-button-next:hover {
            opacity: 1;
            transform: translateY(-50%);
            background: none !important;
          }

          .testimonial-swiper .swiper-button-prev::after,
          .testimonial-swiper .swiper-button-next::after {
            font-size: 11px;
            font-weight: 800;
            color: white;
          }

          /*
            Horizontal position:
            Arrow sits just outside the image edge with a small gap (8px).
            calc(50% - half-image - arrow-width - gap)
            Small phones: image = 220px → half = 110px
          */
          .testimonial-swiper .swiper-button-prev {
            left: 4px !important;
          }

          .testimonial-swiper .swiper-button-next {
            right: 4px !important;
          }
        }

        /* ── Very small phones (≤380px): image ≈200px ─── */
        @media (max-width: 380px) {
          .testimonial-swiper .swiper-button-prev,
          .testimonial-swiper .swiper-button-next {
            width: 20px;
            height: 20px;
            top: 100px; /* half of ~200px */
          }

          .testimonial-swiper .swiper-button-prev {
            left: calc(50% - 100px - 20px - 6px);
          }

          .testimonial-swiper .swiper-button-next {
            right: calc(50% - 100px - 20px - 6px);
          }

          .testimonial-swiper .swiper-button-prev::after,
          .testimonial-swiper .swiper-button-next::after {
            font-size: 9px;
          }
        }

        /* ── Medium phones (401px–600px): image ≈260px ── */
        @media (min-width: 381px) and (max-width: 600px) {
          .testimonial-swiper .swiper-button-prev,
          .testimonial-swiper .swiper-button-next {
            top: 130px; /* half of ~260px */
          }

          .testimonial-swiper .swiper-button-prev {
            left: calc(50% - 130px - 24px - 8px);
          }

          .testimonial-swiper .swiper-button-next {
            right: calc(50% - 130px - 24px - 8px);
          }
        }

        /* ── Large phones / portrait tablet (601px–767px): image ≈320px ── */
        @media (min-width: 601px) and (max-width: 767px) {
          .testimonial-swiper .swiper-button-prev,
          .testimonial-swiper .swiper-button-next {
            top: 160px; /* half of ~320px */
          }

          .testimonial-swiper .swiper-button-prev {
            left: calc(50% - 160px - 24px - 8px);
          }

          .testimonial-swiper .swiper-button-next {
            right: calc(50% - 160px - 24px - 8px);
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;