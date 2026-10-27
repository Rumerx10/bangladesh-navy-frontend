"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGet } from "@/src/hooks/useGet";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import Pagination from "@/src/components/shared/Pagination";
import {
  IProduct,
  PRODUCT_CATEGORY_LABELS,
  PRODUCT_CATEGORY_OPTIONS,
} from "@/src/components/admin/ContentManagement/products/types";

const DEFAULT_PAGE_SIZE = 12;
const PAGE_SIZE_OPTIONS = [12, 24, 48];

interface ProductsResponse {
  data: IProduct[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    hasPagination: boolean;
  };
}

// Backend slugs → admin enum values.
const CATEGORY_BY_SLUG: Record<string, string> = {
  "paper-charts": "PAPER_CHART",
  "electronic-navigational-charts": "ELECTRONIC_NAVIGATIONAL_CHART",
  "tide-tables": "TIDAL",
};

const toCategory = (value: string | null) => {
  if (!value) return "all";
  if (PRODUCT_CATEGORY_OPTIONS.some((option) => option.value === value))
    return value;
  return CATEGORY_BY_SLUG[value] ?? "all";
};

const ProductListingPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);

  const selectedCategory = toCategory(searchParams.get("category"));

  const handleCategoryChange = (category: string) => {
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") params.delete("category");
    else params.set("category", category);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    handleSearchChange(event);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const trimmedSearch = debouncedSearch.trim();
  // -1 = "All": omit `limit` so the API returns the full set (meta confirms
  // this by returning itemsPerPage === totalItems, hasPagination: false).
  const showAll = pageSize === -1;

  const { data, isLoading } = useGet<ProductsResponse>(
    "/product",
    [
      "product-public",
      selectedCategory,
      trimmedSearch,
      currentPage.toString(),
      pageSize.toString(),
    ],
    {
      page: showAll ? "1" : currentPage.toString(),
      sortOrder: "asc",
      status: "ACTIVE",
      ...(!showAll && { limit: pageSize.toString() }),
      ...(trimmedSearch && { search: trimmedSearch }),
      ...(selectedCategory !== "all" && { category: selectedCategory }),
    }
  );

  const products = Array.isArray(data?.data) ? data.data : [];
  const totalItems = data?.meta?.totalItems ?? 0;
  const totalPages = showAll
    ? 1
    : Math.max(1, data?.meta?.totalPages ?? Math.ceil(totalItems / pageSize));

  return (
    <section className="container px-4 sm:px-6 lg:px-8 py-8 lg:py-16 mt-24 lg:mt-28">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-pBlue">
          Products &amp; Services
        </h1>
        <p className="mt-2 text-sm text-secondary-foreground">
          Hydrographic charts, publications and maritime services by Bangladesh
          Navy
        </p>
      </div>

      {/* Search + Category filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search products..."
          className="h-10 flex-1 px-4 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-brand-navy text-white"
                : "bg-light-dark text-secondary-foreground hover:bg-light-silver"
            }`}
          >
            All
          </button>
          {PRODUCT_CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.value
                  ? "bg-brand-navy text-white"
                  : "bg-light-dark text-secondary-foreground hover:bg-light-silver"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      {!isLoading && products.length > 0 && (
        <p className="mb-4 text-sm text-secondary-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {products.length}
          </span>{" "}
          of <span className="font-semibold text-foreground">{totalItems}</span>{" "}
          {totalItems === 1 ? "product" : "products"}
        </p>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card overflow-hidden animate-pulse"
            >
              <div className="aspect-4/3 bg-light-silver" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-light-silver rounded w-3/4" />
                <div className="h-3 bg-light-dark rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-light-dark flex items-center justify-center mb-4">
            <LayoutGrid size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No products found
          </h3>
          <p className="text-sm text-secondary-foreground mt-1">
            Try adjusting your search or filter
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {products.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="group flex h-full flex-col rounded-xl border border-border shadow bg-card overflow-hidden hover:shadow-lg hover:border-liteBlue/15 transition-all duration-300"
                >
                  <div className="relative aspect-4/3 bg-linear-to-br from-brand-navy to-brand-blue overflow-hidden">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.nameEn}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Package size={40} className="text-white/20" />
                      </div>
                    )}
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-sm text-white text-[11px] font-medium">
                      {product.category
                        ? PRODUCT_CATEGORY_LABELS[
                            product.category as keyof typeof PRODUCT_CATEGORY_LABELS
                          ]
                        : "Tidal Product"}
                    </span>
                  </div>
                  <div className="flex-1 p-4 flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-pBlue line-clamp-2 min-h-[2lh] group-hover:text-liteBlue transition-colors leading-snug">
                      {product.nameEn}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono min-h-lh">
                      {product.chartCode ? `Chart #${product.chartCode}` : ""}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {!isLoading && (totalPages > 1 || showAll) && (
        <div className="mt-8 rounded-xl border border-border bg-card">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(next) => {
              setCurrentPage(next);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            itemsPerPage={showAll ? totalItems : pageSize}
            totalItems={totalItems}
            onItemsPerPageChange={handlePageSizeChange}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
          />
        </div>
      )}
    </section>
  );
};

export default ProductListingPage;