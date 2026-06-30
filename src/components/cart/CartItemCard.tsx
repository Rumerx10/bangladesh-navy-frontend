"use client";

import { removeFromCart } from "@/src/lib/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { ICartItem } from "@/src/components/cart/types/cart";
import { ImageIcon, Tag, Trash2, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";

interface CartItemCardProps {
  item: ICartItem;
  index: number;
}

export default function CartItemCard({ item, index }: CartItemCardProps) {
  const dispatch = useAppDispatch();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative border border-border rounded-xl bg-card overflow-hidden hover:shadow-md hover:border-primary/20 transition-all">
      {/* Item number badge */}
      <div className="absolute top-0 left-0 w-6 h-6 flex items-center justify-center text-[10px] font-bold bg-primary text-primary-foreground rounded-br-lg z-10">
        {index + 1}
      </div>

      <div className="flex gap-3 sm:gap-4 p-3 sm:p-5 pl-5 sm:pl-6">
        {/* Image */}
        <div className="relative w-20 sm:w-24 lg:w-25 min-w-20 sm:min-w-24 lg:min-w-25 h-24 sm:h-28 lg:h-30 rounded-lg overflow-hidden bg-gray-100">
          {imgError || !item.image ? (
            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
              <ImageIcon size={32} />
            </div>
          ) : (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="110px"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-1">
          <Link
            href={`/products/${item.slug}`}
            className="text-sm sm:text-base font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors"
          >
            {item.name}
          </Link>

          {/* Attribute tags */}
          {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {Object.entries(item.selectedAttributes).map(([key, value]) => (
                <span key={key} className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/15">
                  <Tag size={10} />
                  {key}: {value}
                </span>
              ))}
            </div>
          )}

          {item.variantName && !item.selectedAttributes && (
            <span className="text-xs text-muted-foreground">{item.variantName}</span>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm sm:text-base font-bold text-foreground">
              ৳{item.price.toLocaleString()}
            </span>
            {item.compareAtPrice &&
              item.compareAtPrice > item.price && (
                <span className="text-xs sm:text-sm text-muted-foreground line-through">
                  ৳{item.compareAtPrice.toLocaleString()}
                </span>
              )}
          </div>

          {/* Free shipping badge */}
          {item.freeShipping && (
            <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5 w-fit">
              <Truck size={12} />
              Free Shipping
            </div>
          )}

          {/* Qty + Remove */}
          <div className="flex items-center gap-2 sm:gap-4 mt-auto pt-2 flex-wrap">
            <QuantitySelector
              productId={item.productId}
              selectedAttributes={item.selectedAttributes}
              quantity={item.quantity}
              stock={item.stock}
            />

            {/* Item subtotal */}
            <span className="text-sm font-bold text-primary ml-auto">
              ৳{(item.price * item.quantity).toLocaleString()}
            </span>

            <button
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
              onClick={() =>
                dispatch(
                  removeFromCart({
                    productId: item.productId,
                    selectedAttributes: item.selectedAttributes,
                  })
                )
              }
            >
              <Trash2 size={14} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
