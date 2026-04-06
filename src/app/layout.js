// layout.tsx

import SmoothScroller from "@/components/SmoothScroller";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import FooterVisibility from "@/components/common/FooterVisibility";
import localFont from "next/font/local";

export const metadata = {
  title: "App",
  description: "Next App",
};

const headingFont = localFont({
  src: [
    { path: "../../public/fonts/TWKLausanne-100.woff2", weight: "100" },
    { path: "../../public/fonts/TWKLausanne-200.woff2", weight: "200" },
    { path: "../../public/fonts/TWKLausanne-300.woff2", weight: "300" },
    { path: "../../public/fonts/TWKLausanne-400.woff2", weight: "400" },
    { path: "../../public/fonts/TWKLausanne-500.woff2", weight: "500" },
    { path: "../../public/fonts/TWKLausanne-600.woff2", weight: "600" },
  ],
  variable: "--font-heading",
});

const bodyFont = localFont({
  src: [
    { path: "../../public/fonts/Satoshi-Light.woff2", weight: "300" },
    { path: "../../public/fonts/Satoshi-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/Satoshi-Medium.woff2", weight: "500" },
  ],
  variable: "--font-body",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${headingFont.variable} ${bodyFont.variable}`}>
        <SmoothScroller />
        <Navbar />
        {children}
        <FooterVisibility excludePath="/work" />
      </body>
    </html>
  );
}