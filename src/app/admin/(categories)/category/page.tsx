import { Metadata } from "next";
import CategoryList from "@/src/components/admin/Categories/CategoryList/CategoryList";

export const metadata: Metadata = {
  title: "Categories",
  description: "Manage product categories.",
};

const page = () => {
  return <CategoryList />;
};

export default page;
