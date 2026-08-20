"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { ClipboardPaste } from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import { Button } from "@/src/components/ui/button";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import { useCourseNameMap } from "@/src/components/courses/useCourses";
import { IAlumniMember } from "@/src/components/alumni/types";
import {
  ALUMNI_MEMBERS_ENDPOINT,
  ALUMNI_MEMBERS_QUERY_KEY,
  ALUMNI_MEMBERS_TREE_QUERY_KEY,
} from "@/src/components/alumni/useAlumni";
import BulkAddMembers from "./Form/BulkAddMembers";
import CreateUpdateAlumniMember from "./Form/CreateUpdateAlumniMember";
import { GetAlumniMemberColumns } from "./TableColumns/AlumniMemberColumns";

const AlumniMembersCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
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

  const { data, isLoading } = useGet<IAlumniMember[]>(
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
        rightComponents={
          <Button
            type="button"
            onClick={() => setIsBulkOpen(true)}
            className="h-11 cursor-pointer gap-2 border border-primary/30 bg-primary/5 px-5 text-primary shadow-none hover:bg-primary/10"
          >
            <ClipboardPaste className="h-4 w-4" />
            Paste Roster
          </Button>
        }
      />

      <CreateUpdateAlumniMember
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
      />

      <BulkAddMembers
        isOpen={isBulkOpen}
        onClose={() => setIsBulkOpen(false)}
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
