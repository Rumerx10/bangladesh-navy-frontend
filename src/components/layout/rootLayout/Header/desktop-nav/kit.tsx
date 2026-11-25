"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/src/lib/utils";
import { SubLink } from "@/src/data/navigationItems";
import HeaderTopBarActions from "../HeaderTopBarActions";
import NavBrand from "./NavBrand";
import { getLinkMeta } from "./navMeta";
import {
  DesktopNavState,
  NavEntry,
  flatLinks,
  moreItems,
} from "./useDesktopNav";

interface BarShellProps {
  className?: string;
  /** Background layers, painted under the content (give them -z-10). */
  layers?: ReactNode;
  children: ReactNode;
}

/** The 96px desktop bar: brand, nav, actions.
 *
 *  `z-20`, not just `isolate`: the notice marquee comes after the bar in the
 *  header and has positioned, animated children, so a bar with no z-index of
 *  its own gets painted under it — dropdowns and all. */
export const BarShell = ({ className, layers, children }: BarShellProps) => (
  <div className={cn("relative z-20 hidden h-24 px-4 lg:block", className)}>
    {layers}
    <div className="container flex h-full items-center justify-between gap-6 px-0">
      <NavBrand />
      {children}
      <HeaderTopBarActions />
    </div>
  </div>
);

export const Chevron = ({
  open,
  className,
}: {
  open: boolean;
  className?: string;
}) => (
  <ChevronDown
    aria-hidden
    className={cn(
      "size-3.5 shrink-0 transition-transform duration-200",
      open && "rotate-180",
      className
    )}
  />
);

/** Writes the pointer position into `--spot-x` / `--spot-y` on the element,
 *  for CSS spotlights — no React state, so tracking never re-renders. */
export const trackPointer = (event: PointerEvent<HTMLElement>) => {
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--spot-x",
    `${event.clientX - box.left}px`
  );
  event.currentTarget.style.setProperty(
    "--spot-y",
    `${event.clientY - box.top}px`
  );
};

export interface MenuStyle {
  /** Each link row; it carries `data-active` on the current page. */
  link: string;
  /** Icon tile. Leave out for text-only rows. */
  icon?: string;
  /** Extra icon-tile classes on the current page's row. */
  iconActive?: string;
  /** Section headings in the "More" menu. */
  heading: string;
}

const MenuLinks = ({
  subLinks,
  nav,
  style,
  singleColumn = false,
}: {
  subLinks?: SubLink[];
  nav: DesktopNavState;
  style: MenuStyle;
  singleColumn?: boolean;
}) => {
  const links = flatLinks(subLinks);
  return (
    <ul
      className={cn(
        "grid gap-0.5",
        links.length > 5 && !singleColumn && "grid-cols-2"
      )}
    >
      {links.map((link) => {
        const { icon: Icon } = getLinkMeta(link.link);
        const active = nav.isLinkActive(link.link);
        return (
          <li key={link.link}>
            <Link
              href={link.link}
              onClick={nav.closeMenus}
              data-active={active || undefined}
              className={cn(
                "group flex items-center gap-3 whitespace-nowrap transition-colors",
                style.link
              )}
            >
              {style.icon && (
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center transition-colors",
                    style.icon,
                    active && style.iconActive
                  )}
                >
                  <Icon className="size-4" />
                </span>
              )}
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

/** A section's links — or, for "More", every folded section in a 2×2 grid. */
export const SectionMenu = ({
  entry,
  nav,
  style,
}: {
  entry: NavEntry;
  nav: DesktopNavState;
  style: MenuStyle;
}) =>
  entry.isMore ? (
    <div className="grid grid-cols-2 gap-x-3 gap-y-3">
      {moreItems.map((section) => (
        <div key={section.label}>
          <p
            className={cn(
              "pb-1.5 text-[11px] font-semibold tracking-wider whitespace-nowrap uppercase",
              style.heading
            )}
          >
            {section.label}
          </p>
          <MenuLinks
            subLinks={section.subLinks}
            nav={nav}
            style={style}
            singleColumn
          />
        </div>
      ))}
    </div>
  ) : (
    <MenuLinks subLinks={entry.item.subLinks} nav={nav} style={style} />
  );
