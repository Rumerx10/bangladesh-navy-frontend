"use client";

import {
  removeFromCart,
  updateQuantity,
} from "@/src/lib/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import { ArrowRight, ImageIcon, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartDrawer } from "./CartProvider";

export default function CartDrawer() {
  const { isOpen, closeDrawer } = useCartDrawer();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-60 transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-70 h-screen w-95 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} className="text-liteBlue" />
            <h2 className="text-base font-bold text-pBlue">
              Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart size={40} className="text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${JSON.stringify(item.selectedAttributes ?? {})}`}
                  className="flex gap-3 pb-4 border-b border-gray-50"
                >
                  <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0 relative">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          target.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                          const icon = document.createElement('div');
                          icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;
                          target.parentElement?.appendChild(icon);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeDrawer}
                      className="text-sm font-medium text-gray-800 line-clamp-1 hover:text-liteBlue"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm font-bold text-pBlue mt-1">
                      ৳{item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                productId: item.productId,
                                selectedAttributes: item.selectedAttributes,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 h-6 flex items-center justify-center text-xs font-semibold border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                productId: item.productId,
                                selectedAttributes: item.selectedAttributes,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          disabled={item.quantity >= item.stock}
                          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              productId: item.productId,
                              selectedAttributes: item.selectedAttributes,
                            })
                          )
                        }
                        className="ml-auto text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-lg font-bold text-pBlue">
                ৳{subtotal.toLocaleString()}
              </span>
            </div>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-liteBlue text-white font-semibold text-sm hover:bg-[#004d8a] transition-colors"
            >
              View Cart
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
