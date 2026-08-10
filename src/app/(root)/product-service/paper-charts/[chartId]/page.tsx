import { Metadata } from "next";
import ProductDetailByChart from "@/src/components/products/detail/ProductDetailByChart";
import { getProductMetadata } from "@/src/utils/getProductMetadata";

interface PaperChartDetailPageProps {
  params: Promise<{ chartId: string }>;
}

export async function generateMetadata({
  params,
}: PaperChartDetailPageProps): Promise<Metadata> {
  const { chartId } = await params;
  return getProductMetadata(chartId, "Paper Chart");
}

const PaperChartDetailPage = async ({ params }: PaperChartDetailPageProps) => {
  const { chartId } = await params;
  return <ProductDetailByChart chartId={chartId} />;
};

export default PaperChartDetailPage;
