"use client";

import { toast } from "react-toastify";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { useEffect, useState } from "react";
import { IHydrographicNote } from "./types";
import { usePagination } from "@/src/hooks/usePagination";
import { DataTable } from "@/src/components/ui/data-table";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import GetHydrographicNoteColumns from "./TableColumns/HydrographicNoteColumns";
import HydrographicNoteDetailModal from "./Form/HydrographicNoteDetailModal";

const HydrographicNoteManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    IHydrographicNote | undefined
  >();
  const [pendingDelete, setPendingDelete] = useState<IHydrographicNote | null>(
    null
  );
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

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Hydrographic note deleted successfully!");
    setPendingDelete(null);
  }, [["hydrographic-note-management"]]);

  const handleView = (item: IHydrographicNote) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetHydrographicNoteColumns(handleView, setPendingDelete);

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

      <DeleteConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteMutate({ url: `/hydrographic-note/${pendingDelete.id}` });
          }
        }}
        title="Delete this hydrographic note?"
        description={
          pendingDelete
            ? `The note "${pendingDelete.refNumber || pendingDelete.subject}" from ${pendingDelete.nameOfShip || "this sender"} will be permanently removed.`
            : undefined
        }
      />
    </div>
  );
};

export default HydrographicNoteManagement;
