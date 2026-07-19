"use client";

import { logoutUser } from "@/src/lib/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import {
  ChevronDown,
  ChevronRight,
  Home,
  LayoutGrid,
  LogOut,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NavItem, NavigationItems, SubLink } from "./HeaderTopBar";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "History", href: "/about/history" },
  { label: "Vision & Mission", href: "/about/vision-mission" },
  { label: "Organogram", href: "/about/organogram" },
  { label: "Survey Ships", href: "/about/survey-ships" },
  { label: "Gallery", href: "/about/gallery" },
  { label: "Products & Services", href: "/product-service" },
  { label: "New Chart", href: "/chart" },
  { label: "How to Collect", href: "/how-to-collect" },
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

interface MobileNavProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function MobileNav({ open, setOpen }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { userInformation } = useAppSelector((state) => state.auth);
  const isLoggedIn = !!userInformation?.firstName;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleItem = (label: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const navSuggestions =
    searchQuery.length >= 2
      ? NAV_LINKS.filter((link) =>
          link.label.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5)
      : [];

  const handleNavClick = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setOpen(false);
      router.push(
        `/product-service?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  function renderSubItem(sub: SubLink) {
    if (sub.subLinks) {
      const isExpanded = expandedItems.has(sub.label);
      return (
        <div key={sub.label}>
          <button
            onClick={() => toggleItem(sub.label)}
            className="flex items-center justify-between w-full py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
          >
            {sub.label}
            {isExpanded ? (
              <ChevronDown size={14} className="shrink-0" />
            ) : (
              <ChevronRight size={14} className="shrink-0" />
            )}
          </button>
          {isExpanded && (
            <div className="ml-3 pl-3 border-l border-gray-100 flex flex-col gap-0.5">
              {sub.subLinks.map((nested) => (
                <Link
                  key={nested.label}
                  href={nested.link}
                  onClick={() => setOpen(false)}
                  className="py-2 px-3 text-sm text-gray-600 hover:text-liteBlue rounded-md hover:bg-gray-50 block"
                >
                  {nested.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }
    return (
      <Link
        key={sub.label}
        href={sub.link}
        onClick={() => setOpen(false)}
        className="py-2 px-3 text-sm text-gray-600 hover:text-liteBlue rounded-md hover:bg-gray-50 block"
      >
        {sub.label}
      </Link>
    );
  }

  function renderNavItem(item: NavItem) {
    const isActive =
      item.link === "/"
        ? pathname === "/"
        : item.link !== "#" && pathname?.startsWith(item.link);
    const isExpanded = expandedItems.has(item.label);

    if (!item.subLinks) {
      return (
        <Link
          key={item.label}
          href={item.link}
          onClick={() => setOpen(false)}
          className={`py-2.5 px-3 rounded-md text-sm font-medium block ${
            isActive
              ? "text-liteBlue bg-liteBlue/5"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <div key={item.label}>
        <button
          onClick={() => toggleItem(item.label)}
          className={`flex items-center justify-between w-full py-2.5 px-3 rounded-md text-sm font-medium ${
            isActive
              ? "text-liteBlue bg-liteBlue/5"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {item.label}
          {isExpanded ? (
            <ChevronDown size={16} className="shrink-0" />
          ) : (
            <ChevronRight size={16} className="shrink-0" />
          )}
        </button>
        {isExpanded && (
          <div className="ml-3 pl-3 border-l border-gray-100 flex flex-col gap-0.5 mt-0.5">
            {item.subLinks.map((sub) => renderSubItem(sub))}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Bottom Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around h-14">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-0.5 min-w-15 py-1 ${
              pathname === "/" ? "text-liteBlue" : "text-gray-500"
            }`}
          >
            <Home size={22} strokeWidth={pathname === "/" ? 2.5 : 1.5} />
            <span className="text-[10px] font-medium">Home</span>
          </Link>

          <button
            onClick={() => setOpen(true)}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-15 py-1 ${
              open ? "text-liteBlue" : "text-gray-500"
            }`}
          >
            <LayoutGrid size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium">Menu</span>
          </button>

          <Link
            href="/cart"
            className={`relative flex flex-col items-center justify-center gap-0.5 min-w-15 py-1 ${
              pathname === "/cart" ? "text-liteBlue" : "text-gray-500"
            }`}
          >
            <ShoppingCart
              size={22}
              strokeWidth={pathname === "/cart" ? 2.5 : 1.5}
            />
            <span className="text-[10px] font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-2 min-w-4 h-4 flex items-center justify-center rounded-full bg-liteBlue text-white text-[9px] font-bold px-0.5">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/account"
            className={`flex flex-col items-center justify-center gap-0.5 min-w-15 py-1 ${
              pathname?.startsWith("/account")
                ? "text-liteBlue"
                : "text-gray-500"
            }`}
          >
            {isLoggedIn && userInformation.profilePicture ? (
              <Image
                src={userInformation.profilePicture}
                alt={userInformation.firstName}
                width={24}
                height={24}
                className={`w-6 h-6 rounded-full object-cover ${
                  pathname?.startsWith("/account")
                    ? "ring-2 ring-liteBlue"
                    : "ring-1 ring-gray-200"
                }`}
              />
            ) : (
              <User
                size={22}
                strokeWidth={pathname?.startsWith("/account") ? 2.5 : 1.5}
              />
            )}
            <span className="text-[10px] font-medium">
              {isLoggedIn ? userInformation.firstName : "Account"}
            </span>
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-60"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Close Button */}
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed z-80 top-3 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-gray-200"
          style={{ left: "calc(min(320px, 85vw) + 8px)" }}
          aria-label="Close menu"
        >
          <X size={18} className="text-gray-600" />
        </button>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-70 h-screen w-80 max-w-[85vw] bg-white transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Search — top */}
        <div
          ref={searchRef}
          className="shrink-0 px-4 pt-4 pb-3 border-b border-gray-100 relative"
        >
          <form onSubmit={handleSearchSubmit}>
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search pages & products..."
                className="w-full h-10 pl-4 pr-20 rounded-full border border-gray-200 bg-gray-50 text-sm focus:border-liteBlue focus:bg-white focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 p-1"
                >
                  <X size={14} />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-liteBlue text-white hover:bg-liteBlue/90 transition-colors"
                aria-label="Search"
              >
                <Search size={14} />
              </button>
            </div>
          </form>

          {/* Search suggestions */}
          {showSuggestions && navSuggestions.length > 0 && (
            <div className="absolute left-4 right-4 top-[calc(100%-4px)] bg-white rounded-b-xl shadow-lg border border-t-0 border-gray-100 z-10 overflow-hidden">
              {navSuggestions.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    setShowSuggestions(false);
                    handleNavClick(link.href);
                  }}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-liteBlue text-left transition-colors"
                >
                  <Search size={13} className="text-gray-400 shrink-0" />
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation items — middle, scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-0.5">
          {NavigationItems.map((item) => renderNavItem(item))}
        </nav>

        {/* Sign In / User — bottom */}
        <div className="shrink-0 p-4 border-t border-gray-100">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {userInformation.profilePicture ? (
                <Image
                  src={userInformation.profilePicture}
                  alt={userInformation.firstName}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-liteBlue/20"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-liteBlue/10 flex items-center justify-center">
                  <User size={16} className="text-liteBlue" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {userInformation.firstName} {userInformation.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {userInformation.email}
                </p>
              </div>
              <button
                onClick={() => {
                  dispatch(logoutUser());
                  setOpen(false);
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                router.push("/auth/login");
              }}
              className="w-full bg-liteBlue text-white text-center rounded-md py-2.5 font-medium text-sm hover:bg-liteBlue/90 transition-colors"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </>
  );
}
