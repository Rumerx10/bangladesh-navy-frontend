"use client";

import { use } from "react";
import ProductDetailByChart from "@/src/components/products/detail/ProductDetailByChart";

interface EncDetailPageProps {
  params: Promise<{ chartId: string }>;
}

const EncDetailPage = ({ params }: EncDetailPageProps) => {
  const { chartId } = use(params);
  return <ProductDetailByChart chartId={chartId} />;
};

export default EncDetailPage;
