"use client";

import { use } from "react";
import ProductDetailByChart from "@/src/components/products/detail/ProductDetailByChart";

interface PaperChartDetailPageProps {
  params: Promise<{ chartId: string }>;
}

const PaperChartDetailPage = ({ params }: PaperChartDetailPageProps) => {
  const { chartId } = use(params);
  return <ProductDetailByChart chartId={chartId} />;
};

export default PaperChartDetailPage;
