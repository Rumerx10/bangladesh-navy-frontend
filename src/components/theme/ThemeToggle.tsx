"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useTheme } from "./ThemeProvider";

/** Which icon shows is decided by CSS, not by React state, and that is the
 *  whole trick: the `dark` class is on `<html>` before the first paint, so
 *  the correct icon is right on the very first frame. Driving it from
 *  `theme` instead would render the light icon on the server, hydrate, and
 *  only then swap — a visible blink on every page load for dark-mode users. */
const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();

  const label =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        // Inherits its colour from whatever it sits on — the navy public
        // header and the light admin bar both need this to disappear into
        // their surface rather than fight it.
        "inline-flex size-9 cursor-pointer items-center justify-center rounded-full",
        "text-current transition-colors duration-200",
        "hover:bg-current/10 focus-visible:ring-ring/60 focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
    >
      <Sun className="size-5 dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-5 dark:block" aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;
