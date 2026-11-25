"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { DesktopNavState, NavEntry, hasMenu } from "./useDesktopNav";

interface NavTriggerProps {
  entry: NavEntry;
  nav: DesktopNavState;
  /** Open on hover as well as on click. */
  hover?: boolean;
  className?: string;
  /** Extra hover hook, e.g. for a sliding highlight. */
  onPointerEnter?: () => void;
  children: ReactNode;
}

/**
 * One top-level nav item, with the behaviour every design shares. Styling is
 * the design's: it gets `data-active` when the item holds the current page,
 * and `aria-expanded` when its menu is open.
 */
const NavTrigger = ({
  entry,
  nav,
  hover = false,
  className,
  onPointerEnter,
  children,
}: NavTriggerProps) => {
  const { item } = entry;
  const withMenu = hasMenu(entry);
  const isOpen = nav.openMenu === item.label;
  const active = nav.isEntryActive(entry);

  const handleEnter = () => {
    onPointerEnter?.();
    if (!hover) return;
    // A plain link has no menu, so pointing at it lets an open one go
    if (withMenu) nav.openMenuNow(item.label);
    else nav.scheduleClose();
  };

  const shared = {
    className,
    "data-active": active || undefined,
    onMouseEnter: handleEnter,
    onMouseLeave: hover && withMenu ? nav.scheduleClose : undefined,
  };

  if (!withMenu) {
    return (
      <Link
        href={item.link}
        aria-current={active ? "page" : undefined}
        {...shared}
      >
        {children}
      </Link>
    );
  }

  if (item.asLink) {
    return (
      <Link
        href={item.link}
        aria-expanded={isOpen}
        {...shared}
        onClick={(event) => {
          // First tap reveals the menu instead of navigating away; once it
          // is open, the label links through.
          if (!isOpen) {
            event.preventDefault();
            nav.openMenuNow(item.label);
          } else {
            nav.closeMenus();
          }
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      {...shared}
      onClick={(event) => {
        // Hover has already opened it, so a mouse click shouldn't shut it
        // again. Keyboard presses (detail 0) still toggle.
        if (hover && isOpen && event.detail !== 0) return;
        nav.toggleMenu(item.label);
      }}
    >
      {children}
    </button>
  );
};

export default NavTrigger;
