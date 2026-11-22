"use client";

import Image from "next/image";
import { Eye, Pencil } from "lucide-react";
import { ColumnDef } from "@/src/components/ui/data-table";
import { IPartner } from "../types";

export function GetPartnerColumns(
  onEdit: (item: IPartner) => void,
  onView?: (item: IPartner) => void
): ColumnDef<IPartner>[] {
  return [
    {
      header: "Logo",
      accessorKey: "image",
      cell: (_, row) => (
        <div className="relative w-16 h-12 rounded overflow-hidden bg-light-dark">
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
      cell: (_, row) =>
        row.link ? (
          <a
            href={row.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-60 truncate text-sm text-liteBlue hover:underline"
          >
            {row.link}
          </a>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
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
        <div className="flex items-center gap-1">
          <button
            onClick={() => onView?.(row)}
            className="p-2 rounded-md hover:bg-light-dark text-secondary-foreground hover:text-pBlue transition-colors cursor-pointer"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(row)}
            className="p-2 rounded-md hover:bg-light-dark text-secondary-foreground hover:text-pBlue transition-colors cursor-pointer"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];
}
