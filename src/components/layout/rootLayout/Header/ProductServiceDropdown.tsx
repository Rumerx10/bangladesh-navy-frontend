"use client";

import { navyCategories } from "@/src/data/navyCategories";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const noticesLinks = [
  { label: "Publications", href: "/product-service?category=publications" },
  { label: "Notices", href: "/product-service?category=notices-to-mariners" },
  { label: "Hydrographic Note", href: "/contact-us/hydrographic-note" },
];

export default function ProductServiceDropdown() {
  const pathname = usePathname();
  const isActive =
    pathname?.startsWith("/product-service") ||
    pathname?.startsWith("/notices-mariners") ||
    pathname?.startsWith("/how-to-pay");

  return (
    <li className="relative group">
      <Link
        href="/product-service"
        className={`inline-flex items-center gap-1.5 px-3 py-2 text-base font-medium rounded-md transition-colors cursor-pointer ${
          isActive
            ? "text-[#003f71] bg-[#003f71]/5"
            : "text-gray-700 hover:text-[#003f71] hover:bg-gray-50"
        }`}
      >
        Products &amp; Services
        <ChevronDown
          size={14}
          className="mt-px transition-transform group-hover:rotate-180 duration-200"
        />
      </Link>
      <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 rounded-xl border border-gray-200 bg-white shadow-xl group-hover:block">
        <div className="flex flex-col gap-0.5 p-2 min-w-55">
          {navyCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/product-service?category=${cat.slug}`}
              className="rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003f71] transition-colors"
            >
              {cat.nameEn}
            </Link>
          ))}

          <Link
            href="/how-to-pay"
            className="rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003f71] transition-colors"
          >
            How to Pay
          </Link>

          {/* Notices to Mariners — hover to expand */}
          <div className="relative group/notices">
            <button
              type="button"
              className="flex items-center justify-between w-full rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#003f71] transition-colors cursor-pointer"
            >
              Notices to Mariners
              <ChevronRight size={14} className="ml-2 text-gray-400" />
            </button>
            <div className="absolute left-full top-0 z-50 hidden ml-1 min-w-50 rounded-xl border border-gray-200 bg-white p-2 shadow-xl group-hover/notices:block">
              <div className="flex flex-col gap-0.5">
                {noticesLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003f71] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
