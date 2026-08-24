import { IProduct } from "@/src/components/admin/ContentManagement/products/types";

interface ProductKeyFeaturesProps {
  product: IProduct;
}

const ProductKeyFeatures = ({ product }: ProductKeyFeaturesProps) => {
  const coordinates = [
    product.northLatitude && `N ${product.northLatitude}`,
    product.southLatitude && `S ${product.southLatitude}`,
    product.eastLongitude && `E ${product.eastLongitude}`,
    product.westLongitude && `W ${product.westLongitude}`,
  ]
    .filter(Boolean)
    .join(" · ");

  const features = [
    { label: "Chart Code", value: product.chartCode },
    { label: "Scale", value: product.scale },
    { label: "Projection", value: product.projection },
    { label: "Geographic Location", value: product.geographicLocation },
    { label: "Coordinates", value: coordinates },
    { label: "Edition", value: product.edition },
    {
      label: "Edition Date",
      value: product.editionDate
        ? new Date(product.editionDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : undefined,
    },
    {
      label: "Publication Date",
      value: product.publicationDate
        ? new Date(product.publicationDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : undefined,
    },
  ].filter((feature) => feature.value !== undefined && feature.value !== "");

  if (features.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      <h3 className="px-5 py-3 bg-gray-50 text-sm font-semibold text-liteBlue border-b border-gray-100">
        Key Features
      </h3>
      <div className="divide-y divide-gray-50">
        {features.map((feature) => (
          <div key={feature.label} className="flex px-5 py-3">
            <span className="w-44 shrink-0 text-sm text-gray-500 font-medium">
              {feature.label}
            </span>
            <span className="text-sm text-gray-800">{feature.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductKeyFeatures;
