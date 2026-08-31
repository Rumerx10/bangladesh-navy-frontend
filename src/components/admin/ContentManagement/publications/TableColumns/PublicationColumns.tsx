"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { ColumnDef } from "@/src/components/ui/data-table";
import { IPublication } from "@/src/data/publications";

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export function GetPublicationColumns(
  onEdit: (item: IPublication) => void,
  onDelete: (item: IPublication) => void
): ColumnDef<IPublication>[] {
  return [
    {
      header: "Image",
      accessorKey: "image",
      cell: (_, row) => (
        <div className="relative w-16 h-12 rounded overflow-hidden bg-gray-100">
          <Image
            src={row.image}
            alt={row.title}
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      header: "Title",
      accessorKey: "title",
      cell: (_, row) => (
        <span className="line-clamp-2 max-w-70 font-medium text-gray-800">
          {row.title}
        </span>
      ),
    },
    {
      header: "Code",
      accessorKey: "code",
      cell: (_, row) => (
        <span className="font-mono text-sm text-gray-700">{row.code}</span>
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: (_, row) => (
        <span className="text-sm text-gray-600">{formatDate(row.date)}</span>
      ),
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (_, row) => (
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(row)}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-pBlue transition-colors cursor-pointer"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(row)}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];
}
