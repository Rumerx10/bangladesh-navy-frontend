"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { usePagination } from "@/src/hooks/usePagination";
import { DataTable } from "@/src/components/ui/data-table";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import CreateUpdateHowToCollect from "./Form/CreateUpdateHowToCollect";
import { GetHowToCollectColumns } from "./TableColumns/HowToCollectColumns";
import { IHowToCollectStep } from "./types";

const HowToCollectManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    IHowToCollectStep | undefined
  >();
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

  const { data, isLoading } = useGet<IHowToCollectStep[]>(
    "/how-to-collect",
    [
      "how-to-collect",
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
      // Steps render in serial order on the public page, so the admin list
      // mirrors that rather than newest-first.
      sortOrder: "asc",
      ...(sortBy && { status: sortBy }),
    }
  );

  const steps = Array.isArray(data?.data) ? data.data : [];

  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Step deleted successfully!");
  }, [["how-to-collect"], ["how-to-collect-list"]]);

  const handleEdit = (item: IHowToCollectStep) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    deleteMutate({ url: `/how-to-collect/${deleteId}` });
    setDeleteId(null);
  };

  const columns = GetHowToCollectColumns(handleEdit, setDeleteId);

  // Only the current page is in hand, so this is a sensible starting point for
  // the next serial rather than an authoritative maximum.
  const nextSerial =
    steps.reduce((max, step) => Math.max(max, step.serial ?? 0), 0) + 1;

  return (
    <div>
      <DataTable
        columns={columns}
        data={steps}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        title="How to Collect"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search steps..."
        IsCreate
        setIsModalOpen={setIsModalOpen}
        createTitle="Add Step"
      />

      <CreateUpdateHowToCollect
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
        nextSerial={nextSerial}
      />

      <DeleteConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Collection Step"
        description="Are you sure you want to delete this step? It will no longer appear on the public How to Collect page."
      />
    </div>
  );
};

export default HowToCollectManagement;
