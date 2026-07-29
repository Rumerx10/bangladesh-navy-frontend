import { Pencil } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { ISurveyCategory } from "../types";

export const GetSurveyCategoryColumns = (
  onEdit?: (item: ISurveyCategory) => void
): ColumnDef<ISurveyCategory>[] => [
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
    header: "Status",
    accessorKey: "status",
    cell: (value) => {
      const status = value as string;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {status || "—"}
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
        >
          <Pencil className="h-4 w-4 text-secondary-foreground" />
        </Button>
      </div>
    ),
  },
];
