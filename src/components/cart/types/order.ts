// ─── Order types (match the backend's /order API) ───

import { ProductCategory } from "@/src/components/admin/ContentManagement/products/types";

/** Most of one product a single order line may carry (OrderItemDto max). */
export const MAX_ORDER_ITEM_QUANTITY = 100;

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export type PaymentAttemptStatus =
  "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED" | "REFUNDED";

/** Contact and delivery details copied onto the order when it was placed. */
export interface IOrderShippingAddress {
  /** The saved address it was copied from; null if that was deleted. */
  userAddressId: string | null;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string | null;
  country: string;
}

export interface IOrderItem {
  id: string;
  productId: string;
  productNameEn: string;
  productNameBn: string | null;
  chartCode: string | null;
  category: ProductCategory | null;
  image: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface IOrderPayment {
  id: string;
  tranId: string;
  status: PaymentAttemptStatus;
  amount: number;
  /** Payment type, e.g. MOBILEBANKING, VISA. */
  cardBrand: string | null;
  /** Exact channel, e.g. BKASH-BKash. */
  cardType: string | null;
  paidAt: string | null;
  createdAt: string;
}

export interface IOrder {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  currency: string;
  shippingAddress: IOrderShippingAddress;
  note: string | null;
  paidAt: string | null;
  cancelledAt: string | null;
  cancelReason: string | null;
  courierName: string | null;
  trackingNumber: string | null;
  items: IOrderItem[];
  /** Payment attempts, newest first. */
  payments: IOrderPayment[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderTrackingStep {
  status: OrderStatus;
  /** The order has reached this step. */
  completed: boolean;
  /** This is where the order is now. */
  current: boolean;
  at: string | null;
}

export interface IOrderTrackingEvent {
  id: string;
  status: OrderStatus;
  note: string | null;
  createdAt: string;
}

export interface IOrderTracking {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paidAt: string | null;
  courierName: string | null;
  trackingNumber: string | null;
  /** PENDING → … → DELIVERED; SHIPPED is left out for digital-only orders. */
  steps: IOrderTrackingStep[];
  /** Every status change, oldest first. */
  events: IOrderTrackingEvent[];
  createdAt: string;
  updatedAt: string;
}

/** Body of POST /order — send `addressId` or `address`, never both. A type
 *  alias rather than an interface so it fits the mutation hooks'
 *  `Record<string, unknown>` body. */
export type ICreateOrderPayload = {
  items: { productId: string; quantity: number }[];
  addressId?: string;
  address?: {
    label?: string;
    fullName: string;
    phone: string;
    address: string;
    city: string;
    postcode?: string;
    country?: string;
  };
  note?: string;
};

/** Query-key roots, so a placed or cancelled order refreshes every list. */
export const ORDER_QUERY_KEYS = {
  mine: ["my-orders"],
  detail: (id: string) => ["order", id],
  tracking: (id: string) => ["order-tracking", id],
  admin: ["admin-orders"],
};
