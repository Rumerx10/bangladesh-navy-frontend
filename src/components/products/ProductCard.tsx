"use client";

import { DiscountType, INavyProduct } from "@/src/components/products/types";
import {
    // formatPrice,
    getDiscountedPrice,
    getProductSlug,
} from "@/src/data/navyProducts";
import Image from "next/image";
import Link from "next/link";
import TiffPreview from "./TiffPreview";

// import { addToCart } from "@/src/lib/redux/features/cart/cartSlice";
// import { useAppDispatch } from "@/src/lib/redux/hooks";
// import { ShoppingCart } from "lucide-react";
// import { toast } from "react-toastify";


interface ProductCardProps {
  product: INavyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  // const dispatch = useAppDispatch();
  const slug = getProductSlug(product);
  const discountedPrice = getDiscountedPrice(product);
  const hasDiscount = discountedPrice < product.price;
  const imageUrl = product.images?.[0] ?? "/img1.jpeg";
  const isTiff = /\.(tif|tiff)$/i.test(imageUrl);

  // const handleAddToCart = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   dispatch(
  //     addToCart({
  //       productId: product.id,
  //       name: product.nameEn,
  //       slug,
  //       image: product.images[0] ?? "img1.jpeg",
  //       price: discountedPrice / 100,
  //       compareAtPrice: hasDiscount ? product.price / 100 : undefined,
  //       quantity: 1,
  //       stock: product.stock,
  //     })
  //   );
  //   toast.success(`${product.nameEn} added to cart`);
  // };

  return (
    <Link
      href={`/products/${slug}`}
      className="group flex flex-col rounded-xl border border-gray-100 shadow bg-white overflow-hidden hover:shadow-lg hover:border-[#003f71]/15 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-4/3 bg-linear-to-br from-[#001836] to-[#003f71] flex items-center justify-center overflow-hidden">
        {/* Decorative grid pattern */}
        {isTiff ? (
          <TiffPreview src={imageUrl} className="w-full h-full object-cover" />
        ) : (
          <Image
            src={imageUrl}
            alt={product.nameEn}
            width={400}
            height={300}
            className="object-contain w-full h-full"
          />
        )}
        {/* <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        /> */}
        {/* Chart icon placeholder */}
        {/* <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-white/30"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="16" y2="17" />
        </svg> */}

        {/* Discount badge */}
        {hasDiscount && product.discountType && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-red-500 text-white text-xs font-bold">
            {product.discountType === DiscountType.PERCENTAGE
              ? `-${product.discountValue}%`
              : `-৳${product.discountValue}`}
          </span>
        )}

        {/* Category badge */}
        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-sm text-white text-[11px] font-medium">
          {product.category.nameEn}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-sm font-semibold text-[#001836] line-clamp-2 group-hover:text-[#003f71] transition-colors leading-snug">
          {product.nameEn}
        </h3>

        {/* <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#001836]">
              {formatPrice(discountedPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#003f71] text-white hover:bg-[#004d8a] transition-colors cursor-pointer"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div> */}
      </div>
    </Link>
  );
}
