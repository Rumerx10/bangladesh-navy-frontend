import { Metadata } from "next";
import ProductListingPage from "@/src/components/products/ProductListingPage";

export const metadata: Metadata = {
  title:
    "Products & Services | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Browse nautical charts, publications, and maritime services offered by the Bangladesh Navy Hydrographic & Oceanographic Center.",
};

export default function ProductsPage() {
  return <ProductListingPage />;
}
