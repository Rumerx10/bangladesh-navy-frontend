import { Suspense } from "react";
import ProductServiceLayout from "@/src/components/products/ProductServiceLayout";

export default function ProductServicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProductServiceLayout />
    </Suspense>
  );
}
