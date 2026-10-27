"use client";
import parse from "html-react-parser";
import ProductInfo from "./ProductInfo";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductAttributes from "./ProductAttributes";
import ProductKeyFeatures from "./ProductKeyFeatures";
import { INavyProduct } from "@/src/components/products/types";
import { formatPrice, getDiscountedPrice } from "@/src/data/navyProducts";
import { IProduct } from "@/src/components/admin/ContentManagement/products/types";



interface ProductDetailLayoutProps {
  product: INavyProduct;
  chartDetails?: IProduct;
}

const ProductDetailLayout = ({
  product,
  chartDetails,
}: ProductDetailLayoutProps) => {
  const discountedPrice = getDiscountedPrice(product);
  const images = (product.images ?? []).filter(Boolean);

  const isTidal = chartDetails?.category === "TIDAL";
  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-6 lg:py-8 mt-24 lg:mt-20">
      {/* Breadcrumb */}
      <nav className="text-sm text-secondary-foreground mb-6">
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
          <ProductImageCarousel images={images} alt={product.nameEn} />
          <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white text-sm font-medium">
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
      {!isTidal && product?.descriptionEn && (
        <div className="rounded-xl border border-border overflow-hidden">
              <div className="flex border-b border-border bg-light">
                  <div           
                    className="px-5 py-3 font-semibold text-sm transition-colors cursor-pointer text-liteBlue border-liteBlue bg-light"
                  >
                    Description
                  </div>
              </div>
              <div className="p-5 text-sm text-secondary-foreground leading-relaxed [&_h3]:font-bold [&_h3]:text-pBlue [&_h3]:text-base [&_h3]:mb-3 [&_h3]:mt-2 [&_p]:mb-3 [&_table]:w-full [&_table]:border-collapse [&_table]:mt-2 [&_th]:border [&_th]:border-border [&_th]:bg-brand-blue [&_th]:text-white [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-xs [&_tr:nth-child(even)_td]:bg-light">
                {parse(product.descriptionEn ?? "No description available.")}
              </div>
              {product?.content && (
                <div className="p-5 text-sm text-secondary-foreground leading-relaxed [&_h3]:font-bold [&_h3]:text-pBlue [&_h3]:text-base [&_h3]:mb-3 [&_h3]:mt-2 [&_p]:mb-3 [&_table]:w-full [&_table]:border-collapse [&_table]:mt-2 [&_th]:border [&_th]:border-border [&_th]:bg-brand-blue [&_th]:text-white [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-xs [&_tr:nth-child(even)_td]:bg-light">
                  {parse(product.content)}
                </div>
              )}
            </div>
      )}
    </div>
  );
};

export default ProductDetailLayout;
