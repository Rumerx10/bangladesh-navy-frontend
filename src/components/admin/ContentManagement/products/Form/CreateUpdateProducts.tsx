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
      category: "",
      price: undefined,
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
      editionDate: "",
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
        category: initialValues.category || "",
        price: initialValues.price ?? undefined,
        chartCode:
          initialValues.chartCode != null
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
        editionDate: initialValues.editionDate
          ? initialValues.editionDate.split("T")[0]
          : "",
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
    formData.append("descriptionEn", values.descriptionEn || "");
    formData.append("descriptionBn", values.descriptionBn || "");
    if (values.category) {
      formData.append("category", values.category);
    }
    if (values.price !== undefined)
      formData.append("price", String(values.price));
    // chartCode is a numeric field server-side (@IsNumber()), so it can only
    // be sent as an actual numeric value, or explicitly empty to clear it.
    // Switching an existing paper/ENC product to Tidal needs that explicit
    // clear so the previously assigned chart code doesn't linger; a Tidal
    // product that never had one just omits the field.
    if (values.category === "TIDAL") {
      if (
        isUpdate &&
        initialValues?.chartCode !== null &&
        initialValues?.chartCode !== undefined
      ) {
        formData.append("chartCode", "");
      }
    } else if (values.chartCode) {
      formData.append("chartCode", String(values.chartCode));
    }
    formData.append("status", values.status || "ACTIVE");

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
    if (values.editionDate) formData.append("editionDate", values.editionDate);
    if (values.publicationDate)
      formData.append("publicationDate", values.publicationDate);

    // Only newly-added files are sent; untouched existing image URLs are
    // left off the payload entirely so the backend keeps them as-is
    // (the update DTO doesn't accept an "existingImages" field).
    (values.images || []).forEach((img) => {
      if (img instanceof File) {
        formData.append("images", img);
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
