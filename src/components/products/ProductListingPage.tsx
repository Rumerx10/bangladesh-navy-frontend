"use client";

import { useMemo, useState } from "react";
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

/** Three-column grid, so a full page is a clean four rows. */
const PAGE_SIZE = 12;

/**
 * The catalogue is small (tens of charts), so the whole set is fetched once and
 * paged in the browser. That is what lets "All" mix the categories below — the
 * API returns them grouped, and it exposes no sort parameter to change that.
 */
const FETCH_LIMIT = 500;

/**
 * Products arrive grouped by category (every ENC, then every paper chart, then
 * the tide tables), so an unfiltered first page would show one category only.
 * Dealing one product from each category in turn makes "All" look like all.
 */
const interleaveByCategory = (products: IProduct[]) => {
  const buckets = new Map<string, IProduct[]>();

  for (const product of products) {
    const key = product.category ?? "UNCATEGORISED";
    const bucket = buckets.get(key);
    if (bucket) bucket.push(product);
    else buckets.set(key, [product]);
  }

  const queues = [...buckets.values()];
  const longest = queues.reduce((max, queue) => Math.max(max, queue.length), 0);
  const ordered: IProduct[] = [];

  for (let index = 0; index < longest; index++) {
    for (const queue of queues) {
      if (index < queue.length) ordered.push(queue[index]);
    }
  }

  return ordered;
};

/**
 * The header dropdown links to `/product-service?category=<slug>`, so the slugs
 * used there map onto the API's category enum. Anything unrecognised (or a
 * category with no products behind it, like `publications`) falls back to
 * showing everything.
 */
const CATEGORY_BY_SLUG: Record<string, string> = {
  "paper-charts": "PAPPER_CHART",
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
  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);

  // The URL is the single source of truth for the filter, so a dropdown link
  // followed while this page is already open selects the right pill.
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

  // A narrower result set can have fewer pages than the one currently shown.
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    handleSearchChange(event);
  };

  const { data, isLoading } = useGet<IProduct[]>(
    "/product",
    ["product-public", selectedCategory],
    {
      page: "1",
      limit: FETCH_LIMIT.toString(),
      ...(selectedCategory !== "all" && { category: selectedCategory }),
    }
  );

  // The /product endpoint ignores the `search` query param, so the whole
  // fetched set is filtered client-side instead (see ProductsManagement.tsx).
  const filtered = useMemo(() => {
    const fetched = Array.isArray(data?.data) ? data.data : [];
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return fetched;
    return fetched.filter(
      (item) =>
        item.nameEn?.toLowerCase().includes(query) ||
        item.nameBn?.toLowerCase().includes(query) ||
        item.chartCode?.toString().includes(query)
    );
  }, [data, debouncedSearch]);

  // A single category is already homogeneous, so only "All" needs interleaving.
  const ordered = useMemo(() => {
    return selectedCategory === "all"
      ? interleaveByCategory(filtered)
      : filtered;
  }, [filtered, selectedCategory]);

  const totalItems = ordered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const products = ordered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="container px-4 sm:px-6 lg:px-8 py-8 lg:py-16 mt-24 lg:mt-28">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-pBlue">
          Products &amp; Services
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Hydrographic charts, publications and maritime services by Bangladesh
          Navy
        </p>
      </div>

      {/* Search + Category filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search products..."
          className="flex-1 h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-pBlue text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                  ? "bg-pBlue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      {!isLoading && products.length > 0 && (
        <p className="mb-4 text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-700">{products.length}</span>{" "}
          of <span className="font-semibold text-gray-700">{totalItems}</span>{" "}
          {totalItems === 1 ? "product" : "products"}
        </p>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-100 bg-white overflow-hidden animate-pulse"
            >
              <div className="aspect-4/3 bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
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
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <LayoutGrid size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            No products found
          </h3>
          <p className="text-sm text-gray-500 mt-1">
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
              >
                <Link
                  href={`/products/${product.id}`}
                  className="group flex flex-col rounded-xl border border-gray-100 shadow bg-white overflow-hidden hover:shadow-lg hover:border-liteBlue/15 transition-all duration-300"
                >
                  <div className="relative aspect-4/3 bg-linear-to-br from-pBlue to-liteBlue overflow-hidden">
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
                    <h3 className="text-sm font-semibold text-pBlue line-clamp-2 group-hover:text-liteBlue transition-colors leading-snug">
                      {product.nameEn}
                    </h3>
                    {product.chartCode && (
                      <p className="text-xs text-gray-400 font-mono">
                        Chart #{product.chartCode}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* The API groups products by category, so without these controls the
          first page reads as if only one category exists. */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-8 rounded-xl border border-gray-100 bg-white">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            itemsPerPage={PAGE_SIZE}
            totalItems={totalItems}
          />
        </div>
      )}
    </section>
  );
};

export default ProductListingPage;
