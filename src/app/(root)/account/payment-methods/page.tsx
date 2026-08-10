import { Metadata } from "next";
import PaymentMethodsClient from "./PaymentMethodsClient";

export const metadata: Metadata = {
  title:
    "Payment Methods | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Manage your saved payment methods.",
};

export default function PaymentMethodsPage() {
  return <PaymentMethodsClient />;
}
