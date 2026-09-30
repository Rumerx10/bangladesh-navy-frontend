"use client";

import { INavyProduct } from "@/src/components/products/types";
import parse from "html-react-parser";
import { useState } from "react";

interface ProductTabsProps {
  product: INavyProduct;
}

const tabs = ["Description"];

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="flex border-b border-border bg-light">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-5 py-3 font-semibold text-sm transition-colors cursor-pointer ${
              activeTab === i
                ? "text-liteBlue border-liteBlue bg-card"
                : "text-secondary-foreground hover:text-foreground bg-light"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-5 text-sm text-secondary-foreground leading-relaxed [&_h3]:font-bold [&_h3]:text-pBlue [&_h3]:text-base [&_h3]:mb-3 [&_h3]:mt-2 [&_p]:mb-3 [&_table]:w-full [&_table]:border-collapse [&_table]:mt-2 [&_th]:border [&_th]:border-border [&_th]:bg-brand-blue [&_th]:text-white [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-xs [&_tr:nth-child(even)_td]:bg-light">
        {activeTab === 0 &&
          parse(product.descriptionEn ?? "No description available.")}
      </div>
      {product?.content && (
        <div className="p-5 text-sm text-secondary-foreground leading-relaxed [&_h3]:font-bold [&_h3]:text-pBlue [&_h3]:text-base [&_h3]:mb-3 [&_h3]:mt-2 [&_p]:mb-3 [&_table]:w-full [&_table]:border-collapse [&_table]:mt-2 [&_th]:border [&_th]:border-border [&_th]:bg-brand-blue [&_th]:text-white [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-xs [&_tr:nth-child(even)_td]:bg-light">
          {parse(product.content)}
        </div>
      )}
    </div>
  );
};

export default ProductTabs;
