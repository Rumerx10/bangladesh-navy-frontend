import { Metadata } from "next";
import ProductsManagement from "@/src/components/admin/ContentManagement/products/ProductsManagement";

export const metadata: Metadata = {
  title: "Products",
  description: "Manage nautical charts and product listings.",
};

const ProductsPage = () => {
  return <ProductsManagement />;
};

export default ProductsPage;
