import React from "react";
import Link from "next/link";
import Button from "../common/Button";
import Image from "next/image";

const posts = [
  {
    video: "https://www.wearepointof.com/videos/Chhaya%20Jain_v3.mp4",
    image: "https://www.wearepointof.com/home/chhaya.png",
    title: "CHHAYA JAIN",
    slug: "1",
  },
  {
    video: "https://www.wearepointof.com/videos/Whitehues_v2.mp4",
    image: "https://www.wearepointof.com/home/whitehues.png",
    title: "WHITEHUES",
    slug: "2",
  },
  {
    video: "https://www.wearepointof.com/videos/Jadau.mp4",
    image: "https://www.wearepointof.com/projects/Jadau/maina%20jadai.png",
    title: "JADAU",
    slug: "3",
  },
];

const InstagramSection = () => {
  return (
    <section className="w-full bg-black text-white py-20 md:py-28">

      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-16 md:mb-20">
        <h2 className="heading-lg text-subheading">
          @wearepointof
        </h2>
        <Button title={"FOLLOW"} />
      </div>

      {/* Container */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-28 xl:px-20">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 lg:gap-20">
          {posts.map((post, index) => (

            <Link
              key={index}
              href={`/work/${post.slug}`}
              className="relative group block"
            >

              {/* TITLE */}
              <div className="absolute -top-8 left-0 overflow-hidden z-10">
                <span
                  className="
                    inline-block
                    origin-left
                    translate-y-[100%] rotate-[10deg]
                    group-hover:translate-y-0 group-hover:rotate-0
                    transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                    text-white text-sm md:text-base tracking-wide
                  "
                >
                  {post.title}
                </span>
              </div>

              {/* CARD */}
              <div className="relative w-full aspect-square overflow-hidden bg-neutral-900">

                {/* VIDEO */}
                <video
                  src={post.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* IMAGE */}
                <Image
                  width={1000}
                  height={1000}
                  src={post.image}
                  alt={post.title}
                  className="
                    absolute inset-0 w-full h-full object-cover
                    transition-opacity duration-700 ease-in-out
                    opacity-100 group-hover:opacity-0
                  "
                />
              </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;