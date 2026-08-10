import { Metadata } from "next";
import CheckoutFailClient from "./CheckoutFailClient";

export const metadata: Metadata = {
  title: "Payment Failed | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "There was a problem processing your payment.",
};

export default function CheckoutFailPage() {
  return <CheckoutFailClient />;
}
