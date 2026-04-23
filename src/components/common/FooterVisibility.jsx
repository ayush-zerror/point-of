"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterVisibility({ excludePaths = ["/work"] }) {
  const pathname = usePathname();

  if (!pathname) return null;
  if ((excludePaths ?? []).some((p) => pathname === p)) return null;

  return <Footer />;
}

