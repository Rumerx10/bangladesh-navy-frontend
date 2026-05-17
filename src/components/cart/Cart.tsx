"use client";

import { useAppSelector } from "@/src/lib/redux/hooks";
import CartHeader from "./CartHeader";
import CartItemList from "./CartItemList";
import EmptyCart from "./EmptyCart";
import OrderSummary from "./OrderSummary";

export default function Cart() {
  const { items, couponCode, couponDiscount } = useAppSelector(
    (state) => state.cart
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container px-4 sm:0">
      <div className="py-4 sm:py-6 lg:pt-40 pb-20 lg:pb-16">
        <CartHeader totalItems={totalItems} />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">
          <CartItemList items={items} />
          <OrderSummary
            items={items}
            couponCode={couponCode}
            couponDiscount={couponDiscount}
          />
        </div>
      </div>
    </div>
  );
}
