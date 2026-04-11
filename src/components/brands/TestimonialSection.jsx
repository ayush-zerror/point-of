"use client";
import React from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Styles
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Button from "../common/Button";

const testimonials = [
  {
    name: "Aaryaman Vyas",
    role: "FOUNDER OF WHITEHUES",
    image: "https://www.wearepointof.com/home/chhaya.png",
    text: `"Point Of ran early workshops that really uncovered how we felt about the brand... The strategy helped us align and gave us clarity we didn't have before."`,
    brand: "WHITEHUES",
  },
  {
    name: "John Doe",
    role: "FOUNDER OF BRANDX",
    image: "https://www.wearepointof.com/home/chhaya.png",
    text: `"Working with Point Of was a game changer. Their clarity and design thinking elevated our entire brand."`,
    brand: "BRANDX",
  },
];

const TestimonialSection = () => {
  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-8 md:px-20">
      <div className="w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          pagination={{ type: "progressbar" }}
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

      {/* CUSTOM PROGRESS BAR STYLING */}
      <style jsx global>{`
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
      `}</style>
    </section>
  );
};

export default TestimonialSection;