"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BookOpen } from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import Paragraph from "@/src/components/shared/Paragraph";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import { IAlumniCourse } from "@/src/components/alumni/types";
import {
  ALUMNI_COURSES_ENDPOINT,
  ALUMNI_COURSES_LIST_QUERY_KEY,
  ALUMNI_COURSES_QUERY_KEY,
} from "@/src/components/alumni/useAlumni";
import { GetAlumniCourseColumns } from "./TableColumns/AlumniCourseColumns";
import CreateUpdateAlumniCourse from "./Form/CreateUpdateAlumniCourse";

const AlumniCourseCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IAlumniCourse | undefined>();
  const [pendingDelete, setPendingDelete] = useState<IAlumniCourse | null>(
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

  const { data, isLoading } = useGet<IAlumniCourse[]>(
    ALUMNI_COURSES_ENDPOINT,
    [
      ...ALUMNI_COURSES_QUERY_KEY,
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

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Course deleted successfully!");
    setPendingDelete(null);
  }, [ALUMNI_COURSES_QUERY_KEY, ALUMNI_COURSES_LIST_QUERY_KEY]);

  const handleEdit = (item: IAlumniCourse) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetAlumniCourseColumns(handleEdit, setPendingDelete);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-gray-100 bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <div>
          <Paragraph className="text-lg! font-semibold text-pBlue">
            Alumni Courses
          </Paragraph>
          <Paragraph className="text-sm! text-gray-500">
            Course types that alumni batches are grouped under
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
          title="Alumni Courses"
          searchValue={search}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Search courses..."
          isShowStatus={false}
          IsCreate
          setIsModalOpen={setIsModalOpen}
          createTitle="Add Course"
        />
      </div>

      <CreateUpdateAlumniCourse
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
      />

      <DeleteConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteMutate({
              url: `${ALUMNI_COURSES_ENDPOINT}/${pendingDelete.id}`,
            });
          }
        }}
        title="Delete this course?"
        description={
          pendingDelete
            ? `"${pendingDelete.nameEn}" will be permanently removed. Batches already assigned to it will lose their course grouping.`
            : undefined
        }
      />
    </div>
  );
};

export default AlumniCourseCard;
