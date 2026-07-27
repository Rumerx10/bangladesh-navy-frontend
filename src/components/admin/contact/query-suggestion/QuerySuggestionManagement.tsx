"use client";

import { useGet } from "@/src/hooks/useGet";
import { useEffect, useState } from "react";
import { IQuerySuggestion } from "./types";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { usePagination } from "@/src/hooks/usePagination";
import { DataTable } from "@/src/components/ui/data-table";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import GetQuerySuggestionColumns from "./TableColumns/QuerySuggestionColumns";
import UpdateQuerySuggestionStatus from "./Form/UpdateQuerySuggestionStatus";

const QuerySuggestionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IQuerySuggestion | undefined>();
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage,
  } = usePagination();
  const { search, handleSearchChange, debouncedSearch } = useSearchDebounce(300);
  const { sortBy } = useAppSelector((state) => state.filter);

  const { data, isLoading } = useGet<IQuerySuggestion[]>(
    "/contact",
    [
      "query-suggestion-management",
      currentPage.toString(),
      itemsPerPage.toString(),
      debouncedSearch,
      sortBy,
    ],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
      contactType: "QUERY_SUGGESTION",
      ...(sortBy && { status: sortBy }),
    }
  );

  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleView = (item: IQuerySuggestion) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetQuerySuggestionColumns(handleView);

  return (
    <div>
      <DataTable
        columns={columns}
        data={Array.isArray(data?.data) ? data.data : []}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        title="Query & Suggestion Management"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search queries..."
        isShowStatus={false}
      />
      <UpdateQuerySuggestionStatus
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
      />
    </div>
  );
};

export default QuerySuggestionManagement;
