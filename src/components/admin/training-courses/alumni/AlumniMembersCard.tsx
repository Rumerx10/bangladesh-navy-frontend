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
import { useBatchNameMap } from "@/src/components/batches/useBatches";
import { IAlumniMember } from "@/src/components/alumni/types";
import {
  ALUMNI_MEMBERS_ENDPOINT,
  ALUMNI_MEMBERS_LIST_QUERY_KEY,
  ALUMNI_MEMBERS_QUERY_KEY,
  ALUMNI_MEMBERS_TREE_QUERY_KEY,
} from "@/src/components/alumni/useAlumni";
import CreateUpdateAlumniMember from "./Form/CreateUpdateAlumniMember";
import { GetAlumniMemberColumns } from "./TableColumns/AlumniMemberColumns";
import { getAlumniMemberViewSections } from "./TableColumns/AlumniMemberViewFields";
import ViewDetailsModal from "@/src/components/shared/ViewDetailsModal/ViewDetailsModal";

interface AlumniMembersCardProps {
  /** Pre-filters the table to one batch's roster — set when drilling down from Batches. */
  batchId?: string;
  onClearFilter?: () => void;
}

const AlumniMembersCard = ({
  batchId,
  onClearFilter,
}: AlumniMembersCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewItem, setViewItem] = useState<IAlumniMember | null>(null);
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

  const { batchNames } = useBatchNameMap();
  const filterBatchName = batchId ? batchNames[batchId] : undefined;

  // A batch filter is a small, known-size slice, so it is fetched once via the
  // unpaginated list and filtered/paginated in the browser. Without a filter
  // the full paginated endpoint is used.
  const { data: listData, isLoading: isListLoading } = useGet<IAlumniMember[]>(
    `${ALUMNI_MEMBERS_ENDPOINT}/list`,
    ALUMNI_MEMBERS_LIST_QUERY_KEY,
    undefined,
    { enabled: !!batchId }
  );

  const {
    data: pagedData,
    isLoading: isPagedLoading,
    isError,
    error,
  } = useGet<IAlumniMember[]>(
    ALUMNI_MEMBERS_ENDPOINT,
    [
      ...ALUMNI_MEMBERS_QUERY_KEY,
      currentPage.toString(),
      itemsPerPage.toString(),
      debouncedSearch,
    ],
    batchId
      ? undefined
      : {
          ...(itemsPerPage !== -1 && {
            page: currentPage.toString(),
            limit: itemsPerPage.toString(),
          }),
          search: debouncedSearch,
        },
    { enabled: !batchId }
  );

  const allMembers = useMemo(
    () => (Array.isArray(listData?.data) ? listData.data : []),
    [listData]
  );

  const filtered = useMemo(() => {
    if (!batchId) return [];
    const query = debouncedSearch.trim().toLowerCase();
    return allMembers.filter((member) => {
      if (member.batchId !== batchId) return false;
      if (!query) return true;
      return (
        member.rankAndName?.toLowerCase().includes(query) ||
        member.pNo?.toLowerCase().includes(query) ||
        member.organization?.toLowerCase().includes(query)
      );
    });
  }, [allMembers, batchId, debouncedSearch]);

  const visible = useMemo(() => {
    if (!batchId) return Array.isArray(pagedData?.data) ? pagedData.data : [];
    if (itemsPerPage === -1) return filtered;
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [batchId, pagedData, filtered, currentPage, itemsPerPage]);

  const isLoading = batchId ? isListLoading : isPagedLoading;

  useEffect(() => {
    if (batchId) {
      setTotalItems(filtered.length);
    } else if (pagedData) {
      setTotalItems(pagedData.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchId, filtered.length, pagedData]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, batchId]);

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Alumni member deleted successfully!");
    setPendingDelete(null);
  }, [
    ALUMNI_MEMBERS_QUERY_KEY,
    ALUMNI_MEMBERS_LIST_QUERY_KEY,
    ALUMNI_MEMBERS_TREE_QUERY_KEY,
  ]);

  const handleEdit = (item: IAlumniMember) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetAlumniMemberColumns(
    batchNames,
    handleEdit,
    setPendingDelete,
    setViewItem
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

      {batchId && (
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            Filtered by batch: {filterBatchName || "—"}
            <button
              type="button"
              onClick={onClearFilter}
              aria-label="Clear batch filter"
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
        initialBatchId={batchId}
      />

      <ViewDetailsModal
        isOpen={viewItem !== null}
        onClose={() => setViewItem(null)}
        title="Alumni Member Details"
        sections={
          viewItem
            ? getAlumniMemberViewSections(
                viewItem,
                batchNames[viewItem.batchId]
              )
            : []
        }
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
