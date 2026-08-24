import { Suspense } from "react";
import { Metadata } from "next";
import ProductListingPage from "@/src/components/products/ProductListingPage";

export const metadata: Metadata = {
  title:
    "Nautical Products & Services | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Explore the full range of nautical products and services from the Bangladesh Navy Hydrographic & Oceanographic Center, including paper charts, ENCs, tide tables, and more.",
};

const ProductServicePage = () => {
  // ProductListingPage reads `?category=` (the header dropdown links to it),
  // which needs a Suspense boundary to keep this route prerenderable.
  return (
    <Suspense>
      <ProductListingPage />
    </Suspense>
  );
};

export default ProductServicePage;
