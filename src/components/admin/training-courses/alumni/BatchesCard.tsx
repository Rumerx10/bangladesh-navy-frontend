"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AlertCircle, X } from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import Paragraph from "@/src/components/shared/Paragraph";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import { useCourseNameMap } from "@/src/components/courses/useCourses";
import { IBatch } from "@/src/components/batches/types";
import {
  BATCHES_ENDPOINT,
  BATCHES_LIST_QUERY_KEY,
  BATCHES_QUERY_KEY,
  useBatchesList,
} from "@/src/components/batches/useBatches";
import { ALUMNI_MEMBERS_TREE_QUERY_KEY } from "@/src/components/alumni/useAlumni";
import CreateUpdateBatch from "./Form/CreateUpdateBatch";
import { GetBatchColumns } from "./TableColumns/BatchColumns";

interface BatchesCardProps {
  /** Pre-filters the table to one course's batches — set when drilling down from Courses. */
  courseId?: string;
  onClearFilter?: () => void;
  /** Jumps the parent tab shell to the Members tab, pre-filtered to this batch. */
  onViewMembers?: (batch: IBatch) => void;
}

const BatchesCard = ({
  courseId,
  onClearFilter,
  onViewMembers,
}: BatchesCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IBatch | undefined>();
  const [pendingDelete, setPendingDelete] = useState<IBatch | null>(null);

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

  const { courseNames } = useCourseNameMap();
  const filterCourseName = courseId ? courseNames[courseId] : undefined;

  // A course filter is a small, known-size slice, so it is fetched once via the
  // unpaginated list and filtered/paginated in the browser — the same pattern
  // CoursesCard uses. Without a filter the full paginated endpoint is used.
  const { batches: allBatches, isLoading: isListLoading } = useBatchesList();

  const {
    data: pagedData,
    isLoading: isPagedLoading,
    isError,
    error,
  } = useGet<IBatch[]>(
    BATCHES_ENDPOINT,
    [...BATCHES_QUERY_KEY, currentPage.toString(), itemsPerPage.toString(), debouncedSearch],
    courseId
      ? undefined
      : {
          ...(itemsPerPage !== -1 && {
            page: currentPage.toString(),
            limit: itemsPerPage.toString(),
          }),
          search: debouncedSearch,
        },
    { enabled: !courseId }
  );

  const filtered = useMemo(() => {
    if (!courseId) return [];
    const query = debouncedSearch.trim().toLowerCase();
    return allBatches.filter((batch) => {
      if (batch.courseId !== courseId) return false;
      if (!query) return true;
      return batch.name?.toLowerCase().includes(query);
    });
  }, [allBatches, courseId, debouncedSearch]);

  const visible = useMemo(() => {
    if (!courseId) return Array.isArray(pagedData?.data) ? pagedData.data : [];
    if (itemsPerPage === -1) return filtered;
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [courseId, pagedData, filtered, currentPage, itemsPerPage]);

  const isLoading = courseId ? isListLoading : isPagedLoading;

  useEffect(() => {
    if (courseId) {
      setTotalItems(filtered.length);
    } else if (pagedData) {
      setTotalItems(pagedData.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, filtered.length, pagedData]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, courseId]);

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Batch deleted successfully!");
    setPendingDelete(null);
  }, [BATCHES_QUERY_KEY, BATCHES_LIST_QUERY_KEY, ALUMNI_MEMBERS_TREE_QUERY_KEY]);

  const handleEdit = (item: IBatch) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  // Suggested serial for a new batch — one past the last row within the
  // filtered course. Left at 1 when adding without a course filter, since the
  // course (and therefore the serial scope) is picked inside the form itself.
  const nextSerial = useMemo(
    () =>
      courseId
        ? filtered.reduce((max, batch) => Math.max(max, batch.serial ?? 0), 0) + 1
        : 1,
    [courseId, filtered]
  );

  const columns = GetBatchColumns(handleEdit, setPendingDelete, onViewMembers);

  return (
    <>
      {isError && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
          <div>
            <Paragraph className="text-sm! font-medium text-rose-800">
              Batches could not be loaded
            </Paragraph>
            <Paragraph className="text-xs! text-rose-700">
              {error?.message || "The request to /batches failed."}
            </Paragraph>
          </div>
        </div>
      )}

      {courseId && (
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            Filtered by course: {filterCourseName || "—"}
            <button
              type="button"
              onClick={onClearFilter}
              aria-label="Clear course filter"
              className="cursor-pointer rounded-full hover:bg-primary/20"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
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
        title="Batches"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search batches..."
        isShowStatus={false}
        IsCreate
        setIsModalOpen={setIsModalOpen}
        createTitle="Add Batch"
      />

      <CreateUpdateBatch
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
        initialCourseId={courseId}
        nextSerial={nextSerial}
      />

      <DeleteConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteMutate({ url: `${BATCHES_ENDPOINT}/${pendingDelete.id}` });
          }
        }}
        title="Delete this batch?"
        description={
          pendingDelete
            ? `"${pendingDelete.name}" will be permanently removed, along with its alumni grouping.`
            : undefined
        }
      />
    </>
  );
};

export default BatchesCard;
