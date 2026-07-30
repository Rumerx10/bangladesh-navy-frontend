"use client";

import { useParams } from "next/navigation";
import { useGet } from "@/src/hooks/useGet";
import AdminBackButton from "@/src/components/shared/AdminBackButton/AdminBackButton";
import CreateUpdateProduct from "@/src/components/admin/ContentManagement/products/Form/CreateUpdateProducts";
import ProductFormSkeleton from "@/src/components/admin/ContentManagement/products/Skeleton/ProductFormSkeleton";
import { IProduct } from "@/src/components/admin/ContentManagement/products/types";

const EditProductPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading } = useGet<IProduct>(`/product/${id}`, [
    "product",
    id,
  ]);

  return (
    <div>
      <div className="mb-6">
        <AdminBackButton
          routeURL="/admin/products"
          title="Update Product"
          desc="Update product information"
        />
      </div>
      {isLoading ? (
        <ProductFormSkeleton />
      ) : (
        <CreateUpdateProduct initialValues={data?.data} />
      )}
    </div>
  );
};

export default EditProductPage;
