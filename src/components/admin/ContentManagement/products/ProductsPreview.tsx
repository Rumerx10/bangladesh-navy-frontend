"use client";

import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Pencil } from "lucide-react";
import Paragraph from "@/src/components/shared/Paragraph";
import { IProductsManagement } from "./types";

interface ProductsPreviewProps {
  data: IProductsManagement;
  onEdit: () => void;
}

const SPEC_LABELS: Record<string, string> = {
  chartNumber: "Chart No.",
  scale: "Scale",
  projection: "Projection",
  northLatitude: "N. Latitude",
  southLatitude: "S. Latitude",
  eastLongitude: "E. Longitude",
  westLongitude: "W. Longitude",
  edition: "Edition",
  publicationDate: "Pub. Date",
};

const ProductsPreview = ({ data, onEdit }: ProductsPreviewProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-pBlue">{data.title}</h2>
            <Paragraph className="text-gray-500 mt-1">
              {data.subTitle}
            </Paragraph>
          </div>
          <Button
            onClick={onEdit}
            className="shrink-0 cursor-pointer bg-primary hover:bg-primary/90 text-white"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Category chips */}
        {data.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {data.categories.map((cat, i) => (
              <span
                key={i}
                className="text-sm bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.products.map((product, i) => {
          const hasSpecs = Object.values(product.specifications).some(
            (v) => v.trim() !== ""
          );

          return (
            <div
              key={i}
              className="border border-light-silver rounded-lg bg-white overflow-hidden"
            >
              {/* Product image */}
              {product.image && (
                <div className="relative w-full h-44">
                  <Image
                    src={typeof product.image === "string" ? product.image : ""}
                    alt={product.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <span className="absolute top-2 left-2 text-xs bg-primary text-white px-2.5 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              )}

              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-pBlue">{product.title}</h3>
                <Paragraph className="text-gray-500 text-sm">
                  {product.shortDescription}
                </Paragraph>

                {/* Specifications */}
                {hasSpecs && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <Paragraph className="text-xs font-semibold text-pBlue uppercase mb-2">
                      Specifications
                    </Paragraph>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                      {Object.entries(product.specifications).map(
                        ([key, val]) =>
                          val ? (
                            <div key={key} className="flex flex-col">
                              <span className="text-xs text-gray-400">
                                {SPEC_LABELS[key] || key}
                              </span>
                              <span className="text-xs font-medium text-gray-700">
                                {val}
                              </span>
                            </div>
                          ) : null
                      )}
                    </div>
                  </div>
                )}

                {product.description && (
                  <Paragraph className="text-gray-500 text-sm line-clamp-3">
                    {product.description}
                  </Paragraph>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPreview;
