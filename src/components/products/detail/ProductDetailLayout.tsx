"use client";

import { formatPrice, getDiscountedPrice } from "@/src/data/navyProducts";
import { INavyProduct } from "@/src/types/product";
import ProductAttributes from "./ProductAttributes";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";

interface ProductDetailLayoutProps {
  product: INavyProduct;
}

export default function ProductDetailLayout({ product }: ProductDetailLayoutProps) {
  const discountedPrice = getDiscountedPrice(product);

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-6 lg:py-8 mt-28 lg:mt-[104px]">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span className="hover:text-[#003f71] cursor-pointer">Home</span>
        <span className="mx-2">›</span>
        <span className="hover:text-[#003f71] cursor-pointer">Products & Services</span>
        <span className="mx-2">›</span>
        <span className="text-[#001836] font-medium">{product.nameEn}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl bg-gradient-to-br from-[#001836] to-[#003f71] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-white/20"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="16" y2="17" />
          </svg>
          <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white text-sm font-medium">
            {product.category.nameEn}
          </div>
        </div>

        {/* Info Section */}
        <ProductInfo
          product={product}
          discountedPrice={discountedPrice}
          formatPrice={formatPrice}
        />
      </div>

      {/* Attributes */}
      {product.productAttributes.length > 0 && (
        <div className="mt-8">
          <ProductAttributes attributes={product.productAttributes} />
        </div>
      )}

      {/* Tabs */}
      <div className="mt-8">
        <ProductTabs product={product} />
      </div>
    </div>
  );
}
