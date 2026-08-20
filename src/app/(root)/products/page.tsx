import { Suspense } from "react";
import { Metadata } from "next";
import ProductListingPage from "@/src/components/products/ProductListingPage";

export const metadata: Metadata = {
  title:
    "Products & Services | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Browse nautical charts, publications, and maritime services offered by the Bangladesh Navy Hydrographic & Oceanographic Center.",
};

export default function ProductsPage() {
  // ProductListingPage reads `?category=`, which needs a Suspense boundary to
  // keep this route prerenderable.
  return (
    <Suspense>
      <ProductListingPage />
    </Suspense>
  );
}
