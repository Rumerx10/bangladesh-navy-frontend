"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { ColumnDef } from "@/src/components/ui/data-table";
import { siteConfig } from "@/src/config/siteConfig";
import { IProduct, PRODUCT_CATEGORY_LABELS } from "../types";
import StatusBadge from "@/src/components/shared/Status/Status";
import { StatusType } from "@/src/components/shared/types/common";

export function GetProductColumns(
  onEdit: (item: IProduct) => void,
  onDelete?: (item: IProduct) => void
): ColumnDef<IProduct>[] {
  return [
    {
      header: "Image",
      accessorKey: "images",
      cell: (_, row) => {
        const src = row.images?.[0];
        return src ? (
          <div className="relative w-16 h-12 rounded overflow-hidden bg-gray-100">
            <Image src={src} alt="product" fill className="object-cover" />
          </div>
        ) : (
          <div className="w-16 h-12 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-400">
            No img
          </div>
        );
      },
    },
    {
      header: "Name (EN)",
      accessorKey: "nameEn",
      cell: (_, row) => (
        <span className="font-medium text-pBlue line-clamp-2 max-w-50">
          {row.nameEn}
        </span>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (_, row) => (
        <span className="text-sm text-gray-600">
          {row.category ? PRODUCT_CATEGORY_LABELS[row.category] : "—"}
        </span>
      ),
    },
    {
      header: "Chart Code",
      accessorKey: "chartCode",
      cell: (_, row) => (
        <span className="font-mono text-sm text-gray-700">
          {row.category === "TIDAL" ? "—" : (row.chartCode ?? "—")}
        </span>
      ),
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: (_, row) => (
        <span className="text-sm text-gray-700">
          {row.price != null ? `${siteConfig.currencySymbol}${row.price}` : "—"}
        </span>
      ),
    },
    {
      header: "Edition Date",
      accessorKey: "editionDate",
      cell: (_, row) => (
        <span className="text-sm text-gray-700">
          {row.editionDate
            ? new Date(row.editionDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "—"}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (value) => {
        return <StatusBadge status={value as StatusType} />;
      },
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (_, row) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(row)}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-pBlue transition-colors cursor-pointer"
            title="Edit"
            aria-label={`Edit ${row.nameEn}`}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete?.(row)}
            className="p-2 rounded-md hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
            title="Delete"
            aria-label={`Delete ${row.nameEn}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];
}
