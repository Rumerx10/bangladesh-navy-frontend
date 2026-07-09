import * as Yup from "yup";

import { PaymentMethod } from "@/src/components/cart/types/order";

const paymentMethods = Object.values(PaymentMethod) as PaymentMethod[];

export const checkoutSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .transform((value) => (value?.trim() ? value : undefined))
    .email("Email must be valid")
    .notRequired(),
  addressLine1: Yup.string().required("Address line 1 is required"),
  addressLine2: Yup.string().optional(),
  city: Yup.string().required("City is required"),
  district: Yup.string().required("District is required"),
  division: Yup.string().required("Division is required"),
  postalCode: Yup.string().optional(),
  paymentMethod: Yup.mixed<PaymentMethod>()
    .oneOf(paymentMethods, "Select a payment method")
    .required("Payment method is required"),
  bankTransactionId: Yup.string().when("paymentMethod", {
    is: PaymentMethod.BANK_TRANSFER,
    then: (schema) => schema.required("Bank transaction ID is required"),
    otherwise: (schema) => schema.optional(),
  }),
});

export type CheckoutSchemaForm = Yup.InferType<typeof checkoutSchema>;
