"use client";

import { openLoginModal } from "@/src/lib/redux/features/auth/authSlice";
import { IUserInformation } from "@/src/lib/redux/features/auth/authTypes";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProfileDropdown } from "./ProfileDropdown";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const isProductPage =
    pathname === "/product-service" || pathname.startsWith("/products");

  // Handle search logic - Prevent infinite loop by checking if params actually changed
  useEffect(() => {
    if (!isProductPage) {
      if (isSearchOpen) setIsSearchOpen(false);
      return;
    }

    const currentSearch = searchParams.get("search") || "";
    if (searchQuery === currentSearch) return;

    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    // Replace the URL with the new search param without full reload
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, isProductPage, pathname, router, searchParams]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      if (isProductPage) {
        // Stay on product page and use URL params
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", searchQuery);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      } else {
        // Navigate to product-service page with search query
        router.push(`/product-service?search=${encodeURIComponent(searchQuery.trim())}`);
      }
      setSearchQuery("");
    }
  };

  return (
    <div className="flex items-center gap-1 shrink-0">
      {/* Search Interaction — visible globally */}
      <AnimatePresence mode="wait">
        <div className="flex items-center">
          {isSearchOpen ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "240px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="relative flex items-center h-10 ml-2"
            >
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearchSubmit(); }}
                placeholder="Search products..."
                className="w-full h-full pl-4 pr-10 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#003f71] focus:bg-white transition-all shadow-inner"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="absolute right-3 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          ) : (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-[#003f71] hover:bg-gray-50 rounded-full transition-colors"
              aria-label="Open search"
            >
              <Search size={20} />
            </motion.button>
          )}
        </div>
      </AnimatePresence>

      {/* Standard Actions */}
      {!isSearchOpen && (
        <Link
          href="/cart"
          className="relative flex items-center justify-center w-10 h-10 text-gray-600 hover:text-[#003f71] hover:bg-gray-50 rounded-full transition-colors"
          aria-label="Shopping Cart"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#003f71] text-white text-[10px] font-bold px-1"
            >
              {cartCount > 99 ? "99+" : cartCount}
            </motion.span>
          )}
        </Link>
      )}

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
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#003f71] text-white text-base  font-medium hover:bg-[#003f71]/90 transition-colors cursor-pointer"
        >
          <User size={16} />
          <span className="whitespace-nowrap">Sign In</span>
        </button>
      )}
    </div>
  );
}
