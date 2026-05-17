"use client";

import { ICartItem } from "@/src/components/cart/types/cart";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import CouponInput from "./CouponInput";

interface OrderSummaryProps {
  items: ICartItem[];
  couponCode: string | null;
  couponDiscount: number;
}

export default function OrderSummary({
  items,
  couponCode,
  couponDiscount,
}: OrderSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = couponDiscount;
  const total = Math.max(0, subtotal - discount);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingCount = items.filter((item) => item.freeShipping).length;

  return (
    <div className="lg:sticky lg:top-32">
      <div className="border border-border rounded-xl p-4 sm:p-6 bg-card flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm font-bold text-foreground pb-3 border-b-2 border-primary">
          <ShoppingCart size={16} />
          <span>Order Summary</span>
        </div>

        {/* Coupon */}
        <CouponInput couponCode={couponCode} subtotal={subtotal} />

        {/* Summary rows */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
            <span className="font-medium text-foreground">
              ৳{subtotal.toLocaleString()}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <span className="font-medium text-green-600">
                -৳{discount.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            {freeShippingCount === items.length ? (
              <span className="font-medium text-green-600">Free</span>
            ) : (
              <span className="font-medium text-orange-600">Calculated at checkout</span>
            )}
          </div>

          <hr className="border-t border-border my-1" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">
              ৳{total.toLocaleString()}
            </span>
          </div>
        </div>

        <Link
          href="/checkout"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all no-underline"
        >
          Proceed to Checkout
          <ArrowRight size={16} />
        </Link>

        <Link href="/" className="text-center text-sm text-primary underline block">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
