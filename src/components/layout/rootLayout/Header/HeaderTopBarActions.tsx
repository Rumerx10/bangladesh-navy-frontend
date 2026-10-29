"use client";
import ThemeToggle from "@/src/components/theme/ThemeToggle";
import SiteSearch from "./SiteSearch";

const HeaderTopBarActions = () => {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <SiteSearch />
      <ThemeToggle className="text-nav-ink" />
    </div>
  );
};

export default HeaderTopBarActions;
