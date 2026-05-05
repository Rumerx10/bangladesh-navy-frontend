"use client";

import { INavyProduct, IProductFilter } from "@/src/types/product";
import { LayoutGrid } from "lucide-react";
import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";

interface ProductGridProps {
  products: INavyProduct[];
  totalCount: number;
  filters: IProductFilter;
  setFilters: React.Dispatch<React.SetStateAction<IProductFilter>>;
}

export default function ProductGrid({
  products,
  totalCount,
  filters,
  setFilters,
}: ProductGridProps) {
  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <LayoutGrid size={16} />
          <span>
            Showing <strong className="text-[#001836]">{products.length}</strong>{" "}
            of {totalCount} products
          </span>
        </div>
        <SortDropdown
          value={filters.sortBy}
          onChange={(sortBy) => setFilters((prev) => ({ ...prev, sortBy }))}
        />
      </div>

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <LayoutGrid size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            No products found
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  );
}
