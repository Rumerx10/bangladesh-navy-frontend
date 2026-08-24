import { Metadata } from "next";
import { getProductMetadata } from "@/src/utils/getProductMetadata";
import ProductDetailByChart from "@/src/components/products/detail/ProductDetailByChart";


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
