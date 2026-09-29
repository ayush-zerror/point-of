"use client";

import React, { useState } from "react";

export const FieldError = ({ message }) =>
  message ? <p className="mt-1.5 text-xs text-red-400">{message}</p> : null;

const FLOAT_LABEL =
  "pointer-events-none absolute left-0 leading-none text-[14px] sm:text-[16px] text-desc transition-[translate,font-size] duration-300 ease-out";
const FLOAT_LABEL_ACTIVE =
  "peer-focus:translate-y-[calc(-50%-1.25rem)] peer-focus:text-[12px] sm:peer-focus:text-[12px] peer-[&:not(:placeholder-shown)]:translate-y-[calc(-50%-1.25rem)] peer-[&:not(:placeholder-shown)]:text-[12px] sm:peer-[&:not(:placeholder-shown)]:text-[12px]";

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A9.8 9.8 0 0112 5c5 0 9.3 3.1 11 7-.5 1.2-1.2 2.3-2.1 3.2M6.7 6.7C4.7 8 3.3 9.8 2 12c1.7 3.9 6 7 10 7 1.4 0 2.8-.3 4-.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

export const FloatingInput = React.forwardRef(
  ({ label, required, className = "", error, ...props }, ref) => (
    <div className="relative">
      <div className={`relative border-b ${error ? "border-red-400" : "border-white/25"}`}>
        <input
          {...props}
          ref={ref}
          placeholder=" "
          className={`peer w-full bg-transparent outline-none pt-5 pb-2 text-sm sm:text-base text-foreground caret-foreground ${className}`}
        />
        <label className={`${FLOAT_LABEL} top-1/2 translate-y-[-50%] ${FLOAT_LABEL_ACTIVE}`}>
          {label}
          {required ? "*" : ""}
        </label>
      </div>
      <FieldError message={error} />
    </div>
  )
);
FloatingInput.displayName = "FloatingInput";

export const FloatingPasswordInput = React.forwardRef(
  ({ label, required, className = "", error, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <div className={`relative border-b ${error ? "border-red-400" : "border-white/25"}`}>
          <input
            {...props}
            ref={ref}
            type={visible ? "text" : "password"}
            placeholder=" "
            className={`peer w-full bg-transparent outline-none pt-5 pb-2 pr-10 text-sm sm:text-base text-foreground caret-foreground ${className}`}
          />
          <label className={`${FLOAT_LABEL} top-1/2 translate-y-[-50%] ${FLOAT_LABEL_ACTIVE}`}>
            {label}
            {required ? "*" : ""}
          </label>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer p-1 text-desc transition-colors hover:text-foreground"
          >
            <EyeIcon open={visible} />
          </button>
        </div>
        <FieldError message={error} />
      </div>
    );
  }
);
FloatingPasswordInput.displayName = "FloatingPasswordInput";
