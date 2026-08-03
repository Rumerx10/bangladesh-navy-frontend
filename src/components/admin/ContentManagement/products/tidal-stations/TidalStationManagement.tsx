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
import CreateUpdateTidalStation from "./Form/CreateUpdateTidalStation";
import { GetTidalStationColumns } from "./TableColumns/TidalStationColumns";
import { ITidalStation } from "./types";

const TidalStationManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    ITidalStation | undefined
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

  const { data, isLoading } = useGet<ITidalStation[]>(
    "/tidal-station",
    [
      "tidal-station",
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
    }
  );

  useEffect(() => {
    if (data) {
      setTotalItems(data.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Tidal station deleted successfully!");
  }, [["tidal-station"], ["tidal-station-list"]]);

  const handleEdit = (item: ITidalStation) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    deleteMutate({ url: `/tidal-station/${deleteId}` });
    setDeleteId(null);
  };

  const columns = GetTidalStationColumns(handleEdit, handleDelete);

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
        title="Tidal Stations"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search tidal stations..."
        isShowStatus={false}
        IsCreate
        setIsModalOpen={setIsModalOpen}
        createTitle="Add Tidal Station"
      />

      <CreateUpdateTidalStation
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
      />

      <DeleteConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Tidal Station"
        description="Are you sure you want to delete this tidal station? This action cannot be undone."
      />
    </div>
  );
};

export default TidalStationManagement;
