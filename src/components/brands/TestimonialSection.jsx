"use client";
import React from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Styles
import "swiper/css";
import "swiper/css/pagination";

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
    <section className="w-full bg-black text-white py-16 md:py-24 px-4 sm:px-8 md:px-20">
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
                  <img
                    src={item.image}
                    alt=""
                    className="w-full aspect-square object-cover"
                  />
                </div>

                {/* RIGHT CONTENT */}
                <div className="max-w-xl">
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-[200] text-gray-200 mb-3">
                    {item.name}
                  </h3>

                  <p className="text-[10px] sm:text-xs uppercase text-gray-400 mb-4 md:mb-6 tracking-wide">
                    {item.role}
                  </p>

                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 md:mb-8">
                    {item.text}
                  </p>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    <span className="border-b border-gray-500">
                      {item.brand}
                    </span>
                  </div>
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