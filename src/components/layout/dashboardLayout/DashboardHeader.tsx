"use client";

import { useAppSelector } from "@/src/lib/redux/hooks";
import { ArrowUpRight, Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GiCompass } from "react-icons/gi";
import ThemeToggle from "../../theme/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import AdminBreadcrumb from "./AdminBreadcrumb";
import UserSkeleton from "./Skeleton/UserSkeleton";

/** "SUPER_ADMIN" → "Super admin" */
const formatRole = (role: string) => {
  const words = role.replace(/_/g, " ").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

/** Depth contours, as on a nautical chart. They fade in from the left so the
 *  breadcrumb always sits on clean colour. */
const ChartContours = () => (
  <svg
    aria-hidden
    viewBox="0 0 640 80"
    preserveAspectRatio="none"
    fill="none"
    stroke="currentColor"
    className="absolute inset-y-0 right-0 -z-10 h-full w-[72%] text-white opacity-[0.08] mask-[linear-gradient(to_right,transparent,black_40%)]"
  >
    {[
      "M0 70 C90 58 160 80 250 66 S410 48 500 62 S600 78 640 60",
      "M0 55 C80 42 170 64 260 50 S420 30 510 46 S600 62 640 44",
      "M0 40 C100 28 180 50 270 34 S430 14 520 30 S600 46 640 28",
      "M0 25 C90 12 190 36 280 20 S440 0 530 16 S600 30 640 12",
      "M0 10 C100 -2 200 22 290 6 S450 -12 540 2 S610 16 640 -2",
    ].map((d) => (
      <path key={d} d={d} vectorEffect="non-scaling-stroke" />
    ))}
  </svg>
);

/** The admin masthead. It carries what the old full-width hero said — the
 *  centre's navy, its compass, "Admin Control Panel" — in one slim band, and
 *  adds where you are. Its gradient starts on the same navy as the sidebar's
 *  crest block (SidebarLogo), so the two read as one band across the top. */
const DashboardHeader = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
  const {
    userInformation: { firstName, role, profilePicture },
    loading,
  } = useAppSelector((state) => state.auth);

  return (
    <header className="relative isolate flex h-16 shrink-0 items-center gap-3 overflow-hidden bg-linear-to-r from-brand-navy to-brand-blue px-3 text-nav-ink md:px-6 lg:h-18">
      {/* A soft light source top-right, so the band isn't a flat ramp. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_160%_at_88%_0%,rgb(255_255_255/0.13),transparent_70%)]"
      />
      <ChartContours />
      <GiCompass
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[30%] -z-10 hidden size-44 -translate-y-1/2 text-white/7 motion-safe:animate-[spin_90s_linear_infinite] md:block"
      />

      {toggleSidebar && (
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Open menu"
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg transition-colors hover:bg-nav-wash focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none lg:hidden"
        >
          <Menu className="size-5" />
        </button>
      )}

      {/* The sidebar's crest is off-canvas below `lg`, so the band shows it. */}
      <Image
        src="/logo.png"
        alt=""
        width={72}
        height={72}
        className="size-8 shrink-0 lg:hidden"
      />

      <div className="min-w-0">
        <p className="truncate text-[10px] font-semibold tracking-[0.18em] text-nav-ink-muted uppercase sm:text-[11px]">
          Admin Control Panel
        </p>
        <AdminBreadcrumb />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-9 items-center gap-1.5 rounded-full border border-nav-hairline px-3.5 text-sm font-medium transition-colors hover:bg-nav-wash focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none md:inline-flex"
        >
          View site
          <ArrowUpRight aria-hidden className="size-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </Link>

        <ThemeToggle className="text-nav-ink hover:bg-nav-wash" />

        <span
          aria-hidden
          className="mx-1 hidden h-8 w-px bg-nav-hairline sm:block"
        />

        {loading ? (
          <UserSkeleton />
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="size-9 ring-2 ring-white/20 md:size-10">
              <AvatarImage
                src={profilePicture || "https://github.com/shadcn.png"}
                alt=""
              />
              <AvatarFallback className="bg-white/15 text-nav-ink">
                <User className="size-4" />
              </AvatarFallback>
            </Avatar>

            <div className="hidden min-w-0 sm:block">
              <p className="max-w-40 truncate text-sm leading-tight font-semibold">
                Hello, {firstName}
              </p>
              {role && (
                <span className="mt-1 inline-block rounded bg-nav-wash px-1.5 text-[11px] leading-4.5 font-medium text-nav-ink-muted">
                  {formatRole(role)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
