import { Eye } from "lucide-react";
import { IQuerySuggestion } from "../types";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import StatusBadge from "@/src/components/shared/Status/Status";
import { StatusType } from "@/src/components/shared/types/common";

const statusVariantMap: Record<string, StatusType> = {
  PENDING: StatusType.PENDING,
  IN_PROGRESS: StatusType.IN_PROGRESS,
  RESOLVED: StatusType.ACTIVE,
};

const GetQuerySuggestionColumns = (
  onView?: (item: IQuerySuggestion) => void
): ColumnDef<IQuerySuggestion>[] => {
  return [
    {
      header: "Name",
      accessorKey: "name",
      cell: (value) => (
        <span className="text-sm font-medium text-secondary-dark">
          {(value as string) || "—"}
        </span>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (value) => (
        <span className="text-sm text-secondary-gary">
          {(value as string) || "—"}
        </span>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phone",
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
        const status = value as string | undefined;
        const variant = statusVariantMap[status || ""] || StatusType.INACTIVE;
        return <StatusBadge status={variant} className="px-2 py-1" />;
      },
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: (value) => (
        <span className="text-sm text-secondary-gary">
          {value ? new Date(value as string).toLocaleDateString() : "—"}
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

export default GetQuerySuggestionColumns;
