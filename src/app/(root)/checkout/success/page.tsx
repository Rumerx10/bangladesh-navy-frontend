import { Metadata } from "next";
import CheckoutSuccessClient from "./CheckoutSuccessClient";

export const metadata: Metadata = {
  title: "Order Placed | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Your order has been placed successfully.",
};

const CheckoutSuccessPage = () => {
  return <CheckoutSuccessClient />;
};

export default CheckoutSuccessPage;
