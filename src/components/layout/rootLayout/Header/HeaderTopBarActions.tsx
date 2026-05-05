"use client";

import { openLoginModal } from "@/src/lib/redux/features/auth/authSlice";
import { IUserInformation } from "@/src/lib/redux/features/auth/authTypes";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { ProfileDropdown } from "./ProfileDropdown";

interface HeaderTopBarActionsProps {
  cartCount: number;
  userInformation: IUserInformation;
  authLoading: boolean;
}

export default function HeaderTopBarActions({
  cartCount,
  userInformation,
  authLoading,
}: HeaderTopBarActionsProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-1 shrink-0">
      {/* Search Icon */}
      <Link
        href="/search"
        className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-[#003f71] hover:bg-gray-50 rounded-full transition-colors"
        aria-label="Search"
      >
        <Search size={20} />
      </Link>

      {/* Cart Icon */}
      <Link
        href="/cart"
        className="relative flex items-center justify-center w-10 h-10 text-gray-600 hover:text-[#003f71] hover:bg-gray-50 rounded-full transition-colors"
        aria-label="Shopping Cart"
      >
        <ShoppingCart size={20} />
        {cartCount > 0 && (
          <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#003f71] text-white text-[10px] font-bold px-1">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>

      <div className="hidden lg:block w-px h-7 bg-gray-200 mx-1" />

      {/* Auth */}
      {authLoading ? (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200">
          <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse" />
          <div className="w-14 h-2.5 bg-gray-200 rounded animate-pulse" />
        </div>
      ) : userInformation?.firstName ? (
        <ProfileDropdown />
      ) : (
        <button
          onClick={() => dispatch(openLoginModal())}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#003f71] text-white text-sm font-medium hover:bg-[#003f71]/90 transition-colors cursor-pointer"
        >
          <User size={16} />
          <span className="whitespace-nowrap">Sign In</span>
        </button>
      )}
    </div>
  );
}
