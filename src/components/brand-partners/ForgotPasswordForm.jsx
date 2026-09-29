"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { isValidEmail } from "@/helper/validateEmail";
import { FloatingInput } from "./FormFields";

const ForgotPasswordForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    mode: "onSubmit",
  });

  const onValidSubmit = async (values) => {
    if (submitting) return;

    setSubmitting(true);
    setSubmitted(false);
    const t = toast.loading("Sending reset link...");

    try {
      const res = await fetch("/api/brand-partners/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email.trim() }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error || "Something went wrong. Please try again.", { id: t });
        return;
      }

      toast.dismiss(t);
      reset();
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.", { id: t });
    } finally {
      setSubmitting(false);
    }
  };

  const onError = (formErrors) => {
    toast.error(formErrors?.email?.message || "Please enter a valid email.");
  };

  return (
    <section className="min-h-screen w-full bg-background text-foreground">
      <div className="flex min-h-screen items-center justify-center px-6 py-24 sm:px-10 sm:py-28 md:px-12">
        <div className="w-full max-w-md">
          <h2 id="brand-partners-form" className="heading-xl mb-3 md:mb-4">
            Forgot password
          </h2>
          <p className="mb-8 max-w-xl text-sm text-desc sm:text-base md:mb-10">
            Enter your email and we&apos;ll send a reset link.
          </p>

          <form
            noValidate
            onSubmit={handleSubmit(onValidSubmit, onError)}
            className="grid grid-cols-1 gap-y-6"
          >
            <FloatingInput
              label="Email"
              required
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  isValidEmail(value) || "Please enter a valid email",
              })}
            />
          </form>

          <div className="mt-8 sm:mt-10 md:mt-12">
            <Button
              title={submitting ? "SENDING..." : "SEND RESET LINK"}
              onClick={handleSubmit(onValidSubmit, onError)}
            />
            {submitted ? (
              <p
                role="status"
                className="mt-5 max-w-lg text-sm leading-relaxed text-green-400 opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards] sm:text-base"
              >
                If an account exists for that email, a reset link will be sent.
              </p>
            ) : null}
            <p className="mt-3 text-xs text-desc sm:mt-4 sm:text-sm md:mt-6">
              Remember your password?{" "}
              <Link href="/login" className="font-medium text-foreground">
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordForm;
