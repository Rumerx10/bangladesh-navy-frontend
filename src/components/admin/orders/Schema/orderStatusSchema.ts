import * as Yup from "yup";
import { OrderStatus } from "@/src/components/cart/types/order";

export const orderStatusSchema = Yup.object({
  status: Yup.mixed<OrderStatus>()
    .oneOf(Object.values(OrderStatus))
    .required("Choose the new status"),
  note: Yup.string().trim().max(500, "Keep the note under 500 characters"),
  // Stored only when the status becomes SHIPPED.
  courierName: Yup.string().trim().max(100, "Keep it under 100 characters"),
  trackingNumber: Yup.string().trim().max(100, "Keep it under 100 characters"),
  // Stored only when cancelling.
  reason: Yup.string().trim().max(500, "Keep the reason under 500 characters"),
});

export type OrderStatusFormValues = Yup.InferType<typeof orderStatusSchema>;
