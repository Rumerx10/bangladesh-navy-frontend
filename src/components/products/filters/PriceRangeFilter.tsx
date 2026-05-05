"use client";

import { useState } from "react";

interface PriceRangeFilterProps {
  min?: number;
  max?: number;
  onChange: (min?: number, max?: number) => void;
}

export default function PriceRangeFilter({
  min,
  max,
  onChange,
}: PriceRangeFilterProps) {
  const [localMin, setLocalMin] = useState(min?.toString() ?? "");
  const [localMax, setLocalMax] = useState(max?.toString() ?? "");

  const handleApply = () => {
    onChange(
      localMin ? Number(localMin) : undefined,
      localMax ? Number(localMax) : undefined
    );
  };

  return (
    <div className="border border-gray-100 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-[#001836] mb-3">
        Price Range (BDT)
      </h3>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          value={localMin}
          onChange={(e) => setLocalMin(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003f71]"
        />
        <span className="text-gray-400 text-sm">—</span>
        <input
          type="number"
          placeholder="Max"
          value={localMax}
          onChange={(e) => setLocalMax(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#003f71]"
        />
      </div>
      <button
        onClick={handleApply}
        className="mt-3 w-full py-2 rounded-lg bg-[#003f71] text-white text-xs font-semibold hover:bg-[#004d8a] transition-colors cursor-pointer"
      >
        Apply
      </button>
    </div>
  );
}
