"use client";

import { ICartItem } from "@/src/components/cart/types/cart";
import { Package, Truck } from "lucide-react";
import CartItemCard from "./CartItemCard";

interface CartItemListProps {
  items: ICartItem[];
}

export default function CartItemList({ items }: CartItemListProps) {
  const freeShippingCount = items.filter((item) => item.freeShipping).length;

  return (
    <div className="flex flex-col">
      {/* Section header */}
      <div className="flex items-center gap-2 text-sm font-bold text-foreground pb-3 border-b-2 border-primary mb-4">
        <Package size={16} />
        <span>Your Items</span>
      </div>

      {/* Item cards */}
      <div className="flex flex-col gap-3 mb-4">
        {items.map((item, index) => (
          <CartItemCard
            key={`${item.productId}-${JSON.stringify(item.selectedAttributes ?? {})}`}
            item={item}
            index={index}
          />
        ))}
      </div>

      {/* Free shipping banner */}
      <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-green-50 text-green-600 text-xs sm:text-sm font-semibold border border-green-100">
        <Truck size={16} />
        {freeShippingCount === items.length ? (
          <span>All items in your cart have free shipping!</span>
        ) : freeShippingCount > 0 ? (
          <span>{freeShippingCount} of {items.length} item{items.length > 1 ? 's' : ''} eligible for free shipping</span>
        ) : (
          <span>Shipping charge is free always!</span>
        )}
      </div>
    </div>
  );
}
