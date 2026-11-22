"use client";

import { ChevronDown, ChevronRight, FileText, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { NavItem, NavigationItems, SubLink } from "@/src/data/navigationItems";
import { toSearchTerms } from "@/src/components/products/productSearch";
import { findPages } from "./searchPages";

interface MobileNavProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const MobileNav = ({ open, setOpen }: MobileNavProps) => {
  const pathname = usePathname();
  const router = useRouter();

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

  // Parent (and nested group) labels that contain the active link — always shown expanded
  const activeExpandedLabels = useMemo(() => {
    const labels = new Set<string>();
    for (const item of NavigationItems) {
      if (!item.subLinks) continue;
      for (const sub of item.subLinks) {
        if (sub.link === pathname) {
          labels.add(item.label);
        }
        if (sub.subLinks?.some((nested) => nested.link === pathname)) {
          labels.add(item.label);
          labels.add(sub.label);
        }
      }
    }
    return labels;
  }, [pathname]);

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

  function renderSubItem(sub: SubLink) {
    if (sub.subLinks) {
      const isExpanded =
        expandedItems.has(sub.label) || activeExpandedLabels.has(sub.label);
      return (
        <div key={sub.label}>
          <button
            onClick={() => toggleItem(sub.label)}
            className="flex items-center justify-between w-full py-2 px-3 text-sm font-medium text-foreground hover:bg-light rounded-md"
          >
            {sub.label}
            {isExpanded ? (
              <ChevronDown size={14} className="shrink-0" />
            ) : (
              <ChevronRight size={14} className="shrink-0" />
            )}
          </button>
          {isExpanded && (
            <div className="ml-3 pl-3 border-l border-[#ffb900] flex flex-col gap-0.5">
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
    const isExpanded =
      expandedItems.has(item.label) || activeExpandedLabels.has(item.label);

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
          onClick={() => toggleItem(item.label)}
          className={`flex items-center justify-between w-full py-2.5 px-3 rounded-md text-sm font-medium ${
            isActive
              ? "text-liteBlue hover:bg-light"
              : "text-foreground hover:bg-light"
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
          <div className="ml-3 pl-3 border-l border-[#ffb900] flex flex-col gap-0.5 mt-0.5">
            {item.subLinks.map((sub) => renderSubItem(sub))}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Close Button */}
      {open && (
        <button
          onClick={() => setOpen(false)}
          className="fixed z-80 top-3 bg-card/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-border"
          style={{ right: "calc(min(320px, 85vw) + 8px)" }}
          aria-label="Close menu"
        >
          <X size={18} className="text-secondary-foreground" />
        </button>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-70 h-screen w-80 max-w-[85vw] bg-card transform transition-transform duration-300 flex flex-col ${
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
      </div>
    </>
  );
};

export default MobileNav;
