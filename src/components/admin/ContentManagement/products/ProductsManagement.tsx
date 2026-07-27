"use client";

import { useEffect, useState } from "react";
import { Package, Tag } from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import { IProduct } from "./types";
import { GetProductColumns } from "./TableColumns/ProductColumns";
import CreateUpdateProduct from "./Form/CreateUpdateProducts";
import ProductCategoryCard from "./ProductCategoryCard";

type ActiveTab = "products" | "categories";

const TABS: { key: ActiveTab; label: string; icon: React.ElementType }[] = [
  { key: "products", label: "Products", icon: Package },
  { key: "categories", label: "Categories", icon: Tag },
];

const ProductsManagement = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("products");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IProduct | undefined>();

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

  const { data, isLoading } = useGet<IProduct[]>(
    "/product",
    [
      "product",
      currentPage.toString(),
      itemsPerPage.toString(),
      debouncedSearch,
      sortBy,
    ],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
      ...(sortBy && { status: sortBy }),
    }
  );

  useEffect(() => {
    if (data) setTotalItems(data.meta?.totalItems || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleEdit = (item: IProduct) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetProductColumns(handleEdit);

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
      {activeTab === "categories" && <ProductCategoryCard />}

      {activeTab === "products" && (
        <>
          <DataTable
            columns={columns}
            data={Array.isArray(data?.data) ? data.data : []}
            isLoading={isLoading}
            totalItems={totalItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            title="Products"
            searchValue={search}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search products..."
            isShowStatus={false}
            IsCreate
            setIsModalOpen={setIsModalOpen}
            createTitle="Add Product"
          />
          <CreateUpdateProduct
            isOpen={isModalOpen}
            onClose={handleModalClose}
            initialValues={selectedItem}
          />
        </>
      )}
    </div>
  );
};

export default ProductsManagement;
