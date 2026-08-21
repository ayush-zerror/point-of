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
import Link from "next/link";
import Button from "../common/Button";
import { testimonials } from "@/helper/testimonials";

const TestimonialSection = () => {
  return (
    <section className="w-full py-14 sm:py-16 md:py-24 px-6 sm:px-10 md:px-12 xl:px-20 overflow-hidden">
      <div className="w-full cursor-grab">
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          loop
          pagination={{ type: "progressbar" }}
          navigation
          className="testimonial-swiper"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.slug}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-14 items-center max-w-5xl mx-auto px-0 md:px-10 xl:px-0 pb-6 sm:pb-8 md:pb-20">
                {/*
                  pb-16 on md+ = 64px gap between card bottom and progress bar on desktop
                  pb-8  on sm  = room for arrows beside image on tablet
                  pb-6  on xs  = compact mobile
                */}

                {/* LEFT IMAGE */}
                <div className="w-full flex justify-start">
                  <Link
                    href={`/work/${item.slug}`}
                    className="w-full max-w-none lg:max-w-sm relative group overflow-hidden block"
                    title={`View ${item.brand} case study`}
                  >
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
                  </Link>
                </div>

                {/* RIGHT CONTENT */}
                <div className="w-full max-w-none lg:max-w-xl text-left">
                  <h3 className="heading-lg text-subheading mb-2 sm:mb-3">
                    {item.name}
                  </h3>

                  <p className="para text-desc mb-4 sm:mb-5 md:mb-6">
                    {item.role}
                  </p>

                  <p className="para text-desc mb-6 md:mb-8">
                    {item.text}
                  </p>

                  <div className="flex justify-start">
                    <Button
                      title={item.brand}
                      href={`/work/${item.slug}`}
                    />
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

        /* ── Mobile (<1024px): arrows on the full-width image ── */
        @media (max-width: 1023px) {

          .testimonial-swiper .swiper-button-prev,
          .testimonial-swiper .swiper-button-next {
            background: none !important;
            border: none !important;
            border-radius: 0 !important;
            backdrop-filter: none !important;
            width: 24px;
            height: 24px;
            opacity: 0.7;
            top: calc((100vw - 3rem) / 2);
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

          .testimonial-swiper .swiper-button-prev {
            left: 8px !important;
          }

          .testimonial-swiper .swiper-button-next {
            right: 8px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;