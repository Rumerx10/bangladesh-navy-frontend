"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";
import { DesktopNavState } from "./useDesktopNav";

const ALIGN = {
  center: "left-1/2 -translate-x-1/2",
  start: "left-0",
  end: "right-0",
} as const;

interface MenuPanelProps {
  open: boolean;
  nav: DesktopNavState;
  align?: keyof typeof ALIGN;
  /** Space between trigger and panel. Padding, not margin, so the pointer
   *  never leaves the menu while crossing it. */
  gapClassName?: string;
  /** The panel surface. */
  className?: string;
  children: ReactNode;
}

/**
 * A dropdown under its trigger that fades and drops in. The surface classes
 * go on the animated element itself: a `backdrop-filter` inside a fading
 * ancestor can't see the page behind it, so frosted panels would lose their
 * blur.
 */
const MenuPanel = ({
  open,
  nav,
  align = "center",
  gapClassName = "pt-3",
  className,
  children,
}: MenuPanelProps) => (
  <AnimatePresence>
    {open && (
      <div
        key="panel"
        className={cn("absolute top-full z-50", ALIGN[align], gapClassName)}
        {...nav.hoverPanel}
      >
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={cn("w-max origin-top", className)}
        >
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default MenuPanel;
