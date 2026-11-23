"use client";

import {
  IOrder,
  IOrderTracking,
  OrderStatus,
  ORDER_QUERY_KEYS,
} from "@/src/components/cart/types/order";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/src/components/order/OrderBadges";
import {
  formatMoney,
  formatOrderDate,
} from "@/src/components/order/orderDisplay";
import {
  OrderAddressBlock,
  OrderItemsList,
  OrderSection,
  OrderTrackingView,
} from "@/src/components/order/OrderParts";
import { useGet } from "@/src/hooks/useGet";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  MessageSquare,
  Package,
  RefreshCcw,
  Route,
} from "lucide-react";
import Link from "next/link";
import UpdateOrderStatus from "./Form/UpdateOrderStatus";

const AdminOrderDetail = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGet<IOrder>(
    `/order/${id}`,
    ORDER_QUERY_KEYS.detail(id)
  );
  const { data: trackingData } = useGet<IOrderTracking>(
    `/order/${id}/tracking`,
    ORDER_QUERY_KEYS.tracking(id)
  );
  const order = data?.data;
  const tracking = trackingData?.data;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-72 animate-pulse rounded bg-light-dark" />
        <div className="h-64 animate-pulse rounded-xl bg-card" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="rounded-xl border border-border bg-card p-10 text-center">
        <p className="font-semibold text-secondary-dark">Order not found</p>
        <Link
          href="/admin/orders"
          className="mt-2 inline-block text-sm text-primary hover:underline"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/orders"
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-secondary-foreground hover:text-primary"
        >
          <ArrowLeft size={16} />
          Orders
        </Link>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-secondary-dark">
              {order.orderNumber}
            </h1>
            <p className="text-sm text-secondary-foreground">
              Placed {formatOrderDate(order.createdAt, true)} by{" "}
              {order.shippingAddress.fullName}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <OrderStatusBadge status={order.status} />
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>
        </div>
      </div>

      {order.status === OrderStatus.CANCELLED && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          Cancelled
          {order.cancelledAt
            ? ` ${formatOrderDate(order.cancelledAt, true)}`
            : ""}
          {order.cancelReason ? `: ${order.cancelReason}` : "."}
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-6">
          <OrderSection title="Progress" icon={Route}>
            {tracking ? (
              <OrderTrackingView tracking={tracking} />
            ) : (
              <div className="h-24 animate-pulse rounded-lg bg-light-dark" />
            )}
          </OrderSection>
          <OrderSection title="Items" icon={Package}>
            <OrderItemsList order={order} />
          </OrderSection>
        </div>

        <div className="flex flex-col gap-6">
          <OrderSection title="Update status" icon={RefreshCcw}>
            <UpdateOrderStatus order={order} />
          </OrderSection>

          <OrderSection title="Customer & delivery" icon={MapPin}>
            <OrderAddressBlock address={order.shippingAddress} />
          </OrderSection>

          <OrderSection title="Payment" icon={CreditCard}>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-secondary-foreground">Total</span>
                <span className="font-semibold text-secondary-dark">
                  {formatMoney(order.totalAmount, order.currency)}
                </span>
              </div>
              {order.paidAt && (
                <div className="flex justify-between gap-3">
                  <span className="text-secondary-foreground">Paid</span>
                  <span>{formatOrderDate(order.paidAt, true)}</span>
                </div>
              )}
              {order.payments.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No payment attempts yet.
                </p>
              ) : (
                <ul className="space-y-2 border-t border-border pt-2">
                  {order.payments.map((payment) => (
                    <li key={payment.id} className="text-xs">
                      <p className="font-medium text-secondary-dark">
                        {payment.tranId}{" "}
                        <span className="font-normal text-muted-foreground lowercase">
                          {payment.status}
                        </span>
                      </p>
                      <p className="text-muted-foreground">
                        {[
                          payment.cardType ?? payment.cardBrand,
                          formatMoney(payment.amount, order.currency),
                        ]
                          .filter(Boolean)
                          .join(", ")}
                        {" — "}
                        {formatOrderDate(payment.createdAt, true)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </OrderSection>

          {order.note && (
            <OrderSection title="Customer note" icon={MessageSquare}>
              <p className="text-sm whitespace-pre-line text-secondary-foreground">
                {order.note}
              </p>
            </OrderSection>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
