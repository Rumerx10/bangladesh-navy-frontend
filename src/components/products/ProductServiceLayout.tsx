"use client";

import { navyCategories } from "@/src/data/navyCategories";
import { navyProducts } from "@/src/data/navyProducts";
import { IProductFilter } from "@/src/components/products/types";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import ProductSidebar from "./ProductSidebar";

export default function ProductServiceLayout() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  const [filters, setFilters] = useState<IProductFilter>({
    categoryIds: categoryParam
      ? [navyCategories.find((c) => c.slug === categoryParam)?.id ?? ""]
      : [],
    search: searchParam ?? undefined,
    sortBy: "relevance",
  });

  const filteredProducts = useMemo(() => {
    let result = [...navyProducts];

    // Category filter
    if (filters.categoryIds.length > 0) {
      result = result.filter((p) => filters.categoryIds.includes(p.categoryId));
    }

    // Price filter
    if (filters.priceMin !== undefined) {
      result = result.filter((p) => p.price >= (filters.priceMin ?? 0) * 100);
    }
    if (filters.priceMax !== undefined) {
      result = result.filter((p) => p.price <= (filters.priceMax ?? Infinity) * 100);
    }

    // Search filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.nameEn.toLowerCase().includes(q) ||
          p.nameBn.includes(q) ||
          p.descriptionEn?.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-6 lg:py-8 mt-28 lg:mt-[104px]">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <span className="hover:text-[#003f71] cursor-pointer">Home</span>
        <span className="mx-2">›</span>
        <span className="text-[#001836] font-medium">Products & Services</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-bold text-[#001836] mb-1">
        Products & Services
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Browse our collection of nautical charts, publications, and maritime services
      </p>

      <div className="flex gap-6 lg:gap-8">
        {/* Sidebar — 28% */}
        <aside className="hidden lg:block w-[28%] shrink-0">
          <ProductSidebar filters={filters} setFilters={setFilters} />
        </aside>

        {/* Product Grid — remaining */}
        <main className="flex-1 min-w-0">
          <ProductGrid
            products={filteredProducts}
            totalCount={navyProducts.length}
            filters={filters}
            setFilters={setFilters}
          />
        </main>
      </div>
    </div>
  );
}
