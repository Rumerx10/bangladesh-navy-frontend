"use client";

import { navyCategories } from "@/src/data/navyCategories";
import { IProductFilter } from "@/src/components/products/types";
import { Filter } from "lucide-react";
import CategoryFilter from "./filters/CategoryFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";

interface ProductSidebarProps {
  filters: IProductFilter;
  setFilters: React.Dispatch<React.SetStateAction<IProductFilter>>;
}

export default function ProductSidebar({ filters, setFilters }: ProductSidebarProps) {
  const handleCategoryToggle = (catId: string) => {
    setFilters((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(catId)
        ? prev.categoryIds.filter((id) => id !== catId)
        : [...prev.categoryIds, catId],
    }));
  };

  const handlePriceChange = (min?: number, max?: number) => {
    setFilters((prev) => ({ ...prev, priceMin: min, priceMax: max }));
  };

  const handleClearAll = () => {
    setFilters({ categoryIds: [], sortBy: "relevance" });
  };

  const hasActiveFilters =
    filters.categoryIds.length > 0 ||
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined;

  return (
    <div className="sticky top-[120px] space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#001836] font-semibold">
          <Filter size={18} />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-xs text-[#003f71] font-medium hover:underline cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={navyCategories}
        selectedIds={filters.categoryIds}
        onToggle={handleCategoryToggle}
      />

      {/* Price Range */}
      <PriceRangeFilter
        min={filters.priceMin}
        max={filters.priceMax}
        onChange={handlePriceChange}
      />
    </div>
  );
}
