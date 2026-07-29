"use client";
import { IGalleryCategory } from "./types";
import { useEffect, useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import { usePagination } from "@/src/hooks/usePagination";
import { DataTable } from "@/src/components/ui/data-table";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import CreateUpdateGalleryCategory from "./Form/CreateUpdateGalleryCategory";
import { GetGalleryCategoryColumns } from "./TableColumns/GalleryCategoryColumns";

const GalleryCategoryCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    IGalleryCategory | undefined
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

  const { data, isLoading } = useGet<IGalleryCategory[]>(
    "/gallery-category",
    [
      "gallery-category",
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

  const handleEdit = (item: IGalleryCategory) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetGalleryCategoryColumns(handleEdit);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4">
        <DataTable
          columns={columns}
          data={Array.isArray(data?.data) ? data.data : []}
          isLoading={isLoading}
          totalItems={totalItems}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          title="Gallery Categories"
          searchValue={search}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Search categories..."
          isShowStatus={false}
          IsCreate
          setIsModalOpen={setIsModalOpen}
          createTitle="Add Category"
        />
      </div>

      <CreateUpdateGalleryCategory
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
      />
    </div>
  );
};

export default GalleryCategoryCard;
