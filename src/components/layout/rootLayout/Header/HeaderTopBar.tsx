"use client";

import { useAppSelector } from "@/src/lib/redux/hooks";
import Link from "next/link";
import AboutUsDropdown from "./AboutUsDropdown";
import HeaderTopBarActions from "./HeaderTopBarActions";
import Logo from "./Logo";
import MobileHeader from "./MobileHeader";
import ProductServiceDropdown from "./ProductServiceDropdown";

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

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="hidden lg:flex container items-center justify-between gap-8 h-18">
        <Logo />

        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-6 xl:gap-8">
            <ProductServiceDropdown />
            <AboutUsDropdown />

            <li>
              <Link
                href="/#skill-development"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Skill Development
              </Link>
            </li>

            <li>
              <Link
                href="/#contact"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <HeaderTopBarActions
          cartCount={cartCount}
          userInformation={userInformation}
          authLoading={authLoading}
        />
      </div>

      <MobileHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
}
