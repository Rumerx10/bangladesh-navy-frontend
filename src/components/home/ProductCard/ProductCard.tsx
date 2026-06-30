"use client";

import { IProduct } from "@/src/components/cart/types/product";
import { Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage =
    product.images.find((img) => img.isPrimary) ?? product.images[0];
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - product.price) / product.compareAtPrice!) *
          100
      )
    : 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col h-95 rounded-lg overflow-hidden bg-card hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow"
    >
      {/* Image — takes remaining space */}
      <div className="relative w-full flex-1 min-h-0 overflow-hidden bg-gray-100 rounded-t-lg">
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt ?? product.name}
            fill
            className="object-cover transition-transform duration-450 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        )}

        {/* Badges on image – New + Free Delivery only */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 z-2 flex-wrap">
          {product.isNewArrival && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-linear-to-br from-violet-600 to-blue-600 text-white uppercase tracking-wider">
              New
            </span>
          )}
          {product.freeShipping && (
            <span className="flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.75 rounded-sm bg-emerald-600 text-white uppercase tracking-wider">
              <Truck size={12} strokeWidth={2.5} />
              Free Delivery
            </span>
          )}
        </div>
      </div>

      {/* Content — fixed height */}
      <div className="flex flex-col justify-between shrink-0 h-25 pt-2 pb-2 px-2">
        <div className="flex flex-col gap-0.5">
          {product.brand && (
            <span className="text-xs font-bold text-foreground truncate">
              {product.brand.name}
            </span>
          )}
          <h3 className="text-xs font-normal text-muted-foreground truncate leading-snug">
            {product.name}
          </h3>
        </div>

        <div className="flex flex-col gap-0.5 mt-auto">
          {/* Deal badges */}
          {hasDiscount && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-foreground text-background">
                {discountPercent}%
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-red-500 text-white uppercase tracking-wide">
                Deal
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-foreground">
              <span className="text-xs">৳</span>
              {product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-gray-400 line-through">
                ৳{product.compareAtPrice!.toLocaleString()}
              </span>
            )}
            {hasDiscount && (
              <span className="text-[11px] font-bold text-red-500">
                -{discountPercent}%
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
