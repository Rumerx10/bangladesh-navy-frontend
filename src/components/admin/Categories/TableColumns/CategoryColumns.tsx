import Image from "next/image";
import { Pencil, UserRound } from "lucide-react";
import { ICategory } from "../types";
import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@/src/components/ui/data-table";
import { StatusType } from "@/src/components/shared/types/common";
import StatusBadge from "@/src/components/shared/Status/Status";

export const GetCategoryColumns = (
  onEdit?: (item: ICategory) => void
): ColumnDef<ICategory>[] => {
  return [
    {
      header: "Icon",
      accessorKey: "icon",
      cell: (value) => {
        const icon = value as string | undefined;
        return icon ? (
          <div className="w-9 h-9 border border-[#E6E6E6] flex items-center justify-center rounded-lg bg-light">
            <Image src={icon} alt="icon" width={24} height={24} />
          </div>
        ) : (
          <div className="w-9 h-9 border border-[#E6E6E6] flex items-center justify-center rounded-lg bg-light">
            <UserRound className="h-4 w-4 text-gray-400" />
          </div>
        );
      },
    },
    {
      header: "Bengali Name",
      accessorKey: "nameBn",
    },
    {
      header: "English Name",
      accessorKey: "nameEn",
      cell: (value) => {
        const name = value as string | undefined;
        return (
          <span className="text-sm text-secondary-gary">{name || "—"}</span>
        );
      },
    },
    {
      header: "Bengali Description",
      accessorKey: "descriptionBn",
      cell: (value) => {
        const desc = value as string | undefined;
        return (
          <span className="text-sm text-secondary-gary">{desc || "—"}</span>
        );
      },
    },
    {
      header: "English Description",
      accessorKey: "descriptionEn",
      cell: (value) => {
        const desc = value as string | undefined;
        return (
          <span className="text-sm text-secondary-gary">{desc || "—"}</span>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (value) => {
        const normalizedStatus =
          String(value || StatusType.INACTIVE).toUpperCase() ===
          StatusType.ACTIVE
            ? StatusType.ACTIVE
            : StatusType.INACTIVE;

        return <StatusBadge status={normalizedStatus} className="px-2 py-1" />;
      },
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (_value, row) => {
        return (
          <div className="flex items-center justify-end gap-2 w-full">
            <Button
              className="w-9! min-h-9 border border-[#E6E6E6] flex items-center justify-center rounded-lg bg-light hover:bg-light"
              size="sm"
              onClick={() => onEdit?.(row)}
            >
              <Pencil className="h-4 w-4 text-secondary-foreground" />
            </Button>
          </div>
        );
      },
    },
  ];
};