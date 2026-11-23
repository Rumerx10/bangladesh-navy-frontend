import { siteConfig } from "@/src/config/siteConfig";
import {
  IOrder,
  OrderStatus,
  PaymentStatus,
} from "@/src/components/cart/types/order";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "Pending",
  [OrderStatus.CONFIRMED]: "Confirmed",
  [OrderStatus.PROCESSING]: "Processing",
  [OrderStatus.SHIPPED]: "Shipped",
  [OrderStatus.DELIVERED]: "Delivered",
  [OrderStatus.CANCELLED]: "Cancelled",
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  [PaymentStatus.UNPAID]: "Unpaid",
  [PaymentStatus.PAID]: "Paid",
  [PaymentStatus.FAILED]: "Payment failed",
  [PaymentStatus.REFUNDED]: "Refunded",
};

export const ORDER_STATUS_STYLES: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]:
    "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-300 dark:border-yellow-500/30",
  [OrderStatus.CONFIRMED]:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30",
  [OrderStatus.PROCESSING]:
    "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/30",
  [OrderStatus.SHIPPED]:
    "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/30",
  [OrderStatus.DELIVERED]:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/30",
  [OrderStatus.CANCELLED]:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/30",
};

export const PAYMENT_STATUS_STYLES: Record<PaymentStatus, string> = {
  [PaymentStatus.UNPAID]:
    "bg-light-dark text-secondary-foreground border-light-silver",
  [PaymentStatus.PAID]:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/30",
  [PaymentStatus.FAILED]:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/30",
  [PaymentStatus.REFUNDED]:
    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30",
};

/** `1500.5` → "৳1,500.50"; whole amounts drop the decimals. */
export const formatMoney = (amount: number, currency = siteConfig.currency) => {
  const symbol =
    currency === siteConfig.currency
      ? siteConfig.currencySymbol
      : `${currency} `;
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatOrderDate = (iso: string, withTime = false) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime && { hour: "numeric", minute: "2-digit", hour12: true }),
  });

/** Customers may cancel only an order nobody has acted on or paid for yet. */
export const canCustomerCancel = (
  order: Pick<IOrder, "status" | "paymentStatus">
) =>
  order.status === OrderStatus.PENDING &&
  order.paymentStatus === PaymentStatus.UNPAID;

/** Where an admin can move an order next. PROCESSING → DELIVERED covers
 *  digital charts, which are never shipped; CANCELLED is allowed from any
 *  state before SHIPPED. */
export const NEXT_ORDER_STATUSES: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
  [OrderStatus.PROCESSING]: [
    OrderStatus.SHIPPED,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED,
  ],
  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: [],
};

export const itemCountLabel = (order: Pick<IOrder, "items">) => {
  const count = order.items.reduce((sum, item) => sum + item.quantity, 0);
  return `${count} ${count === 1 ? "item" : "items"}`;
};
