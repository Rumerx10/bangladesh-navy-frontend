"use client";

import { INavyProduct } from "@/src/components/products/types";
import { useState } from "react";

interface ProductTabsProps {
  product: INavyProduct;
}

const tabs = ["Description", "Description (বাংলা)"];

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex border-b border-gray-100">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-5 py-3 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === i
                ? "text-[#003f71] border-b-2 border-[#003f71] bg-white"
                : "text-gray-500 hover:text-gray-700 bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-5">
        {activeTab === 0 && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.descriptionEn ?? "No description available."}
          </p>
        )}
        {activeTab === 1 && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.descriptionBn ?? "বর্ণনা পাওয়া যায়নি।"}
          </p>
        )}
      </div>
    </div>
  );
}
