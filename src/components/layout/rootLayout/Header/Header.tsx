"use client";

import { useEffect, useState } from "react";
import HeaderTopBar from "./HeaderTopBar";

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
    <header className="relative">
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <HeaderTopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>

      <div className="h-25 lg:h-28" />
    </header>
  );
};

export default Header;
