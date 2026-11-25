"use client";

import { useState } from "react";
import { cn } from "@/src/lib/utils";
import BentoMenu, { ACTIVE_FILL } from "./BentoMenu";
import MenuPanel from "./MenuPanel";
import NavTrigger from "./NavTrigger";
import { BarShell, Chevron } from "./kit";
import {
  MORE_LABEL,
  hasMenu,
  navEntries,
  useDesktopNav,
} from "./useDesktopNav";

// One depth of sea per section — all from the same blue-to-teal family, so
// the band changes mood without changing brand
const SHADES: { label: string; className: string }[] = [
  {
    label: "Home",
    className:
      "bg-[linear-gradient(110deg,oklch(0.24_0.13_245),oklch(0.5_0.17_230))]",
  },
  {
    label: "About Us",
    className:
      "bg-[linear-gradient(110deg,oklch(0.2_0.1_268),oklch(0.42_0.14_255))]",
  },
  {
    label: "Nautical Products",
    className:
      "bg-[linear-gradient(110deg,oklch(0.24_0.09_215),oklch(0.5_0.12_200))]",
  },
  {
    label: "Important Notice",
    className:
      "bg-[linear-gradient(110deg,oklch(0.21_0.06_252),oklch(0.42_0.09_238))]",
  },
  {
    label: "Training and Courses",
    className:
      "bg-[linear-gradient(110deg,oklch(0.23_0.11_236),oklch(0.48_0.15_220))]",
  },
  {
    label: "Contact",
    className:
      "bg-[linear-gradient(110deg,oklch(0.24_0.08_200),oklch(0.5_0.1_188))]",
  },
];

/** The band: every section's shade stacked and cross-faded over a frosted
 *  base, dimmed in the dark theme. */
const Band = ({ shade }: { shade: string }) => (
  <>
    {/* Frosted base. Mid cross-fade both shades are part transparent, and
        without this the page scrolling under the bar showed through. */}
    <span
      aria-hidden
      className="absolute inset-0 -z-10 bg-brand-navy/70 backdrop-blur-2xl"
    />
    {SHADES.map((option) => (
      <span
        key={option.label}
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 transition-opacity duration-700 ease-out",
          option.className,
          option.label === shade ? "opacity-100" : "opacity-0"
        )}
      />
    ))}
    <span aria-hidden className="absolute inset-0 -z-10 dark:bg-black/35" />
  </>
);

/** The desktop header bar (lg+): a sea-blue band that shifts shade with the
 *  section you point at; menus open as bento grids. The bar stays 96px, so
 *  the page below never moves. */
const DesktopNav = () => {
  const nav = useDesktopNav();
  const [hovered, setHovered] = useState<string | null>(null);
  // The section being pointed at (or whose menu is open), else the page's
  // own section. "More" isn't a section, so it keeps the page's shade; pages
  // outside the nav get the home shade.
  const pointed = hovered ?? nav.openMenu;
  const shade =
    (pointed && pointed !== MORE_LABEL ? pointed : nav.activeSection) ??
    SHADES[0].label;

  return (
    // No bottom border: the band layers fill the box inside the border, so a
    // border would be a see-through line between the bar and the notice strip
    <BarShell layers={<Band shade={shade} />}>
      <nav ref={(node) => nav.bindRoot(node)} aria-label="Main">
        <ul
          className="flex items-center gap-1"
          onMouseLeave={() => setHovered(null)}
        >
          {navEntries.map((entry) => {
            const { label } = entry.item;
            const isOpen = nav.openMenu === label;
            const active = nav.isEntryActive(entry);
            return (
              <li key={label} className={cn("relative", entry.visibility)}>
                <NavTrigger
                  entry={entry}
                  nav={nav}
                  hover
                  onPointerEnter={() => setHovered(label)}
                  className={cn(
                    "flex h-10 cursor-pointer items-center gap-1.5 rounded-lg border px-3.5 text-sm font-medium whitespace-nowrap transition-colors duration-200",
                    active
                      ? cn(ACTIVE_FILL, "text-white")
                      : "border-transparent text-nav-ink-muted hover:bg-white/10 hover:text-nav-ink aria-expanded:bg-white/10 aria-expanded:text-nav-ink"
                  )}
                >
                  {label}
                  {hasMenu(entry) && (
                    <Chevron open={isOpen} className="opacity-70" />
                  )}
                </NavTrigger>

                {hasMenu(entry) && (
                  <MenuPanel
                    open={isOpen}
                    nav={nav}
                    gapClassName="pt-4"
                    className="rounded-2xl border border-white/10 bg-[#0a111c]/95 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.85)] backdrop-blur-xl"
                  >
                    <BentoMenu entry={entry} nav={nav} />
                  </MenuPanel>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </BarShell>
  );
};

export default DesktopNav;
