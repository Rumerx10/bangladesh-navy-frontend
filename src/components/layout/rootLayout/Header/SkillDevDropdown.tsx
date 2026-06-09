"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "BN Hydrographic Institute", href: "/skill-development" },
  { label: "Courses", href: "/skill-development/courses" },
];

export default function SkillDevDropdown() {
  const pathname = usePathname();
  const isActive = pathname?.startsWith("/skill-development");

  return (
    <li className="relative group">
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 px-3 py-2 text-base font-medium rounded-md transition-colors cursor-pointer ${
          isActive
            ? "text-[#003f71] bg-[#003f71]/5"
            : "text-gray-700 hover:text-[#003f71] hover:bg-gray-50"
        }`}
      >
        Training and Courses
        <ChevronDown
          size={14}
          className="mt-px transition-transform group-hover:rotate-180 duration-200"
        />
      </button>

      <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 rounded-xl border border-gray-200 bg-white shadow-xl group-hover:block">
        <div className="flex flex-col gap-0.5 p-2 min-w-56">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-md px-3 py-2.5 text-sm transition-colors ${
                pathname === item.href
                  ? "text-[#003f71] bg-[#003f71]/5 font-medium"
                  : "text-gray-700 hover:bg-gray-50 hover:text-[#003f71]"
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
