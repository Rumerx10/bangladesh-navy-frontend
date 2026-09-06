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
import { ICourseStatistic } from "@/src/components/course-statistics/types";
import {
  bySerial,
  COURSE_STATISTICS_ENDPOINT,
  COURSE_STATISTICS_LIST_QUERY_KEY,
  COURSE_STATISTICS_QUERY_KEY,
} from "@/src/components/course-statistics/useCourseStatistics";
import CreateUpdateCourseStatistic from "./Form/CreateUpdateCourseStatistic";
import { GetCourseStatisticColumns } from "./TableColumns/CourseStatisticColumns";

/**
 * The row set is the public statistics table — a handful of rows — so the
 * whole set is fetched once and searched/paged in the browser. Only `page`
 * and `limit` go to the API: it rejects any query key its DTO does not
 * declare, so sending `search` there would empty the table the moment
 * someone types.
 *
 * Independent of the Courses / Batches / Alumni Members directory — this
 * hits its own `/course-statistics` endpoints and has no relation to them.
 */
const FETCH_LIMIT = 50;

const CourseStatisticsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    ICourseStatistic | undefined
  >();
  const [pendingDelete, setPendingDelete] = useState<ICourseStatistic | null>(
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

  const { data, isLoading, isError, error } = useGet<ICourseStatistic[]>(
    COURSE_STATISTICS_ENDPOINT,
    COURSE_STATISTICS_QUERY_KEY,
    { page: "1", limit: FETCH_LIMIT.toString() }
  );

  const allRows = useMemo(
    () => (Array.isArray(data?.data) ? [...data.data].sort(bySerial) : []),
    [data]
  );

  const filtered = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return allRows;
    return allRows.filter(
      (row) =>
        row.courseName?.toLowerCase().includes(query) ||
        row.duration?.toLowerCase().includes(query) ||
        row.remarks?.toLowerCase().includes(query)
    );
  }, [allRows, debouncedSearch]);

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
    toast.success("Course statistics row deleted successfully!");
    setPendingDelete(null);
  }, [COURSE_STATISTICS_QUERY_KEY, COURSE_STATISTICS_LIST_QUERY_KEY]);

  const handleEdit = (item: ICourseStatistic) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  // Suggested serial for the next row — one past the last row.
  const nextSerial = useMemo(
    () => allRows.reduce((max, row) => Math.max(max, row.serial ?? 0), 0) + 1,
    [allRows]
  );

  const columns = GetCourseStatisticColumns(handleEdit, setPendingDelete);

  return (
    <div className="space-y-3">
      {isError && (
        <div className="flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
          <div>
            <Paragraph className="text-sm! font-medium text-rose-800">
              Course statistics could not be loaded
            </Paragraph>
            <Paragraph className="text-xs! text-rose-700">
              {error?.message || "The request to /course-statistics failed."}
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
        title="Course Statistics"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search course statistics..."
        isShowStatus={false}
        IsCreate
        setIsModalOpen={setIsModalOpen}
        createTitle="Add Row"
      />

      <CreateUpdateCourseStatistic
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
            deleteMutate({
              url: `${COURSE_STATISTICS_ENDPOINT}/${pendingDelete.id}`,
            });
          }
        }}
        title="Delete this row?"
        description={
          pendingDelete
            ? `"${pendingDelete.courseName}" will be permanently removed from the statistics table.`
            : undefined
        }
      />
    </div>
  );
};

export default CourseStatisticsManagement;
