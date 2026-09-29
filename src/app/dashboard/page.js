"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";

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
        if (res.status === 401) {
          router.replace("/login");
          return;
        }
        if (!res.ok) {
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

  if (loading || !user) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center bg-background text-foreground">
        <p className="text-sm text-desc sm:text-base">Loading...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full bg-background text-foreground">
      <div className="flex min-h-screen items-center justify-center px-6 py-24 sm:px-10 sm:py-28 md:px-12">
        <div className="w-full max-w-md">
          <h2 className="heading-xl mb-3 md:mb-4">Dashboard</h2>
          <p className="mb-8 text-sm text-desc sm:text-base md:mb-10">
            Your brand partner account details.
          </p>

          <dl className="grid gap-y-5 border-t border-white/25 pt-6 text-sm sm:text-base">
            <div>
              <dt className="text-desc">Name</dt>
              <dd className="mt-1 text-foreground">{user.name}</dd>
            </div>
            <div>
              <dt className="text-desc">Email</dt>
              <dd className="mt-1 text-foreground">{user.email}</dd>
            </div>
            <div>
              <dt className="text-desc">Phone</dt>
              <dd className="mt-1 text-foreground">{user.phone}</dd>
            </div>
            <div>
              <dt className="text-desc">Company</dt>
              <dd className="mt-1 text-foreground">{user.company}</dd>
            </div>
            <div>
              <dt className="text-desc">Notion</dt>
              <dd className="mt-1">
                {user.notionLink ? (
                  <Link
                    href={user.notionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline-offset-4 hover:underline break-all"
                  >
                    {user.notionLink}
                  </Link>
                ) : (
                  <span className="text-desc">—</span>
                )}
              </dd>
            </div>
          </dl>

          <div className="mt-10">
            <Button
              title={loggingOut ? "LOGGING OUT..." : "LOGOUT"}
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
