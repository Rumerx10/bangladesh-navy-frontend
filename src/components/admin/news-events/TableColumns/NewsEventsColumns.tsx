import Image from "next/image";
import { Pencil, ImageOff, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { INewsEvent } from "../types";

export const GetNewsEventsColumns = (
  onEdit?: (item: INewsEvent) => void,
  onDelete?: (item: INewsEvent) => void
): ColumnDef<INewsEvent>[] => [
  {
    header: "Image",
    accessorKey: "imageUrl",
    cell: (value) => {
      const url = value as string | undefined;
      return url ? (
        <div className="relative w-16 h-12 rounded-md overflow-hidden border border-[#E6E6E6]">
          <Image src={url} alt="news cover" fill className="object-cover" />
        </div>
      ) : (
        <div className="w-16 h-12 rounded-md border border-[#E6E6E6] bg-light flex items-center justify-center">
          <ImageOff className="h-4 w-4 text-gray-400" />
        </div>
      );
    },
  },
  {
    header: "Title (English)",
    accessorKey: "titleEn",
    cell: (value) => (
      <span className="text-sm font-medium text-secondary-dark line-clamp-2 max-w-60">
        {(value as string) || "—"}
      </span>
    ),
  },
  {
    header: "Title (Bengali)",
    accessorKey: "titleBn",
    cell: (value) => (
      <span className="text-sm text-secondary-gary line-clamp-2 max-w-60">
        {(value as string) || "—"}
      </span>
    ),
  },
  {
    header: "Category",
    accessorKey: "newsCategory",
    cell: (value) => {
      const category = value as INewsEvent["newsCategory"] | undefined;
      return (
        <span className="text-sm text-secondary-gary">
          {category?.nameEn || "—"}
        </span>
      );
    },
  },
  {
    header: "Action",
    accessorKey: "id",
    cell: (_value, row) => (
      <div className="flex items-center gap-2">
        <Button
          className="w-9! min-h-9 border border-[#E6E6E6] flex items-center justify-center rounded-lg bg-light hover:bg-light"
          size="sm"
          onClick={() => onEdit?.(row)}
          aria-label={`Edit ${row.titleEn}`}
        >
          <Pencil className="h-4 w-4 text-secondary-foreground" />
        </Button>
        <Button
          className="w-9! min-h-9 border border-red-100 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100"
          size="sm"
          onClick={() => onDelete?.(row)}
          aria-label={`Delete ${row.titleEn}`}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    ),
  },
];
