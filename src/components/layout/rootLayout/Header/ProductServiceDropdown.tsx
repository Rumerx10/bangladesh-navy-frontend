"use client";

import { navyCategories } from "@/src/data/navigationItems";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const noticesLinks = [
  { label: "Notices", href: "/important-notice/notices" },
  { label: "Publications", href: "/product-service?category=publications" },
  { label: "Hydrographic Note", href: "/contact-us/hydrographic-note" },
];

const ProductServiceDropdown = () => {
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
            ? "text-liteBlue bg-liteBlue/5"
            : "text-foreground hover:text-liteBlue hover:bg-light"
        }`}
      >
        Products &amp; Services
        <ChevronDown
          size={14}
          className="mt-px transition-transform group-hover:rotate-180 duration-200"
        />
      </Link>
      <div className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 rounded-xl border border-border bg-card shadow-xl group-hover:block">
        <div className="flex flex-col gap-0.5 p-2 min-w-55">
          <Link
            href="/chart"
            className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-light hover:text-liteBlue transition-colors"
          >
            New Chart
          </Link>

          {navyCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/product-service?category=${cat.slug}`}
              className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-light hover:text-liteBlue transition-colors"
            >
              {cat.nameEn}
            </Link>
          ))}

          <Link
            href="/how-to-pay"
            className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-light hover:text-liteBlue transition-colors"
          >
            How to Collect
          </Link>

          {/* Notices to Mariners — hover to expand */}
          <div className="relative group/notices">
            <button
              type="button"
              className="flex items-center justify-between w-full rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-light hover:text-liteBlue transition-colors cursor-pointer"
            >
              Notices to Mariners
              <ChevronRight size={14} className="ml-2 text-muted-foreground" />
            </button>
            <div className="absolute left-full top-0 z-50 hidden ml-1 min-w-50 rounded-xl border border-border bg-card p-2 shadow-xl group-hover/notices:block">
              <div className="flex flex-col gap-0.5">
                {noticesLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-light hover:text-liteBlue transition-colors"
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
};

export default ProductServiceDropdown;
