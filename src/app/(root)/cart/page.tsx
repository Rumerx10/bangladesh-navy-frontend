import { Metadata } from "next";
import Cart from "@/src/components/cart/Cart";

export const metadata: Metadata = {
  title: "Your Cart | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Review the items in your cart before checkout.",
};

const CartPage = () => {
  return <Cart />;
};

export default CartPage;
