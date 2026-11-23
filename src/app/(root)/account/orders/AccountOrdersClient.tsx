"use client";

import { OrderStatus } from "@/src/components/cart/types/order";
import OrderCard from "@/src/components/order/OrderCard";
import { ORDER_STATUS_LABELS } from "@/src/components/order/orderDisplay";
import TrackOrderBox from "@/src/components/order/TrackOrderBox";
import { useMyOrders } from "@/src/components/order/useMyOrders";
import Pagination from "@/src/components/shared/Pagination";
import { cn } from "@/src/lib/utils";
import { Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const TABS: { label: string; value: OrderStatus | "" }[] = [
  { label: "All", value: "" },
  ...[
    OrderStatus.PENDING,
    OrderStatus.CONFIRMED,
    OrderStatus.PROCESSING,
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED,
  ].map((status) => ({ label: ORDER_STATUS_LABELS[status], value: status })),
];

export const OrderListSkeleton = () => (
  <div className="flex flex-col gap-4">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="h-44 animate-pulse rounded-xl border border-border bg-card"
      />
    ))}
  </div>
);

const AccountOrdersClient = () => {
  const [status, setStatus] = useState<OrderStatus | "">("");
  const [page, setPage] = useState(1);
  const { orders, totalItems, totalPages, isLoading, isError } = useMyOrders({
    page,
    status,
  });

  const selectTab = (value: OrderStatus | "") => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground lg:text-2xl">
          My Orders
        </h1>
        <p className="mt-0.5 text-sm text-secondary-foreground">
          Follow your orders from placement to delivery.
        </p>
      </div>

      <TrackOrderBox />

      <div
        role="tablist"
        aria-label="Filter orders by status"
        className="scrollbar-hide -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1"
      >
        {TABS.map((tab) => (
          <button
            key={tab.value || "all"}
            type="button"
            role="tab"
            aria-selected={status === tab.value}
            onClick={() => selectTab(tab.value)}
            className={cn(
              "cursor-pointer rounded-full border px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors sm:px-4",
              status === tab.value
                ? "border-primary bg-primary text-white shadow-sm"
                : "border-border bg-card text-secondary-foreground hover:border-primary/30 hover:text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <OrderListSkeleton />
      ) : isError ? (
        <p className="rounded-xl border border-border bg-card p-6 text-center text-sm text-secondary-foreground">
          Your orders couldn&apos;t be loaded. Refresh the page to try again.
        </p>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card py-12 text-center sm:py-16">
          <div className="grid size-16 place-items-center rounded-full bg-light-dark text-muted-foreground">
            <Package size={28} />
          </div>
          <p className="text-sm font-medium text-foreground">
            {status
              ? `No ${ORDER_STATUS_LABELS[status].toLowerCase()} orders`
              : "No orders yet"}
          </p>
          <p className="max-w-xs text-xs text-muted-foreground">
            {status
              ? "Orders show up here when they reach this step."
              : "Charts and publications you order will show up here."}
          </p>
          {!status && (
            <Link
              href="/products"
              className="mt-1 rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground no-underline hover:opacity-90"
            >
              Browse products
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="rounded-xl border border-border bg-card">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                itemsPerPage={10}
                totalItems={totalItems}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AccountOrdersClient;
