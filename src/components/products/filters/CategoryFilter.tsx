"use client";

import { INavyCategory } from "@/src/components/products/types";

interface CategoryFilterProps {
  categories: INavyCategory[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedIds,
  onToggle,
}: CategoryFilterProps) {
  return (
    <div className="border border-gray-100 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-pBlue mb-3">Category</h3>
      <div className="space-y-2.5">
        {categories.map((cat) => (
          <label
            key={cat.id}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(cat.id)}
              onChange={() => onToggle(cat.id)}
              className="w-4 h-4 rounded border-gray-300 text-liteBlue focus:ring-liteBlue/20 cursor-pointer accent-liteBlue"
            />
            <span className="text-sm text-gray-700 group-hover:text-liteBlue transition-colors flex-1">
              {cat.nameEn}
            </span>
            {cat.productCount !== undefined && (
              <span className="text-xs text-gray-400">
                ({cat.productCount})
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
