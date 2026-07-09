"use client";

import { useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import CreateUpdateProducts from "./Form/CreateUpdateProducts";
import { IProductsManagement } from "./types";
import ProductsPreview from "./ProductsPreview";
import ProductsPreviewSkeleton from "./Skeleton/ProductsPreviewSkeleton";

const DUMMY_PRODUCTS_DATA: IProductsManagement = {
  id: "dummy-products-123",
  title: "Products & Services",
  subTitle:
    "Hydrographic charts, publications and maritime services by Bangladesh Navy",
  categories: ["Paper Charts", "ENC", "Publications", "Maritime Services"],
  products: [
    {
      image:
        "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800",
      title: "Bay of Bengal Coastal Chart",
      category: "Paper Charts",
      shortDescription:
        "Detailed nautical chart covering the coastal waters of the Bay of Bengal, essential for safe navigation.",
      specifications: {
        chartNumber: "INT 702",
        scale: "1:25,000",
        projection: "Mercator",
        northLatitude: "22°45'N",
        southLatitude: "21°30'N",
        eastLongitude: "91°00'E",
        westLongitude: "90°00'E",
        edition: "3rd Edition",
        publicationDate: "January 2024",
      },
      description:
        "This comprehensive nautical chart provides detailed information for mariners navigating the coastal waters of the Bay of Bengal. Published by the Hydrographic Department of Bangladesh Navy, it includes depth soundings, navigational hazards, port information, and anchorage areas.",
    },
    {
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      title: "Electronic Navigational Chart – Chittagong Port",
      category: "ENC",
      shortDescription:
        "Official Electronic Navigational Chart for Chittagong Port and surrounding waters, compatible with ECDIS systems.",
      specifications: {
        chartNumber: "BD-ENC-001",
        scale: "1:10,000",
        projection: "Mercator",
        northLatitude: "22°23'N",
        southLatitude: "22°15'N",
        eastLongitude: "91°52'E",
        westLongitude: "91°44'E",
        edition: "1st Edition",
        publicationDate: "March 2024",
      },
      description:
        "An authoritative ENC for Chittagong Port, covering the main channel, berths, and anchorages. Fully S-57 compliant and suitable for use with all major ECDIS platforms.",
    },
  ],
};

const ProductsManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data, isLoading } = useGet<IProductsManagement>(`/products-content`, [
    "products-content",
  ]);

  const productsData = data?.data || DUMMY_PRODUCTS_DATA;

  if (isLoading) {
    return <ProductsPreviewSkeleton />;
  }

  if (productsData && !isEditMode) {
    return (
      <ProductsPreview data={productsData} onEdit={() => setIsEditMode(true)} />
    );
  }

  return (
    <CreateUpdateProducts
      initialValues={productsData}
      onSuccess={() => setIsEditMode(false)}
      onCancel={() => setIsEditMode(false)}
    />
  );
};

export default ProductsManagement;
