import { Pencil } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { INewsEventsCategory } from "../types";

export const GetNewsEventsCategoryColumns = (
  onEdit?: (item: INewsEventsCategory) => void
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
      <span className="text-sm text-secondary-gary">{(value as string) || "—"}</span>
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
        >
          <Pencil className="h-4 w-4 text-secondary-foreground" />
        </Button>
      </div>
    ),
  },
];
