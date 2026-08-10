import { Metadata } from "next";
import ProductListingPage from "@/src/components/products/ProductListingPage";

export const metadata: Metadata = {
  title:
    "Nautical Products & Services | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Explore the full range of nautical products and services from the Bangladesh Navy Hydrographic & Oceanographic Center, including paper charts, ENCs, tide tables, and more.",
};

export default function ProductServicePage() {
  return <ProductListingPage />;
}
