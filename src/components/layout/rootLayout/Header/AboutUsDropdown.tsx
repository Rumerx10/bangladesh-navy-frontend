"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const aboutLinks = [
  { label: "History", href: "/about/history" },
  { label: "Vision & Mission", href: "/about/vision-mission" },
  { label: "Organogram", href: "/about/organogram" },
  { label: "Survey Ships", href: "/about/survey-ships" },
  { label: "Gallery", href: "/about/gallery" },
];

export default function AboutUsDropdown() {
  const pathname = usePathname();
  const isActive = pathname?.startsWith("/about");

  return (
    <li className="relative group">
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 px-3 py-2 text-base  font-medium rounded-md transition-colors cursor-pointer ${
          isActive
            ? "text-liteBlue bg-liteBlue/5"
            : "text-gray-700 hover:text-liteBlue hover:bg-gray-50"
        }`}
      >
        About Us
        <ChevronDown
          size={14}
          className="mt-px transition-transform group-hover:rotate-180 duration-200"
        />
      </button>
      <div className="absolute left-1/2 top-full z-50 hidden min-w-50 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-2 shadow-xl group-hover:block">
        <div className="flex flex-col gap-0.5">
          {aboutLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-md px-3 py-2.5 text-sm transition-colors ${
                pathname === item.href
                  ? "text-liteBlue bg-liteBlue/5 font-medium"
                  : "text-gray-700 hover:bg-gray-50 hover:text-liteBlue"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}
