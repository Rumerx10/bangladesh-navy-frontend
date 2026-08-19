"use client";
import { useEffect, useMemo } from "react";
import { IProduct } from "./types";
import { useRouter } from "next/navigation";
import { useGet } from "@/src/hooks/useGet";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { usePagination } from "@/src/hooks/usePagination";
import { DataTable } from "@/src/components/ui/data-table";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { GetProductColumns } from "./TableColumns/ProductColumns";

const ProductsManagement = () => {
  const router = useRouter();

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

  // The /product backend endpoint ignores the `search` query param, so while
  // searching we fetch the full list (no page/limit) and filter/paginate it
  // client-side instead.
  const isSearching = debouncedSearch.trim().length > 0;

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

  const filteredProducts = useMemo(() => {
    const list = Array.isArray(data?.data) ? data.data : [];
    if (!isSearching) return list;
    const q = debouncedSearch.trim().toLowerCase();
    return list.filter(
      (item) =>
        item.nameEn?.toLowerCase().includes(q) ||
        item.nameBn?.toLowerCase().includes(q) ||
        item.chartCode?.toString().includes(q)
    );
  }, [data, isSearching, debouncedSearch]);

  const visibleProducts = useMemo(() => {
    if (!isSearching || itemsPerPage === -1) return filteredProducts;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, isSearching, currentPage, itemsPerPage]);

  useEffect(() => {
    if (data) {
      setTotalItems(
        isSearching ? filteredProducts.length : data.meta?.totalItems || 0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSearching, filteredProducts.length]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleEdit = (item: IProduct) => {
    router.push(`/admin/products/${item.id}/edit`);
  };

  const columns = GetProductColumns(handleEdit);

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={visibleProducts}
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
        routeURL="/admin/products/create"
        createTitle="Add Product"
      />
    </div>
  );
};

export default ProductsManagement;
