"use client";
import React from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Button from "../common/Button";
import { testimonials } from "@/helper/testimonials";


const TestimonialSection = () => {
  return (
    <section className="w-full py-16 md:py-24 px-0 sm:px-8 md:px-20">
      <div className="w-full cursor-grab">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          pagination={{ type: "progressbar" }}
          navigation
          className="testimonial-swiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center p-6 sm:p-10 md:p-20 max-w-5xl w-full mx-auto">

                {/* LEFT IMAGE */}
                <div className="w-full max-w-xs sm:max-w-sm">
                  <Image
                    width={1000}
                    height={1000}
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-square object-cover"
                  />
                </div>

                {/* RIGHT CONTENT */}
                <div className="max-w-xl">
                  <h3 className="heading-lg text-subheading mb-3">
                    {item.name}
                  </h3>

                  <p className="para text-desc mb-4 md:mb-6">
                    {item.role}
                  </p>

                  <p className="para text-desc mb-6 md:mb-8">
                    {item.text}
                  </p>

                  <Button title={item.brand} />
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CUSTOM STYLES */}
      <style jsx global>{`
        /* Progress bar */
        .testimonial-swiper .swiper-pagination-progressbar {
          background: #1f1f1f;
          height: 2px;
        }

        .testimonial-swiper .swiper-pagination-progressbar-fill {
          background: white;
        }

        .swiper-pagination-progressbar {
          bottom: 0;
          top: auto !important;
        }

        /* Navigation arrow base */
        .testimonial-swiper .swiper-button-prev,
        .testimonial-swiper .swiper-button-next {
          width: 30px;
          height: 30px;
          color: #ffffff;
          transition: opacity 200ms ease, border-color 200ms ease,
            background 200ms ease, transform 200ms ease;
          opacity: 0.75;
        }

        /* Hover state */
        .testimonial-swiper .swiper-button-prev:hover,
        .testimonial-swiper .swiper-button-next:hover {
          opacity: 1;
        }

        /* White arrow icons */
        .testimonial-swiper .swiper-button-prev::after,
        .testimonial-swiper .swiper-button-next::after {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
        }

        /* Disabled state */
        .testimonial-swiper .swiper-button-prev.swiper-button-disabled,
        .testimonial-swiper .swiper-button-next.swiper-button-disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;