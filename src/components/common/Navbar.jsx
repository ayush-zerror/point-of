"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <nav className="flex items-center justify-between px-6 h-16 border-b bg-white dark:bg-black">
      <h1 className="text-lg font-semibold text-primary">
        ZCommerce
      </h1>

      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="p-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-secondary" />
        ) : (
          <Moon className="w-5 h-5 text-primary" />
        )}
      </button>
    </nav>
  );
}