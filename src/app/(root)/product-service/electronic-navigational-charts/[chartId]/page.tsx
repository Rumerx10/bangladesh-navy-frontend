import { Metadata } from "next";
import ProductDetailByChart from "@/src/components/products/detail/ProductDetailByChart";
import { getProductMetadata } from "@/src/utils/getProductMetadata";

interface EncDetailPageProps {
  params: Promise<{ chartId: string }>;
}

export async function generateMetadata({
  params,
}: EncDetailPageProps): Promise<Metadata> {
  const { chartId } = await params;
  return getProductMetadata(chartId, "Electronic Navigational Chart");
}

const EncDetailPage = async ({ params }: EncDetailPageProps) => {
  const { chartId } = await params;
  return <ProductDetailByChart chartId={chartId} />;
};

export default EncDetailPage;
