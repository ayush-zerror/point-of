"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Button from "@/components/common/Button";
import AuthBackground from "@/components/brand-partners/AuthBackground";
import { FloatingPasswordInput } from "@/components/brand-partners/FormFields";

const PASSWORD_MIN = 8;

function ResetPasswordFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = String(searchParams.get("token") || "").trim();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const passwordValue = watch("password");

  const onValidSubmit = async (values) => {
    if (submitting) return;

    if (!token) {
      toast.error("Reset link is invalid or expired.");
      return;
    }

    setSubmitting(true);
    const t = toast.loading("Updating password...");

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: values.password,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error || "Could not reset password.", { id: t });
        return;
      }

      toast.success(
        data?.message || "Password updated successfully. You can sign in now.",
        { id: t }
      );
      router.push("/login");
    } catch {
      toast.error("Something went wrong. Please try again.", { id: t });
    } finally {
      setSubmitting(false);
    }
  };

  const onError = (formErrors) => {
    const order = ["password", "confirmPassword"];
    const first = order.find((key) => formErrors?.[key]?.message);
    toast.error(first ? formErrors[first].message : "Please fill all required fields.");
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-foreground">
      <AuthBackground />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24 sm:px-10 sm:py-28 md:px-12">
        <div className="w-full max-w-md">
          <h2 id="brand-partners-form" className="heading-xl mb-3 md:mb-4">
            Reset password
          </h2>
          <p className="mb-8 max-w-xl text-sm text-desc sm:text-base md:mb-10">
            {token
              ? "Choose a new password for your partner account."
              : "This reset link is missing or invalid. Request a new one from the login page."}
          </p>

          {token ? (
            <>
              <form
                noValidate
                onSubmit={handleSubmit(onValidSubmit, onError)}
                className="grid grid-cols-1 gap-y-6 sm:gap-y-7"
              >
                <FloatingPasswordInput
                  label="New Password"
                  required
                  autoComplete="new-password"
                  error={errors.password?.message}
                  {...register("password", {
                    required: "Password is required",
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
                  label="Confirm Password"
                  required
                  autoComplete="new-password"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === passwordValue || "Passwords do not match",
                  })}
                />
              </form>

              <div className="mt-8 sm:mt-10 md:mt-12">
                <Button
                  title={submitting ? "UPDATING..." : "UPDATE PASSWORD"}
                  onClick={handleSubmit(onValidSubmit, onError)}
                />
                <p className="mt-3 text-xs text-desc sm:mt-4 sm:text-sm md:mt-6">
                  Remember your password?{" "}
                  <Link href="/login" className="font-medium text-foreground">
                    Back to login
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <div className="mt-2">
              <Button title="REQUEST RESET LINK" href="/brand-partners/forgot-password" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const ResetPasswordForm = () => (
  <Suspense
    fallback={
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-foreground">
        <AuthBackground />
        <p className="relative z-10 text-sm text-desc sm:text-base">Loading...</p>
      </section>
    }
  >
    <ResetPasswordFormInner />
  </Suspense>
);

export default ResetPasswordForm;
