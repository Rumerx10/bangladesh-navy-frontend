"use client";

import { siteConfig } from "@/src/config/siteConfig";
import { dummyProducts } from "@/src/data/dummyProducts";
import { useDebounce } from "@/src/hooks/useDebounce";
import { Camera, Loader2, Search, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

const HeaderTopBarSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 400);
  // One ref per bar. Both bars are always mounted — they are shown and hidden
  // with `hidden lg:block` / `lg:hidden`, not conditionally rendered — so a
  // single shared ref object ended up holding whichever element React attached
  // last (the mobile one). That left the desktop dropdown permanently "outside"
  // its own container: mousedown closed it before the click could land, and
  // picking a product did nothing.
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const isSearching = searchQuery.length >= 2 && searchQuery !== debouncedQuery;

  const searchResults = useMemo(() => {
    if (debouncedQuery.length < 2) return [];
    const q = debouncedQuery.toLowerCase();
    return dummyProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q) ||
          p.brand?.name.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [debouncedQuery]);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      const inside =
        desktopRef.current?.contains(target) ||
        mobileRef.current?.contains(target);
      if (!inside) setShowResults(false);
    };
    // `pointerdown` rather than `mousedown`: on touch, the compatibility mouse
    // events arrive late and after the keyboard has already dismissed, which
    // made the close fire at an unpredictable point relative to the tap.
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleProductClick = (slug: string) => {
    setShowResults(false);
    setSearchQuery("");
    router.push(`/products/${slug}`);
  };

  /** Takes the bar's own input ref so focus returns to the visible bar. */
  const clearSearch = (ref: React.RefObject<HTMLInputElement | null>) => {
    setSearchQuery("");
    setShowResults(false);
    ref.current?.focus();
  };

  const onViewAllResults = () => {
    setShowResults(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <>
      {/* Desktop Search Bar */}
      <div
        ref={desktopRef}
        className="hidden lg:block flex-1 max-w-2xl relative"
      >
        <form onSubmit={handleSearch} className="flex w-full">
          <div className="relative flex w-full">
            <input
              ref={desktopInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => {
                if (searchQuery.length >= 2) setShowResults(true);
              }}
              placeholder="Search for products, brands, and more..."
              className="w-full h-11 pl-4 pr-20 rounded-l-full border-2 border-r-0 border-border bg-light text-sm focus:border-primary focus:bg-card focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => clearSearch(desktopInputRef)}
                className="absolute right-22 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary-foreground p-1"
              >
                <X size={16} />
              </button>
            )}
            <button
              type="button"
              className="flex items-center justify-center w-11 h-11 border-2 border-l-0 border-r-0 border-border bg-light text-muted-foreground hover:text-secondary-foreground transition-colors"
              aria-label={isSearching ? "Searching" : "Search by image"}
            >
              {isSearching ? (
                <Loader2 size={18} className="animate-spin text-primary" />
              ) : (
                <Camera size={18} />
              )}
            </button>
            <button
              type="submit"
              className="flex items-center justify-center w-12 h-11 rounded-r-full bg-primary text-white hover:bg-primary/90 transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {showResults && searchQuery.length >= 2 && (
          <div
            onMouseDown={(e) => e.preventDefault()}
            className="scrollbar-modern absolute top-full left-0 right-0 mt-1 bg-card rounded-xl shadow-2xl border border-border z-100 max-h-120 overflow-y-auto"
          >
            {isSearching ? (
              <div className="flex items-center justify-center py-8 gap-2 text-sm text-secondary-foreground">
                <Loader2 size={18} className="animate-spin" />
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              <div>
                <div className="px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border">
                  Products ({searchResults.length})
                </div>
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.slug)}
                    className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-light transition-colors text-left group"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-light-dark shrink-0 border border-border">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ShoppingCart size={18} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-semibold text-primary">
                          {siteConfig.currencySymbol}
                          {product.price.toLocaleString()}
                        </span>
                        {product.compareAtPrice &&
                          product.compareAtPrice > product.price && (
                            <span className="text-xs text-muted-foreground line-through">
                              {siteConfig.currencySymbol}
                              {product.compareAtPrice.toLocaleString()}
                            </span>
                          )}
                      </div>
                    </div>
                  </button>
                ))}
                <button
                  onClick={onViewAllResults}
                  className="w-full px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5 border-t border-border transition-colors"
                >
                  View all results for &quot;{searchQuery}&quot; →
                </button>
              </div>
            ) : (
              <div className="py-8 text-center text-sm text-secondary-foreground">
                <p>No products found for &quot;{searchQuery}&quot;</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try a different keyword
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden w-full">
        <div className="px-4 pb-3 relative" ref={mobileRef}>
          <form onSubmit={handleSearch}>
            <div className="relative flex w-full">
              <input
                ref={mobileInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => {
                  if (searchQuery.length >= 2) setShowResults(true);
                }}
                placeholder="Search products..."
                className="w-full h-10 pl-4 pr-12 rounded-full border-2 border-foreground bg-card text-sm focus:border-primary focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => clearSearch(mobileInputRef)}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-muted-foreground p-1"
                >
                  <X size={14} />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </div>
          </form>

          {showResults && searchQuery.length >= 2 && (
            <div
              onMouseDown={(e) => e.preventDefault()}
              className="scrollbar-modern absolute left-4 right-4 top-full mt-1 bg-card rounded-xl shadow-2xl border border-border z-100 max-h-[60vh] overflow-y-auto"
            >
              {isSearching ? (
                <div className="flex items-center justify-center py-6 gap-2 text-sm text-secondary-foreground">
                  <Loader2 size={16} className="animate-spin" />
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.slug)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-light transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-light-dark shrink-0">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0].url}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <ShoppingCart size={14} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">
                          {product.name}
                        </p>
                        <span className="text-xs font-semibold text-primary">
                          {siteConfig.currencySymbol}
                          {product.price.toLocaleString()}
                        </span>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={onViewAllResults}
                    className="w-full px-3 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 border-t border-border"
                  >
                    View all results →
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center text-sm text-secondary-foreground">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderTopBarSearch;
