"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NavItem, NavigationItems, SubLink } from "@/src/data/navigationItems";

// Primary items in the main nav row
const PRIMARY_LABELS = ["Home", "About Us", "Nautical Products"];
// Primary items that still collapse into "More" below 1800 px, listed first
const COLLAPSIBLE_PRIMARY_LABELS = ["About Us"];
// Items collapsed into "More" below 1800 px
const OTHERS_LABELS = ["Training and Courses", "Contact", "Important Notice"];

export const primaryItems = NavigationItems.filter((item) =>
  PRIMARY_LABELS.includes(item.label)
);
export const othersItems = NavigationItems.filter((item) =>
  OTHERS_LABELS.includes(item.label)
);
/** Everything the "More" menu holds, collapsible primary items on top. */
export const moreItems = [
  ...primaryItems.filter((item) =>
    COLLAPSIBLE_PRIMARY_LABELS.includes(item.label)
  ),
  ...othersItems,
];

export const MORE_LABEL = "More";

// Spelled out in full so Tailwind's scanner finds them.
/** In the row only at 1800 px+; below that the item lives in "More". */
const WIDE_ONLY = "hidden min-[1800px]:block";
/** The "More" trigger: only below 1800 px. */
const NARROW_ONLY = "min-[1800px]:hidden";

export interface NavEntry {
  item: NavItem;
  /** The "More" trigger rather than a real section. */
  isMore: boolean;
  /** Visibility classes for the entry's wrapper. */
  visibility: string;
}

const toEntry = (item: NavItem, wideOnly: boolean): NavEntry => ({
  item,
  isMore: false,
  visibility: wideOnly ? WIDE_ONLY : "",
});

/** The nav row in order. Below 1800 px the wide-only entries hide and "More"
 *  stands in for them. */
export const navEntries: NavEntry[] = [
  ...primaryItems.map((item) =>
    toEntry(item, COLLAPSIBLE_PRIMARY_LABELS.includes(item.label))
  ),
  {
    item: { label: MORE_LABEL, link: "#" },
    isMore: true,
    visibility: NARROW_ONLY,
  },
  ...othersItems.map((item) => toEntry(item, true)),
];

export const hasMenu = (entry: NavEntry) =>
  entry.isMore || Boolean(entry.item.subLinks?.length);

/** A section's links with any nested group folded in, for menus that list
 *  links flat. */
export const flatLinks = (subLinks: SubLink[] = []) =>
  subLinks.flatMap((sub) =>
    sub.subLinks ? sub.subLinks : [{ label: sub.label, link: sub.link }]
  );

/** Open/close state and active-page logic for the desktop nav. */
export function useDesktopNav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const rootEl = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Navigating closes any open menu. Menu links close it themselves, but the
  // logo and the back button navigate without doing so.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenMenu(null);
  }

  const cancelClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
  }, []);

  const closeMenus = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(null);
  }, []);

  // Hover intent: leaving a trigger or panel closes it after a beat, so the
  // pointer can cross the gap between them without the menu snapping shut.
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 150);
  }, []);

  const openMenuNow = useCallback((label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }, []);

  const toggleMenu = useCallback((label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu((prev) => (prev === label ? null : label));
  }, []);

  /** Feed the element wrapping the triggers *and* their panels to this — a
   *  press outside it closes the menu. Call it from an inline ref callback,
   *  `ref={(node) => nav.bindRoot(node)}`: handing `nav.bindRoot` straight to
   *  `ref` makes the React Compiler treat the whole `nav` object as a ref and
   *  reject every render that reads from it. */
  const bindRoot = useCallback((node: HTMLElement | null) => {
    rootEl.current = node;
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Close on an outside press and on Escape
  useEffect(() => {
    if (!openMenu) return;

    const onPointerDown = (event: PointerEvent) => {
      if (rootEl.current && !rootEl.current.contains(event.target as Node)) {
        closeMenus();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu, closeMenus]);

  const isLinkActive = (href: string) => pathname === href;

  const isItemActive = (item: NavItem) => {
    if (item.link === "/") return pathname === "/";
    // A section is also current on any of its own pages — "Training and
    // Courses" links to /skill-development but its pages live elsewhere.
    const paths = [
      ...(item.link === "#" ? [] : [item.link]),
      ...(item.activeMatches ?? []),
      ...flatLinks(item.subLinks).map((link) => link.link),
    ];
    return paths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );
  };

  const isEntryActive = (entry: NavEntry) =>
    entry.isMore ? moreItems.some(isItemActive) : isItemActive(entry.item);

  /** The current page's section — the real one, even while it's folded into
   *  "More". Comes from the URL alone, so the server renders it too. */
  const activeSection =
    NavigationItems.find((item) => isItemActive(item))?.label ?? null;

  return {
    openMenu,
    closeMenus,
    scheduleClose,
    openMenuNow,
    toggleMenu,
    bindRoot,
    /** Spread on a hover-opened panel so moving onto it keeps it open. */
    hoverPanel: { onMouseEnter: cancelClose, onMouseLeave: scheduleClose },
    isLinkActive,
    isEntryActive,
    activeSection,
  };
}

export type DesktopNavState = ReturnType<typeof useDesktopNav>;
