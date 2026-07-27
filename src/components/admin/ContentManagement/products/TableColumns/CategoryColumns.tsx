"use client";

import { Pencil } from "lucide-react";
import { ColumnDef } from "@/src/components/ui/data-table";
import { IProductCategory } from "../types";

export function GetCategoryColumns(
  onEdit: (item: IProductCategory) => void
): ColumnDef<IProductCategory>[] {
  return [
    {
      header: "Name (EN)",
      accessorKey: "nameEn",
      cell: (_, row) => (
        <span className="font-medium text-pBlue">{row.nameEn}</span>
      ),
    },
    {
      header: "Name (BN)",
      accessorKey: "nameBn",
      cell: (_, row) => <span className="text-gray-600">{row.nameBn}</span>,
    },
    {
      header: "Description (EN)",
      accessorKey: "descriptionEn",
      cell: (_, row) => (
        <span className="text-sm text-gray-500 line-clamp-2 max-w-64">
          {row.descriptionEn}
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
