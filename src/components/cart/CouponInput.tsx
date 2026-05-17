"use client";

import {
  applyCoupon,
  removeCoupon,
} from "@/src/lib/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { useState } from "react";
import { toast } from "react-toastify";

interface CouponInputProps {
  couponCode: string | null;
  subtotal: number;
}

export default function CouponInput({ couponCode, subtotal }: CouponInputProps) {
  const dispatch = useAppDispatch();
  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const coupons: Record<string, number> = {
      SAVE10: subtotal * 0.1,
      FLAT100: 100,
      WELCOME: subtotal * 0.05,
    };
    const val = coupons[couponInput.trim().toUpperCase()];
    if (val) {
      dispatch(applyCoupon({ code: couponInput.trim().toUpperCase(), discount: val }));
      toast.success("Coupon applied successfully!");
      setCouponInput("");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  if (couponCode) {
    return (
      <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-green-50 text-sm text-green-600 font-semibold">
        <span>🎟️ {couponCode}</span>
        <button
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
          onClick={() => dispatch(removeCoupon())}
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:border-primary"
        type="text"
        placeholder="Coupon code"
        value={couponInput}
        onChange={(e) => setCouponInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
      />
      <button
        className="px-4 py-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
        onClick={handleApplyCoupon}
      >
        Apply
      </button>
    </div>
  );
}
