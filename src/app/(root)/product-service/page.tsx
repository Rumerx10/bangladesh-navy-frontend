"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGet } from "@/src/hooks/useGet";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import {
  IProduct,
  IProductCategory,
} from "@/src/components/admin/ContentManagement/products/types";

export default function ProductServicePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { currentPage, itemsPerPage, setCurrentPage } = usePagination();
  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);

  const { data, isLoading } = useGet<IProduct[]>(
    "/product",
    [
      "product-public",
      currentPage.toString(),
      itemsPerPage.toString(),
      debouncedSearch,
      selectedCategory,
    ],
    {
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
      search: debouncedSearch,
      ...(selectedCategory !== "all" && { categoryId: selectedCategory }),
    }
  );

  const { data: categoryData } = useGet<IProductCategory[]>(
    "/category/list",
    ["category-list-public"]
  );

  const products: IProduct[] = Array.isArray(data?.data) ? data.data : [];
  const categories: IProductCategory[] = Array.isArray(categoryData?.data)
    ? categoryData.data
    : [];

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
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="flex-1 h-10 px-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedCategory("all");
              setCurrentPage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "bg-pBlue text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-pBlue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.nameEn}
            </button>
          ))}
        </div>
      </div>

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
                      {product.category?.nameEn}
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
    </section>
  );
}
