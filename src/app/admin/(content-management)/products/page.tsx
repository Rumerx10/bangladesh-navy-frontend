import { Suspense } from "react";
import { Metadata } from "next";
import ProductsManagement from "@/src/components/admin/ContentManagement/products/ProductsManagement";

export const metadata: Metadata = {
  title: "Products",
  description: "Manage nautical charts and product listings.",
};

const ProductsPage = () => {
  // ProductsManagement keeps the category tab in `?category=`, which needs a
  // Suspense boundary to keep this route prerenderable.
  return (
    <Suspense>
      <ProductsManagement />
    </Suspense>
  );
};

export default ProductsPage;
