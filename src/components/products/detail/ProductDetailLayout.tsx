"use client";
import Image from "next/image";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import TiffPreview from "../TiffPreview";
import ProductAttributes from "./ProductAttributes";
import ProductKeyFeatures from "./ProductKeyFeatures";
import { INavyProduct } from "@/src/components/products/types";
import { formatPrice, getDiscountedPrice } from "@/src/data/navyProducts";
import { IProduct } from "@/src/components/admin/ContentManagement/products/types";

interface ProductDetailLayoutProps {
  product: INavyProduct;
  chartDetails?: IProduct;
}

export default function ProductDetailLayout({
  product,
  chartDetails,
}: ProductDetailLayoutProps) {
  const discountedPrice = getDiscountedPrice(product);
  const imageUrl = product.images?.[0] ?? "/img1.jpeg";

  const isTiff = /\.(tif|tiff)$/i.test(imageUrl);
  // Tide tables carry none of the chart metadata those two sections are built
  // from, so they'd render as an empty spec grid and a "No description
  // available." panel. Paper charts and ENCs keep both.
  const isTidal = chartDetails?.category === "TIDAL";
  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-6 lg:py-8 mt-28 lg:mt-26">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span className="hover:text-liteBlue cursor-pointer">Home</span>
        <span className="mx-2">›</span>
        <span className="hover:text-liteBlue cursor-pointer">
          Nautical Products
        </span>
        <span className="mx-2">›</span>
        <span className="text-pBlue font-medium">{product.nameEn}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section — the aspect ratio is what gives this box a definite
            height, so the portrait book covers letterbox inside it via
            object-contain instead of stretching the row. */}
        <div className="relative w-full aspect-4/3 max-h-[70vh] flex items-center justify-center overflow-hidden">
          {isTiff ? (
            <TiffPreview
              src={imageUrl}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={imageUrl}
              alt={product.nameEn}
              width={400}
              height={300}
              className="object-contain w-full h-full"
            />
          )}
          <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white text-sm font-medium">
            {product.category.nameEn}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-6">
          <ProductInfo
            product={product}
            discountedPrice={discountedPrice}
            formatPrice={formatPrice}
          />
          {chartDetails && !isTidal && (
            <ProductKeyFeatures product={chartDetails} />
          )}
        </div>
      </div>

      {/* Attributes */}
      {product.productAttributes.length > 0 && (
        <div className="mt-8">
          <ProductAttributes attributes={product.productAttributes} />
        </div>
      )}

      {/* Tabs */}
      {!isTidal && (
        <div className="mt-8">
          <ProductTabs product={product} />
        </div>
      )}
    </div>
  );
}
