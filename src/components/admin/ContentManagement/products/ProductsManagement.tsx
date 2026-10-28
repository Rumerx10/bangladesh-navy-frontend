"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IProduct, PRODUCT_CATEGORY_LABELS, ProductCategory } from "./types";
import { useGet } from "@/src/hooks/useGet";
import { useDelete } from "@/src/hooks/useDelete";
import { usePagination } from "@/src/hooks/usePagination";
import { DataTable } from "@/src/components/ui/data-table";
import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { GetProductColumns } from "./TableColumns/ProductColumns";
import { getProductViewSections } from "./TableColumns/ProductViewFields";
import ViewDetailsModal from "@/src/components/shared/ViewDetailsModal/ViewDetailsModal";
import { cn } from "@/src/lib/utils";

type CategoryTab = ProductCategory | "all";

const CATEGORY_TABS: { value: CategoryTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "PAPPER_CHART", label: "Paper Chart" },
  { value: "ELECTRONIC_NAVIGATIONAL_CHART", label: "ENC" },
  { value: "TIDAL", label: "Tidal" },
];

const isCategoryTab = (value: string | null): value is CategoryTab =>
  CATEGORY_TABS.some((tab) => tab.value === value);

// Words each category also answers to in search ("enc", "tide", …).
const CATEGORY_KEYWORDS: Record<ProductCategory, string> = {
  PAPPER_CHART: "paper chart",
  ELECTRONIC_NAVIGATIONAL_CHART: "electronic navigational chart enc",
  TIDAL: "tidal tide table",
};

const searchableText = (item: IProduct) =>
  [
    item.nameEn,
    item.nameBn,
    item.chartCode,
    item.geographicLocation,
    item.scale,
    item.edition,
    item.status,
    item.category && PRODUCT_CATEGORY_LABELS[item.category],
    item.category && CATEGORY_KEYWORDS[item.category],
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const ProductsManagement = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pendingDelete, setPendingDelete] = useState<IProduct | null>(null);
  const [viewItem, setViewItem] = useState<IProduct | null>(null);

  // Kept in the URL so coming back from an edit lands on the same tab.
  const categoryParam = searchParams.get("category");
  const category: CategoryTab = isCategoryTab(categoryParam)
    ? categoryParam
    : "all";

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

  // The backend ignores `search`, so the whole catalogue (every status, every
  // category — no `limit` returns all of it) is fetched once, and the tabs,
  // search and paging all run on it here. That also gives the tab counts.
  const { data, isLoading } = useGet<IProduct[]>("/product", ["product"], {
    sortOrder: "asc",
  });

  const allProducts = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );

  const searchedProducts = useMemo(() => {
    const terms = debouncedSearch.trim().toLowerCase().split(/\s+/);
    return allProducts.filter((item) => {
      const text = searchableText(item);
      return terms.every((term) => text.includes(term));
    });
  }, [allProducts, debouncedSearch]);

  const counts = useMemo(() => {
    const byCategory: Record<CategoryTab, number> = {
      all: searchedProducts.length,
      PAPPER_CHART: 0,
      ELECTRONIC_NAVIGATIONAL_CHART: 0,
      TIDAL: 0,
    };
    searchedProducts.forEach((item) => {
      if (item.category) byCategory[item.category] += 1;
    });
    return byCategory;
  }, [searchedProducts]);

  const filteredProducts = useMemo(
    () =>
      category === "all"
        ? searchedProducts
        : searchedProducts.filter((item) => item.category === category),
    [searchedProducts, category]
  );

  const visibleProducts = useMemo(() => {
    if (itemsPerPage === -1) return filteredProducts;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  useEffect(() => {
    setTotalItems(filteredProducts.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProducts.length]);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, category]);

  const handleCategoryChange = (next: CategoryTab) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") params.delete("category");
    else params.set("category", next);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  // `product-public` is the key the public listing page uses, so a deleted
  // product disappears from the storefront without a hard refresh.
  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Product deleted successfully!");
    setPendingDelete(null);
  }, [["product"], ["product-public"], ["product-inactive"]]);

  const handleEdit = (item: IProduct) => {
    router.push(`/admin/products/${item.id}/edit`);
  };

  const columns = GetProductColumns(handleEdit, setPendingDelete, setViewItem);

  const categoryTabs = (
    <div
      role="tablist"
      aria-label="Filter products by category"
      className="flex w-full overflow-x-auto rounded-lg bg-light-dark p-1 lg:w-auto"
    >
      {CATEGORY_TABS.map((tab) => {
        const active = category === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => handleCategoryChange(tab.value)}
            className={cn(
              "flex shrink-0 cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200",
              active
                ? "bg-card text-pBlue shadow-sm"
                : "text-secondary-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            <span
              className={cn(
                "min-w-6 rounded-full px-1.5 py-0.5 text-center text-[11px] font-semibold tabular-nums",
                active
                  ? "bg-primary text-white"
                  : "bg-light-silver text-secondary-foreground"
              )}
            >
              {isLoading ? "–" : counts[tab.value]}
            </span>
          </button>
        );
      })}
    </div>
  );

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
        searchPlaceholder="Search name, chart code, location…"
        toolbarStart={categoryTabs}
        isShowStatus={false}
        IsCreate
        routeURL="/admin/products/create"
        createTitle="Add Product"
      />

      <ViewDetailsModal
        isOpen={viewItem !== null}
        onClose={() => setViewItem(null)}
        title="Product Details"
        sections={viewItem ? getProductViewSections(viewItem) : []}
      />

      <DeleteConfirmDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteMutate({ url: `/product/${pendingDelete.id}` });
          }
        }}
        title="Delete this product?"
        description={
          pendingDelete
            ? `"${pendingDelete.nameEn}" will be permanently removed from the catalogue and the public products page.`
            : undefined
        }
      />
    </div>
  );
};

export default ProductsManagement;
