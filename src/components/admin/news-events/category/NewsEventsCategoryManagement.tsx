"use client";

import { useEffect, useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import { INewsEventsCategory } from "./types";
import { GetNewsEventsCategoryColumns } from "./TableColumns/NewsEventsCategoryColumns";
import CreateUpdateNewsEventsCategory from "./Form/CreateUpdateNewsEventsCategory";

const NewsEventsCategoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<INewsEventsCategory | undefined>();

  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage,
  } = usePagination();

  const { search, handleSearchChange, debouncedSearch } = useSearchDebounce(300);

  const { data, isLoading } = useGet<INewsEventsCategory[]>(
    "/news-events-category",
    ["news-events-category", currentPage.toString(), itemsPerPage.toString(), debouncedSearch],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
    }
  );

  useEffect(() => {
    if (data) setTotalItems(data.meta?.totalItems || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleEdit = (item: INewsEventsCategory) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetNewsEventsCategoryColumns(handleEdit);

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
        title="News Events Category"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search categories..."
        isShowStatus={false}
        IsCreate
        setIsModalOpen={setIsModalOpen}
        createTitle="Add Category"
      />
      <CreateUpdateNewsEventsCategory
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
      />
    </div>
  );
};

export default NewsEventsCategoryManagement;
