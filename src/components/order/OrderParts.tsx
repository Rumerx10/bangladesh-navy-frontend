import { cn } from "@/src/lib/utils";
import {
  IOrder,
  IOrderShippingAddress,
  IOrderTracking,
  OrderStatus,
} from "@/src/components/cart/types/order";
import { PRODUCT_CATEGORY_LABELS } from "@/src/components/admin/ContentManagement/products/types";
import { Check, ImageIcon, Truck, X, type LucideIcon } from "lucide-react";
import Image from "next/image";
import {
  ORDER_STATUS_LABELS,
  formatMoney,
  formatOrderDate,
} from "./orderDisplay";

/* ─────────────────────── Section card ─────────────────────── */

export const OrderSection = ({
  title,
  icon: Icon,
  action,
  children,
  className,
}: {
  title: string;
  icon: LucideIcon;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={cn("rounded-xl border border-border bg-card", className)}>
    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
      <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
        <Icon size={16} className="text-primary" />
        {title}
      </h2>
      {action}
    </div>
    <div className="p-4 sm:p-5">{children}</div>
  </section>
);

/* ─────────────────────── Tracking ─────────────────────── */

/** Progress through the order's steps, the courier once it has shipped, and
 *  every status change with the note the team left on it. */
export const OrderTrackingView = ({
  tracking,
}: {
  tracking: IOrderTracking;
}) => {
  const steps = tracking.steps;
  const events = [...tracking.events].reverse();

  return (
    <div className="space-y-6">
      <ol className="flex flex-col gap-4 sm:flex-row sm:gap-0">
        {steps.map((step, index) => {
          const isCancelled = step.status === OrderStatus.CANCELLED;
          const next = steps[index + 1];
          return (
            <li
              key={step.status}
              className="relative flex gap-3 sm:flex-1 sm:flex-col sm:items-center sm:text-center"
            >
              {next && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-7 left-3.25 h-[calc(100%-12px)] w-0.5 bg-light-silver",
                    "sm:top-3.25 sm:left-[calc(50%+14px)] sm:h-0.5 sm:w-[calc(100%-28px)]",
                    next.completed &&
                      (next.status === OrderStatus.CANCELLED
                        ? "bg-red-400"
                        : "bg-primary")
                  )}
                />
              )}
              <span
                className={cn(
                  "relative z-10 grid size-7 shrink-0 place-items-center rounded-full border-2",
                  step.completed
                    ? isCancelled
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-primary bg-primary text-primary-foreground"
                    : "border-light-silver bg-card",
                  step.current && !isCancelled && "ring-4 ring-primary/15"
                )}
              >
                {step.completed ? (
                  isCancelled ? (
                    <X size={14} strokeWidth={3} />
                  ) : (
                    <Check size={14} strokeWidth={3} />
                  )
                ) : (
                  <span className="size-1.5 rounded-full bg-light-silver" />
                )}
              </span>
              <div className="min-w-0 sm:mt-2 sm:px-1">
                <p
                  className={cn(
                    "text-sm font-medium",
                    step.completed ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {ORDER_STATUS_LABELS[step.status]}
                </p>
                {step.at && (
                  <p className="text-xs text-muted-foreground">
                    {formatOrderDate(step.at, true)}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {(tracking.courierName || tracking.trackingNumber) && (
        <div className="flex items-start gap-3 rounded-lg border border-border bg-light/60 px-4 py-3">
          <Truck size={18} className="mt-0.5 shrink-0 text-primary" />
          <div className="text-sm">
            {tracking.courierName && (
              <p className="font-medium text-foreground">
                Sent with {tracking.courierName}
              </p>
            )}
            {tracking.trackingNumber && (
              <p className="text-secondary-foreground">
                Tracking number{" "}
                <span className="font-medium text-foreground select-all">
                  {tracking.trackingNumber}
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      {events.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground">History</h3>
          <ol className="mt-3 space-y-4 border-l border-border pl-5">
            {events.map((event) => (
              <li key={event.id} className="relative">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-6.5 size-3 rounded-full border-2 border-card bg-primary"
                />
                <p className="text-sm font-medium text-foreground">
                  {ORDER_STATUS_LABELS[event.status]}
                </p>
                {event.note && (
                  <p className="text-sm text-secondary-foreground">
                    {event.note}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {formatOrderDate(event.createdAt, true)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────── Items ─────────────────────── */

export const OrderItemThumb = ({
  src,
  alt,
  className,
}: {
  src: string | null;
  alt: string;
  className?: string;
}) => (
  <div
    className={cn(
      "relative size-14 shrink-0 overflow-hidden rounded-lg border border-border bg-light-dark",
      className
    )}
  >
    {src ? (
      <Image src={src} alt={alt} fill className="object-cover" sizes="56px" />
    ) : (
      <span className="grid size-full place-items-center text-muted-foreground">
        <ImageIcon size={18} />
      </span>
    )}
  </div>
);

export const OrderItemsList = ({ order }: { order: IOrder }) => (
  <div>
    <ul className="divide-y divide-border">
      {order.items.map((item) => (
        <li key={item.id} className="flex items-center gap-3 py-3 first:pt-0">
          <OrderItemThumb src={item.image} alt={item.productNameEn} />
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm font-medium text-foreground">
              {item.productNameEn}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {[
                item.chartCode,
                item.category && PRODUCT_CATEGORY_LABELS[item.category],
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
            <p className="mt-0.5 text-xs text-secondary-foreground">
              {item.quantity} × {formatMoney(item.unitPrice, order.currency)}
            </p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-foreground tabular-nums">
            {formatMoney(item.lineTotal, order.currency)}
          </span>
        </li>
      ))}
    </ul>
    <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
      <span className="text-sm font-semibold text-foreground">Total</span>
      <span className="text-base font-bold text-primary tabular-nums">
        {formatMoney(order.totalAmount, order.currency)}
      </span>
    </div>
  </div>
);

/* ─────────────────────── Address ─────────────────────── */

export const OrderAddressBlock = ({
  address,
}: {
  address: IOrderShippingAddress;
}) => (
  <address className="space-y-1 text-sm not-italic text-secondary-foreground">
    <p className="font-semibold text-foreground">{address.fullName}</p>
    <p>{address.phone}</p>
    {address.email && <p>{address.email}</p>}
    <p className="pt-1">{address.address}</p>
    <p>
      {address.city}
      {address.postcode ? ` ${address.postcode}` : ""}, {address.country}
    </p>
  </address>
);
