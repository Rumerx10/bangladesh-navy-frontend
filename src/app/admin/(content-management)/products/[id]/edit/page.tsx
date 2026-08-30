import { Metadata } from "next";
import EditProductClient from "./EditProductClient";

export const metadata: Metadata = {
  title: "Update Product",
  description: "Edit an existing product listing.",
};

const EditProductPage = () => {
  return <EditProductClient />;
};

export default EditProductPage;
