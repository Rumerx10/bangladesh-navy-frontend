"use client";

import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import { IPublication, publications as dummyPublications } from "@/src/data/publications";
import { GetPublicationColumns } from "./TableColumns/PublicationColumns";
import CreateUpdatePublication from "./Form/CreateUpdatePublication";

const PublicationsManagement = () => {
  // Replace with API: once the `/publication` backend endpoint exists, swap
  // this local state for `useGet<IPublication[]>("/publication", [...])` and
  // replace handleSubmit/handleDelete below with usePost/usePatch/useDelete
  // mutations — the DataTable wiring underneath stays the same.
  const [items, setItems] = useState<IPublication[]>(dummyPublications);
  const isLoading = false;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IPublication | undefined>();
  const [pendingDelete, setPendingDelete] = useState<IPublication | null>(
    null
  );

  const { setCurrentPage, itemsPerPage, currentPage, setItemsPerPage } =
    usePagination();
  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);

  const filtered = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query)
    );
  }, [items, debouncedSearch]);

  const totalItems = filtered.length;
  const visible =
    itemsPerPage === -1
      ? filtered
      : filtered.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

  const handleEdit = (item: IPublication) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const handleFormSubmit = (
    values: Omit<IPublication, "id">,
    id?: string
  ) => {
    if (id) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...values } : item))
      );
      toast.success("Publication updated successfully!");
    } else {
      setItems((prev) => [{ id: `pub-${Date.now()}`, ...values }, ...prev]);
      toast.success("Publication created successfully!");
    }
    handleModalClose();
  };

  const handleDelete = () => {
    if (!pendingDelete) return;
    setItems((prev) => prev.filter((item) => item.id !== pendingDelete.id));
    toast.success("Publication deleted successfully!");
    setPendingDelete(null);
  };

  const columns = GetPublicationColumns(handleEdit, setPendingDelete);

  return (
    <>
      <DataTable
        columns={columns}
        data={visible}
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
        onSubmit={handleFormSubmit}
      />
      <DeleteConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        title="Delete this publication?"
        description={
          pendingDelete
            ? `"${pendingDelete.title}" will be permanently removed.`
            : undefined
        }
      />
    </>
  );
};

export default PublicationsManagement;
