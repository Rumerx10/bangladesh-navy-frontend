"use client";

import { OrderStatus } from "@/src/components/cart/types/order";
import OrderCard from "@/src/components/order/OrderCard";
import { useMyOrders } from "@/src/components/order/useMyOrders";
import Pagination from "@/src/components/shared/Pagination";
import { XCircle } from "lucide-react";
import { useState } from "react";
import { OrderListSkeleton } from "../orders/AccountOrdersClient";

const CancellationsClient = () => {
  const [page, setPage] = useState(1);
  const { orders, totalItems, totalPages, isLoading, isError } = useMyOrders({
    page,
    status: OrderStatus.CANCELLED,
  });

  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h1 className="text-xl font-bold text-foreground lg:text-2xl">
          My Cancellations
        </h1>
        <p className="mt-0.5 text-sm text-secondary-foreground">
          Orders that were cancelled, by you or by our team, with the reason.
        </p>
      </div>

      {isLoading ? (
        <OrderListSkeleton />
      ) : isError ? (
        <p className="rounded-xl border border-border bg-card p-6 text-center text-sm text-secondary-foreground">
          Your cancelled orders couldn&apos;t be loaded. Refresh the page to try
          again.
        </p>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card py-12 text-center sm:py-16">
          <div className="grid size-16 place-items-center rounded-full bg-light-dark text-muted-foreground">
            <XCircle size={28} />
          </div>
          <p className="text-sm font-medium text-foreground">
            No cancelled orders
          </p>
          <p className="max-w-xs text-xs text-muted-foreground">
            You can cancel an order from its page while it is still pending and
            unpaid.
          </p>
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

export default CancellationsClient;
