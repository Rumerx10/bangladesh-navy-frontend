"use client";

import { useEffect, useMemo, useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import { INewsEvent } from "./types";
import { GetNewsEventsColumns } from "./TableColumns/NewsEventsColumns";
import CreateUpdateNewsEvents from "./Form/CreateUpdateNewsEvents";

const NewsEventsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<INewsEvent | undefined>();

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
  const { sortBy } = useAppSelector((state) => state.filter);

  // The /news-events backend endpoint ignores the `search` query param, so
  // while searching we fetch the full list (no page/limit) and filter/paginate
  // it client-side instead.
  const isSearching = debouncedSearch.trim().length > 0;

  const { data, isLoading } = useGet<INewsEvent[]>(
    "/news-events",
    [
      "news-events",
      currentPage.toString(),
      itemsPerPage.toString(),
      debouncedSearch,
      sortBy,
    ],
    {
      ...(isSearching
        ? { page: "1", limit: "1000" }
        : itemsPerPage !== -1 && {
            page: currentPage.toString(),
            limit: itemsPerPage.toString(),
          }),
      search: debouncedSearch,
      ...(sortBy && { status: sortBy }),
    }
  );

  const filteredNews = useMemo(() => {
    const list = Array.isArray(data?.data) ? data.data : [];
    if (!isSearching) return list;
    const q = debouncedSearch.trim().toLowerCase();
    return list.filter(
      (item) =>
        item.titleEn?.toLowerCase().includes(q) ||
        item.titleBn?.toLowerCase().includes(q)
    );
  }, [data, isSearching, debouncedSearch]);

  const visibleNews = useMemo(() => {
    if (!isSearching || itemsPerPage === -1) return filteredNews;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(start, start + itemsPerPage);
  }, [filteredNews, isSearching, currentPage, itemsPerPage]);

  useEffect(() => {
    if (data) {
      setTotalItems(
        isSearching ? filteredNews.length : data.meta?.totalItems || 0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSearching, filteredNews.length]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleEdit = (item: INewsEvent) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetNewsEventsColumns(handleEdit);

  return (
    <div>
      <DataTable
        columns={columns}
        data={visibleNews}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        title="News & Events"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search news..."
        isShowStatus={false}
        IsCreate
        setIsModalOpen={setIsModalOpen}
        createTitle="Add News"
      />
      <CreateUpdateNewsEvents
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
      />
    </div>
  );
};

export default NewsEventsManagement;
