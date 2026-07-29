"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import logo from "@/public/logo.png";
import { siteConfig } from "@/src/config/siteConfig";

interface MobileHeaderProps {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

const MobileHeader = ({ menuOpen, setMenuOpen }: MobileHeaderProps) => {
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt={siteConfig.name}
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
            />
            <div>
              <span className="text-sm font-bold text-pBlue leading-tight block">
                {siteConfig.name}
              </span>
              <span className="text-[9px] text-gray-500 leading-tight block">
                {siteConfig.description}
              </span>
            </div>
          </Link>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center text-gray-700 hover:text-liteBlue transition-colors"
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
