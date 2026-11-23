import { Metadata } from "next";
import { Suspense } from "react";
import CheckoutSuccessClient from "./CheckoutSuccessClient";

export const metadata: Metadata = {
  title: "Order Placed | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Your order has been placed successfully.",
};

// The client reads `?order=` with useSearchParams, which needs a Suspense
// boundary to keep the rest of the page statically renderable.
const CheckoutSuccessPage = () => {
  return (
    <Suspense>
      <CheckoutSuccessClient />
    </Suspense>
  );
};

export default CheckoutSuccessPage;
