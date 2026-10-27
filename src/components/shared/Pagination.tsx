import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  pageSizeOptions?: number[];
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
          <label className="flex items-center gap-2">
            <span className="whitespace-nowrap">Show</span>
            <select
  value={itemsPerPage}
  onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
  className="h-8 rounded-md border border-border bg-card px-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
  aria-label="Items per page"
>
  {pageSizeOptions.map((size) => (
    <option key={size} value={size}>
      {size}
    </option>
  ))}
  <option value={-1}>All</option>
</select>
          </label>
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