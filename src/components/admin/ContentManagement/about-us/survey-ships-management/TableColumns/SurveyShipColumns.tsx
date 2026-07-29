import Image from "next/image";
import { Pencil, ImageOff } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { ISurveyShip } from "../types";

export const GetSurveyShipColumns = (
  onEdit?: (item: ISurveyShip) => void
): ColumnDef<ISurveyShip>[] => [
  {
    header: "Image",
    accessorKey: "image",
    cell: (value) => {
      const url = value as string | undefined;
      return url ? (
        <div className="relative w-16 h-12 rounded-md overflow-hidden border border-[#E6E6E6]">
          <Image src={url} alt="ship" fill className="object-cover" />
        </div>
      ) : (
        <div className="w-16 h-12 rounded-md border border-[#E6E6E6] bg-light flex items-center justify-center">
          <ImageOff className="h-4 w-4 text-gray-400" />
        </div>
      );
    },
  },
  {
    header: "Name (English)",
    accessorKey: "nameEn",
    cell: (value) => (
      <span className="text-sm font-medium text-secondary-dark line-clamp-2 max-w-52">
        {(value as string) || "—"}
      </span>
    ),
  },
  {
    header: "Name (Bengali)",
    accessorKey: "nameBn",
    cell: (value) => (
      <span className="text-sm text-secondary-gary line-clamp-2 max-w-52">
        {(value as string) || "—"}
      </span>
    ),
  },
  {
    header: "Category",
    accessorKey: "surveyCategory",
    cell: (value) => {
      const category = value as ISurveyShip["surveyCategory"] | undefined;
      return (
        <span className="text-sm text-secondary-gary">
          {category?.nameEn || "—"}
        </span>
      );
    },
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
