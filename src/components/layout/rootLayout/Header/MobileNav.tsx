"use client";

import { ChevronDown, FileText, LogIn, LogOut, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { NavItem, NavigationItems, SubLink } from "@/src/data/navigationItems";
import { toSearchTerms } from "@/src/components/products/productSearch";
import { openLoginModal } from "@/src/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { Avatar, useAccountMenu } from "./ProfileDropdown";
import { findPages } from "./searchPages";
import { useAccountStatus } from "./useAccountStatus";

interface MobileNavProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

/** Always mounted; slides open and back shut by animating a grid row between
 *  0fr and 1fr, i.e. from 0 to the list's exact height. Unlike a max-height
 *  ceiling there's no dead time on close and no cap to outgrow, and a nested
 *  group opening inside just grows its parent. `inert` keeps a closed panel's
 *  links out of the tab order and away from screen readers.
 *
 *  Deliberately no `motion-reduce:` guard: with the OS "Animation effects"
 *  setting off (as on the dev machine), it made every open/close instant. */
const Collapse = ({
  open,
  className,
  children,
}: {
  open: boolean;
  className?: string;
  children: ReactNode;
}) => (
  <div
    inert={!open}
    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
    }`}
  >
    {/* min-h-0 lets the row shrink to 0; spacing goes on the innermost box
        so the closed panel is truly 0px tall. */}
    <div className="min-h-0 overflow-hidden">
      <div className={className}>{children}</div>
    </div>
  </div>
);

const chevronClass = (isExpanded: boolean) =>
  `shrink-0 transition-transform duration-300 ${
    isExpanded ? "rotate-180" : "rotate-0"
  }`;

/** The dropdown (and nested group) holding the current page, opened by default. */
const getActiveLabels = (path: string) => {
  for (const item of NavigationItems) {
    for (const sub of item.subLinks ?? []) {
      if (sub.link === path) return { item: item.label, sub: null };
      if (sub.subLinks?.some((nested) => nested.link === path)) {
        return { item: item.label, sub: sub.label };
      }
    }
  }
  return { item: null, sub: null };
};

const MobileNav = ({ open, setOpen }: MobileNavProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accountStatus = useAccountStatus();
  const { userInformation, fullName, menuItems, logout } = useAccountMenu();
  const [accountOpen, setAccountOpen] = useState(false);

  // One dropdown open at a time (and one nested group inside it). The one
  // holding the current page starts open but can still be closed.
  const [openDropdown, setOpenDropdown] = useState<string | null>(
    () => getActiveLabels(pathname).item
  );
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(
    () => getActiveLabels(pathname).sub
  );
  const [prevPathname, setPrevPathname] = useState(pathname);
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

  // The drawer is `lg:hidden`, but CSS alone leaves it "open" when the
  // viewport widens: the body stays scroll-locked and the drawer pops back on
  // narrowing again. Close it once we cross Tailwind's `lg` (64rem).
  useEffect(() => {
    if (!open) return;
    const lgQuery = window.matchMedia("(min-width: 64rem)");
    const closeOnLg = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    lgQuery.addEventListener("change", closeOnLg);
    return () => lgQuery.removeEventListener("change", closeOnLg);
  }, [open, setOpen]);

  // Re-open the current page's dropdown after navigation — adjusted during
  // render rather than in an effect, so there's no frame with the old one.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    const active = getActiveLabels(pathname);
    setOpenDropdown(active.item);
    setOpenSubDropdown(active.sub);
  }

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

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const toggleSubDropdown = (label: string) => {
    setOpenSubDropdown((prev) => (prev === label ? null : label));
  };

  const query = searchQuery.trim();
  // Same pages and matching as the desktop header search.
  const pageResults =
    query.length >= 2 ? findPages(toSearchTerms(query), 5) : [];

  const clearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleNavClick = (href: string) => {
    clearSearch();
    setOpen(false);
    router.push(href);
  };

  const submitSearch = () => {
    if (!query) return;
    clearSearch();
    setOpen(false);
    router.push(`/product-service?search=${encodeURIComponent(query)}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSearch();
  };

  const handleLogin = () => {
    // Close first so the login modal isn't stacked under the drawer overlay.
    setOpen(false);
    dispatch(openLoginModal());
  };

  const handleLogout = () => {
    setAccountOpen(false);
    setOpen(false);
    logout();
  };

  function renderSubItem(sub: SubLink) {
    if (sub.subLinks) {
      const isExpanded = openSubDropdown === sub.label;
      return (
        <div key={sub.label}>
          <button
            type="button"
            aria-expanded={isExpanded}
            onClick={() => toggleSubDropdown(sub.label)}
            className="flex items-center justify-between w-full py-2 px-3 text-sm font-medium text-foreground hover:bg-light rounded-md"
          >
            {sub.label}
            <ChevronDown size={14} className={chevronClass(isExpanded)} />
          </button>
          <Collapse
            open={isExpanded}
            className="ml-3 pl-3 border-l border-[#ffb900] flex flex-col gap-0.5"
          >
            {sub.subLinks.map((nested) => (
              <Link
                key={nested.label}
                href={nested.link}
                onClick={() => setOpen(false)}
                className={`py-2 px-3 text-sm rounded-md block ${
                  pathname === nested.link
                    ? "text-liteBlue bg-liteBlue/5 font-medium"
                    : "text-secondary-foreground hover:text-liteBlue hover:bg-light"
                }`}
              >
                {nested.label}
              </Link>
            ))}
          </Collapse>
        </div>
      );
    }
    return (
      <Link
        key={sub.label}
        href={sub.link}
        onClick={() => setOpen(false)}
        className={`py-2 px-3 text-sm rounded-md block ${
          pathname === sub.link
            ? "text-liteBlue bg-liteBlue/5 font-medium"
            : "text-secondary-foreground hover:text-liteBlue hover:bg-light"
        }`}
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
    const isExpanded = openDropdown === item.label;

    if (!item.subLinks) {
      return (
        <Link
          key={item.label}
          href={item.link}
          onClick={() => setOpen(false)}
          className={`py-2.5 px-3 rounded-md text-sm font-medium block ${
            isActive
              ? "text-liteBlue bg-liteBlue/5"
              : "text-foreground hover:bg-light"
          }`}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <div key={item.label}>
        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={() => toggleDropdown(item.label)}
          className={`flex items-center justify-between w-full py-2.5 px-3 rounded-md text-sm font-medium ${
            isActive
              ? "text-liteBlue hover:bg-light"
              : "text-foreground hover:bg-light"
          }`}
        >
          {item.label}
          <ChevronDown size={16} className={chevronClass(isExpanded)} />
        </button>
        <Collapse
          open={isExpanded}
          className="ml-3 pl-3 border-l border-[#ffb900] flex flex-col gap-0.5 mt-0.5"
        >
          {item.subLinks.map((sub) => renderSubItem(sub))}
        </Collapse>
      </div>
    );
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Close Button */}
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden fixed z-80 top-3 bg-card/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-border"
          style={{ right: "calc(min(320px, 85vw) + 8px)" }}
          aria-label="Close menu"
        >
          <X size={18} className="text-secondary-foreground" />
        </button>
      )}

      {/* Drawer */}
      <div
        // h-dvh, not h-screen: 100vh runs under mobile browser toolbars and
        // would hide the account footer at the bottom.
        className={`lg:hidden fixed top-0 right-0 z-70 h-dvh w-80 max-w-[85vw] bg-card transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Search — top */}
        <div
          ref={searchRef}
          className="shrink-0 px-4 pt-4 pb-3 border-b border-border"
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
                onKeyDown={(e) => {
                  if (e.key === "Escape") setShowSuggestions(false);
                }}
                placeholder="Search pages & products..."
                aria-label="Search pages and products"
                className="w-full h-10 pl-4 pr-20 rounded-full border border-border bg-light text-sm focus:border-liteBlue focus:bg-card focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground p-1"
                >
                  <X size={14} />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-brand-blue text-white hover:bg-brand-blue/90 transition-colors"
                aria-label="Search"
              >
                <Search size={14} />
              </button>
            </div>
          </form>

          {/* Suggestions — in the flow, straight under the field, so the menu
              below moves down instead of being covered by a floating box. */}
          {showSuggestions && query && (
            <div className="mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-sm animate-in fade-in-0 slide-in-from-top-1 duration-150">
              {pageResults.length > 0 && (
                <ul className="max-h-[45vh] overflow-y-auto py-1">
                  {pageResults.map((page) => (
                    <li key={page.href}>
                      <button
                        type="button"
                        onClick={() => handleNavClick(page.href)}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-light active:bg-light"
                      >
                        <FileText
                          size={14}
                          className="shrink-0 text-muted-foreground"
                        />
                        <span className="min-w-0 flex-1 truncate">
                          {page.label}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {page.section}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={submitSearch}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-pBlue transition-colors hover:bg-light active:bg-light ${
                  pageResults.length > 0 ? "border-t border-border" : ""
                }`}
              >
                <Search size={14} className="shrink-0" />
                <span className="truncate">
                  Search products for &ldquo;{query}&rdquo;
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Navigation items — middle, scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-0.5">
          {NavigationItems.map((item) => renderNavItem(item))}
        </nav>

        {/* Account — bottom: Log in for visitors, the profile once signed in */}
        <div className="shrink-0 border-t border-border px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {accountStatus === "visitor" && (
            // Sign-up lives inside the login modal, one tap past this button.
            <button
              type="button"
              onClick={handleLogin}
              className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <LogIn size={16} />
              Log in
            </button>
          )}

          {accountStatus === "loading" && (
            <div
              aria-hidden
              className="flex h-14 items-center gap-3 rounded-lg border border-border px-2"
            >
              <div className="size-9 animate-pulse rounded-full bg-light-silver" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-28 animate-pulse rounded bg-light-silver" />
                <div className="h-2.5 w-40 animate-pulse rounded bg-light-dark" />
              </div>
            </div>
          )}

          {accountStatus === "signed-in" && (
            <>
              {/* The account pages slide open above the card, like a
                  drop-up — the card stays put at the foot of the drawer */}
              <Collapse open={accountOpen} className="pb-2">
                <ul className="flex flex-col gap-0.5">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm ${
                          pathname === item.href
                            ? "text-liteBlue bg-liteBlue/5 font-medium"
                            : "text-secondary-foreground hover:text-liteBlue hover:bg-light"
                        }`}
                      >
                        <item.icon size={16} className="shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <LogOut size={16} className="shrink-0" />
                      Log out
                    </button>
                  </li>
                </ul>
              </Collapse>

              <button
                type="button"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((value) => !value)}
                className="flex h-14 w-full cursor-pointer items-center gap-3 rounded-lg border border-border px-2 text-left transition-colors hover:bg-light"
              >
                <Avatar
                  src={userInformation.profilePicture}
                  name={userInformation.firstName}
                  size={36}
                  className="ring-border bg-primary/10 text-primary"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {fullName || "My account"}
                  </span>
                  <span className="block truncate text-xs text-secondary-foreground">
                    {userInformation.email}
                  </span>
                </span>
                {/* Points up while closed: the menu opens upwards */}
                <ChevronDown
                  size={16}
                  className={`text-muted-foreground ${chevronClass(!accountOpen)}`}
                />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
