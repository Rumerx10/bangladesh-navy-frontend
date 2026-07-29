import { Eye } from "lucide-react";
import { IHydrographicNote } from "../types";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";

const GetHydrographicNoteColumns = (
  onView?: (item: IHydrographicNote) => void
): ColumnDef<IHydrographicNote>[] => {
  return [
    {
      header: "Ref Number",
      accessorKey: "refNumber",
      cell: (value) => (
        <span className="text-sm font-medium text-secondary-dark">
          {(value as string) || "—"}
        </span>
      ),
    },
    {
      header: "Ship / Sender",
      accessorKey: "nameOfShip",
      cell: (value) => (
        <span className="text-sm text-secondary-gary">
          {(value as string) || "—"}
        </span>
      ),
    },
    {
      header: "Subject",
      accessorKey: "subject",
      cell: (value) => (
        <span className="text-sm text-secondary-gary line-clamp-1 max-w-48">
          {(value as string) || "—"}
        </span>
      ),
    },
    {
      header: "Observer",
      accessorKey: "nameOfObserver",
      cell: (value) => (
        <span className="text-sm text-secondary-gary">
          {(value as string) || "—"}
        </span>
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
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
        <div className="flex items-center gap-2 w-full">
          <Button
            className="w-9! min-h-9 border border-[#E6E6E6] flex items-center justify-center rounded-lg bg-light hover:bg-light"
            size="sm"
            onClick={() => onView?.(row)}
          >
            <Eye className="h-4 w-4 text-secondary-foreground" />
          </Button>
        </div>
      ),
    },
  ];
};

export default GetHydrographicNoteColumns;
