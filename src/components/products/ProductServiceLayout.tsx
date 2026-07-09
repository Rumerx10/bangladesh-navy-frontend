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

  const [filters, setFilters] = useState<IProductFilter>(() => {
    const initialCat = categoryParam
      ? navyCategories.find((c) => c.slug === categoryParam)
      : null;
    return {
      categoryIds: initialCat ? [initialCat.id] : [],
      search: searchParam ?? undefined,
      sortBy: "relevance",
    };
  });

  const [lastUrlParams, setLastUrlParams] = useState({
    category: categoryParam,
    search: searchParam,
  });

  // Sync state during render if URL params change (handles Next.js hydration and navigation)
  // This is the recommended React pattern to avoid useEffect race conditions.
  if (
    categoryParam !== lastUrlParams.category ||
    searchParam !== lastUrlParams.search
  ) {
    setFilters((prev) => {
      const nextFilters = { ...prev };
      if (categoryParam !== lastUrlParams.category) {
        if (categoryParam) {
          const cat = navyCategories.find((c) => c.slug === categoryParam);
          nextFilters.categoryIds = cat ? [cat.id] : [];
        } else {
          nextFilters.categoryIds = [];
        }
      }
      if (searchParam !== lastUrlParams.search) {
        nextFilters.search = searchParam ?? undefined;
      }
      return nextFilters;
    });
    setLastUrlParams({ category: categoryParam, search: searchParam });
  }

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
      result = result.filter(
        (p) => p.price <= (filters.priceMax ?? Infinity) * 100
      );
    }

    // Search filter
    if (filters.search) {
      const queryWords = filters.search
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);
      result = result.filter((p) => {
        const searchableText = [
          p.nameEn,
          p.nameBn,
          p.descriptionEn,
          p.descriptionBn,
          p.category?.nameEn,
          p.category?.nameBn,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return queryWords.every((word) => searchableText.includes(word));
      });
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
    <div className="container px-4 sm:px-6 lg:px-8 py-6 lg:py-8 mt-28 lg:mt-26">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <span className="hover:text-liteBlue cursor-pointer">Home</span>
        <span className="mx-2">›</span>
        <span className="text-pBlue font-medium">Products & Services</span>
      </nav>

      <h1 className="mt-8 lg:mt-20 text-2xl lg:text-3xl font-bold text-pBlue mb-1">
        Products & Services
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Browse our collection of nautical charts, publications, and maritime
        services
      </p>

      <div className="flex gap-6 lg:gap-8">
        {/* Sidebar — 28% */}
        {/* <aside className="hidden lg:block w-[22%] shrink-0">
          <ProductSidebar filters={filters} setFilters={setFilters} />
        </aside> */}

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
