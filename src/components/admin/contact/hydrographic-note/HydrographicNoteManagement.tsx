"use client";

import { useGet } from "@/src/hooks/useGet";
import { useEffect, useState } from "react";
import { IHydrographicNote } from "./types";
import { usePagination } from "@/src/hooks/usePagination";
import { DataTable } from "@/src/components/ui/data-table";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import GetHydrographicNoteColumns from "./TableColumns/HydrographicNoteColumns";
import HydrographicNoteDetailModal from "./Form/HydrographicNoteDetailModal";

const HydrographicNoteManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IHydrographicNote | undefined>();
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage,
  } = usePagination();
  const { search, handleSearchChange, debouncedSearch } = useSearchDebounce(300);

  const { data, isLoading } = useGet<IHydrographicNote[]>(
    "/hydrographic-note",
    [
      "hydrographic-note-management",
      currentPage.toString(),
      itemsPerPage.toString(),
      debouncedSearch,
    ],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
    }
  );

  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleView = (item: IHydrographicNote) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetHydrographicNoteColumns(handleView);

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
        title="Hydrographic Note Management"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search by ref number, ship, or observer..."
        isShowStatus={false}
      />
      <HydrographicNoteDetailModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        data={selectedItem}
      />
    </div>
  );
};

export default HydrographicNoteManagement;
