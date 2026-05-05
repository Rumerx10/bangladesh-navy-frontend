"use client";

import { navyCategories } from "@/src/data/navyCategories";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProductServiceDropdown() {
  const pathname = usePathname();
  const isActive = pathname?.startsWith("/product-service");

  return (
    <li className="relative group">
      <Link
        href="/product-service"
        className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
          isActive
            ? "text-[#003f71] bg-[#003f71]/5"
            : "text-gray-700 hover:text-[#003f71] hover:bg-gray-50"
        }`}
      >
        Products &amp; Services
        <ChevronDown size={14} className="mt-px transition-transform group-hover:rotate-180 duration-200" />
      </Link>
      <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 rounded-xl border border-gray-200 bg-white shadow-xl group-hover:block">
        <div className="flex flex-col gap-0.5 p-2 min-w-[220px]">
          {navyCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/product-service?category=${cat.slug}`}
              className="rounded-md px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003f71] transition-colors"
            >
              {cat.nameEn}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}
