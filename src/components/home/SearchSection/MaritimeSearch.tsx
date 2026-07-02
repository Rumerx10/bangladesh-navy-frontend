"use client";

import { searchTabs } from "@/src/data/homeData";
import {
  formatPrice,
  getDiscountedPrice,
  getProductSlug,
  navyProducts,
} from "@/src/data/navyProducts";
import NavyWatermark from "@/src/components/shared/NavyWatermark";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import SearchTabs from "./SearchTabs";
import SectionTitle from "../../SectionTitle";

export default function MaritimeSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return navyProducts
      .filter(
        (p) =>
          p.nameEn.toLowerCase().includes(q) ||
          p.nameBn.includes(q) ||
          p.descriptionEn?.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [query]);

  const showDropdown = isFocused && query.trim().length > 0;

  const handleSearch = () => {
    if (query.trim()) {
      router.push(
        `/product-service?search=${encodeURIComponent(query.trim())}`
      );
      setQuery("");
      setIsFocused(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative py-16 lg:py-25 bg-white overflow-hidden">
      {/* Watermark */}
      <div className="absolute -right-20 -top-10 text-pBlue">
        <NavyWatermark
          variant="compass"
          size={350}
          opacity={0.03}
          animate="rotate"
        />
      </div>
      <div className="absolute -left-16 -bottom-16 text-pBlue">
        <NavyWatermark
          variant="anchor"
          size={250}
          opacity={0.025}
          animate="drift"
        />
      </div>
      <div className="relative container px-4 sm:px-6 lg:px-8 text-center">
        <SectionTitle
          title="Find Maritime Resources"
          desc="Search our comprehensive database of charts, notices, and data"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchTabs
            tabs={searchTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </motion.div>

        <motion.div
          className="mt-5 max-w-2xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search charts, publications, notices..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 h-11 rounded-lg border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:border-liteBlue focus:ring-2 focus:ring-liteBlue/10 transition-all"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="inline-flex items-center justify-center gap-2 px-6 h-11 py-4 rounded-lg bg-liteBlue text-white font-medium text-base hover:bg-[#004d8a] transition-colors cursor-pointer"
            >
              <Search size={18} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>

          {/* Search dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden text-left">
              {results.length > 0 ? (
                <>
                  {results.map((product) => {
                    const slug = getProductSlug(product);
                    const discountedPrice = getDiscountedPrice(product);
                    return (
                      <Link
                        key={product.id}
                        href={`/products/${slug}`}
                        className="flex items-center gap-3.5 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                        onClick={() => {
                          setQuery("");
                          setIsFocused(false);
                        }}
                      >
                        {/* Thumbnail */}
                        <div className="w-12 h-12 rounded-lg bg-linear-to-br from-pBlue to-liteBlue flex items-center justify-center shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="text-white/40"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {product.nameEn}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {product.category.nameEn} •{" "}
                            {formatPrice(discountedPrice)}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                  <button
                    onClick={handleSearch}
                    className="w-full px-4 py-3 text-sm font-medium text-liteBlue bg-gray-50 hover:bg-gray-100 transition-colors text-center cursor-pointer"
                  >
                    View all results for &quot;{query}&quot;
                  </button>
                </>
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-gray-500">
                    No results found for &quot;{query}&quot;
                  </p>
                  <button
                    onClick={handleSearch}
                    className="mt-2 text-sm text-liteBlue font-medium hover:underline cursor-pointer"
                  >
                    Search in product catalog →
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
