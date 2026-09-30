"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./navLinks";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block bg-light border-b border-border">
      <div className="container flex items-center h-10">
        <Link
          href="/product-service"
          className="flex items-center gap-1.5 pr-5 mr-2 border-r border-border text-sm font-medium text-foreground hover:text-primary transition-colors"
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
                    : "text-secondary-foreground hover:text-foreground"
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
};

export default NavItems;
