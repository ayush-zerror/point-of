import React from "react";
import Link from "next/link";
import Button from "@/components/common/Button";

export default function NotFound() {

  return (
    <main className="h-[80vh] bg-background text-foreground px-6 sm:px-10 md:px-20 ">
      <div className="h-full border-b border-neutral-700 flex items-center justify-center text-center">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm tracking-[0.22em] text-foreground/60 uppercase">
            404 — page not found
          </p>

          <h1 className="mt-5 heading-xl text-heading">
            That page drifted out of orbit.
          </h1>

          <p className="mt-4 para text-desc mx-auto max-w-2xl">
            The link might be broken, or the page may have moved. Here are a few quick ways to get
            back on track.
          </p>

       
        </div>
      </div>

    </main>
  );
}

