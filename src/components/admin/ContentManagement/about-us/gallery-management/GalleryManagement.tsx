"use client";
import { IGalleryItem } from "./types";
import { toast } from "react-toastify";
import { Images, Tag } from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/src/lib/redux/hooks";
import GalleryCategoryCard from "./GalleryCategoryCard";
import { usePagination } from "@/src/hooks/usePagination";
import { DataTable } from "@/src/components/ui/data-table";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import { GetGalleryColumns } from "./TableColumns/GalleryColumns";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import CreateUpdateGalleryItem from "./Form/CreateUpdateGalleryItem";

type ActiveTab = "gallery" | "categories";

const TABS: { key: ActiveTab; label: string; icon: React.ElementType }[] = [
  { key: "gallery", label: "Gallery", icon: Images },
  { key: "categories", label: "Gallery Categories", icon: Tag },
];

const GalleryManagement = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("gallery");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IGalleryItem | undefined>();
  const [pendingDelete, setPendingDelete] = useState<IGalleryItem | null>(null);

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

  // The /gallery backend endpoint ignores the `search` query param, so while
  // searching we fetch the full list (no page/limit) and filter/paginate it
  // client-side instead.
  const isSearching = debouncedSearch.trim().length > 0;

  const { data, isLoading } = useGet<IGalleryItem[]>(
    "/gallery",
    [
      "gallery",
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

  const filteredItems = useMemo(() => {
    const list = Array.isArray(data?.data) ? data.data : [];
    if (!isSearching) return list;
    const q = debouncedSearch.trim().toLowerCase();
    return list.filter(
      (item) =>
        item.titleEn?.toLowerCase().includes(q) ||
        item.titleBn?.toLowerCase().includes(q)
    );
  }, [data, isSearching, debouncedSearch]);

  const visibleItems = useMemo(() => {
    if (!isSearching || itemsPerPage === -1) return filteredItems;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, isSearching, currentPage, itemsPerPage]);

  useEffect(() => {
    if (data) {
      setTotalItems(
        isSearching ? filteredItems.length : data.meta?.totalItems || 0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSearching, filteredItems.length]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Gallery item deleted successfully!");
    setPendingDelete(null);
  }, [["gallery"]]);

  const handleEdit = (item: IGalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetGalleryColumns(handleEdit, setPendingDelete);

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
      {activeTab === "categories" && <GalleryCategoryCard />}

      {activeTab === "gallery" && (
        <>
          <DataTable
            columns={columns}
            data={visibleItems}
            isLoading={isLoading}
            totalItems={totalItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            title="Gallery"
            searchValue={search}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search gallery items..."
            isShowStatus={false}
            IsCreate
            setIsModalOpen={setIsModalOpen}
            createTitle="Add Gallery Item"
          />
          <CreateUpdateGalleryItem
            isOpen={isModalOpen}
            onClose={handleModalClose}
            initialValues={selectedItem}
          />

          <DeleteConfirmDialog
            isOpen={pendingDelete !== null}
            onClose={() => setPendingDelete(null)}
            onConfirm={() => {
              if (pendingDelete) {
                deleteMutate({ url: `/gallery/${pendingDelete.id}` });
              }
            }}
            title="Delete this gallery item?"
            description={
              pendingDelete
                ? `"${pendingDelete.titleEn || "This item"}" will be permanently removed from the gallery.`
                : undefined
            }
          />
        </>
      )}
    </div>
  );
};

export default GalleryManagement;
