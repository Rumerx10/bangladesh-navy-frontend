"use client";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePost } from "@/src/hooks/usePost";
import { usePatch } from "@/src/hooks/usePatch";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { productSchema, ProductFormValues } from "../Schema/productsSchema";
import { IProduct } from "../types";
import ProductForm from "./ProductsForm";

interface CreateUpdateProductProps {
  initialValues?: IProduct;
}

const CreateUpdateProduct = ({ initialValues }: CreateUpdateProductProps) => {
  const router = useRouter();
  const isUpdate = !!initialValues;

  const methods = useForm<ProductFormValues>({
    resolver: yupResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: {
      nameEn: "",
      nameBn: "",
      descriptionEn: "",
      descriptionBn: "",
      categoryId: "",
      chartCode: "",
      status: "ACTIVE",
      images: [],
      geographicLocation: "",
      scale: "",
      projection: "",
      northLatitude: "",
      southLatitude: "",
      eastLongitude: "",
      westLongitude: "",
      edition: "",
      publicationDate: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        nameEn: initialValues.nameEn || "",
        nameBn: initialValues.nameBn || "",
        descriptionEn: initialValues.descriptionEn || "",
        descriptionBn: initialValues.descriptionBn || "",
        categoryId: initialValues.category?.id || "",
        chartCode:
          initialValues.chartCode !== undefined
            ? String(initialValues.chartCode)
            : "",
        status: initialValues.status || "ACTIVE",
        images: initialValues.images || [],
        geographicLocation: initialValues.geographicLocation || "",
        scale: initialValues.scale || "",
        projection: initialValues.projection || "",
        northLatitude: initialValues.northLatitude || "",
        southLatitude: initialValues.southLatitude || "",
        eastLongitude: initialValues.eastLongitude || "",
        westLongitude: initialValues.westLongitude || "",
        edition: initialValues.edition || "",
        publicationDate: initialValues.publicationDate
          ? initialValues.publicationDate.split("T")[0]
          : "",
      });
    }
  }, [initialValues, methods]);

  const goToList = () => router.push("/admin/products");

  const {
    mutate: createMutate,
    isPending: isCreating,
    error,
  } = usePost(
    "/product",
    () => {
      toast.success("Product created successfully!");
      goToList();
    },
    [["product"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
  } = usePatch(() => {
    toast.success("Product updated successfully!");
    goToList();
  }, [["product"]]);

  const onSubmit = (values: ProductFormValues) => {
    const formData = new FormData();
    formData.append("nameEn", values.nameEn);
    formData.append("nameBn", values.nameBn || "");
    formData.append("descriptionEn", values.descriptionEn);
    formData.append("descriptionBn", values.descriptionBn || "");
    formData.append("categoryId", values.categoryId);
    formData.append("chartCode", String(values.chartCode));
    formData.append("status", values.status);

    if (values.geographicLocation)
      formData.append("geographicLocation", values.geographicLocation);
    if (values.scale) formData.append("scale", values.scale);
    if (values.projection) formData.append("projection", values.projection);
    if (values.northLatitude)
      formData.append("northLatitude", values.northLatitude);
    if (values.southLatitude)
      formData.append("southLatitude", values.southLatitude);
    if (values.eastLongitude)
      formData.append("eastLongitude", values.eastLongitude);
    if (values.westLongitude)
      formData.append("westLongitude", values.westLongitude);
    if (values.edition) formData.append("edition", values.edition);
    if (values.publicationDate)
      formData.append("publicationDate", values.publicationDate);

    (values.images || []).forEach((img) => {
      if (img instanceof File) {
        formData.append("images", img);
      } else if (typeof img === "string") {
        formData.append("existingImages", img);
      }
    });

    if (isUpdate && initialValues) {
      updateMutate({
        url: `/product/${initialValues.id}`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    } else {
      createMutate({
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <ProductForm
        isEditMode={isUpdate}
        onSubmit={onSubmit}
        onCancel={goToList}
        isPending={isCreating || isUpdating}
        error={error || updateError}
        initialValues={initialValues}
      />
    </FormProvider>
  );
};

export default CreateUpdateProduct;
