"use client";

import {
  IOrder,
  OrderStatus,
  ORDER_QUERY_KEYS,
} from "@/src/components/cart/types/order";
import {
  NEXT_ORDER_STATUSES,
  ORDER_STATUS_LABELS,
} from "@/src/components/order/orderDisplay";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledSelectField from "@/src/components/shared/FromController/ControlledSelectField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import InputLabel from "@/src/components/shared/InputLabel";
import SubmitButton from "@/src/components/shared/SubmitButton";
import { usePatch } from "@/src/hooks/usePatch";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import {
  orderStatusSchema,
  OrderStatusFormValues,
} from "../Schema/orderStatusSchema";

const EMPTY: Partial<OrderStatusFormValues> = {
  note: "",
  courierName: "",
  trackingNumber: "",
  reason: "",
};

/** Moves an order along PENDING → CONFIRMED → PROCESSING → SHIPPED →
 *  DELIVERED (PROCESSING → DELIVERED for digital charts), or cancels it before
 *  it ships. Only the moves the API allows from the current status are
 *  offered. */
const UpdateOrderStatus = ({ order }: { order: IOrder }) => {
  const nextStatuses = NEXT_ORDER_STATUSES[order.status];

  const methods = useForm<OrderStatusFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(orderStatusSchema) as any,
    defaultValues: { ...EMPTY, status: nextStatuses[0] },
  });
  const nextStatus = useWatch({ control: methods.control, name: "status" });

  // The order moved on (this form or another admin) — offer the new options.
  useEffect(() => {
    methods.reset({ ...EMPTY, status: NEXT_ORDER_STATUSES[order.status][0] });
  }, [order.status, methods]);

  const { mutate, isPending, error } = usePatch<IOrder>(
    (updated) => {
      toast.success(
        `Order ${updated.orderNumber} is now ${ORDER_STATUS_LABELS[updated.status].toLowerCase()}`
      );
    },
    [
      ORDER_QUERY_KEYS.detail(order.id),
      ORDER_QUERY_KEYS.tracking(order.id),
      ORDER_QUERY_KEYS.admin,
    ]
  );

  if (nextStatuses.length === 0) {
    return (
      <p className="text-sm text-secondary-foreground">
        This order is {ORDER_STATUS_LABELS[order.status].toLowerCase()}, so its
        status can&apos;t change any more.
      </p>
    );
  }

  const onSubmit = (values: OrderStatusFormValues) => {
    const isShipping = values.status === OrderStatus.SHIPPED;
    const isCancelling = values.status === OrderStatus.CANCELLED;
    mutate({
      url: `/order/${order.id}/status`,
      data: {
        status: values.status,
        ...(values.note?.trim() && { note: values.note.trim() }),
        ...(isShipping &&
          values.courierName?.trim() && {
            courierName: values.courierName.trim(),
          }),
        ...(isShipping &&
          values.trackingNumber?.trim() && {
            trackingNumber: values.trackingNumber.trim(),
          }),
        ...(isCancelling &&
          values.reason?.trim() && { reason: values.reason.trim() }),
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <div>
          <InputLabel label="Move to" required />
          <ControlledSelectField
            name="status"
            options={nextStatuses.map((status) => ({
              label: ORDER_STATUS_LABELS[status],
              value: status,
            }))}
          />
        </div>

        {nextStatus === OrderStatus.SHIPPED && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <InputLabel label="Courier" />
              <ControlledInputField
                name="courierName"
                placeholder="e.g. Sundarban Courier"
                maxLength={100}
              />
            </div>
            <div>
              <InputLabel label="Tracking number" />
              <ControlledInputField
                name="trackingNumber"
                placeholder="e.g. SCS-123456789"
                maxLength={100}
              />
            </div>
          </div>
        )}

        {nextStatus === OrderStatus.CANCELLED && (
          <div>
            <InputLabel label="Reason for cancelling" />
            <ControlledTextareaField
              name="reason"
              placeholder="Shown to the customer"
              maxLength={500}
            />
          </div>
        )}

        <div>
          <InputLabel label="Note for the customer" />
          <ControlledTextareaField
            name="note"
            placeholder={
              nextStatus === OrderStatus.CANCELLED
                ? "Optional — the reason is shown if this is empty"
                : "Optional — shown on their tracking timeline"
            }
            maxLength={500}
          />
        </div>

        <ErrorMessage error={error} />

        <SubmitButton
          isLoading={isPending}
          label={
            nextStatus === OrderStatus.CANCELLED
              ? "Cancel order"
              : `Mark as ${ORDER_STATUS_LABELS[nextStatus ?? nextStatuses[0]].toLowerCase()}`
          }
        />
      </form>
    </FormProvider>
  );
};

export default UpdateOrderStatus;
