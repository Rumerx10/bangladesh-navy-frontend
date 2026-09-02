"use client";
import { toast } from "react-toastify";
import { IPublication } from "./types";
import { useEffect, useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { usePagination } from "@/src/hooks/usePagination";
import { DataTable } from "@/src/components/ui/data-table";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import CreateUpdatePublication from "./Form/CreateUpdatePublication";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import { GetPublicationColumns } from "./TableColumns/PublicationColumns";


const PublicationsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IPublication | undefined>();
  const [pendingDelete, setPendingDelete] = useState<IPublication | null>(
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

  const { data, isLoading } = useGet<IPublication[]>(
    "/publication",
    [
      "publication",
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
    if (data) setTotalItems(data.meta?.totalItems || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Publication deleted successfully!");
    setPendingDelete(null);
  }, [["publication"], ["publication-public"]]);

  const handleEdit = (item: IPublication) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetPublicationColumns(handleEdit, setPendingDelete);

  return (
    <>
      <DataTable
        columns={columns}
        data={Array.isArray(data?.data) ? data.data : []}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        title="Publications"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search publications..."
        isShowStatus={false}
        IsCreate
        setIsModalOpen={setIsModalOpen}
        createTitle="Add Publication"
      />
      <CreateUpdatePublication
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
      />
      <DeleteConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteMutate({ url: `/publication/${pendingDelete.id}` });
          }
        }}
        title="Delete this publication?"
        description={
          pendingDelete
            ? `"${pendingDelete.titleEn}" will be permanently removed.`
            : undefined
        }
      />
    </>
  );
};

export default PublicationsManagement;
