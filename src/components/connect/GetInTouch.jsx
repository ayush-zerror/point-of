"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";

import { isValidEmail } from "@/helper/validateEmail";

const isValidWebsite = (value) => {
  const raw = String(value ?? "").trim();
  if (!raw) return true;
  const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const { hostname } = new URL(url);
    return /^(localhost|([a-z0-9-]+\.)+[a-z]{2,})$/i.test(hostname);
  } catch {
    return false;
  }
};

const FieldError = ({ message }) =>
  message ? <p className="mt-1.5 text-xs text-red-600">{message}</p> : null;

/* ─── FloatingInput ─── */
const FloatingInput = React.forwardRef(({ label, required, className = "", error, ...props }, ref) => (
  <div className="relative">
    <div className={`relative border-b ${error ? "border-red-500" : "border-gray-400"}`}>
      <input
        {...props}
        ref={ref}
        placeholder=" "
        className={`peer w-full bg-transparent outline-none pt-5 pb-2 text-sm sm:text-base ${className}`}
      />
      <label className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-sm sm:text-base text-gray-600 transition-all duration-200 peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-sm">
        {label}{required ? "*" : ""}
      </label>
    </div>
    <FieldError message={error} />
  </div>
));
FloatingInput.displayName = "FloatingInput";

/* ─── FloatingTextarea ─── */
const FloatingTextarea = React.forwardRef(({ label, required, className = "", error, ...props }, ref) => (
  <div className={`relative ${className}`}>
    <div className={`relative border-b ${error ? "border-red-500" : "border-gray-400"}`}>
      <textarea
        {...props}
        ref={ref}
        placeholder=" "
        className="peer w-full bg-transparent outline-none pt-5 pb-2 text-sm sm:text-base resize-none"
      />
      <label className="pointer-events-none absolute left-0 top-4 text-sm sm:text-base text-gray-600 transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs">
        {label}{required ? "*" : ""}
      </label>
    </div>
    <FieldError message={error} />
  </div>
));
FloatingTextarea.displayName = "FloatingTextarea";

