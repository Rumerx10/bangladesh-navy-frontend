"use client";

import { cn } from "@/src/lib/utils";
import getAdminTrail from "@/src/utils/getAdminTrail";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** The top bar's "you are here" line. On phones only the current page shows;
 *  the full trail would not fit beside the menu and profile buttons. */
const AdminBreadcrumb = () => {
  const trail = getAdminTrail(usePathname());

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex min-w-0 items-center gap-1.5 text-sm text-nav-ink-muted sm:text-[15px]">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li
              key={`${index}-${crumb.label}`}
              className={cn(
                "flex min-w-0 items-center gap-1.5",
                !isLast && "hidden shrink-0 sm:flex"
              )}
            >
              {index > 0 && (
                <ChevronRight
                  aria-hidden
                  className="hidden size-3.5 shrink-0 opacity-50 sm:block"
                />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="truncate font-semibold text-nav-ink"
                >
                  {crumb.label}
                </span>
              ) : crumb.href ? (
                <Link
                  href={crumb.href}
                  className="rounded-sm transition-colors hover:text-nav-ink focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default AdminBreadcrumb;
