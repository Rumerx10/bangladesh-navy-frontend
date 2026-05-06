"use client";

import { useAppSelector } from "@/src/lib/redux/hooks";
import { ShoppingCart } from "lucide-react";
import { useCartDrawer } from "./CartProvider";

export default function FloatingCartButton() {
  const { toggleDrawer } = useCartDrawer();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={toggleDrawer}
      className="fixed right-5 bottom-10 z-40 w-12 h-12 rounded-md bg-[#003f71] text-white shadow-xl hover:bg-[#004d8a] transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110 hidden lg:flex"
      aria-label="Open cart"
    >
      <ShoppingCart size={20} />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </button>
  );
}
