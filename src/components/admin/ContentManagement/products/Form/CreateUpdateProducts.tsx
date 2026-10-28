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

/**
 * Stand-in for "cleared". The API drops `""` on update (the old description
 * survives), but accepts a lone space. Remove once the backend treats `""` as
 * a real value.
 */
const CLEARED_TEXT = " ";

const descriptionPayload = (next?: string, previous?: string | null) => {
  const value = next?.trim() ?? "";
  if (value) return value;
  return previous?.trim() ? CLEARED_TEXT : "";
};

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
        // Trimmed so a description cleared via CLEARED_TEXT (below) loads
        // back as an empty field rather than a lone space.
        descriptionEn: initialValues.descriptionEn?.trim() || "",
        descriptionBn: initialValues.descriptionBn?.trim() || "",
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

  // Back to the list on the product's own category tab, so editing a run of
  // charts doesn't mean re-picking the tab every time.
  const goToList = () => {
    const category = methods.getValues("category");
    router.push(
      category ? `/admin/products?category=${category}` : "/admin/products"
    );
  };

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
    [["product"], ["product-public"], ["product-inactive"]]
  );

  const {
    mutate: updateMutate,
    isPending: isUpdating,
    error: updateError,
  } = usePatch(() => {
    toast.success("Product updated successfully!");
    goToList();
  }, [
    ["product"],
    // The public listing and the map pages' inactive filter follow status.
    ["product-public"],
    ["product-inactive"],
    // Public detail page caches under its own key; refresh it too.
    [`product-detail-${initialValues?.id}`],
  ]);

  const onSubmit = (values: ProductFormValues) => {
    const formData = new FormData();
    formData.append("nameEn", values.nameEn);
    formData.append("nameBn", values.nameBn || "");

    // The API ignores an empty-string description on PATCH and keeps the old
    // text, so erasing an existing description sends CLEARED_TEXT instead.
    // Every reader trims, so it displays as "no description".
    formData.append(
      "descriptionEn",
      descriptionPayload(values.descriptionEn, initialValues?.descriptionEn)
    );
    formData.append(
      "descriptionBn",
      descriptionPayload(values.descriptionBn, initialValues?.descriptionBn)
    );

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
    // left off the payload entirely and kept as-is by the backend.
    (values.images || []).forEach((img) => {
      if (img instanceof File) {
        formData.append("images", img);
      }
    });

    if (isUpdate && initialValues) {
      // Existing image URLs removed by the user in this session are sent via
      // deleteImages so the backend actually removes them instead of just
      // leaving them out of the response.
      const remainingUrls = new Set(
        (values.images || []).filter(
          (img): img is string => typeof img === "string"
        )
      );
      (initialValues.images || [])
        .filter((url) => !remainingUrls.has(url))
        .forEach((url) => formData.append("deleteImages", url));

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
