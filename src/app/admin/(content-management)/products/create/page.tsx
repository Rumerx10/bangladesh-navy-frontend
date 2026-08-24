import { Metadata } from "next";
import CreateUpdateProduct from "@/src/components/admin/ContentManagement/products/Form/CreateUpdateProducts";
import AdminBackButton from "@/src/components/shared/AdminBackButton/AdminBackButton";

export const metadata: Metadata = {
  title: "Add Product",
  description: "Add a new product to the catalog.",
};

const CreateProductPage = () => {
  return (
    <div>
      <div className="mb-6">
        <AdminBackButton
          title="Add Product"
          desc="Add a new product to the catalog"
        />
      </div>
      <CreateUpdateProduct />
    </div>
  );
};

export default CreateProductPage;
