"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/** Same rotating graphic treatment as the home hero. */
const AuthBackground = () => (
  <>
    <motion.div
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <Image
        src="/home/graphic-home.webp"
        alt=""
        width={1000}
        height={1000}
        className="spin-slow h-[140vh] w-full object-contain sm:h-[180vh] xl:h-[220vh]"
        priority
      />
    </motion.div>
    <div className="pointer-events-none absolute inset-0 bg-black/55" />
    <div className="pointer-events-none absolute bottom-0 left-0 h-[12vh] w-full bg-linear-to-t from-background via-background/60 to-transparent" />
  </>
);

export default AuthBackground;
