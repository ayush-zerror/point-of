"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Button from "@/components/common/Button";
import AuthBackground from "@/components/brand-partners/AuthBackground";
import { FloatingPasswordInput } from "@/components/brand-partners/FormFields";

const PASSWORD_MIN = 8;

const DashboardSettingsPage = () => {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const newPasswordValue = watch("newPassword");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/me");
        if (res.status === 401 || !res.ok) {
          router.replace("/login");
          return;
        }
        if (!cancelled) setReady(true);
      } catch {
        if (!cancelled) router.replace("/login");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const onValidSubmit = async (values) => {
    if (submitting) return;
    setSubmitting(true);
    const t = toast.loading("Updating password...");

    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error || "Could not update password.", { id: t });
        return;
      }

      toast.success(data?.message || "Password updated successfully.", { id: t });
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.", { id: t });
    } finally {
      setSubmitting(false);
    }
  };

  const onError = (formErrors) => {
    const order = ["currentPassword", "newPassword", "confirmPassword"];
    const first = order.find((key) => formErrors?.[key]?.message);
    toast.error(first ? formErrors[first].message : "Please fill all required fields.");
  };

  if (!ready) {
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
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24 sm:px-10 sm:py-28 md:px-12">
        <div className="w-full max-w-md">
          <h2 id="brand-partners-form" className="heading-xl mb-3 md:mb-4">
            Settings
          </h2>
          <p className="mb-8 max-w-xl text-sm text-desc sm:text-base md:mb-10">
            Reset your account password.
          </p>

          <form
            noValidate
            onSubmit={handleSubmit(onValidSubmit, onError)}
            className="grid grid-cols-1 gap-y-6 sm:gap-y-7"
          >
            <FloatingPasswordInput
              label="Current Password"
              required
              autoComplete="current-password"
              error={errors.currentPassword?.message}
              {...register("currentPassword", {
                required: "Current password is required",
              })}
            />

            <FloatingPasswordInput
              label="New Password"
              required
              autoComplete="new-password"
              error={errors.newPassword?.message}
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: PASSWORD_MIN,
                  message: `Password must be at least ${PASSWORD_MIN} characters`,
                },
                validate: (value) => {
                  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
                    return "Use letters and at least one number";
                  }
                  return true;
                },
              })}
            />

            <FloatingPasswordInput
              label="Confirm New Password"
              required
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === newPasswordValue || "Passwords do not match",
              })}
            />
          </form>

          <div className="mt-8 sm:mt-10 md:mt-12">
            <Button
              title={submitting ? "UPDATING..." : "UPDATE PASSWORD"}
              onClick={handleSubmit(onValidSubmit, onError)}
            />
            <p className="mt-3 text-xs text-desc sm:mt-4 sm:text-sm md:mt-6">
              <Link
                href="/dashboard"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Back to dashboard
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSettingsPage;
