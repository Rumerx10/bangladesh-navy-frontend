"use client";

import { notFound } from "next/navigation";
import { useGet } from "@/src/hooks/useGet";
import ProductDetailLayout from "@/src/components/products/detail/ProductDetailLayout";
import { INavyProduct, ProductStatus } from "@/src/components/products/types";
import {
  IProduct,
  PRODUCT_CATEGORY_LABELS,
} from "@/src/components/admin/ContentManagement/products/types";
import Container from "@/src/components/shared/Container";

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
    // INavyProduct.price is in poysha (formatPrice divides by 100); the real
    // backend stores a flat BDT amount, so scale it up to match.
    price: (p.price ?? 0) * 100,
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

const ProductDetailByChart = ({ chartId }: ProductDetailByChartProps) => {
  const { data, isLoading, isError } = useGet<IProduct>(`/product/${chartId}`, [
    `product-detail-${chartId}`,
  ]);

  if (isLoading) {
    return (
      <Container className="py-6 lg:py-8 mt-24 lg:mt-20">
        <div className="animate-pulse space-y-6">
          <div className="h-4 bg-light-silver rounded w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square rounded-2xl bg-light-silver" />
            <div className="space-y-4">
              <div className="h-8 bg-light-silver rounded w-3/4" />
              <div className="h-4 bg-light-silver rounded w-1/2" />
              <div className="h-24 bg-light-silver rounded" />
            </div>
          </div>
        </div>
      </Container>
    );
  }

  // An inactive product is withdrawn from the public site, so a direct link
  // to it lands on the 404 like any other missing page.
  if (isError || !data?.data || data.data.status === "INACTIVE") {
    notFound();
  }

  return (
    <ProductDetailLayout
      product={adaptToNavyProduct(data.data)}
      chartDetails={data.data}
    />
  );
};

export default ProductDetailByChart;
