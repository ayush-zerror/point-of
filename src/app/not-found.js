"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/common/Button";

export default function NotFound() {
  return (
    <main className="h-[85vh] overflow-hidden bg-background px-6 sm:px-10 md:px-12 lg:px-20 text-foreground">
      <div className="flex h-full items-center justify-center border-b border-neutral-700 text-center">
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.22em" }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="text-xs uppercase tracking-[0.22em] text-foreground/60 sm:text-sm"
          >
            404 — page not found
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="heading-xl mt-5 text-heading"
          >
            That page drifted out of orbit.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="para mx-auto mt-4 max-w-2xl text-desc"
          >
            The page you were looking for doesn’t exist. You may have
            mistyped the address or the page may have moved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.55,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 flex w-full justify-center"
          >
            <Button title="Back to Home" href="/" />
          </motion.div>

          {/* floating blur orbs */}
          <motion.div
            animate={{
              y: [0, -18, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[15%] top-[20%] h-28 w-28 rounded-full bg-white/5 blur-3xl"
          />

          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -12, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[18%] right-[12%] h-36 w-36 rounded-full bg-white/5 blur-3xl"
          />
        </motion.div>
      </div>
    </main>
  );
}