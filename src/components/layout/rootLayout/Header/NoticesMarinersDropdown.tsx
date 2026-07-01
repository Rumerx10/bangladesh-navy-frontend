"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const noticesLinks = [
  { label: "Publications", href: "/product-service?category=publications" },
  { label: "Notices", href: "/product-service?category=notices-to-mariners" },
  { label: "Hydrographic Note", href: "/contact-us/hydrographic-note" },
];

export default function NoticesMarinersDropdown() {
  const pathname = usePathname();
  // Using a custom check to determine if any of the links are active
  // Since some are query params, pathname alone won't highlight them perfectly, but it's a good start.
  const isActive = pathname?.startsWith("/notices-mariners"); 

  return (
    <li className="relative group">
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
          isActive
            ? "text-liteBlue bg-liteBlue/5"
            : "text-gray-700 hover:text-liteBlue hover:bg-gray-50"
        }`}
      >
        Notices to Mariners
        <ChevronDown
          size={14}
          className="mt-px transition-transform group-hover:rotate-180 duration-200"
        />
      </button>
      <div className="absolute left-1/2 top-full z-50 hidden min-w-55 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-2 shadow-xl group-hover:block">
        <div className="flex flex-col gap-0.5">
          {noticesLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-md px-3 py-2.5 text-sm transition-colors text-gray-700 hover:bg-gray-50 hover:text-liteBlue`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}
