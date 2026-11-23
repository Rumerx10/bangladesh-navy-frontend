"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { toAddressPayload } from "@/src/components/account/Address/Schema/addressSchema";
import {
  ADDRESSES_QUERY_KEY,
  IAddress,
} from "@/src/components/account/Address/types";
import {
  ICreateOrderPayload,
  IOrder,
  MAX_ORDER_ITEM_QUANTITY,
  ORDER_QUERY_KEYS,
} from "@/src/components/cart/types/order";
import { useGet } from "@/src/hooks/useGet";
import { usePost } from "@/src/hooks/usePost";
import { clearCart } from "@/src/lib/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";

import {
  checkoutDefaultValues,
  checkoutSchema,
  CheckoutSchemaForm,
} from "../Schema/checkoutSchema";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  const { items, initialized } = useAppSelector((state) => state.cart);
  const { userInformation } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // Set once the order is placed, so emptying the cart doesn't bounce the
  // customer to /cart on the way to the confirmation page.
  const placedRef = useRef(false);

  const { data: addressData, isLoading: isAddressesLoading } = useGet<
    IAddress[]
  >("/address", ADDRESSES_QUERY_KEY);
  const addresses = useMemo(
    () => (Array.isArray(addressData?.data) ? addressData.data : []),
    [addressData]
  );

  const methods = useForm<CheckoutSchemaForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(checkoutSchema) as any,
    defaultValues: checkoutDefaultValues,
  });
  const { getValues, setValue } = methods;

  // Pre-select the default address (the API lists it first), or open the
  // new-address form when there are none saved yet.
  useEffect(() => {
    if (isAddressesLoading) return;
    if (addresses.length === 0) {
      setValue("addressMode", "new");
    } else if (!getValues("addressId")) {
      setValue("addressId", addresses[0].id);
    }
  }, [isAddressesLoading, addresses, getValues, setValue]);

  // Start a typed address with the account holder's name.
  useEffect(() => {
    const name = [userInformation?.firstName, userInformation?.lastName]
      .filter(Boolean)
      .join(" ");
    if (name && !getValues("fullName")) setValue("fullName", name);
  }, [
    userInformation?.firstName,
    userInformation?.lastName,
    getValues,
    setValue,
  ]);

  // Wait for the cart to load from IndexedDB before deciding it is empty.
  useEffect(() => {
    if (initialized && items.length === 0 && !placedRef.current) {
      router.replace("/cart");
    }
  }, [initialized, items.length, router]);

  const {
    mutate: placeOrder,
    isPending,
    error,
  } = usePost<IOrder>(
    "/order",
    (order) => {
      placedRef.current = true;
      dispatch(clearCart());
      toast.success(`Order ${order.orderNumber} placed`);
      router.replace(`/checkout/success?order=${order.id}`);
    },
    [ADDRESSES_QUERY_KEY, ORDER_QUERY_KEYS.mine]
  );

  const onSubmit = (values: CheckoutSchemaForm) => {
    // One line per product — the API rejects a product listed twice.
    const quantities = new Map<string, number>();
    for (const item of items) {
      quantities.set(
        item.productId,
        (quantities.get(item.productId) ?? 0) + item.quantity
      );
    }

    const payload: ICreateOrderPayload = {
      items: [...quantities].map(([productId, quantity]) => ({
        productId,
        quantity: Math.min(quantity, MAX_ORDER_ITEM_QUANTITY),
      })),
      ...(values.addressMode === "saved" && values.addressId
        ? { addressId: values.addressId }
        : {
            address: toAddressPayload({
              label: values.label ?? "",
              fullName: values.fullName ?? "",
              phone: values.phone ?? "",
              address: values.address ?? "",
              city: values.city ?? "",
              postcode: values.postcode ?? "",
              country: values.country ?? "",
            }),
          }),
      ...(values.note?.trim() && { note: values.note.trim() }),
    };

    placeOrder({ data: payload });
  };

  if (!initialized || items.length === 0) return null;

  return (
    <FormProvider {...methods}>
      <CheckoutForm
        items={items}
        addresses={addresses}
        isAddressesLoading={isAddressesLoading}
        isPending={isPending}
        error={error}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
};

export default Checkout;
