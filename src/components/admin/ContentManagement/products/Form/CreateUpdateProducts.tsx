"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ProductsForm from "./ProductsForm";
import { productsSchema, ProductsSchemaForm } from "../Schema/productsSchema";
import { IProductsManagement } from "../types";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";

interface CreateUpdateProductsProps {
  initialValues?: IProductsManagement;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateUpdateProducts = ({
  initialValues,
  onSuccess,
  onCancel,
}: CreateUpdateProductsProps) => {
  const isEditMode = !!initialValues?.title;

  const methods = useForm<ProductsSchemaForm>({
    resolver: yupResolver(productsSchema),
    defaultValues: {
      title: initialValues?.title || "",
      subTitle: initialValues?.subTitle || "",
      categories: initialValues?.categories || [],
      products: initialValues?.products || [],
    },
  });

  const { mutate: createProducts, isPending: isCreating } = usePost<{
    data: IProductsManagement;
  }>(
    "/products-content",
    () => {
      onSuccess?.();
    },
    [["products-content"]]
  );

  const { mutate: updateProducts, isPending: isUpdating } = usePatch<{
    data: IProductsManagement;
  }>(
    () => {
      onSuccess?.();
    },
    [["products-content"]],
    "/products-content"
  );

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: ProductsSchemaForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subTitle", data.subTitle);

    (data.categories || []).forEach((cat, i) => {
      formData.append(`categories[${i}]`, cat);
    });

    data.products.forEach((product, i) => {
      formData.append(`products[${i}][title]`, product.title);
      formData.append(`products[${i}][category]`, product.category);
      formData.append(
        `products[${i}][shortDescription]`,
        product.shortDescription
      );
      formData.append(`products[${i}][description]`, product.description);

      const specs = product.specifications;
      formData.append(
        `products[${i}][specifications][chartNumber]`,
        specs.chartNumber || ""
      );
      formData.append(
        `products[${i}][specifications][scale]`,
        specs.scale || ""
      );
      formData.append(
        `products[${i}][specifications][projection]`,
        specs.projection || ""
      );
      formData.append(
        `products[${i}][specifications][northLatitude]`,
        specs.northLatitude || ""
      );
      formData.append(
        `products[${i}][specifications][southLatitude]`,
        specs.southLatitude || ""
      );
      formData.append(
        `products[${i}][specifications][eastLongitude]`,
        specs.eastLongitude || ""
      );
      formData.append(
        `products[${i}][specifications][westLongitude]`,
        specs.westLongitude || ""
      );
      formData.append(
        `products[${i}][specifications][edition]`,
        specs.edition || ""
      );
      formData.append(
        `products[${i}][specifications][publicationDate]`,
        specs.publicationDate || ""
      );

      if (product.image instanceof File) {
        formData.append(`products[${i}][image]`, product.image);
      } else if (typeof product.image === "string" && product.image.trim()) {
        formData.append(`products[${i}][existingImage]`, product.image);
      }
    });

    if (isEditMode && initialValues?.id) {
      updateProducts({
        url: `/products-content/${initialValues.id}`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    } else {
      createProducts({
        endpoint: "/products-content",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    }
  };

  const handleCancel = () => {
    methods.reset();
    onCancel?.();
  };

  return (
    <FormProvider {...methods}>
      <ProductsForm
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        isPending={isPending}
        onCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default CreateUpdateProducts;
