import { IOrder } from "@/src/components/cart/types/order";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/src/components/order/OrderBadges";
import {
  formatMoney,
  formatOrderDate,
  itemCountLabel,
} from "@/src/components/order/orderDisplay";
import { ColumnDef } from "@/src/components/ui/data-table";
import { Eye } from "lucide-react";
import Link from "next/link";

const GetOrderColumns = (): ColumnDef<IOrder>[] => [
  {
    header: "Order",
    accessorKey: "orderNumber",
    cell: (_value, row) => (
      <div>
        <Link
          href={`/admin/orders/${row.id}`}
          className="text-sm font-semibold text-secondary-dark hover:text-primary"
        >
          {row.orderNumber}
        </Link>
        <p className="text-xs text-muted-foreground">
          {formatOrderDate(row.createdAt, true)}
        </p>
      </div>
    ),
  },
  {
    header: "Customer",
    accessorKey: "shippingAddress",
    cell: (_value, row) => (
      <div className="max-w-52">
        <p className="truncate text-sm text-secondary-dark">
          {row.shippingAddress.fullName}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {row.shippingAddress.phone}
        </p>
      </div>
    ),
  },
  {
    header: "Total",
    accessorKey: "totalAmount",
    cell: (_value, row) => (
      <div>
        <p className="text-sm font-semibold text-secondary-dark tabular-nums">
          {formatMoney(row.totalAmount, row.currency)}
        </p>
        <p className="text-xs text-muted-foreground">{itemCountLabel(row)}</p>
      </div>
    ),
  },
  {
    header: "Payment",
    accessorKey: "paymentStatus",
    cell: (_value, row) => <PaymentStatusBadge status={row.paymentStatus} />,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (_value, row) => <OrderStatusBadge status={row.status} />,
  },
  {
    header: "Action",
    accessorKey: "id",
    cell: (_value, row) => (
      <Link
        href={`/admin/orders/${row.id}`}
        aria-label={`Open order ${row.orderNumber}`}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-light hover:bg-light-dark"
      >
        <Eye className="size-4 text-secondary-foreground" />
      </Link>
    ),
  },
];

export default GetOrderColumns;
