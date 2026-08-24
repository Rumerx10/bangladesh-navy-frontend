"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AlertCircle } from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import Paragraph from "@/src/components/shared/Paragraph";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import { ICourse } from "@/src/components/courses/types";
import {
  bySerial,
  COURSES_ENDPOINT,
  COURSES_LIST_QUERY_KEY,
  COURSES_QUERY_KEY,
} from "@/src/components/courses/useCourses";
import { ALUMNI_MEMBERS_TREE_QUERY_KEY } from "@/src/components/alumni/useAlumni";
import CreateUpdateCourse from "./Form/CreateUpdateCourse";
import { GetCourseColumns } from "./TableColumns/CourseColumns";

/**
 * The course list is the public statistics table — a handful of rows — so the
 * whole set is fetched once and searched/paged in the browser. Only `page` and
 * `limit` go to the API: it rejects any query key its DTO does not declare, so
 * sending `search` there would empty the table the moment someone types.
 */
const FETCH_LIMIT = 50;

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

  const { data, isLoading, isError, error } = useGet<ICourse[]>(
    COURSES_ENDPOINT,
    COURSES_QUERY_KEY,
    { page: "1", limit: FETCH_LIMIT.toString() }
  );

  const allCourses = useMemo(
    () => (Array.isArray(data?.data) ? [...data.data].sort(bySerial) : []),
    [data]
  );

  const filtered = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return allCourses;
    return allCourses.filter(
      (course) =>
        course.name?.toLowerCase().includes(query) ||
        course.duration?.toLowerCase().includes(query) ||
        course.remarks?.toLowerCase().includes(query)
    );
  }, [allCourses, debouncedSearch]);

  const visible = useMemo(() => {
    if (itemsPerPage === -1) return filtered;
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  useEffect(() => {
    setTotalItems(filtered.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.length]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

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

  // Suggested serial for the next course — one past the last row.
  const nextSerial = useMemo(
    () =>
      allCourses.reduce((max, course) => Math.max(max, course.serial ?? 0), 0) +
      1,
    [allCourses]
  );

  const columns = GetCourseColumns(handleEdit, setPendingDelete);

  return (
    <>
      {/* Without this an auth or validation failure reads as "no courses yet". */}
      {isError && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
          <div>
            <Paragraph className="text-sm! font-medium text-rose-800">
              Courses could not be loaded
            </Paragraph>
            <Paragraph className="text-xs! text-rose-700">
              {error?.message || "The request to /courses failed."}
            </Paragraph>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={visible}
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
