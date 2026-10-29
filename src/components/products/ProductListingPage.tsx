"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, Package, SearchIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGet } from "@/src/hooks/useGet";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import Pagination from "@/src/components/shared/Pagination";
import {
  productMatches,
  toSearchTerms,
} from "@/src/components/products/productSearch";
import {
  IProduct,
  PRODUCT_CATEGORY_LABELS,
  PRODUCT_CATEGORY_OPTIONS,
  ProductCategory,
} from "@/src/components/admin/ContentManagement/products/types";
import Container from "@/src/components/shared/Container";

const DEFAULT_PAGE_SIZE = 12;
const PAGE_SIZE_OPTIONS = [12, 24, 48];

// URL slugs (header / footer / mobile nav links) → backend enum values. Note
// the backend's own spelling, `PAPPER_CHART`.
const CATEGORY_BY_SLUG: Record<string, ProductCategory> = {
  "paper-charts": "PAPPER_CHART",
  "electronic-charts": "ELECTRONIC_NAVIGATIONAL_CHART",
  "electronic-navigational-charts": "ELECTRONIC_NAVIGATIONAL_CHART",
  "tide-tables": "TIDAL",
};

const toCategory = (value: string | null): ProductCategory | "all" => {
  if (!value) return "all";
  const direct = PRODUCT_CATEGORY_OPTIONS.find(
    (option) => option.value === value
  );
  if (direct) return direct.value;
  return CATEGORY_BY_SLUG[value] ?? "all";
};

const ProductListingPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // The header search lands here with `?search=`.
  const urlSearch = searchParams.get("search") ?? "";

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { search, setSearch, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300, urlSearch);

  // A new header search while already on this page changes the URL without
  // remounting, so pick it up here (adjusting state during render, not in an
  // effect, so there is no extra paint with the stale query).
  const [syncedUrlSearch, setSyncedUrlSearch] = useState(urlSearch);
  if (urlSearch !== syncedUrlSearch) {
    setSyncedUrlSearch(urlSearch);
    setSearch(urlSearch);
    setCurrentPage(1);
  }

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

  const clearSearch = () => {
    setCurrentPage(1);
    setSearch("");
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // The whole active catalogue for the category, in one request (no `limit`
  // → the API returns every match). The backend ignores `search`, so search
  // and pagination happen here; the catalogue is small enough for that.
  const { data, isLoading } = useGet<IProduct[]>(
    "/product",
    ["product-public", selectedCategory],
    {
      sortOrder: "asc",
      status: "ACTIVE",
      ...(selectedCategory !== "all" && { category: selectedCategory }),
    }
  );

  const filteredProducts = useMemo(() => {
    const all = Array.isArray(data?.data) ? data.data : [];
    const terms = toSearchTerms(debouncedSearch);
    return all.filter(
      (product) =>
        // Belt and braces: never show a withdrawn product, whatever the API sends.
        product.status === "ACTIVE" && productMatches(product, terms)
    );
  }, [data, debouncedSearch]);

  const showAll = pageSize === -1;
  const totalItems = filteredProducts.length;
  const totalPages = showAll
    ? 1
    : Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(currentPage, totalPages);
  const products = showAll
    ? filteredProducts
    : filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  const trimmedSearch = debouncedSearch.trim();

  return (
    <Container as="section" className="py-8 lg:py-16 mt-24 lg:mt-28">
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
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            onKeyDown={(event) => event.key === "Escape" && clearSearch()}
            placeholder="Search by name, chart number or type…"
            aria-label="Search products"
            className="h-10 w-full pl-10 pr-10 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-light-dark hover:text-foreground cursor-pointer"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </div>
        <div className="flex overflow-auto gap-2">
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
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
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
          {trimmedSearch && (
            <>
              {" "}
              for{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{trimmedSearch}&rdquo;
              </span>
            </>
          )}
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
            {trimmedSearch
              ? `Nothing matches “${trimmedSearch}”. Try another name or chart number.`
              : "Try adjusting your search or filter"}
          </p>
          {trimmedSearch && (
            <button
              type="button"
              onClick={clearSearch}
              className="mt-4 rounded-full bg-brand-navy px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 cursor-pointer"
            >
              Clear search
            </button>
          )}
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
                        ? PRODUCT_CATEGORY_LABELS[product.category]
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

      {!isLoading && totalItems > PAGE_SIZE_OPTIONS[0] && (
        <div className="mt-8 rounded-xl border border-border bg-card">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(next) => {
              setCurrentPage(next);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            itemsPerPage={showAll ? totalItems : pageSize}
            selectedPageSize={pageSize}
            totalItems={totalItems}
            onItemsPerPageChange={handlePageSizeChange}
            pageSizeOptions={PAGE_SIZE_OPTIONS}
          />
        </div>
      )}
    </Container>
  );
};

export default ProductListingPage;
