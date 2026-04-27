"use client";
import React from "react";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const logos = [
  "https://framerusercontent.com/images/f5tEzCq9SEshAyPmvmHwFwDwRw.png?scale-down-to=512",
  "https://framerusercontent.com/images/BL8goJzMhAaoO7CkplhamSYnPc.png?scale-down-to=512",
  "https://framerusercontent.com/images/ivg3Oth8MzfKRnx1RBFZzP5duM.png?scale-down-to=512",
  "https://framerusercontent.com/images/WVorucVaiyMByNUIs8xPRV9nOYg.png?scale-down-to=512",
  "https://framerusercontent.com/images/O9u7FsWZdWhYyxmvj4tO7SwfRw8.svg",
  "https://framerusercontent.com/images/0GGVO06ulbCq35T4OUvQ4UbB1w.png?scale-down-to=1024",
  "https://framerusercontent.com/images/XTOQUwb6Lu4L0ChMsustBWlk.png",
  "https://framerusercontent.com/images/f5tEzCq9SEshAyPmvmHwFwDwRw.png?scale-down-to=512",
  "https://framerusercontent.com/images/BL8goJzMhAaoO7CkplhamSYnPc.png?scale-down-to=512",
  "https://framerusercontent.com/images/ivg3Oth8MzfKRnx1RBFZzP5duM.png?scale-down-to=512",
  "https://framerusercontent.com/images/WVorucVaiyMByNUIs8xPRV9nOYg.png?scale-down-to=512",
  "https://framerusercontent.com/images/O9u7FsWZdWhYyxmvj4tO7SwfRw8.svg",
  "https://framerusercontent.com/images/0GGVO06ulbCq35T4OUvQ4UbB1w.png?scale-down-to=1024",
  "https://framerusercontent.com/images/XTOQUwb6Lu4L0ChMsustBWlk.png",
];

const BrandsSection = () => {
  const router = useRouter();
  return (
    <section className="w-full py-24 md:py-52 md:pb-20 bg-background relative">
      <div className="max-w-5xl mx-auto px-6 md:px-0 flex flex-col">
        <p className="heading-xl text-desc">
          We partner with visionary entrepreneurs, industry leaders, &
          disruptive startups to build brands that spark change & drive global
          impact.
        </p>

        <Button title={"See all our brands"} onClick={() => {
          router.push("/brands");
        }} />
      </div>

      {/* Logo marquee (full width) */}
      <div className="mt-12 md:mt-24 w-full py-10 md:py-12">
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />

          <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center gap-24 md:gap-32 pr-24 md:pr-32 will-change-transform">
            {[...logos, ...logos].map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                className="h-20 w-20 md:h-24 md:w-24 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
              >
                <Image
                  width={100}
                  height={100}
                  src={src}
                  alt={`Brand logo ${idx + 1}`}
                  className="max-h-full max-w-full object-contain grayscale brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
