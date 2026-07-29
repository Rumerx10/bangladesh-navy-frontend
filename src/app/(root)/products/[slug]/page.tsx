"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useGet } from "@/src/hooks/useGet";
import ProductDetailLayout from "@/src/components/products/detail/ProductDetailLayout";
import { INavyProduct, ProductStatus } from "@/src/components/products/types";
import { IProduct } from "@/src/components/admin/ContentManagement/products/types";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

function adaptToNavyProduct(p: IProduct): INavyProduct {
  return {
    id: p.id,
    nameEn: p.nameEn,
    nameBn: p.nameBn,
    images: p.images,
    descriptionEn: p.descriptionEn,
    descriptionBn: p.descriptionBn,
    price: 0,
    stock: 0,
    categoryId: p.category?.id || "",
    status:
      p.status === "ACTIVE" ? ProductStatus.ACTIVE : ProductStatus.INACTIVE,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
    category: {
      id: p.category?.id || "",
      nameEn: p.category?.nameEn || "",
      nameBn: p.category?.nameBn || "",
      slug: "",
    },
    productAttributes: (p.productAttributes || []).map((a) => ({
      id: a.id,
      productId: p.id,
      key: a.key,
      value: a.value,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    })),
  };
}

function ProductDetailContent({ slug }: { slug: string }) {
  const { data, isLoading, isError } = useGet<IProduct>(`/product/${slug}`, [
    `product-detail-${slug}`,
  ]);

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

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);
  return <ProductDetailContent slug={slug} />;
}
