import { Metadata } from "next";
import Checkout from "@/src/components/checkout/Form/Checkout";

export const metadata: Metadata = {
  title: "Checkout | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Complete your order for nautical charts and publications.",
};

export default function CheckoutPage() {
  return <Checkout />;
}
