"use client";

import { X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import SidebarLogo from "./SidebarLogo";
import SidebarLogout from "./SidebarLogout";
import SidebarMenu from "./SidebarMenu";

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Sidebar = ({ className, isOpen, setIsOpen }: SidebarProps) => {
  const handleNavigate = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Phone drawer: the same overlay and close button as the site's own
          mobile menu, so both panels close the same way */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        // 8px past the drawer's right edge: it is w-70 (17.5rem) + 0.5rem
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed z-60 top-3 left-72 bg-card/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-border cursor-pointer"
          aria-label="Close menu"
        >
          <X size={18} className="text-secondary-foreground" />
        </button>
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-dvh w-70 bg-card border-r border-border flex flex-col px-4 sm:px-5 transition-transform duration-300 ease-in-out z-50",
          // Docked on large screens it is frosted glass over the coastal
          // chart (AdminLayoutClient); as a phone drawer it opens solid over
          // the page behind an overlay, where glass would only read grey.
          "lg:border-white/70 lg:bg-card/70 lg:backdrop-blur-lg lg:backdrop-saturate-150 dark:lg:border-white/10",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
            "lg:translate-x-0 lg:static": true,
          },
          className
        )}
      >
        <SidebarLogo />
        <SidebarMenu onNavigate={handleNavigate} />
        <SidebarLogout onLogout={handleLogout} />
      </aside>
    </>
  );
};

export default Sidebar;
