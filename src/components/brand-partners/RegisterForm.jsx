"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "../common/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { isValidEmail } from "@/helper/validateEmail";
import { FieldError, FloatingInput, FloatingPasswordInput } from "./FormFields";
import AuthBackground from "./AuthBackground";

const PASSWORD_MIN = 8;

const RegisterForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [phoneHasTypedDigits, setPhoneHasTypedDigits] = useState(false);
  const phoneFieldRef = useRef(null);
  const phoneDialRef = useRef("91");

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const passwordValue = watch("password");

  useEffect(() => {
    const root = phoneFieldRef.current;
    if (!root) return;

    const tagCountryList = () => {
      root.querySelectorAll(".country-list").forEach((el) => {
        el.setAttribute("data-lenis-prevent", "");
        el.setAttribute("data-lenis-prevent-wheel", "");
        el.setAttribute("data-lenis-prevent-touch", "");
      });
    };

    tagCountryList();
    const observer = new MutationObserver(tagCountryList);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const onValidSubmit = async (values) => {
    if (submitting) return;
    if (!phoneHasTypedDigits) {
      toast.error("Enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    const t = toast.loading("Submitting...");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.fullName.trim(),
          email: values.email.trim(),
          phone: values.phone,
          company: values.company.trim(),
          password: values.password,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error || "Something went wrong. Please try again.", { id: t });
        return;
      }

      toast.dismiss(t);
      reset();
      setPhoneFocused(false);
      setPhoneHasTypedDigits(false);
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.", { id: t });
    } finally {
      setSubmitting(false);
    }
  };

  const onError = (formErrors) => {
    const order = [
      "fullName",
      "email",
      "phone",
      "company",
      "password",
      "confirmPassword",
    ];
    const first = order.find((key) => formErrors?.[key]?.message);
    toast.error(first ? formErrors[first].message : "Please fill all required fields.");
  };

  if (submitted) {
    return (
      <section className="relative min-h-screen w-full overflow-hidden bg-black text-foreground">
        <AuthBackground />
        <motion.div
          className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center sm:px-10 md:px-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
          role="status"
        >
          <h2 className="heading-xl mb-4 max-w-2xl">Thank you</h2>
          <p className="max-w-md text-sm leading-relaxed text-desc sm:text-base">
            Your request has been submitted. Please wait for approval — we&apos;ll
            email you once your partner account is ready.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-foreground">
      <AuthBackground />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24 sm:px-10 sm:py-28 md:px-12">
        <div className="w-full max-w-3xl">
          <h2 id="brand-partners-form" className="heading-xl mb-3 md:mb-4">
            Brand partners
          </h2>
          <p className="mb-8 max-w-xl text-sm text-desc sm:text-base md:mb-10">
            Create an account to access partner resources and updates.
          </p>

          <form
            noValidate
            onSubmit={handleSubmit(onValidSubmit, onError)}
            className="grid grid-cols-1 gap-x-10 gap-y-6 sm:gap-y-7 md:grid-cols-2 md:gap-x-16 md:gap-y-6"
          >
            <FloatingInput
              label="Full Name"
              required
              autoComplete="name"
              error={errors.fullName?.message}
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Enter at least 2 characters",
                },
              })}
            />

            <FloatingInput
              label="Company"
              required
              autoComplete="organization"
              error={errors.company?.message}
              {...register("company", {
                required: "Company is required",
                minLength: {
                  value: 2,
                  message: "Enter at least 2 characters",
                },
              })}
            />

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

            <div
              ref={phoneFieldRef}
              className={`phone-field relative z-20${
                phoneFocused || phoneHasTypedDigits ? " is-active" : ""
              }`}
              data-lenis-prevent
            >
              <div
                className={`relative border-b ${
                  errors.phone ? "border-red-400" : "border-white/25"
                }`}
              >
                <label
                  className={`pointer-events-none absolute z-10 leading-none text-desc transition-[translate,left,font-size] duration-300 ease-out ${
                    phoneFocused || phoneHasTypedDigits
                      ? "left-0 top-1/2 translate-y-[calc(-50%-1.25rem)] text-[12px]"
                      : "left-24 top-1/2 translate-y-[-50%] text-[14px] sm:text-[16px]"
                  }`}
                >
                  Phone Number*
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    validate: (value) => {
                      const digits = String(value || "").replace(/\D/g, "");
                      const dial = String(phoneDialRef.current || "");
                      const national =
                        dial && digits.startsWith(dial)
                          ? digits.slice(dial.length)
                          : digits;
                      if (!national) return "Phone number is required";
                      if (national.length < 7 || digits.length > 15) {
                        return "Enter a valid phone number";
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      country="in"
                      value={field.value}
                      onChange={(value, data) => {
                        const dial = data?.dialCode ? String(data.dialCode) : "";
                        phoneDialRef.current = dial;
                        const v = String(value || "");
                        const safeValue = v.length === 0 ? dial : v;
                        const finalValue =
                          dial && !safeValue.startsWith(dial)
                            ? dial + safeValue.replace(/^\D+/, "")
                            : safeValue;

                        field.onChange(finalValue);

                        const rest =
                          dial && finalValue.startsWith(dial)
                            ? finalValue.slice(dial.length)
                            : finalValue;
                        setPhoneHasTypedDigits(rest.replace(/\D/g, "").length > 0);
                      }}
                      inputProps={{
                        name: field.name,
                        required: true,
                        autoComplete: "tel",
                        onFocus: () => setPhoneFocused(true),
                        onBlur: () => {
                          field.onBlur();
                          setPhoneFocused(false);
                          const digits = String(field.value || "").replace(/\D/g, "");
                          const dialLen =
                            String(field.value || "").match(/^\+?(\d{1,3})/)?.[1]
                              ?.length ?? 0;
                          if (digits.length <= dialLen) setPhoneHasTypedDigits(false);
                        },
                      }}
                      isValid={(inputNumber, country) => {
                        const dial = country?.dialCode ?? "";
                        return inputNumber.startsWith(dial);
                      }}
                      placeholder=" "
                      enableSearch
                      disableSearchIcon
                      searchPlaceholder="Search country or code"
                      searchNotFound="No country found"
                      searchClass="!text-foreground !bg-background"
                      containerClass="w-full"
                      inputClass="!w-full !h-auto !border-0 !bg-transparent !outline-none !shadow-none !text-sm sm:!text-base !text-foreground"
                      dropdownClass="!bg-background !text-foreground !z-[60] !border !border-white/20"
                      buttonClass="!border-0 !bg-transparent !z-[50]"
                    />
                  )}
                />
              </div>
              <FieldError message={errors.phone?.message} />
            </div>

            <FloatingPasswordInput
              label="Password"
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
              title={submitting ? "SUBMITTING..." : "CREATE ACCOUNT"}
              onClick={handleSubmit(onValidSubmit, onError)}
            />
            <p className="mt-3 text-xs text-desc sm:mt-4 sm:text-sm md:mt-6">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-foreground">
                Please login
              </Link>
              <br />
              By creating an account you accept our{" "}
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

export default RegisterForm;
