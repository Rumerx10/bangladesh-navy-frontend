"use client";

import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { siteConfig } from "@/src/config/siteConfig";
import { IProduct, PRODUCT_CATEGORY_LABELS } from "../types";

export function GetProductColumns(
  onEdit: (item: IProduct) => void,
  onDelete?: (item: IProduct) => void,
  onView?: (item: IProduct) => void
): ColumnDef<IProduct>[] {
  return [
    {
      header: "Image",
      accessorKey: "images",
      cell: (_, row) => {
        const src = row.images?.[0];
        return src ? (
          <div className="relative w-16 h-12 rounded overflow-hidden bg-light-dark">
            <Image src={src} alt="product" fill className="object-cover" />
          </div>
        ) : (
          <div className="w-16 h-12 rounded bg-light-dark flex items-center justify-center text-xs text-muted-foreground">
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
        <span className="text-sm text-secondary-foreground">
          {row.category ? PRODUCT_CATEGORY_LABELS[row.category] : "—"}
        </span>
      ),
    },
    {
      header: "Chart Code",
      accessorKey: "chartCode",
      cell: (_, row) => (
        <span className="font-mono text-sm text-foreground">
          {row.category === "TIDAL" ? "—" : (row.chartCode ?? "—")}
        </span>
      ),
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: (_, row) => (
        <span className="text-sm text-foreground">
          {row.price != null ? `${siteConfig.currencySymbol}${row.price}` : "—"}
        </span>
      ),
    },
    {
      header: "Edition Date",
      accessorKey: "editionDate",
      cell: (_, row) => (
        <span className="text-sm text-foreground">
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
      cell: (_, row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-light-dark text-secondary-foreground"
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
        <div className="flex items-center gap-2 w-full">
          <Button
            className="w-9! min-h-9 border border-border flex items-center justify-center rounded-lg bg-transparent hover:bg-light"
            size="sm"
            onClick={() => onView?.(row)}
            title="View"
            aria-label={`View ${row.nameEn}`}
          >
            <Eye className="h-4 w-4 text-secondary-foreground" />
          </Button>
          <Button
            className="w-9! min-h-9 border border-border flex items-center justify-center rounded-lg bg-transparent hover:bg-light"
            size="sm"
            onClick={() => onEdit(row)}
            title="Edit"
            aria-label={`Edit ${row.nameEn}`}
          >
            <Pencil className="h-4 w-4 text-secondary-foreground" />
          </Button>
          <Button
            className="w-9! min-h-9 border border-border flex items-center justify-center rounded-lg bg-transparent hover:bg-light"
            size="sm"
            onClick={() => onDelete?.(row)}
            title="Delete"
            aria-label={`Delete ${row.nameEn}`}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];
}
