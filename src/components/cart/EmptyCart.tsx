"use client";

import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="container px-4 sm:px-0">
      <div className="flex flex-col items-center justify-center py-16 sm:pt-40 text-center gap-4">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-muted text-muted-foreground">
          <ShoppingCart size={32} />
        </div>
        <h1 className="text-xl font-bold text-foreground">Your cart is empty</h1>
        <p className="text-sm text-muted-foreground max-w-xs">
          Looks like you haven&apos;t added any products to your cart yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Continue Shopping
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
