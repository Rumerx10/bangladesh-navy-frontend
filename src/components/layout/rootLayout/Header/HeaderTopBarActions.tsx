"use client";
import ThemeToggle from "@/src/components/theme/ThemeToggle";
import HeaderAccount from "./HeaderAccount";
import HeaderCartButton from "./HeaderCartButton";
import SiteSearch from "./SiteSearch";

const HeaderTopBarActions = () => {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <SiteSearch />
      <ThemeToggle className="text-nav-ink" />
      <HeaderCartButton />
      <HeaderAccount />
    </div>
  );
};

export default HeaderTopBarActions;
