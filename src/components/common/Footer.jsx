import { Send } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full ">
      <div className="px-20 mx-auto  py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* LOGO */}
          <div className="flex items-start">
            <Image
              src="/logo/po-logo.png"
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="h-14 w-auto object-contain invert dark:invert-0"
            />
          </div>

          {/* NAV LINKS */}
          <div className="space-y-3 text-sm tracking-wide">
            {["STUDIO", "WORK", "EXPERTISE", "BRANDS", "CONNECT"].map(
              (item) => (
                <p
                  key={item}
                  className="cursor-pointer hover:opacity-60 transition"
                >
                  {item}
                </p>
              ),
            )}
          </div>

          {/* SOCIAL LINKS */}
          <div className="space-y-3 text-sm tracking-wide">
            {["INSTAGRAM", "LINKEDIN", "PINTEREST", "BEHANCE"].map((item) => (
              <p
                key={item}
                className="cursor-pointer hover:opacity-60 transition"
              >
                {item}
              </p>
            ))}
          </div>

          {/* EMAIL SUBSCRIBE */}
          <div className="space-y-6">
            <p className="font-medium">Don’t miss anything</p>

            <div className="relative border-b border-neutral-400 dark:border-neutral-600">
              <input
                type="email"
                placeholder="Email*"
                className="w-full bg-transparent outline-none py-2 pr-8 text-sm placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
              />
              <Send className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70" />
            </div>

            <div className="text-sm">
              <p className="text-neutral-500 dark:text-neutral-400">
                Partner with us
              </p>
              <p className="font-medium">think@wearepointof.com</p>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-neutral-300 dark:border-neutral-700 mt-12 pt-6 flex flex-col md:flex-row justify-between text-sm">
          <div className="flex gap-4 text-neutral-600 dark:text-neutral-400">
            <p className="cursor-pointer hover:text-neutral-900 dark:hover:text-white">
              Privacy
            </p>
            <span>•</span>
            <p className="cursor-pointer hover:text-neutral-900 dark:hover:text-white">
              Legal
            </p>
            <span>•</span>
            <p className="cursor-pointer hover:text-neutral-900 dark:hover:text-white">
              Cookies
            </p>
          </div>

          <p className="mt-4 md:mt-0 text-neutral-600 dark:text-neutral-400">
            © Point Of
          </p>
        </div>
      </div>
    </footer>
  );
}
