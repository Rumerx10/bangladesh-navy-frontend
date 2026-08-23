"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tag } from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import Paragraph from "@/src/components/shared/Paragraph";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import { ISurveyCategory } from "./types";
import { GetSurveyCategoryColumns } from "./TableColumns/SurveyCategoryColumns";
import CreateUpdateSurveyCategory from "./Form/CreateUpdateSurveyCategory";

const SurveyCategoryCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    ISurveyCategory | undefined
  >();
  const [pendingDelete, setPendingDelete] = useState<ISurveyCategory | null>(
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

  const { data, isLoading } = useGet<ISurveyCategory[]>(
    "/survey-category",
    [
      "survey-category",
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

  // Ships carry the category, so the ship list is refetched too.
  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Survey category deleted successfully!");
    setPendingDelete(null);
  }, [["survey-category"], ["survey-ships"]]);

  const handleEdit = (item: ISurveyCategory) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetSurveyCategoryColumns(handleEdit, setPendingDelete);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-linear-to-r from-primary/5 via-primary/10 to-transparent">
        <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
          <Tag className="w-5 h-5 text-primary" />
        </div>
        <div>
          <Paragraph className="font-semibold text-lg! text-pBlue">
            Survey Categories
          </Paragraph>
          <Paragraph className="text-sm! text-gray-500">
            Manage category options for survey ships
          </Paragraph>
        </div>
      </div>

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
          title="Survey Categories"
          searchValue={search}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Search categories..."
          isShowStatus={false}
          IsCreate
          setIsModalOpen={setIsModalOpen}
          createTitle="Add Category"
        />
      </div>

      <CreateUpdateSurveyCategory
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
      />

      <DeleteConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteMutate({ url: `/survey-category/${pendingDelete.id}` });
          }
        }}
        title="Delete this category?"
        description={
          pendingDelete
            ? `"${pendingDelete.nameEn}" will be permanently removed. Ships filed under it will lose their category.`
            : undefined
        }
      />
    </div>
  );
};

export default SurveyCategoryCard;
