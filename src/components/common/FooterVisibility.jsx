"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterVisibility({ excludePath = "/work" }) {
  const pathname = usePathname();

  if (!pathname) return null;
  if (pathname === excludePath) return null;

  return <Footer />;
}

