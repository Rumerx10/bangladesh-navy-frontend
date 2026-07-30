import CreateUpdateProduct from "@/src/components/admin/ContentManagement/products/Form/CreateUpdateProducts";
import AdminBackButton from "@/src/components/shared/AdminBackButton/AdminBackButton";

const CreateProductPage = () => {
  return (
    <div>
      <div className="mb-6">
        <AdminBackButton
          // routeURL="/admin/products"
          title="Add Product"
          desc="Add a new product to the catalog"
        />
      </div>
      <CreateUpdateProduct />
    </div>
  );
};

export default CreateProductPage;
