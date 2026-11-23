"use client";

import { IOrder, ORDER_QUERY_KEYS } from "@/src/components/cart/types/order";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/src/components/order/OrderBadges";
import {
  formatMoney,
  itemCountLabel,
} from "@/src/components/order/orderDisplay";
import { useGet } from "@/src/hooks/useGet";
import { CheckCircle2, Package } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CheckoutSuccessClient = () => {
  const orderId = useSearchParams().get("order") ?? "";

  const { data, isLoading } = useGet<IOrder>(
    `/order/${orderId}`,
    ORDER_QUERY_KEYS.detail(orderId),
    undefined,
    { enabled: !!orderId }
  );
  const order = data?.data;

  return (
    <div className="container px-4">
      <div className="below-site-header mx-auto flex max-w-lg flex-col items-center gap-5 pb-16 text-center lg:pb-24">
        <div className="grid size-20 place-items-center rounded-full bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
          <CheckCircle2 size={40} />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Your order is placed
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We&apos;ll review it and update its status as it moves along. You
            can follow every step from My Orders.
          </p>
        </div>

        {orderId && (
          <div className="w-full rounded-xl border border-border bg-card p-5 text-left">
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-5 w-48 animate-pulse rounded bg-light-dark" />
                <div className="h-4 w-32 animate-pulse rounded bg-light-dark" />
              </div>
            ) : order ? (
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div className="col-span-2">
                  <dt className="text-xs text-muted-foreground">
                    Order number
                  </dt>
                  <dd className="font-semibold text-foreground select-all">
                    {order.orderNumber}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Total</dt>
                  <dd className="font-semibold text-foreground">
                    {formatMoney(order.totalAmount, order.currency)}
                    <span className="ml-1 font-normal text-muted-foreground">
                      ({itemCountLabel(order)})
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Status</dt>
                  <dd className="mt-0.5 flex flex-wrap gap-1.5">
                    <OrderStatusBadge status={order.status} />
                    <PaymentStatusBadge status={order.paymentStatus} />
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm text-muted-foreground">
                Order details aren&apos;t available right now. You&apos;ll find
                the order in My Orders.
              </p>
            )}
          </div>
        )}

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Link
            href={orderId ? `/orders/${orderId}` : "/account/orders"}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
          >
            <Package size={16} />
            {orderId ? "View order" : "My orders"}
          </Link>
          <Link
            href="/products"
            className="flex flex-1 items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground no-underline transition-colors hover:bg-light"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessClient;
