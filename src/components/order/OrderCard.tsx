import { IOrder, OrderStatus } from "@/src/components/cart/types/order";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { OrderStatusBadge, PaymentStatusBadge } from "./OrderBadges";
import { formatMoney, formatOrderDate, itemCountLabel } from "./orderDisplay";
import { OrderItemThumb } from "./OrderParts";

const PREVIEW_ITEMS = 3;

/** One order in the customer's lists — My Orders and My Cancellations. */
const OrderCard = ({ order }: { order: IOrder }) => {
  const isCancelled = order.status === OrderStatus.CANCELLED;

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <header className="flex flex-col gap-2 border-b border-border bg-light/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="min-w-0 text-sm">
          <Link
            href={`/orders/${order.id}`}
            className="font-semibold text-foreground no-underline hover:text-primary"
          >
            {order.orderNumber}
          </Link>
          <p className="text-xs text-secondary-foreground">
            Placed {formatOrderDate(order.createdAt)}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <OrderStatusBadge status={order.status} />
          {!isCancelled && <PaymentStatusBadge status={order.paymentStatus} />}
        </div>
      </header>

      <ul className="flex flex-col gap-3 px-4 py-3 sm:px-5 sm:py-4">
        {order.items.slice(0, PREVIEW_ITEMS).map((item) => (
          <li key={item.id} className="flex items-center gap-3 sm:gap-4">
            <OrderItemThumb
              src={item.image}
              alt={item.productNameEn}
              className="size-12 sm:size-14"
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm font-medium text-foreground">
                {item.productNameEn}
              </p>
              <p className="mt-0.5 text-xs text-secondary-foreground">
                {item.quantity} × {formatMoney(item.unitPrice, order.currency)}
              </p>
            </div>
            <span className="hidden shrink-0 text-sm font-semibold text-foreground tabular-nums md:block">
              {formatMoney(item.lineTotal, order.currency)}
            </span>
          </li>
        ))}
        {order.items.length > PREVIEW_ITEMS && (
          <li className="pl-15 text-xs text-muted-foreground">
            and {order.items.length - PREVIEW_ITEMS} more
          </li>
        )}
      </ul>

      {isCancelled && order.cancelReason && (
        <p className="mx-4 mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 sm:mx-5 dark:bg-red-500/10 dark:text-red-300">
          Cancelled
          {order.cancelledAt ? ` on ${formatOrderDate(order.cancelledAt)}` : ""}
          : {order.cancelReason}
        </p>
      )}

      <footer className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 sm:px-5">
        <span className="text-sm font-bold text-foreground">
          {formatMoney(order.totalAmount, order.currency)}
          <span className="ml-1.5 text-xs font-normal text-muted-foreground">
            {itemCountLabel(order)}
          </span>
        </span>
        <Link
          href={`/orders/${order.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary no-underline hover:underline"
        >
          View details
          <ChevronRight size={14} />
        </Link>
      </footer>
    </article>
  );
};

export default OrderCard;
