import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { INewsEventsCategory } from "../types";

export const GetNewsEventsCategoryColumns = (
  onEdit?: (item: INewsEventsCategory) => void,
  onDelete?: (item: INewsEventsCategory) => void
): ColumnDef<INewsEventsCategory>[] => [
  {
    header: "English Name",
    accessorKey: "nameEn",
    cell: (value) => (
      <span className="text-sm font-medium text-secondary-dark">
        {(value as string) || "—"}
      </span>
    ),
  },
  {
    header: "Bengali Name",
    accessorKey: "nameBn",
    cell: (value) => (
      <span className="text-sm text-secondary-gary">
        {(value as string) || "—"}
      </span>
    ),
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
          aria-label={`Edit ${row.nameEn}`}
        >
          <Pencil className="h-4 w-4 text-secondary-foreground" />
        </Button>
        <Button
          className="w-9! min-h-9 border border-red-100 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100"
          size="sm"
          onClick={() => onDelete?.(row)}
          aria-label={`Delete ${row.nameEn}`}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    ),
  },
];
