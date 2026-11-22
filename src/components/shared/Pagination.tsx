import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  pageSizeOptions?: number[];
  /**
   * The page size the dropdown shows as chosen, when it differs from
   * `itemsPerPage` — pass -1 for "All" (where `itemsPerPage` is the total).
   */
  selectedPageSize?: number;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [6, 12, 24, 48, 96];

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  onItemsPerPageChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  selectedPageSize = itemsPerPage,
}: IPaginationProps) => {
  const pages: (number | "...")[] = [];

  pages.push(1);

  // Determine range to show
  let startPage = Math.max(2, currentPage - 1);
  let endPage = Math.min(totalPages - 1, currentPage + 1);

  // Adjust if we're near the start/end
  if (currentPage <= 3) {
    endPage = Math.min(4, totalPages - 1);
  } else if (currentPage >= totalPages - 2) {
    startPage = Math.max(totalPages - 3, 2);
  }

  // Add ellipsis if needed
  if (startPage > 2) pages.push("...");

  // Add middle pages
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Add trailing ellipsis if needed
  if (endPage < totalPages - 1) pages.push("...");

  // Always show last page if not first
  if (totalPages > 1) pages.push(totalPages);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-5 py-4 gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-muted-foreground">
        {onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap">Rows per page</span>
            <Select
              value={String(selectedPageSize)}
              onValueChange={(value) => onItemsPerPageChange(Number(value))}
            >
              <SelectTrigger
                aria-label="Rows per page"
                className="h-9 min-w-20 cursor-pointer gap-3 rounded-lg border-border bg-card pr-2.5 pl-3 font-medium text-foreground shadow-none transition-colors hover:border-primary/40 hover:bg-light data-[state=open]:border-primary/50 data-[state=open]:ring-[3px] data-[state=open]:ring-primary/15"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                align="start"
                className="min-w-(--radix-select-trigger-width) rounded-xl p-1 shadow-lg"
              >
                {pageSizeOptions.map((size) => (
                  <SelectItem
                    key={size}
                    value={String(size)}
                    className="cursor-pointer rounded-lg py-2 font-medium data-[state=checked]:text-primary"
                  >
                    {size}
                  </SelectItem>
                ))}
                <SelectItem
                  value="-1"
                  className="cursor-pointer rounded-lg py-2 font-medium data-[state=checked]:text-primary"
                >
                  All
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <span>
          {totalItems === 0 ? (
            <>
              <span className="font-medium">0</span> entries
            </>
          ) : (
            <>
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> entries
            </>
          )}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          {pages.map((page, index) => (
            <Button
              key={index}
              variant="outline"
              className={`${
                page === currentPage
                  ? "bg-primary hover:bg-primary text-white hover:text-white"
                  : ""
              }`}
              size="sm"
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={typeof page !== "number"}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
