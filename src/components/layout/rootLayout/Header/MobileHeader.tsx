"use client";

import logo from "@/public/logo.png";
import { siteConfig } from "@/src/config/siteConfig";
import Image from "next/image";
import Link from "next/link";

interface MobileHeaderProps {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

export default function MobileHeader({
  menuOpen,
  setMenuOpen,
}: MobileHeaderProps) {

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center w-9 h-9 text-gray-700 hover:text-liteBlue transition-colors -ml-1"
            aria-label="Open menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
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
        </div>
      </div>
    </div>
  );
}
