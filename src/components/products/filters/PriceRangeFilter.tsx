"use client";

import { useEffect, useState } from "react";

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
  // Constants for our range (in BDT)
  const MIN_LIMIT = 0;
  const MAX_LIMIT = 20000;

  // Local state in BDT (parent uses poysha)
  const [minVal, setMinVal] = useState(min ? min / 100 : MIN_LIMIT);
  const [maxVal, setMaxVal] = useState(max ? max / 100 : MAX_LIMIT);

  // Sync with props if they change externally (e.g. Clear All)
  useEffect(() => {
    setMinVal(min ? min / 100 : MIN_LIMIT);
  }, [min]);

  useEffect(() => {
    setMaxVal(max ? max / 100 : MAX_LIMIT);
  }, [max]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 500);
    setMinVal(value);
    onChange(value, maxVal);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 500);
    setMaxVal(value);
    onChange(minVal, value);
  };

  return (
    <div className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-pBlue">
          Price Range (BDT)
        </h3>
        <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
          Max: 20k
        </span>
      </div>

      {/* Visual Values */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <span className="block text-[10px] text-gray-400 uppercase font-medium mb-1">Min</span>
          <span className="text-sm font-bold text-liteBlue">৳{minVal.toLocaleString()}</span>
        </div>
        <div className="h-px w-8 bg-gray-100" />
        <div className="text-center">
          <span className="block text-[10px] text-gray-400 uppercase font-medium mb-1">Max</span>
          <span className="text-sm font-bold text-liteBlue">৳{maxVal.toLocaleString()}</span>
        </div>
      </div>

      {/* Slider Component */}
      <div className="relative h-6 flex items-center">
        {/* Track Background */}
        <div className="absolute w-full h-1.5 bg-gray-100 rounded-full" />
        
        {/* Active Track Highlight */}
        <div 
          className="absolute h-1.5 bg-liteBlue rounded-full"
          style={{
            left: `${(minVal / MAX_LIMIT) * 100}%`,
            right: `${100 - (maxVal / MAX_LIMIT) * 100}%`
          }}
        />

        {/* Range Inputs */}
        <input
          type="range"
          min={MIN_LIMIT}
          max={MAX_LIMIT}
          step={100}
          value={minVal}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none h-1.5 z-10 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-liteBlue [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-liteBlue [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        />
        <input
          type="range"
          min={MIN_LIMIT}
          max={MAX_LIMIT}
          step={100}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none h-1.5 z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-liteBlue [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-liteBlue [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>

      <p className="mt-4 text-[10px] text-gray-400 text-center italic">
        Drag the sliders to filter by price
      </p>
    </div>
  );
}
