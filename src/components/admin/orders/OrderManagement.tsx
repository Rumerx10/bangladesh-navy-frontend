"use client";

import {
  IOrder,
  OrderStatus,
  ORDER_QUERY_KEYS,
  PaymentStatus,
} from "@/src/components/cart/types/order";
import { ORDER_STATUS_LABELS } from "@/src/components/order/orderDisplay";
import { DataTable } from "@/src/components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useGet } from "@/src/hooks/useGet";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { cn } from "@/src/lib/utils";
import { useEffect, useState } from "react";
import GetOrderColumns from "./TableColumns/OrderColumns";

const STATUS_TABS: { label: string; value: OrderStatus | "" }[] = [
  { label: "All", value: "" },
  ...Object.values(OrderStatus).map((status) => ({
    label: ORDER_STATUS_LABELS[status],
    value: status,
  })),
];

// The API filters PAID or UNPAID; UNPAID also matches failed attempts.
const ALL_PAYMENTS = "all";
const PAYMENT_OPTIONS = [
  { label: "Any payment", value: ALL_PAYMENTS },
  { label: "Paid", value: PaymentStatus.PAID },
  { label: "Unpaid", value: PaymentStatus.UNPAID },
];

const OrderManagement = () => {
  const [status, setStatus] = useState<OrderStatus | "">("");
  const [payment, setPayment] = useState<string>(ALL_PAYMENTS);
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    setTotalItems,
  } = usePagination();
  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);

  const { data, isLoading } = useGet<IOrder[]>(
    "/order",
    ORDER_QUERY_KEYS.admin,
    {
      ...(itemsPerPage !== -1 && { page: currentPage, limit: itemsPerPage }),
      sortOrder: "desc",
      search: debouncedSearch,
      status,
      paymentStatus: payment === ALL_PAYMENTS ? "" : payment,
    }
  );

  useEffect(() => {
    if (data) setTotalItems(data.meta?.totalItems || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // A new filter starts from the first page.
  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, payment, debouncedSearch]);

  const statusTabs = (
    <div
      role="tablist"
      aria-label="Filter orders by status"
      className="flex w-full overflow-x-auto rounded-lg bg-light-dark p-1 lg:w-auto"
    >
      {STATUS_TABS.map((tab) => {
        const active = status === tab.value;
        return (
          <button
            key={tab.value || "all"}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setStatus(tab.value)}
            className={cn(
              "shrink-0 cursor-pointer rounded-md px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200",
              active
                ? "bg-card text-pBlue shadow-sm"
                : "text-secondary-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );

  const paymentFilter = (
    <Select value={payment} onValueChange={setPayment}>
      <SelectTrigger
        aria-label="Filter by payment"
        className="h-11 w-40 shrink-0 cursor-pointer bg-card"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {PAYMENT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <DataTable
      columns={GetOrderColumns()}
      data={Array.isArray(data?.data) ? data.data : []}
      isLoading={isLoading}
      totalItems={totalItems}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
      setItemsPerPage={setItemsPerPage}
      title="Orders"
      searchValue={search}
      onSearchChange={handleSearchChange}
      searchPlaceholder="Order number, customer, email or phone"
      toolbarStart={statusTabs}
      rightComponents={paymentFilter}
      isShowStatus={false}
    />
  );
};

export default OrderManagement;
