import logo from "@/public/logo.png";
import { siteConfig } from "@/src/config/siteConfig";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeaderTopBarSearch from "./HeaderTopBarSearch";

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
      <div className="flex items-center justify-between px-4 h-12">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-primary transition-colors -ml-1"
            aria-label="Open menu"
          >
            <svg
              width="20"
              height="20"
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
          <Link href="/" className="flex items-center gap-1.5">
            <Image
              src={logo}
              alt={siteConfig.name}
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              {siteConfig.name}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin size={14} className="text-gray-400" />
          <span>
            Deliver to <strong className="text-gray-700">Bangladesh</strong>
          </span>
        </div>
      </div>

      <HeaderTopBarSearch />
    </div>
  );
}
