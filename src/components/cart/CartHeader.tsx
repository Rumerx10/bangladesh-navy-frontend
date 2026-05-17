"use client";

import { clearCart } from "@/src/lib/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

interface CartHeaderProps {
  totalItems: number;
}

export default function CartHeader({ totalItems }: CartHeaderProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <div>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Shopping Cart</h1>
        <span className="text-xs sm:text-sm text-muted-foreground mt-0.5 block">
          {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
        </span>
      </div>
      <button
        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground border border-border rounded-lg px-3 py-1.5 hover:text-red-500 hover:border-red-500 transition-colors cursor-pointer"
        onClick={() => {
          dispatch(clearCart());
          toast.success("Cart cleared");
        }}
      >
        <Trash2 size={14} />
        Clear All
      </button>
    </div>
  );
}
