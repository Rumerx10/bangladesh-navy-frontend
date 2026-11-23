import { cn } from "@/src/lib/utils";
import { OrderStatus, PaymentStatus } from "@/src/components/cart/types/order";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_STYLES,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_STYLES,
} from "./orderDisplay";

const badgeBase =
  "inline-flex w-fit shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap";

export const OrderStatusBadge = ({
  status,
  className,
}: {
  status: OrderStatus;
  className?: string;
}) => (
  <span className={cn(badgeBase, ORDER_STATUS_STYLES[status], className)}>
    {ORDER_STATUS_LABELS[status] ?? status}
  </span>
);

export const PaymentStatusBadge = ({
  status,
  className,
}: {
  status: PaymentStatus;
  className?: string;
}) => (
  <span className={cn(badgeBase, PAYMENT_STATUS_STYLES[status], className)}>
    {PAYMENT_STATUS_LABELS[status] ?? status}
  </span>
);
