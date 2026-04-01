import React from "react";

const posts = [
  {
    video: "https://www.wearepointof.com/videos/Chhaya%20Jain_v3.mp4",
    image: "https://www.wearepointof.com/home/chhaya.png",
    title: "CHHAYA JAIN",
  },
  {
    video: "https://www.wearepointof.com/videos/Whitehues_v2.mp4",
    image: "https://www.wearepointof.com/home/whitehues.png",
    title: "WHITEHUES",
  },
  {
    video: "https://www.wearepointof.com/videos/Jadau.mp4",
    image: "https://www.wearepointof.com/projects/Jadau/maina%20jadai.png",
    title: "JADAU",
  },
];

const InstagramSection = () => {
  return (
    <section className="w-full bg-black text-white py-20 md:py-28">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-16 md:mb-20">
        <h2 className="text-lg md:text-2xl text-gray-300 mb-3 md:mb-4">
          @wearepointof
        </h2>

        <button className="text-xs md:text-sm text-gray-400 flex items-center gap-2 group">
          <span className="rotate-45 transition group-hover:translate-x-1">
            ↗
          </span>
          <span className="border-b border-gray-500 group-hover:border-white transition">
            FOLLOW
          </span>
        </button>
      </div>

      {/* Container (responsive padding) */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-28 xl:px-20">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 lg:gap-14">
          {posts.map((post, index) => (
            <div key={index} className="relative group">
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
                <img
                  src={post.image}
                  alt={post.title}
                  className="
        absolute inset-0 w-full h-full object-cover
        transition-opacity duration-700 ease-in-out
        opacity-100 group-hover:opacity-0
      "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
