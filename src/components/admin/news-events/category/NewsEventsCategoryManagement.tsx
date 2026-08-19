"use client";

import { useEffect, useMemo, useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import { INewsEventsCategory } from "./types";
import { GetNewsEventsCategoryColumns } from "./TableColumns/NewsEventsCategoryColumns";
import CreateUpdateNewsEventsCategory from "./Form/CreateUpdateNewsEventsCategory";

const NewsEventsCategoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    INewsEventsCategory | undefined
  >();

  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage,
  } = usePagination();

  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);

  // The /news-events-category backend endpoint ignores the `search` query
  // param, so while searching we fetch the full list (no page/limit) and
  // filter/paginate it client-side instead.
  const isSearching = debouncedSearch.trim().length > 0;

  const { data, isLoading } = useGet<INewsEventsCategory[]>(
    "/news-events-category",
    [
      "news-events-category",
      currentPage.toString(),
      itemsPerPage.toString(),
      debouncedSearch,
    ],
    {
      ...(isSearching
        ? { page: "1", limit: "1000" }
        : itemsPerPage !== -1 && {
            page: currentPage.toString(),
            limit: itemsPerPage.toString(),
          }),
      search: debouncedSearch,
    }
  );

  const filteredCategories = useMemo(() => {
    const list = Array.isArray(data?.data) ? data.data : [];
    if (!isSearching) return list;
    const q = debouncedSearch.trim().toLowerCase();
    return list.filter(
      (item) =>
        item.nameEn?.toLowerCase().includes(q) ||
        item.nameBn?.toLowerCase().includes(q)
    );
  }, [data, isSearching, debouncedSearch]);

  const visibleCategories = useMemo(() => {
    if (!isSearching || itemsPerPage === -1) return filteredCategories;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCategories.slice(start, start + itemsPerPage);
  }, [filteredCategories, isSearching, currentPage, itemsPerPage]);

  useEffect(() => {
    if (data) {
      setTotalItems(
        isSearching ? filteredCategories.length : data.meta?.totalItems || 0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSearching, filteredCategories.length]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

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
        data={visibleCategories}
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
