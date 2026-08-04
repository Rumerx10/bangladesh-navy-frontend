"use client";

import { notFound } from "next/navigation";
import { useGet } from "@/src/hooks/useGet";
import ProductDetailLayout from "@/src/components/products/detail/ProductDetailLayout";
import { INavyProduct, ProductStatus } from "@/src/components/products/types";
import {
  IProduct,
  PRODUCT_CATEGORY_LABELS,
} from "@/src/components/admin/ContentManagement/products/types";

function adaptToNavyProduct(p: IProduct): INavyProduct {
  const categoryLabel = p.category
    ? PRODUCT_CATEGORY_LABELS[p.category]
    : "Tidal Product";

  return {
    id: p.id,
    nameEn: p.nameEn,
    nameBn: p.nameBn,
    images: p.images,
    descriptionEn: p.descriptionEn,
    descriptionBn: p.descriptionBn,
    price: p.price ?? 0,
    stock: 0,
    categoryId: p.category || "",
    status:
      p.status === "ACTIVE" ? ProductStatus.ACTIVE : ProductStatus.INACTIVE,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    category: {
      id: p.category || "",
      nameEn: categoryLabel,
      nameBn: categoryLabel,
      slug: "",
    },
    productAttributes: [],
  };
}

interface ProductDetailByChartProps {
  chartId: string;
}

export default function ProductDetailByChart({
  chartId,
}: ProductDetailByChartProps) {
  const { data, isLoading, isError } = useGet<IProduct>(
    `/product/${chartId}`,
    [`product-detail-${chartId}`]
  );

  if (isLoading) {
    return (
      <div className="container px-4 sm:px-6 lg:px-8 py-6 lg:py-8 mt-28 lg:mt-26">
        <div className="animate-pulse space-y-6">
          <div className="h-4 bg-gray-200 rounded w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square rounded-2xl bg-gray-200" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    notFound();
  }

  return <ProductDetailLayout product={adaptToNavyProduct(data.data)} />;
}
