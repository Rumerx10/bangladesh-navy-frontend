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
import { useCourseNameMap } from "@/src/components/courses/useCourses";
import { IAlumniMember } from "@/src/components/alumni/types";
import {
  ALUMNI_MEMBERS_ENDPOINT,
  ALUMNI_MEMBERS_QUERY_KEY,
  ALUMNI_MEMBERS_TREE_QUERY_KEY,
} from "@/src/components/alumni/useAlumni";
import CreateUpdateAlumniMember from "./Form/CreateUpdateAlumniMember";
import { GetAlumniMemberColumns } from "./TableColumns/AlumniMemberColumns";

const AlumniMembersCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IAlumniMember | undefined>();
  const [pendingDelete, setPendingDelete] = useState<IAlumniMember | null>(
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

  const { data, isLoading, isError, error } = useGet<IAlumniMember[]>(
    ALUMNI_MEMBERS_ENDPOINT,
    [
      ...ALUMNI_MEMBERS_QUERY_KEY,
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

  // The list endpoint returns `courseId` only, so names are resolved here.
  const { courseNames } = useCourseNameMap();

  const members = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );

  useEffect(() => {
    if (data) setTotalItems(data.meta?.totalItems || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Alumni member deleted successfully!");
    setPendingDelete(null);
  }, [ALUMNI_MEMBERS_QUERY_KEY, ALUMNI_MEMBERS_TREE_QUERY_KEY]);

  const handleEdit = (item: IAlumniMember) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetAlumniMemberColumns(
    courseNames,
    handleEdit,
    setPendingDelete
  );

  return (
    <>
      {/* Without this an auth or validation failure reads as "no members yet". */}
      {isError && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
          <div>
            <Paragraph className="text-sm! font-medium text-rose-800">
              Alumni members could not be loaded
            </Paragraph>
            <Paragraph className="text-xs! text-rose-700">
              {error?.message || "The request to /alumni-members failed."}
            </Paragraph>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={members}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        title="Alumni Members"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search by name, P. No or organization..."
        isShowStatus={false}
        IsCreate
        setIsModalOpen={setIsModalOpen}
        createTitle="Add Member"
      />

      <CreateUpdateAlumniMember
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
              url: `${ALUMNI_MEMBERS_ENDPOINT}/${pendingDelete.id}`,
            });
          }
        }}
        title="Delete this member?"
        description={
          pendingDelete
            ? `"${pendingDelete.rankAndName}" will be permanently removed from the alumni directory.`
            : undefined
        }
      />
    </>
  );
};

export default AlumniMembersCard;
