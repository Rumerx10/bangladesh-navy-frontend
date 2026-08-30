import { Metadata } from "next";
import ProductDetailByChart from "@/src/components/products/detail/ProductDetailByChart";
import { getProductMetadata } from "@/src/utils/getProductMetadata";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return getProductMetadata(slug, "Products");
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { slug } = await params;
  return <ProductDetailByChart chartId={slug} />;
};

export default ProductDetailPage;
