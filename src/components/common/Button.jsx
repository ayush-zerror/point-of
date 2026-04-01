import React from 'react'

const Button = ({title}) => {
  return (
     <div className="pt-10">
          <button className="cursor-pointer group flex mb-1 items-center gap-2 text-sm font-[600] tracking-wide uppercase">
            {/* Circle */}
            <span className="relative flex items-center justify-center w-2 h-2 bg-foreground rounded-full transition-all duration-300 group-hover:w-5 group-hover:h-5">
              {/* Arrow */}
              <svg
                className="w-3 h-3 text-background opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </span>

            {/* Text with animated underline */}
            <span className="relative uppercase">
               {title}
              {/* Underline */}
              <span className="absolute right-0 -bottom-1 h-[1px] w-full bg-foreground transition-all duration-300 group-hover:w-0"></span>
            </span>
          </button>
        </div>
  )
}

export default Button