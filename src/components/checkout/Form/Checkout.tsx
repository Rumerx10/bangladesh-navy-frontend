"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { PaymentMethod } from "@/src/components/cart/types/order";
import { useAppSelector } from "@/src/lib/redux/hooks";

import { checkoutSchema, CheckoutSchemaForm } from "../Schema/checkoutSchema";
import CheckoutForm from "./CheckoutForm";

const defaultValues: CheckoutSchemaForm = {
  fullName: "",
  phone: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  district: "",
  division: "",
  postalCode: "",
  paymentMethod: PaymentMethod.SSLCOMMERZ,
  bankTransactionId: "",
};

export default function Checkout() {
  const { items } = useAppSelector((state) => state.cart);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const methods = useForm<CheckoutSchemaForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(checkoutSchema) as any,
    defaultValues,
  });

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items.length, router]);

  const onSubmit = async (data: CheckoutSchemaForm) => {
    setIsPending(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (data.paymentMethod === PaymentMethod.BANK_TRANSFER) {
      toast.success(
        "Bank transfer submitted. We will verify the transaction shortly."
      );
    } else {
      toast.info(`${data.paymentMethod} payment gateway coming soon!`);
    }

    methods.reset(defaultValues);
    setIsPending(false);
  };

  if (items.length === 0) return null;

  return (
    <FormProvider {...methods}>
      <CheckoutForm items={items} isPending={isPending} onSubmit={onSubmit} />
    </FormProvider>
  );
}
