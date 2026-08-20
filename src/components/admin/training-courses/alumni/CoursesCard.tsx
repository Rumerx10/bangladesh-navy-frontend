"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import Paragraph from "@/src/components/shared/Paragraph";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import { ICourse } from "@/src/components/courses/types";
import {
  COURSES_ENDPOINT,
  COURSES_LIST_QUERY_KEY,
  COURSES_QUERY_KEY,
} from "@/src/components/courses/useCourses";
import { ALUMNI_MEMBERS_TREE_QUERY_KEY } from "@/src/components/alumni/useAlumni";
import CreateUpdateCourse from "./Form/CreateUpdateCourse";
import { GetCourseColumns } from "./TableColumns/CourseColumns";

const CoursesCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ICourse | undefined>();
  const [pendingDelete, setPendingDelete] = useState<ICourse | null>(null);

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

  const { data, isLoading } = useGet<ICourse[]>(
    COURSES_ENDPOINT,
    [
      ...COURSES_QUERY_KEY,
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

  const courses = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );

  useEffect(() => {
    if (data) setTotalItems(data.meta?.totalItems || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Course deleted successfully!");
    setPendingDelete(null);
  }, [
    COURSES_QUERY_KEY,
    COURSES_LIST_QUERY_KEY,
    ALUMNI_MEMBERS_TREE_QUERY_KEY,
  ]);

  const handleEdit = (item: ICourse) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  // Suggested serial for the next course — one past the highest on this page.
  const nextSerial = useMemo(
    () =>
      courses.reduce((max, course) => Math.max(max, course.serial ?? 0), 0) + 1,
    [courses]
  );

  const columns = GetCourseColumns(handleEdit, setPendingDelete);

  return (
    <>
      <DataTable
        columns={columns}
        data={courses}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        title="Courses"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search courses..."
        isShowStatus={false}
        IsCreate
        setIsModalOpen={setIsModalOpen}
        createTitle="Add Course"
      />

      <Paragraph className="mt-3 text-xs! text-gray-500">
        These rows are the public Course Statistics table on
        /training-courses/courses, and the courses alumni members are grouped
        under.
      </Paragraph>

      <CreateUpdateCourse
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
        nextSerial={nextSerial}
      />

      <DeleteConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteMutate({ url: `${COURSES_ENDPOINT}/${pendingDelete.id}` });
          }
        }}
        title="Delete this course?"
        description={
          pendingDelete
            ? `"${pendingDelete.name}" will be permanently removed from the statistics table, along with its alumni grouping.`
            : undefined
        }
      />
    </>
  );
};

export default CoursesCard;
