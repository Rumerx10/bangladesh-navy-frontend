"use client";

import MarqueeNotice from "@/src/components/home/MarqueeNotice";
import { useEffect, useState } from "react";
import HeaderTopBar from "./HeaderTopBar";
import MobileNav from "./MobileNav";
// import TopInfoBar from "./TopInfoBar";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative lg:pb-10">
      {/* left-0 + right-0 rather than w-full, with `right-scroll-bar-position`:
          while a dialog locks page scroll the scrollbar disappears, and this
          class (from the dialog's scroll lock) keeps the bar's right edge
          where the scrollbar was — a w-full bar would jump sideways instead. */}
      <div
        className={`right-scroll-bar-position fixed top-0 right-0 left-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        {/* <TopInfoBar /> */}
        <HeaderTopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MarqueeNotice />
      </div>

      {/* Mobile Navigation Drawer + Bottom Nav */}
      <MobileNav open={menuOpen} setOpen={setMenuOpen} />
    </header>
  );
};

export default Header;
