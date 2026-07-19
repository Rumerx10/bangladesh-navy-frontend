"use client";

import { DataTable } from "@/src/components/ui/data-table";
import { useGet } from "@/src/hooks/useGet";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { useEffect, useState } from "react";
import CreateUpdateNoticeManagement from "./Form/CreateUpdateNoticeManagement";
import { INoticeManagement } from "./types";
import GetNoticeColumns from "./TableColumns/NoticeColumns";

const NoticeManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<INoticeManagement | undefined>();
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

  const { data, isLoading } = useGet<INoticeManagement[]>(
    "/notice",
    [
      "notice-management",
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
      ...(sortBy && { status: sortBy }),
      sortOrder: "asc",
    }
  );

  console.log("Notice Data ::-------->",data);

  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleEdit = (item: INoticeManagement) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetNoticeColumns(handleEdit);

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
        title="Notice Management"
        searchValue={search}
        onSearchChange={handleSearchChange}
        IsCreate
        setIsModalOpen={setIsModalOpen}
        searchPlaceholder="Search notices..."
      />
      <CreateUpdateNoticeManagement
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
      />
    </div>
  );
};

export default NoticeManagement;