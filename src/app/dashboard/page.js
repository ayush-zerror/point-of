"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@/components/common/Button";
import AuthBackground from "@/components/brand-partners/AuthBackground";

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/me");
        if (res.status === 401 || !res.ok) {
          router.replace("/login");
          return;
        }
        const data = await res.json();
        if (!cancelled) setUser(data.user);
      } catch {
        if (!cancelled) router.replace("/login");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch {
      // still redirect
    } finally {
      router.replace("/login");
    }
  };

  const firstName =
    String(user?.name || "")
      .trim()
      .split(/\s+/)[0] || "there";

  if (loading || !user) {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-foreground">
        <AuthBackground />
        <p className="relative z-10 text-sm text-desc sm:text-base">Loading...</p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-foreground">
      <AuthBackground />
      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center sm:px-10 md:px-12"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <h2 className="heading-xl mb-4 max-w-2xl">Welcome, {firstName}</h2>
        <p className="mb-10 max-w-md text-sm leading-relaxed text-desc sm:text-base">
          Your brand partner space is ready. Open your dashboard for shared
          resources, or manage your account in settings.
        </p>

        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {user.notionLink ? (
            <Button
              title="OPEN YOUR DASHBOARD"
              href={user.notionLink}
              className="mt-0!"
            />
          ) : (
            <p className="text-sm text-desc">
              Your dashboard link will appear here once it&apos;s assigned.
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-desc sm:text-sm">
            <Link
              href="/dashboard/settings"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Settings
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            >
              {loggingOut ? "Logging out…" : "Logout"}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DashboardPage;
