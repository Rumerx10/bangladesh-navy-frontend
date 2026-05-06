import { INavyProductAttribute } from "@/src/components/products/types";

interface ProductAttributesProps {
  attributes: INavyProductAttribute[];
}

export default function ProductAttributes({ attributes }: ProductAttributesProps) {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      <h3 className="px-5 py-3 bg-gray-50 text-sm font-semibold text-[#001836] border-b border-gray-100">
        Specifications
      </h3>
      <div className="divide-y divide-gray-50">
        {attributes.map((attr) => (
          <div key={attr.id} className="flex px-5 py-3">
            <span className="w-40 shrink-0 text-sm text-gray-500 font-medium">
              {attr.key}
            </span>
            <span className="text-sm text-gray-800">{attr.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
