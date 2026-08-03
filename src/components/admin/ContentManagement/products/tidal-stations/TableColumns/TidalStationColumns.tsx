"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { ITidalStation } from "../types";

export function GetTidalStationColumns(
  onEdit: (item: ITidalStation) => void,
  onDelete: (id: string) => void
): ColumnDef<ITidalStation>[] {
  return [
    {
      header: "General Area",
      accessorKey: "generalArea",
      cell: (_, row) => (
        <span className="font-medium text-pBlue line-clamp-2 max-w-45">
          {row.generalArea}
        </span>
      ),
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: (_, row) => (
        <span className="text-gray-600 line-clamp-2 max-w-45">
          {row.location}
        </span>
      ),
    },
    {
      header: "Coordinates",
      accessorKey: "latitude",
      cell: (_, row) => (
        <span className="font-mono text-xs text-gray-600">
          {row.latitude}, {row.longitude}
        </span>
      ),
    },
    {
      header: "Product",
      accessorKey: "product",
      cell: (_, row) => (
        <span className="text-sm text-gray-600">
          {row.product?.nameEn || "—"}
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
      cell: (_value, row) => (
        <div className="flex items-center gap-2 w-full">
          <Button
            className="w-9! min-h-9 border border-[#E6E6E6] flex items-center justify-center rounded-lg bg-light hover:bg-light"
            size="sm"
            onClick={() => onEdit(row)}
          >
            <Pencil className="h-4 w-4 text-secondary-foreground" />
          </Button>
          <Button
            className="w-9! min-h-9 border border-[#E6E6E6] flex items-center justify-center rounded-lg bg-light hover:bg-light"
            size="sm"
            onClick={() => onDelete(row.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];
}
