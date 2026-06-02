"use client";

import { useAppSelector } from "@/src/lib/redux/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AboutUsDropdown from "./AboutUsDropdown";
import ContactDropdown from "./ContactDropdown";
import HeaderTopBarActions from "./HeaderTopBarActions";
import Logo from "./Logo";
import MobileHeader from "./MobileHeader";
import NoticesMarinersDropdown from "./NoticesMarinersDropdown";
import ProductServiceDropdown from "./ProductServiceDropdown";
import SkillDevDropdown from "./SkillDevDropdown";

interface HeaderTopBarProps {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

export default function HeaderTopBar({
  menuOpen,
  setMenuOpen,
}: HeaderTopBarProps) {
  const cartItems = useAppSelector((state) => state.cart.items);
  const { userInformation, loading: authLoading } = useAppSelector(
    (state) => state.auth
  );
  const pathname = usePathname();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white border-b border-gray-100">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex container items-center justify-between gap-8 h-18 px-4 sm:px-0">
        <Logo />

        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-1 xl:gap-2">
            <li>
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === "/"
                    ? "text-[#003f71] bg-[#003f71]/5"
                    : "text-gray-700 hover:text-[#003f71] hover:bg-gray-50"
                }`}
              >
                Home
              </Link>
            </li>
            <AboutUsDropdown />
            <ProductServiceDropdown />
            <SkillDevDropdown />
            <NoticesMarinersDropdown />
            <ContactDropdown />
          </ul>
        </nav>

        <HeaderTopBarActions
          cartCount={cartCount}
          userInformation={userInformation}
          authLoading={authLoading}
        />
      </div>

      {/* Mobile Header */}
      <MobileHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
}
