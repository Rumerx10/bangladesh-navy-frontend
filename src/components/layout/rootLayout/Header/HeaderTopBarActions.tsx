"use client";

import { openLoginModal } from "@/src/lib/redux/features/auth/authSlice";
import { IUserInformation } from "@/src/lib/redux/features/auth/authTypes";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { useDebounce } from "@/src/hooks/useDebounce";
import { ArrowRight, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProfileDropdown } from "./ProfileDropdown";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderTopBarActionsProps {
  cartCount: number;
  userInformation: IUserInformation;
  authLoading: boolean;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "History", href: "/about/history" },
  { label: "Vision & Mission", href: "/about/vision-mission" },
  { label: "Organogram", href: "/about/organogram" },
  { label: "Survey Ships", href: "/about/survey-ships" },
  { label: "Gallery", href: "/about/gallery" },
  { label: "Products & Services", href: "/product-service" },
  { label: "How to Pay", href: "/how-to-pay" },
  { label: "BN Hydrographic Institute", href: "/skill-development" },
  { label: "Courses", href: "/skill-development/courses" },
  { label: "Contact Information", href: "/contact-us/information" },
  { label: "Query & Suggestion", href: "/contact-us/query-suggestion" },
  { label: "Hydrographic Note", href: "/contact-us/hydrographic-note" },
  { label: "Publications", href: "/product-service?category=publications" },
  {
    label: "Notices to Mariners",
    href: "/product-service?category=notices-to-mariners",
  },
  { label: "Paper Charts", href: "/product-service?category=paper-charts" },
  {
    label: "Electronic Charts",
    href: "/product-service?category=electronic-charts",
  },
  { label: "Tide Tables", href: "/product-service?category=tide-tables" },
  { label: "Marine Weather", href: "/product-service?category=marine-weather" },
];

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
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const searchAreaRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(searchQuery, 250);

  const isProductPage =
    pathname === "/product-service" || pathname.startsWith("/products");

  const navSuggestions = useMemo(() => {
    if (debouncedQuery.length < 2) return [];
    const q = debouncedQuery.toLowerCase();
    return NAV_LINKS.filter((link) =>
      link.label.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [debouncedQuery]);

  // Sync search query to URL on product pages
  useEffect(() => {
    if (!isProductPage) return;

    const currentSearch = searchParams.get("search") || "";
    if (searchQuery === currentSearch) return;

    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchQuery, isProductPage, pathname, router, searchParams]);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchAreaRef.current &&
        !searchAreaRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      if (isProductPage) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", searchQuery);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      } else {
        router.push(
          `/product-service?search=${encodeURIComponent(searchQuery.trim())}`
        );
      }
      setSearchQuery("");
    }
  };

  const handleNavSuggestionClick = (href: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(href);
  };

  return (
    <div className="flex items-center gap-1 shrink-0">
      {/* Search with nav suggestions */}
      <div ref={searchAreaRef}>
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearchSubmit();
                    if (e.key === "Escape") {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }
                  }}
                  placeholder="Search products..."
                  className="w-full h-full pl-4 pr-10 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-liteBlue focus:bg-white transition-all shadow-inner"
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

                {/* Nav suggestions dropdown */}
                {navSuggestions.length > 0 && (
                  <div className="absolute top-full right-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-100 overflow-hidden">
                    <p className="px-3 pt-2.5 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                      Quick Navigation
                    </p>
                    {navSuggestions.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => handleNavSuggestionClick(link.href)}
                        className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-liteBlue text-left transition-colors"
                      >
                        <ArrowRight
                          size={13}
                          className="text-gray-400 shrink-0"
                        />
                        {link.label}
                      </button>
                    ))}
                    {searchQuery.trim() && (
                      <button
                        onClick={handleSearchSubmit}
                        className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-medium text-liteBlue hover:bg-liteBlue/5 border-t border-gray-100 transition-colors"
                      >
                        <Search size={13} className="shrink-0" />
                        Search &ldquo;{searchQuery}&rdquo;
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-liteBlue hover:bg-gray-50 rounded-full transition-colors"
                aria-label="Open search"
              >
                <Search size={20} />
              </motion.button>
            )}
          </div>
        </AnimatePresence>
      </div>

      {/* Cart */}
      {!isSearchOpen && (
        <Link
          href="/cart"
          className="relative flex items-center justify-center w-10 h-10 text-gray-600 hover:text-liteBlue hover:bg-gray-50 rounded-full transition-colors"
          aria-label="Shopping Cart"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0.5 right-0.5 min-w-4.5 h-4.5 flex items-center justify-center rounded-full bg-liteBlue text-white text-[10px] font-bold px-1"
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
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-liteBlue text-white text-sm font-medium hover:bg-liteBlue/90 transition-colors cursor-pointer"
        >
          <User size={16} />
          <span className="whitespace-nowrap">Sign In</span>
        </button>
      )}
    </div>
  );
}
