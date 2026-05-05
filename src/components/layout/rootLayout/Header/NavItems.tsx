"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./navLinks";

export default function NavItems() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block bg-gray-50 border-b border-gray-100">
      <div className="container flex items-center h-10">
        <Link
          href="/product-service"
          className="flex items-center gap-1.5 pr-5 mr-2 border-r border-gray-200 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
        >
          <Menu size={16} />
          <span>All Products</span>
        </Link>

        <div className="flex items-center gap-0.5">
          {navLinks.slice(1).map(({ label, href }) => {
            const isActive =
              pathname === href ||
              pathname.startsWith(href.split("?")[0] + "/");

            return (
              <Link
                key={label}
                href={href}
                className={`px-3 py-1.5 text-sm rounded-sm transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
