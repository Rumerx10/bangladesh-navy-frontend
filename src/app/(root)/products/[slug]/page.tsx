"use client";

import { use } from "react";
import ProductDetailByChart from "@/src/components/products/detail/ProductDetailByChart";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);
  return <ProductDetailByChart chartId={slug} />;
}
