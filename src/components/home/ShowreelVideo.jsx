"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ShowreelVideo() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 🎥 Video scale (shrink → HOLD → expand at very end)
  const scaleRaw = useTransform(
    scrollYProgress,
    [0, 0.4, 0.9, 1],
    [1, 0.6, 0.6, 1]
  );

  const scale = useSpring(scaleRaw, {
    stiffness: 100,
    damping: 20,
  });


  // 📦 Overlay movement (finishes before 0.9)
  const y = useTransform(scrollYProgress, [0.3, 0.9], ["100%", "-100%"]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-secondary">
      
      {/* STICKY */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* VIDEO */}
        <motion.div
          style={{ scale }}
          className="w-full h-full overflow-hidden"
        >
          <video
            src="/home/showreel.mp4"
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay
          />
        </motion.div>

        {/* OVERLAY */}
        <motion.div
          style={{ y }}
          className="absolute left-0 top-0 w-full h-[300vh]"
        >

          {/* PANEL 1 */}
          <div className="relative h-screen flex items-center justify-center">
            <Image
              src="https://www.wearepointof.com/home/sticker1.png"
              alt="sticker"
              width={200}
              height={200}
              className="absolute top-10 left-10 rotate-[-10deg]"
            />

            <Image
              src="https://www.wearepointof.com/home/sticker2.png"
              alt="sticker"
              width={200}
              height={200}
              className="absolute bottom-10 right-10 rotate-[10deg]"
            />
          </div>

          {/* PANEL 2 */}
          <div className="relative h-screen flex items-center justify-center">
            <Image
              src="https://www.wearepointof.com/home/sticker3.png"
              alt="sticker"
              width={200}
              height={200}
              className="absolute top-10 left-28 rotate-[-6deg]"
            />

            <Image
              src="https://www.wearepointof.com/home/sticker4.png"
              alt="sticker"
              width={200}
              height={200}
              className="absolute bottom-10 right-10 rotate-[8deg]"
            />
          </div>

          {/* PANEL 3 */}
          <div className="relative h-screen flex items-center justify-center">
            <Image
              src="https://www.wearepointof.com/home/sticker5.png"
              alt="sticker"
              width={200}
              height={200}
              className="absolute top-10 left-10 rotate-[-12deg]"
            />

            <Image
              src="https://www.wearepointof.com/home/sticker6.png"
              alt="sticker"
              width={200}
              height={200}
              className="absolute bottom-10 right-10 rotate-[12deg]"
            />
          </div>

        </motion.div>

      </div>
    </section>
  );
}