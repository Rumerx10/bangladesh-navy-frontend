"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/src/components/ui/input";
import { useGet } from "@/src/hooks/useGet";
import { IProductAttribute } from "../types";
import { ProductFormValues } from "../Schema/productsSchema";

interface ProductAttributesFieldProps {
  existingAttributes?: IProductAttribute[];
}

export default function ProductAttributesField({
  existingAttributes,
}: ProductAttributesFieldProps) {
  const { setValue } = useFormContext<ProductFormValues>();

  const { data: attrData } = useGet<IProductAttribute[]>(
    "/product/attributes",
    ["product-attributes"]
  );

  const knownKeys = useMemo(() => {
    const all = Array.isArray(attrData?.data) ? attrData.data : [];
    return [...new Set(all.map((a) => a.key))];
  }, [attrData]);

  const [predefinedValues, setPredefinedValues] = useState<
    Record<string, string>
  >({});
  const [customAttrs, setCustomAttrs] = useState<
    { key: string; value: string }[]
  >([]);
  const [pendingKey, setPendingKey] = useState("");
  const [pendingValue, setPendingValue] = useState("");
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    if (!knownKeys.length || initialised) return;
    setInitialised(true);

    const predefined: Record<string, string> = {};
    const custom: { key: string; value: string }[] = [];

    (existingAttributes || []).forEach((attr) => {
      if (knownKeys.includes(attr.key)) {
        predefined[attr.key] = attr.value;
      } else {
        custom.push({ key: attr.key, value: attr.value });
      }
    });

    setPredefinedValues(predefined);
    setCustomAttrs(custom);
  }, [knownKeys, existingAttributes, initialised]);

  const sync = (
    pred: Record<string, string>,
    custom: { key: string; value: string }[]
  ) => {
    const combined = [
      ...Object.entries(pred)
        .filter(([, v]) => v.trim())
        .map(([k, v]) => ({ key: k, value: v })),
      ...custom,
    ];
    setValue("productAttributes", combined as ProductFormValues["productAttributes"]);
  };

  const handlePredefinedChange = (key: string, value: string) => {
    const updated = { ...predefinedValues, [key]: value };
    setPredefinedValues(updated);
    sync(updated, customAttrs);
  };

  const handleAddCustom = () => {
    if (!pendingKey.trim() || !pendingValue.trim()) return;
    const updated = [
      ...customAttrs,
      { key: pendingKey.trim(), value: pendingValue.trim() },
    ];
    setCustomAttrs(updated);
    sync(predefinedValues, updated);
    setPendingKey("");
    setPendingValue("");
  };

  const handleRemoveCustom = (index: number) => {
    const updated = customAttrs.filter((_, i) => i !== index);
    setCustomAttrs(updated);
    sync(predefinedValues, updated);
  };

  const canAdd = pendingKey.trim().length > 0 && pendingValue.trim().length > 0;

  return (
    <div className="space-y-3">
      {/* Predefined attribute key rows */}
      {knownKeys.map((key) => (
        <div key={key} className="flex items-center gap-3">
          <span className="w-36 shrink-0 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md px-3 h-10 flex items-center">
            {key}
          </span>
          <Input
            value={predefinedValues[key] || ""}
            onChange={(e) => handlePredefinedChange(key, e.target.value)}
            placeholder={`Enter ${key.toLowerCase()}...`}
            className="bg-light shadow-none flex-1"
          />
        </div>
      ))}

      {/* Filled custom attrs */}
      {customAttrs.map((attr, i) => (
        <div key={i} className="flex items-center gap-3">
          <Input
            value={attr.key}
            readOnly
            className="bg-gray-50 shadow-none w-36 shrink-0 text-gray-700"
          />
          <Input
            value={attr.value}
            readOnly
            className="bg-gray-50 shadow-none flex-1 text-gray-700"
          />
          <button
            type="button"
            onClick={() => handleRemoveCustom(i)}
            className="flex items-center justify-center h-10 w-10 rounded-md border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      {/* Pending custom row */}
      <div className="flex items-center gap-3">
        <Input
          value={pendingKey}
          onChange={(e) => setPendingKey(e.target.value)}
          placeholder="Key (e.g. Color)"
          className="bg-light shadow-none w-36 shrink-0"
        />
        <Input
          value={pendingValue}
          onChange={(e) => setPendingValue(e.target.value)}
          placeholder="Value (e.g. Red)"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddCustom();
            }
          }}
          className="bg-light shadow-none flex-1"
        />
        <button
          type="button"
          onClick={handleAddCustom}
          disabled={!canAdd}
          title={canAdd ? "Add attribute" : "Fill both fields first"}
          className="flex items-center justify-center h-10 w-10 rounded-md bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
