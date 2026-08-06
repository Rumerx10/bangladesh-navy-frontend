"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import { ColumnDef } from "@/src/components/ui/data-table";
import { siteConfig } from "@/src/config/siteConfig";
import { IProduct, PRODUCT_CATEGORY_LABELS } from "../types";

export function GetProductColumns(
  onEdit: (item: IProduct) => void
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
      header: "Name (BN)",
      accessorKey: "nameBn",
      cell: (_, row) => (
        <span className="text-gray-600 line-clamp-2 max-w-45">
          {row.nameBn}
        </span>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (_, row) => (
        <span className="text-sm text-gray-600">
          {row.category
            ? PRODUCT_CATEGORY_LABELS[row.category]
            : row.isTidal
              ? "Tidal Product"
              : "—"}
        </span>
      ),
    },
    {
      header: "Tidal",
      accessorKey: "isTidal",
      cell: (_, row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.isTidal
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {row.isTidal ? "Yes" : "No"}
        </span>
      ),
    },
    {
      header: "Chart Code",
      accessorKey: "chartCode",
      cell: (_, row) => (
        <span className="font-mono text-sm text-gray-700">{row.chartCode}</span>
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
      header: "Status",
      accessorKey: "status",
      cell: (_, row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (_, row) => (
        <button
          onClick={() => onEdit(row)}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-pBlue transition-colors cursor-pointer"
          title="Edit"
        >
          <Pencil className="w-4 h-4" />
        </button>
      ),
    },
  ];
}
