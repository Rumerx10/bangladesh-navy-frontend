"use client";

import { INavyProduct, IProductFilter } from "@/src/components/products/types";
import { AnimatePresence, motion } from "framer-motion";
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
    <div className="min-h-150">
      {/* Toolbar */}
      {/* <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>
            Showing <strong className="text-pBlue">{products.length}</strong>{" "}
            of {totalCount} products
          </span>
        </div>
        <SortDropdown
          value={filters.sortBy}
          onChange={(sortBy) => setFilters((prev) => ({ ...prev, sortBy }))}
        />
      </div> */}

      {/* Grid */}
      {products.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {products.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <LayoutGrid size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            No products found
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Try adjusting your filters
          </p>
        </motion.div>
      )}
    </div>
  );
}
