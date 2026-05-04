import { ChevronDown } from "lucide-react";
import Link from "next/link";

const aboutLinks = [
  { label: "History", href: "/#history" },
  { label: "Vision & Mission", href: "/#vision-mission" },
  { label: "Organization", href: "/#organization" },
  { label: "Survey Ships", href: "/#survey-ships" },
  { label: "Gallery", href: "/#gallery" },
];

export default function AboutUsDropdown() {
  return (
    <li className="relative group">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors cursor-pointer py-6"
      >
        About Us
        <ChevronDown size={15} className="mt-px" />
      </button>
      <div className="absolute left-1/2 top-full z-50 hidden min-w-55 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-2 shadow-xl group-hover:block">
        <div className="flex flex-col gap-0.5">
          {aboutLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}
