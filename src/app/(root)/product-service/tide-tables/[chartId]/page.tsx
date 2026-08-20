import { Metadata } from "next";
import { getProductMetadata } from "@/src/utils/getProductMetadata";
import ProductDetailByChart from "@/src/components/products/detail/ProductDetailByChart";

interface TideTableDetailPageProps {
  params: Promise<{ chartId: string }>;
}

export async function generateMetadata({
  params,
}: TideTableDetailPageProps): Promise<Metadata> {
  const { chartId } = await params;
  return getProductMetadata(chartId, "Tide Table");
}

const TideTableDetailPage = async ({ params }: TideTableDetailPageProps) => {
  const { chartId } = await params;
  return <ProductDetailByChart chartId={chartId} />;
};

export default TideTableDetailPage;
