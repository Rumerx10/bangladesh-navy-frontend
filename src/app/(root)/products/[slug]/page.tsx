import { findProductBySlug } from "@/src/data/navyProducts";
import ProductDetailLayout from "@/src/components/products/detail/ProductDetailLayout";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = findProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailLayout product={product} />;
}
