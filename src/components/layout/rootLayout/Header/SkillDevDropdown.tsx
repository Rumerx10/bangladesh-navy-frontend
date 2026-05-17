"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const skillDevLinks = [
  { label: "BN Hydrographic School", href: "/skill-development" },
  { label: "Long Hydrographic Course (Cat. A)", href: "/skill-development/long-hydrographic-course-cat-a" },
  { label: "Basic Hydrographic Course (Cat. B)", href: "/skill-development/basic-hydrography-cat-b" },
  { label: "Survey Recorder Part I", href: "/skill-development/survey-recorder-part-1" },
  { label: "Survey Recorder Part II", href: "/skill-development/survey-recorder-part-2" },
  { label: "Survey Recorder Part III", href: "/skill-development/survey-recorder-part-3" },
  { label: "Customized Courses", href: "/skill-development/customized-courses" },
];

export default function SkillDevDropdown() {
  const pathname = usePathname();
  const isActive = pathname?.startsWith("/skill-development");

  return (
    <li className="relative group">
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
          isActive
            ? "text-[#003f71] bg-[#003f71]/5"
            : "text-gray-700 hover:text-[#003f71] hover:bg-gray-50"
        }`}
      >
        Skill Development
        <ChevronDown size={14} className="mt-px transition-transform group-hover:rotate-180 duration-200" />
      </button>
      <div className="absolute left-1/2 top-full z-50 hidden min-w-[260px] -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-2 shadow-xl group-hover:block">
        <div className="flex flex-col gap-0.5">
          {skillDevLinks.map((item) => (
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
