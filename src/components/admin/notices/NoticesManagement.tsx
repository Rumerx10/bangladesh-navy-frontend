"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { DataTable } from "@/src/components/ui/data-table";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import NoticeTypeFilter from "@/src/components/notices/NoticeTypeFilter";
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
  const { sortBy } = useAppSelector((state) => state.filter);

  // The type filter is applied in the browser, so while one is active we pull
  // the full set in a single page and paginate it here instead of letting the
  // server page an unfiltered list.
  const isTypeFiltered = type !== "ALL";

  const { data, isLoading } = useGet<INotice[]>(
    "/notice-management",
    [
      "notice-management",
      currentPage.toString(),
      itemsPerPage.toString(),
      debouncedSearch,
      type,
      sortBy,
    ],
    {
      ...(isTypeFiltered
        ? { page: "1", limit: "1000" }
        : itemsPerPage !== -1 && {
            page: currentPage.toString(),
            limit: itemsPerPage.toString(),
          }),
      search: debouncedSearch,
      ...(sortBy && { status: sortBy }),
    }
  );

  const notices = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );

  const filtered = useMemo(
    () => (isTypeFiltered ? notices.filter((n) => n.type === type) : notices),
    [notices, isTypeFiltered, type]
  );

  const visible = useMemo(() => {
    if (!isTypeFiltered || itemsPerPage === -1) return filtered;
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, isTypeFiltered, currentPage, itemsPerPage]);

  useEffect(() => {
    if (data) {
      setTotalItems(
        isTypeFiltered ? filtered.length : data.meta?.totalItems || 0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isTypeFiltered, filtered.length]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, type]);

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Notice deleted successfully!");
    setPendingDelete(null);
  }, [["notice-management"], ["notice-management-list"]]);

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
            deleteMutate({ url: `/notice-management/${pendingDelete.id}` });
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
