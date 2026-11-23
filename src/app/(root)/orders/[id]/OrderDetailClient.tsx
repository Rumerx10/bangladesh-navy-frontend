"use client";

import {
  IOrder,
  IOrderTracking,
  OrderStatus,
  ORDER_QUERY_KEYS,
} from "@/src/components/cart/types/order";
import CancelOrderDialog from "@/src/components/order/CancelOrderDialog";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/src/components/order/OrderBadges";
import {
  canCustomerCancel,
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
  Route,
} from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

const OrderDetailClient = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

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

  return (
    <div className="container px-4">
      <div className="below-site-header pb-20 lg:pb-16">
        <Link
          href="/account/orders"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-secondary-foreground no-underline hover:text-primary"
        >
          <ArrowLeft size={16} />
          My Orders
        </Link>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-8 w-64 animate-pulse rounded bg-light-dark" />
            <div className="h-48 animate-pulse rounded-xl bg-light-dark" />
            <div className="h-64 animate-pulse rounded-xl bg-light-dark" />
          </div>
        ) : isError || !order ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-light-dark text-muted-foreground">
              <Package size={28} />
            </div>
            <h1 className="text-lg font-bold text-foreground">
              Order not found
            </h1>
            <p className="max-w-xs text-sm text-muted-foreground">
              It may belong to another account, or the link is incomplete.
            </p>
          </div>
        ) : (
          <>
            <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-lg font-bold text-foreground sm:text-xl lg:text-2xl">
                  Order {order.orderNumber}
                </h1>
                <p className="mt-1 text-sm text-secondary-foreground">
                  Placed {formatOrderDate(order.createdAt, true)}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <OrderStatusBadge status={order.status} />
                  {order.status !== OrderStatus.CANCELLED && (
                    <PaymentStatusBadge status={order.paymentStatus} />
                  )}
                </div>
              </div>
              {canCustomerCancel(order) && (
                <button
                  type="button"
                  onClick={() => setIsCancelOpen(true)}
                  className="cursor-pointer self-start rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
                >
                  Cancel order
                </button>
              )}
            </header>

            {order.status === OrderStatus.CANCELLED && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                <p className="font-semibold">
                  This order was cancelled
                  {order.cancelledAt
                    ? ` on ${formatOrderDate(order.cancelledAt, true)}`
                    : ""}
                  .
                </p>
                {order.cancelReason && (
                  <p className="mt-0.5">Reason: {order.cancelReason}</p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
              <div className="flex flex-col gap-6">
                <OrderSection title="Order progress" icon={Route}>
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
                <OrderSection title="Delivery address" icon={MapPin}>
                  <OrderAddressBlock address={order.shippingAddress} />
                </OrderSection>

                <OrderSection title="Payment" icon={CreditCard}>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-secondary-foreground">Status</span>
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </div>
                    {order.paidAt && (
                      <div className="flex justify-between gap-3">
                        <span className="text-secondary-foreground">Paid</span>
                        <span className="text-foreground">
                          {formatOrderDate(order.paidAt, true)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between gap-3 border-t border-border pt-3 font-semibold">
                      <span>Total</span>
                      <span className="text-primary">
                        {formatMoney(order.totalAmount, order.currency)}
                      </span>
                    </div>
                    {order.payments.length > 0 && (
                      <ul className="space-y-2 border-t border-border pt-3">
                        {order.payments.map((payment) => (
                          <li key={payment.id} className="text-xs">
                            <p className="font-medium text-foreground">
                              {payment.cardType ??
                                payment.cardBrand ??
                                "Payment"}{" "}
                              <span className="font-normal text-muted-foreground lowercase">
                                {payment.status}
                              </span>
                            </p>
                            <p className="text-muted-foreground">
                              {payment.tranId},{" "}
                              {formatOrderDate(payment.createdAt, true)}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </OrderSection>

                {order.note && (
                  <OrderSection title="Your note" icon={MessageSquare}>
                    <p className="text-sm whitespace-pre-line text-secondary-foreground">
                      {order.note}
                    </p>
                  </OrderSection>
                )}
              </div>
            </div>

            <CancelOrderDialog
              order={order}
              isOpen={isCancelOpen}
              onClose={() => setIsCancelOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetailClient;
