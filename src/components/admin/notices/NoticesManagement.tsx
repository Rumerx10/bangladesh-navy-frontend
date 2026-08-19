"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useDelete } from "@/src/hooks/useDelete";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import NoticeTypeFilter from "@/src/components/notices/NoticeTypeFilter";
import {
  NOTICES_ENDPOINT,
  NOTICES_QUERY_KEY,
  filterNotices,
  useNotices,
} from "@/src/components/notices/useNotices";
import { INotice, NoticeFilterValue } from "@/src/components/notices/types";
import { GetNoticesColumns } from "./TableColumns/NoticesColumns";
import CreateUpdateNotice from "./Form/CreateUpdateNotice";

const NoticesManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<INotice | undefined>();
  const [pendingDelete, setPendingDelete] = useState<INotice | null>(null);
  const [type, setType] = useState<NoticeFilterValue>("ALL");

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

  const { notices, isLoading } = useNotices();

  // useNotices fetches the whole list, so filtering and paging both happen
  // here. Swap to server-side paging by passing page/limit into the hook once
  // /notices supports them.
  const filtered = useMemo(
    () => filterNotices(notices, { type, search: debouncedSearch }),
    [notices, type, debouncedSearch]
  );

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
  }, [debouncedSearch, type]);

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Notice deleted successfully!");
    setPendingDelete(null);
  }, [NOTICES_QUERY_KEY]);

  const handleEdit = (item: INotice) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetNoticesColumns(handleEdit, setPendingDelete);

  return (
    <div>
      <DataTable
        columns={columns}
        data={visible}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        title="Notices to Mariners"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search notices..."
        isShowStatus={false}
        rightComponents={
          <NoticeTypeFilter
            value={type}
            onChange={setType}
            size="sm"
            className="justify-end"
          />
        }
        IsCreate
        setIsModalOpen={setIsModalOpen}
        createTitle="Add Notice"
      />

      <CreateUpdateNotice
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
      />

      <DeleteConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteMutate({ url: `${NOTICES_ENDPOINT}/${pendingDelete.id}` });
          }
        }}
        title="Delete this notice?"
        description={
          pendingDelete
            ? `"${pendingDelete.noticeNumber} — ${pendingDelete.titleEn}" will be permanently removed, along with any attached PDF.`
            : undefined
        }
      />
    </div>
  );
};

export default NoticesManagement;
