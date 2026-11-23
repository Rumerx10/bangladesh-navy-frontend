"use client";

import AddressFields from "@/src/components/account/Address/Form/AddressFields";
import { IAddress } from "@/src/components/account/Address/types";
import { ICartItem } from "@/src/components/cart/types/cart";
import { formatMoney } from "@/src/components/order/orderDisplay";
import { OrderItemThumb } from "@/src/components/order/OrderParts";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import { ErrorType } from "@/src/components/shared/types/common";
import { cn } from "@/src/lib/utils";
import {
  Loader2,
  MapPin,
  MessageSquare,
  Plus,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

import { CheckoutSchemaForm } from "../Schema/checkoutSchema";

const Panel = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof MapPin;
  children: React.ReactNode;
}) => (
  <section className="rounded-xl border border-border bg-card p-4 sm:p-6">
    <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground sm:mb-5 sm:text-base">
      <Icon size={18} className="text-primary" />
      {title}
    </h2>
    {children}
  </section>
);

const optionClass = (selected: boolean) =>
  cn(
    "flex w-full cursor-pointer items-start gap-3 rounded-lg border-2 p-4 text-left transition-colors",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
    selected
      ? "border-primary bg-primary/5"
      : "border-border bg-background hover:border-primary/40"
  );

const RadioDot = ({ selected }: { selected: boolean }) => (
  <span
    aria-hidden
    className={cn(
      "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border-2",
      selected ? "border-primary" : "border-light-silver"
    )}
  >
    {selected && <span className="size-2 rounded-full bg-primary" />}
  </span>
);

interface CheckoutFormProps {
  items: ICartItem[];
  addresses: IAddress[];
  isAddressesLoading: boolean;
  onSubmit: (data: CheckoutSchemaForm) => void;
  isPending?: boolean;
  error?: ErrorType;
}

const CheckoutForm = ({
  items,
  addresses,
  isAddressesLoading,
  onSubmit,
  isPending = false,
  error,
}: CheckoutFormProps) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CheckoutSchemaForm>();

  const addressMode = watch("addressMode");
  const addressId = watch("addressId");
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const chooseSaved = (id: string) => {
    setValue("addressMode", "saved");
    setValue("addressId", id, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container px-4"
      noValidate
    >
      <div className="below-site-header pb-20 lg:pb-16">
        <h1 className="mb-4 text-lg font-bold text-foreground sm:mb-6 sm:text-xl lg:text-2xl">
          Checkout
        </h1>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_400px] lg:gap-8">
          <div className="flex flex-col gap-6">
            <Panel title="Delivery address" icon={MapPin}>
              {isAddressesLoading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="h-28 animate-pulse rounded-lg bg-light-dark"
                    />
                  ))}
                </div>
              ) : (
                <>
                  {addresses.length > 0 && (
                    <div
                      role="radiogroup"
                      aria-label="Delivery address"
                      className="grid gap-3 sm:grid-cols-2"
                    >
                      {addresses.map((address) => {
                        const selected =
                          addressMode === "saved" && addressId === address.id;
                        return (
                          <button
                            key={address.id}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => chooseSaved(address.id)}
                            className={optionClass(selected)}
                          >
                            <RadioDot selected={selected} />
                            <span className="min-w-0 text-sm">
                              <span className="flex flex-wrap items-center gap-1.5">
                                <span className="font-semibold text-foreground">
                                  {address.fullName}
                                </span>
                                {address.label && (
                                  <span className="rounded bg-light-dark px-1.5 py-0.5 text-[11px] font-medium text-secondary-foreground">
                                    {address.label}
                                  </span>
                                )}
                                {address.isDefault && (
                                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary">
                                    Default
                                  </span>
                                )}
                              </span>
                              <span className="mt-1 block text-secondary-foreground">
                                {address.phone}
                              </span>
                              <span className="block text-secondary-foreground">
                                {address.address}, {address.city}
                                {address.postcode ? ` ${address.postcode}` : ""}
                              </span>
                            </span>
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        role="radio"
                        aria-checked={addressMode === "new"}
                        onClick={() => setValue("addressMode", "new")}
                        className={cn(
                          optionClass(addressMode === "new"),
                          "items-center"
                        )}
                      >
                        <RadioDot selected={addressMode === "new"} />
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                          <Plus size={15} />
                          Use a new address
                        </span>
                      </button>
                    </div>
                  )}

                  {errors.addressId && addressMode === "saved" && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.addressId.message}
                    </p>
                  )}

                  {addressMode === "new" && (
                    <div className={cn(addresses.length > 0 && "mt-5")}>
                      <AddressFields fieldClassName="bg-background" />
                      <p className="mt-3 text-xs text-muted-foreground">
                        This address is saved to your{" "}
                        <Link
                          href="/account/addresses"
                          className="text-primary hover:underline"
                        >
                          address book
                        </Link>{" "}
                        for next time.
                      </p>
                    </div>
                  )}
                </>
              )}
            </Panel>

            <Panel title="Order note" icon={MessageSquare}>
              <ControlledTextareaField
                name="note"
                className="bg-background"
                placeholder="Anything we should know, e.g. call before delivery (optional)"
                maxLength={500}
              />
            </Panel>
          </div>

          <div className="lg:sticky lg:top-40">
            <Panel title="Order summary" icon={ShoppingBag}>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.variantId ?? ""}`}
                    className="flex items-center gap-3"
                  >
                    <OrderItemThumb
                      src={item.image || null}
                      alt={item.name}
                      className="size-12 sm:size-14"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-xs font-medium text-foreground sm:text-sm">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground sm:text-xs">
                        {item.quantity} × {formatMoney(item.price)}
                      </p>
                    </div>
                    <span className="text-xs font-semibold whitespace-nowrap text-foreground tabular-nums sm:text-sm">
                      {formatMoney(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-col gap-2.5 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground tabular-nums">
                    {formatMoney(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-2.5 text-base font-bold sm:text-lg">
                  <span>Total</span>
                  <span className="text-primary tabular-nums">
                    {formatMoney(subtotal)}
                  </span>
                </div>
              </div>

              {error && (
                <div className="mt-4">
                  <ErrorMessage error={error} />
                </div>
              )}

              <button
                type="submit"
                disabled={isPending || isAddressesLoading}
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending && <Loader2 size={16} className="animate-spin" />}
                {isPending ? "Placing order…" : "Place order"}
              </button>

              <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
                Final prices are taken from the catalogue when the order is
                placed. Orders start as pending and unpaid; you can follow each
                step from My Orders.
              </p>
            </Panel>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
