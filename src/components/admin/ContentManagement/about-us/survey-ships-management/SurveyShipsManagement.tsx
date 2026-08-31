"use client";
import { ISurveyShip } from "./types";

import { toast } from "react-toastify";
import { Ship, Tag } from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { useEffect, useMemo, useState } from "react";
import SurveyCategoryCard from "./SurveyCategoryCard";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { usePagination } from "@/src/hooks/usePagination";
import { DataTable } from "@/src/components/ui/data-table";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import CreateUpdateSurveyShip from "./Form/CreateUpdateSurveyShip";
import { GetSurveyShipColumns } from "./TableColumns/SurveyShipColumns";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";

type ActiveTab = "ships" | "categories";

const TABS: { key: ActiveTab; label: string; icon: React.ElementType }[] = [
  { key: "ships", label: "Survey Ships", icon: Ship },
  { key: "categories", label: "Ship Categories", icon: Tag },
];

const SurveyShipsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("ships");
  const [selectedItem, setSelectedItem] = useState<ISurveyShip | undefined>();
  const [pendingDelete, setPendingDelete] = useState<ISurveyShip | null>(null);

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

  // The /survey-ships backend endpoint ignores the `search` query param, so
  // while searching we fetch the full list (no page/limit) and filter/paginate
  // it client-side instead.
  const isSearching = debouncedSearch.trim().length > 0;

  const { data, isLoading } = useGet<ISurveyShip[]>(
    "/survey-ships",
    [
      "survey-ships",
      currentPage.toString(),
      itemsPerPage.toString(),
      debouncedSearch,
      sortBy,
    ],
    {
      ...(isSearching
        ? { page: "1", limit: "1000" }
        : itemsPerPage !== -1 && {
            page: currentPage.toString(),
            limit: itemsPerPage.toString(),
          }),
      search: debouncedSearch,
      ...(sortBy && { status: sortBy }),
    }
  );

  const filteredShips = useMemo(() => {
    const list = Array.isArray(data?.data) ? data.data : [];
    if (!isSearching) return list;
    const q = debouncedSearch.trim().toLowerCase();
    return list.filter(
      (item) =>
        item.nameEn?.toLowerCase().includes(q) ||
        item.nameBn?.toLowerCase().includes(q)
    );
  }, [data, isSearching, debouncedSearch]);

  const visibleShips = useMemo(() => {
    if (!isSearching || itemsPerPage === -1) return filteredShips;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredShips.slice(start, start + itemsPerPage);
  }, [filteredShips, isSearching, currentPage, itemsPerPage]);

  useEffect(() => {
    if (data) {
      setTotalItems(
        isSearching ? filteredShips.length : data.meta?.totalItems || 0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSearching, filteredShips.length]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Survey ship deleted successfully!");
    setPendingDelete(null);
  }, [["survey-ships"]]);

  const handleEdit = (item: ISurveyShip) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetSurveyShipColumns(handleEdit, setPendingDelete);

  return (
    <div className="space-y-6">
      {/* Tab switcher */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === key
                  ? "bg-white text-pBlue shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "categories" && <SurveyCategoryCard />}

      {activeTab === "ships" && (
        <>
          <DataTable
            columns={columns}
            data={visibleShips}
            isLoading={isLoading}
            totalItems={totalItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            title="Survey Ships"
            searchValue={search}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search survey ships..."
            isShowStatus={false}
            IsCreate
            setIsModalOpen={setIsModalOpen}
            createTitle="Add Survey Ship"
          />
          <CreateUpdateSurveyShip
            isOpen={isModalOpen}
            onClose={handleModalClose}
            initialValues={selectedItem}
          />

          <DeleteConfirmDialog
            isOpen={pendingDelete !== null}
            onClose={() => setPendingDelete(null)}
            onConfirm={() => {
              if (pendingDelete) {
                deleteMutate({ url: `/survey-ships/${pendingDelete.id}` });
              }
            }}
            title="Delete this survey ship?"
            description={
              pendingDelete
                ? `"${pendingDelete.nameEn}" will be permanently removed from the survey ships page.`
                : undefined
            }
          />
        </>
      )}
    </div>
  );
};

export default SurveyShipsManagement;
