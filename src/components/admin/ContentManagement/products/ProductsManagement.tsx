"use client";
import { useEffect } from "react";
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
    router.push(`/admin/products/${item.id}/edit`);
  };

  const columns = GetProductColumns(handleEdit);

  return (
    <div className="space-y-6">
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
        routeURL="/admin/products/create"
        createTitle="Add Product"
      />
    </div>
  );
};

export default ProductsManagement;
