"use client";

import { updateQuantity } from "@/src/lib/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  productId: string;
  selectedAttributes?: Record<string, string>;
  quantity: number;
  stock: number;
}

export default function QuantitySelector({
  productId,
  selectedAttributes,
  quantity,
  stock,
}: QuantitySelectorProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center border border-border rounded-lg overflow-hidden">
      <button
        className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-transparent hover:bg-muted text-foreground transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
        onClick={() =>
          dispatch(
            updateQuantity({
              productId,
              selectedAttributes,
              quantity: quantity - 1,
            })
          )
        }
        disabled={quantity <= 1}
      >
        <Minus size={14} />
      </button>
      <span className="w-8 sm:w-10 text-center text-sm font-semibold text-foreground border-x border-border py-1">
        {quantity}
      </span>
      <button
        className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-transparent hover:bg-muted text-foreground transition-colors cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
        onClick={() =>
          dispatch(
            updateQuantity({
              productId,
              selectedAttributes,
              quantity: quantity + 1,
            })
          )
        }
        disabled={quantity >= stock}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
