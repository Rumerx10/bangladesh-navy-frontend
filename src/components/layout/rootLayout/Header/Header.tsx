"use client";

import MarqueeNotice from "@/src/components/home/MarqueeNotice";
import { useEffect, useState } from "react";
import HeaderTopBar from "./HeaderTopBar";
import MobileNav from "./MobileNav";
import TopInfoBar from "./TopInfoBar";

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
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <TopInfoBar />
        <HeaderTopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MarqueeNotice />
      </div>

      {/* Mobile Navigation Drawer + Bottom Nav */}
      <MobileNav open={menuOpen} setOpen={setMenuOpen} />
    </header>
  );
};

export default Header;