/* ─── FloatingSelect ─── */
const FloatingSelect = React.forwardRef(({ label, required, children, error, value, ...props }, ref) => {
  const hasValue = Boolean(value);
  const placeholder = `${label}${required ? "*" : ""}`;
  return (
    <div className="relative">
      <div className={`relative border-b ${error ? "border-red-500" : "border-gray-400"}`}>
        {hasValue ? (
          <label className="pointer-events-none absolute left-0 top-1 text-xs text-gray-600">
            {placeholder}
          </label>
        ) : null}
        <select
          {...props}
          ref={ref}
          value={value ?? ""}
          className={`w-full bg-transparent outline-none pb-2 text-sm sm:text-base ${
            hasValue ? "pt-5" : "pt-5 text-gray-600"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {children}
        </select>
      </div>
      <FieldError message={error} />
    </div>
  );
});
FloatingSelect.displayName = "FloatingSelect";

/* ─── Main ─── */
const GetInTouch = () => {
  const [submitting, setSubmitting]               = useState(false);
  const [submitted, setSubmitted]                 = useState(false);
  const [phoneFocused, setPhoneFocused]           = useState(false);
  const [phoneHasTypedDigits, setPhoneHasTypedDigits] = useState(false);
  const [helpIsOther, setHelpIsOther]             = useState(false);
  const [hearIsOther, setHearIsOther]             = useState(false);

  const helpOtherRef     = useRef(null);
  const hearOtherRef     = useRef(null);
  const phoneFieldRef    = useRef(null);
  const phoneDialRef     = useRef("91");

  const { register, handleSubmit, control, watch, reset, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "", company: "", website: "", email: "",
      phone: "", industry: "", help: "", hear: "", brief: "",
    },
    mode: "onSubmit",
  });

  const helpValue     = watch("help");
  const hearValue     = watch("hear");

  useEffect(() => { if (helpIsOther)     helpOtherRef.current?.focus();     }, [helpIsOther]);
  useEffect(() => { if (hearIsOther)     hearOtherRef.current?.focus();     }, [hearIsOther]);

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

  const handleReset = () => {
    reset();
    setHelpIsOther(false);
    setHearIsOther(false);
    setPhoneFocused(false);
    setPhoneHasTypedDigits(false);
  };

  const onValidSubmit = async (values) => {
    if (submitting) return;
    if (!phoneHasTypedDigits) { toast.error("Enter a valid phone number."); return; }

    const payload = {
      fullName:    values.fullName.trim(),
      company:     values.company.trim(),
      website:     values.website.trim(),
      email:       values.email.trim(),
      phone:       values.phone,
      industry:    values.industry.trim(),
      help:        values.help.trim(),
      hear:        values.hear.trim(),
      brief:       values.brief.trim(),
      submittedAt: new Date().toISOString(),
    };

    setSubmitting(true);
    setSubmitted(false);
    const t = toast.loading("Submitting...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data?.error || "Something went wrong. Please try again.", { id: t });
        return;
      }

      toast.dismiss(t);
      handleReset();
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.", { id: t });
    } finally {
      setSubmitting(false);
    }
  };

  const onError = (formErrors) => {
    const order = ["fullName", "website", "email", "phone", "help", "hear", "brief"];
    const first = order.find((key) => formErrors?.[key]?.message);
    toast.error(first ? formErrors[first].message : "Please fill all required fields.");
  };

  /* ─── Shared select-to-other toggle factory ─── */
  const makeSelectChange = (field, setIsOther) => (e) => {
    const v = e.target.value;
    if (v === "Other") {
      setValue(field, "", { shouldValidate: false });
      setIsOther(true);
    } else {
      setValue(field, v, { shouldValidate: true });
    }
  };

  const makeOtherBlur = (setIsOther, field, rhfOnBlur) => (e) => {
    rhfOnBlur?.(e);
    const v = getValues(field);
    if (!String(v || "").trim()) {
      setIsOther(false);
      setValue(field, "");
    }
  };

  return (
    <section id="get-in-touch" className="min-h-screen  md:h-screen w-full bg-secondary text-background">
      <div className="h-full flex items-center">
        <div className="w-full px-6 sm:px-10 md:pl-12 lg:pl-48 xl:pl-80 2xl:pl-[30rem] md:pr-12 lg:pr-20 py-16 sm:py-20 md:py-2">

          <h2 className="heading-xl mb-6 md:mb-8">Get in touch</h2>

          <form
            noValidate
            onSubmit={handleSubmit(onValidSubmit, onError)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-6 sm:gap-y-7 md:gap-y-6"
          >
            <FloatingInput
              label="Full Name"
              required
              error={errors.fullName?.message}
              {...register("fullName", { required: "Full name is required" })}
            />
            <FloatingInput label="Company" {...register("company")} />
            <FloatingInput
              label="Website Link"
              error={errors.website?.message}
              {...register("website", {
                validate: (value) =>
                  isValidWebsite(value) || "Enter a valid website (e.g. example.com)",
              })}
            />
            <FloatingInput
              label="Email"
              required
              type="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  isValidEmail(value) || "Please enter a valid email",
              })}
            />

            {/* ── Phone ── */}
            <div
              ref={phoneFieldRef}
              className={`phone-field relative${phoneFocused || phoneHasTypedDigits ? " is-active" : ""}`}
              data-lenis-prevent
            >
              <div className={`relative border-b ${errors.phone ? "border-red-500" : "border-gray-400"}`}>
              <label
                className={`pointer-events-none absolute z-10 transition-all duration-200 ${
                  phoneFocused || phoneHasTypedDigits
                    ? "left-0 top-1 translate-y-0 text-xs sm:text-sm text-gray-600"
                    : "left-24 top-1/2 -translate-y-1/2 text-sm sm:text-base text-gray-600"
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
                    const national = dial && digits.startsWith(dial)
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
                      const v    = String(value || "");

                      // Never let the value drop below the dial code
                      const safeValue  = v.length === 0 ? dial : v;
                      const finalValue = dial && !safeValue.startsWith(dial)
                        ? dial + safeValue.replace(/^\D+/, "")
                        : safeValue;

                      field.onChange(finalValue);

                      const rest = dial && finalValue.startsWith(dial)
                        ? finalValue.slice(dial.length)
                        : finalValue;
                      setPhoneHasTypedDigits(rest.replace(/\D/g, "").length > 0);
                    }}
                    inputProps={{
                      name:    field.name,
                      required: true,
                      onFocus: () => setPhoneFocused(true),
                      onBlur:  () => {
                        field.onBlur();
                        setPhoneFocused(false);
                        // If cursor left with only the dial code, treat as empty
                        const digits = String(field.value || "").replace(/\D/g, "");
                        const dialLen = String(field.value || "").match(/^\+?(\d{1,3})/)?.[1]?.length ?? 0;
                        if (digits.length <= dialLen) setPhoneHasTypedDigits(false);
                      },
                    }}
                    // Visually mark the field invalid if dial code was somehow removed
                    isValid={(inputNumber, country) => {
                      const dial = country?.dialCode ?? "";
                      return inputNumber.startsWith(dial);
                    }}
                    placeholder=" "
                    enableSearch
                    disableSearchIcon
                    searchPlaceholder="Search country or code"
                    searchNotFound="No country found"
                    searchClass="!text-black !bg-white"
                    containerClass="w-full"
                    inputClass="!w-full !h-auto !border-0 !bg-transparent !outline-none !shadow-none !text-sm sm:!text-base"
                    buttonClass="!border-0 !bg-transparent"
                    dropdownClass="!bg-white !text-black"
                  />
                )}
              />
              </div>
              <FieldError message={errors.phone?.message} />
            </div>

            <FloatingInput label="Industry" {...register("industry")} />

            {/* ── Help ── */}
            {helpIsOther ? (() => {
              const helpReg = register("help", { required: "Please tell us how we can help" });
              return (
                <FloatingInput
                  label="How can we help you"
                  required
                  error={errors.help?.message}
                  {...helpReg}
                  ref={(el) => {
                    helpReg.ref(el);
                    helpOtherRef.current = el;
                  }}
                  onBlur={makeOtherBlur(setHelpIsOther, "help", helpReg.onBlur)}
                />
              );
            })() : (
              <FloatingSelect
                label="How can we help you" required
                error={errors.help?.message}
                value={helpValue}
                {...register("help", { required: "Please tell us how we can help" })}
                onChange={makeSelectChange("help", setHelpIsOther)}
              >
                <option value="Branding">Branding</option>
                <option value="Website">Website</option>
                <option value="Marketing">Marketing</option>
                <option value="Print">Print</option>
                <option value="Other">Other</option>
              </FloatingSelect>
            )}

            {/* ── Hear ── */}
            {hearIsOther ? (() => {
              const hearReg = register("hear", { required: "Please tell us how you heard about us" });
              return (
                <FloatingInput
                  label="How did you hear about us?"
                  required
                  error={errors.hear?.message}
                  {...hearReg}
                  ref={(el) => {
                    hearReg.ref(el);
                    hearOtherRef.current = el;
                  }}
                  onBlur={makeOtherBlur(setHearIsOther, "hear", hearReg.onBlur)}
                />
              );
            })() : (
              <FloatingSelect
                label="How did you hear about us?" required
                error={errors.hear?.message}
                value={hearValue}
                {...register("hear", { required: "Please tell us how you heard about us" })}
                onChange={makeSelectChange("hear", setHearIsOther)}
              >
                <option value="Google / Search Engine">Google / Search Engine</option>
                <option value="Social Media (LinkedIn,Behance, Instagram)">Social Media (LinkedIn, Behance, Instagram)</option>
                <option value="Friend or Family Referral">Friend or Family Referral</option>
                <option value="Business / Professional Referral">Business / Professional Referral</option>
                <option value="Event or Conference">Event or Conference</option>
                <option value="Other">Other</option>
              </FloatingSelect>
            )}

            <FloatingTextarea
              className="md:col-span-2"
              label="Brief about your Goal, Budget & Timeline."
              required
              rows={3}
              error={errors.brief?.message}
              {...register("brief", { required: "Brief is required" })}
            />
          </form>

          <div className="mt-6 sm:mt-8 md:mt-10">
            <Button
              title={submitting ? "SUBMITTING..." : "SUBMIT"}
              color="black"
              onClick={handleSubmit(onValidSubmit, onError)}
            />
            {submitted ? (
              <p
                role="status"
                className="mt-5 max-w-lg text-sm sm:text-base text-green-600 leading-relaxed opacity-0 animate-[fadeSlideIn_0.5s_ease-out_forwards]"
              >
                Thank you! We have received your inquiry, will be in touch soon.
              </p>
            ) : null}
            <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 md:mt-6">
              By clicking connect you accept our{" "}
              <a href="/privacy" target="_blank" className="font-medium text-background" title="Privacy Policy">
                Privacy Policy
              </a>
              <br />
              Prefer email? <a href="mailto:think@wearepointof.com" title="Email Point Of" className="font-medium text-background">think@wearepointof.com</a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GetInTouch;