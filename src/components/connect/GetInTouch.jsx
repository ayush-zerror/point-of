"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";

/* ─── FloatingInput ─── */
const FloatingInput = React.forwardRef(({ label, required, className = "", ...props }, ref) => (
  <div className="relative border-b border-gray-400">
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
));
FloatingInput.displayName = "FloatingInput";

/* ─── FloatingTextarea ─── */
const FloatingTextarea = React.forwardRef(({ label, required, className = "", ...props }, ref) => (
  <div className={`relative border-b border-gray-400 ${className}`}>
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
));
FloatingTextarea.displayName = "FloatingTextarea";

/* ─── FloatingSelect ─── */
const FloatingSelect = React.forwardRef(({ label, required, children, ...props }, ref) => (
  <div className="relative border-b border-gray-400">
    <label className="pointer-events-none absolute left-0 top-1 text-xs text-gray-600">
      {label}{required ? "*" : ""}
    </label>
    <select
      {...props}
      ref={ref}
      className="w-full bg-transparent outline-none pt-5 pb-2 text-sm sm:text-base"
    >
      <option value="" disabled>Select</option>
      {children}
    </select>
  </div>
));
FloatingSelect.displayName = "FloatingSelect";

/* ─── Main ─── */
const GetInTouch = () => {
  const [submitting, setSubmitting]               = useState(false);
  const [phoneFocused, setPhoneFocused]           = useState(false);
  const [phoneHasTypedDigits, setPhoneHasTypedDigits] = useState(false);
  const [industryIsOther, setIndustryIsOther]     = useState(false);
  const [helpIsOther, setHelpIsOther]             = useState(false);
  const [hearIsOther, setHearIsOther]             = useState(false);

  const industryOtherRef = useRef(null);
  const helpOtherRef     = useRef(null);
  const hearOtherRef     = useRef(null);

  const { register, handleSubmit, control, watch, reset, setValue } = useForm({
    defaultValues: {
      fullName: "", company: "", website: "", email: "",
      phone: "", industry: "", help: "", hear: "", brief: "",
    },
    mode: "onSubmit",
  });

  const industryValue = watch("industry");
  const helpValue     = watch("help");
  const hearValue     = watch("hear");

  useEffect(() => { if (industryIsOther) industryOtherRef.current?.focus(); }, [industryIsOther]);
  useEffect(() => { if (helpIsOther)     helpOtherRef.current?.focus();     }, [helpIsOther]);
  useEffect(() => { if (hearIsOther)     hearOtherRef.current?.focus();     }, [hearIsOther]);

  const handleReset = () => {
    reset();
    setIndustryIsOther(false);
    setHelpIsOther(false);
    setHearIsOther(false);
    setPhoneFocused(false);
    setPhoneHasTypedDigits(false);
  };

  const onValidSubmit = async (values) => {
    if (submitting) return;
    if (!phoneHasTypedDigits) { toast.error("Phone Number is required."); return; }

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
    const t = toast.loading("Submitting...");
    try {
      console.log("GetInTouch submit payload:", payload);
      toast.success("Submitted successfully!", { id: t });
      handleReset();
    } catch {
      toast.error("Something went wrong. Please try again.", { id: t });
    } finally {
      setSubmitting(false);
    }
  };

  const onError = () => toast.error("Please fill all required fields.");

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

  const makeOtherBlur = (currentValue, setIsOther, field) => () => {
    if (!String(currentValue || "").trim()) {
      setIsOther(false);
      setValue(field, "");
    }
  };

  return (
    <section className="min-h-screen md:h-screen w-full bg-foreground text-background">
      <div className="h-full flex items-center">
        <div className="w-full px-4 sm:px-6 md:pl-28 lg:pl-48 xl:pl-80 2xl:pl-[30rem] md:pr-20 py-2">

          <h1 className="heading-xl mb-8">Get in touch</h1>

          <form
            onSubmit={handleSubmit(onValidSubmit, onError)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-8 md:gap-y-6"
          >
            <FloatingInput label="Full Name" required {...register("fullName", { required: true })} />
            <FloatingInput label="Company"   {...register("company")} />
            <FloatingInput label="Website Link" {...register("website")} />
            <FloatingInput
              label="Email" required type="email"
              {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
            />

            {/* ── Phone ── */}
            <div className="phone-field relative border-b border-gray-400 pt-2">
              <label
                className={`pointer-events-none absolute transition-all duration-200 ${
                  phoneFocused || phoneHasTypedDigits
                    ? "left-0 top-0 text-xs text-gray-600"
                    : "left-24 top-1/2 -translate-y-1/2 text-sm sm:text-base text-gray-600"
                }`}
              >
                Phone Number*
              </label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PhoneInput
                    country="in"
                    value={field.value}
                    onChange={(value, data) => {
                      const dial = data?.dialCode ? String(data.dialCode) : "";
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
                    containerClass="w-full"
                    inputClass="!w-full !border-0 !bg-transparent !outline-none !pt-5 !pb-2 !text-sm sm:!text-base"
                    buttonClass="!border-0 !bg-transparent"
                    dropdownClass="!bg-white !text-black"
                  />
                )}
              />
            </div>

            {/* ── Industry ── */}
            {industryIsOther ? (
              <FloatingInput
                label="Select Your Industry" required
                {...register("industry", { required: true })}
                ref={industryOtherRef}
                onBlur={makeOtherBlur(industryValue, setIndustryIsOther, "industry")}
              />
            ) : (
              <FloatingSelect
                label="Select Your Industry" required
                {...register("industry", { required: true })}
                onChange={makeSelectChange("industry", setIndustryIsOther)}
              >
                <option value="D2C">D2C</option>
                <option value="FMCG">FMCG</option>
                <option value="Fashion">Fashion</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Hospitality">Hospitality</option>
                <option value="SaaS / Tech">SaaS / Tech</option>
                <option value="Personal Brand">Personal Brand</option>
                <option value="Other">Other</option>
              </FloatingSelect>
            )}

            {/* ── Help ── */}
            {helpIsOther ? (
              <FloatingInput
                label="How can we help you" required
                {...register("help", { required: true })}
                ref={helpOtherRef}
                onBlur={makeOtherBlur(helpValue, setHelpIsOther, "help")}
              />
            ) : (
              <FloatingSelect
                label="How can we help you" required
                {...register("help", { required: true })}
                onChange={makeSelectChange("help", setHelpIsOther)}
              >
                <option value="Brand Identity">Brand Identity</option>
                <option value="Packaging">Packaging</option>
                <option value="Website">Website</option>
                <option value="Product Design">Product Design</option>
                <option value="Campaign / Content">Campaign / Content</option>
                <option value="Consulting">Consulting</option>
                <option value="Other">Other</option>
              </FloatingSelect>
            )}

            {/* ── Hear ── */}
            {hearIsOther ? (
              <FloatingInput
                label="How did you hear about us?" required
                {...register("hear", { required: true })}
                ref={hearOtherRef}
                onBlur={makeOtherBlur(hearValue, setHearIsOther, "hear")}
              />
            ) : (
              <FloatingSelect
                label="How did you hear about us?" required
                {...register("hear", { required: true })}
                onChange={makeSelectChange("hear", setHearIsOther)}
              >
                <option value="Google">Google</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Past Client">Past Client</option>
                <option value="Other">Other</option>
              </FloatingSelect>
            )}

            <FloatingTextarea
              className="md:col-span-2"
              label="Brief about your Goal, Budget & Timeline."
              required rows={3}
              {...register("brief", { required: true })}
            />
          </form>

          <div className="mt-8 md:mt-10">
            <Button
              title={submitting ? "SUBMITTING..." : "SUBMIT"}
              color="black"
              onClick={handleSubmit(onValidSubmit, onError)}
            />
            <p className="text-xs sm:text-sm text-gray-600 mt-4 md:mt-6">
              By clicking connect you accept our{" "}
              <a href="/privacy" className="underline">Privacy Policy</a>
              <br />
              Prefer email? think@wearepointof.com
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GetInTouch;