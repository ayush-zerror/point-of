"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { isValidEmail } from "@/helper/validateEmail";
import { FloatingInput, FloatingPasswordInput } from "./FormFields";
import AuthBackground from "./AuthBackground";

const LoginForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onValidSubmit = async (values) => {
    if (submitting) return;

    setSubmitting(true);
    const t = toast.loading("Signing in...");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email.trim(),
          password: values.password,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error || "Invalid email or password.", { id: t });
        return;
      }

      toast.success("Signed in successfully.", { id: t });
      router.push("/dashboard");
    } catch {
      toast.error("Something went wrong. Please try again.", { id: t });
    } finally {
      setSubmitting(false);
    }
  };

  const onError = (formErrors) => {
    const order = ["email", "password"];
    const first = order.find((key) => formErrors?.[key]?.message);
    toast.error(first ? formErrors[first].message : "Please fill all required fields.");
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-foreground">
      <AuthBackground />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24 sm:px-10 sm:py-28 md:px-12">
        <div className="w-full max-w-md">
          <h2 id="brand-partners-form" className="heading-xl mb-3 md:mb-4">
            Partner Login
          </h2>
          <p className="mb-8 max-w-xl text-sm text-desc sm:text-base md:mb-10">
            Sign in with your brand partner account.
          </p>

          <form
            noValidate
            onSubmit={handleSubmit(onValidSubmit, onError)}
            className="grid grid-cols-1 gap-y-6 sm:gap-y-7 md:gap-y-6"
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

            <div>
              <FloatingPasswordInput
                label="Password"
                required
                autoComplete="current-password"
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <div className="mt-2.5 flex justify-end">
                <Link
                  href="/brand-partners/forgot-password"
                  className="text-xs text-desc transition-colors hover:text-foreground sm:text-sm"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>

          <div className="mt-8 sm:mt-10 md:mt-12">
            <Button
              title={submitting ? "SIGNING IN..." : "LOGIN"}
              onClick={handleSubmit(onValidSubmit, onError)}
            />
            <p className="mt-3 text-xs text-desc sm:mt-4 sm:text-sm md:mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/brand-partners" className="font-medium text-foreground">
                Create one
              </Link>
              <br />
              By signing in you accept our{" "}
              <a
                href="/privacy"
                target="_blank"
                className="font-medium text-foreground"
                title="Privacy Policy"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
