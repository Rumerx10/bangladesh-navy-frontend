import { INavyProductAttribute } from "@/src/components/products/types";

interface ProductAttributesProps {
  attributes: INavyProductAttribute[];
}

const ProductAttributes = ({ attributes }: ProductAttributesProps) => {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <h3 className="px-5 py-3 bg-light text-sm font-semibold text-liteBlue border-b border-border">
        Specifications
      </h3>
      <div className="divide-y divide-border">
        {attributes.map((attr) => (
          <div key={attr.id} className="flex px-5 py-3">
            <span className="w-40 shrink-0 text-sm text-secondary-foreground font-medium">
              {attr.key}
            </span>
            <span className="text-sm text-foreground">{attr.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAttributes;
