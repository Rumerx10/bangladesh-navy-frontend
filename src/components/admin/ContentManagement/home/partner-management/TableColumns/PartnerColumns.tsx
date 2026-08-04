"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import { ColumnDef } from "@/src/components/ui/data-table";
import { IPartner } from "../types";

export function GetPartnerColumns(
  onEdit: (item: IPartner) => void
): ColumnDef<IPartner>[] {
  return [
    {
      header: "Logo",
      accessorKey: "image",
      cell: (_, row) => (
        <div className="relative w-16 h-12 rounded overflow-hidden bg-gray-100">
          <Image
            src={row.image}
            alt="partner"
            fill
            className="object-contain p-1"
          />
        </div>
      ),
    },
    {
      header: "Link",
      accessorKey: "link",
      cell: (_, row) => (
        <a
          href={row.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-60 truncate text-sm text-liteBlue hover:underline"
        >
          {row.link}
        </a>
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
