"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#111",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.12)",
        },
      }}
    />
  );
}

