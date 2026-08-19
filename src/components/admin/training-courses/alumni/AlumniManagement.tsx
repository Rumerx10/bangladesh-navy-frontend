"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { BookOpen, GraduationCap } from "lucide-react";
import { useDelete } from "@/src/hooks/useDelete";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import { IAlumniBatch } from "@/src/components/alumni/types";
import {
  ALUMNI_BATCHES_ENDPOINT,
  ALUMNI_BATCHES_QUERY_KEY,
  filterAlumniBatches,
  useAlumniBatches,
} from "@/src/components/alumni/useAlumni";
import AlumniCourseCard from "./AlumniCourseCard";
import CreateUpdateAlumniBatch from "./Form/CreateUpdateAlumniBatch";
import { GetAlumniBatchColumns } from "./TableColumns/AlumniBatchColumns";

type ActiveTab = "batches" | "courses";

const TABS: { key: ActiveTab; label: string; icon: React.ElementType }[] = [
  { key: "batches", label: "Alumni Batches", icon: GraduationCap },
  { key: "courses", label: "Courses", icon: BookOpen },
];

const AlumniManagement = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("batches");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IAlumniBatch | undefined>();
  const [pendingDelete, setPendingDelete] = useState<IAlumniBatch | null>(null);

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

  const { batches, isLoading } = useAlumniBatches();

  // useAlumniBatches fetches the whole list, so filtering and paging both
  // happen here. Swap to server-side paging by passing page/limit into the
  // hook once /alumni-batches supports them.
  const filtered = useMemo(
    () => filterAlumniBatches(batches, { search: debouncedSearch }),
    [batches, debouncedSearch]
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
  }, [debouncedSearch]);

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Alumni batch deleted successfully!");
    setPendingDelete(null);
  }, [ALUMNI_BATCHES_QUERY_KEY]);

  const handleEdit = (item: IAlumniBatch) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetAlumniBatchColumns(handleEdit, setPendingDelete);

  return (
    <div className="space-y-6">
      {/* Tab switcher */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-xl bg-gray-100 p-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === key
                  ? "bg-white text-pBlue shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "courses" && <AlumniCourseCard />}

      {activeTab === "batches" && (
        <>
          <DataTable
            columns={columns}
            data={visible}
            isLoading={isLoading}
            totalItems={totalItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            title="Alumni Batches"
            searchValue={search}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search by batch, name or P. No..."
            isShowStatus={false}
            IsCreate
            setIsModalOpen={setIsModalOpen}
            createTitle="Add Batch"
          />

          <CreateUpdateAlumniBatch
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
                  url: `${ALUMNI_BATCHES_ENDPOINT}/${pendingDelete.id}`,
                });
              }
            }}
            title="Delete this batch?"
            description={
              pendingDelete
                ? `"${pendingDelete.titleEn}" and its ${pendingDelete.members.length} roster entries will be permanently removed.`
                : undefined
            }
          />
        </>
      )}
    </div>
  );
};

export default AlumniManagement;
