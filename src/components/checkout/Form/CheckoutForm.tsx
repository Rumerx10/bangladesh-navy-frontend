"use client";

import { ICartItem } from "@/src/components/cart/types/cart";
import { PaymentMethod } from "@/src/components/cart/types/order";
import {
  Building2,
  CreditCard,
  ImageIcon,
  Landmark,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

import { CheckoutSchemaForm } from "../Schema/checkoutSchema";

const paymentMethods = [
  {
    id: PaymentMethod.SSLCOMMERZ,
    label: "SSLCommerz",
    icon: <CreditCard size={22} />,
    color: "#1d4ed8",
  },
  {
    id: PaymentMethod.BKASH,
    label: "bKash",
    icon: <Smartphone size={22} />,
    color: "#e11d48",
  },
  {
    id: PaymentMethod.NAGAD,
    label: "Nagad",
    icon: <Smartphone size={22} />,
    color: "#f97316",
  },
  {
    id: PaymentMethod.BANK_TRANSFER,
    label: "Bank Transfer",
    icon: <Landmark size={22} />,
    color: "#0f766e",
  },
  {
    id: PaymentMethod.STRIPE,
    label: "Stripe",
    icon: <Wallet size={22} />,
    color: "#6366f1",
  },
];

function CheckoutItemImage({ src, alt }: { src: string; alt: string }) {
  if (!src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
        <ImageIcon size={20} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="56px"
    />
  );
}

export default function CheckoutForm({
  items,
  onSubmit,
  isPending = false,
}: {
  items: ICartItem[];
  onSubmit: (data: CheckoutSchemaForm) => void | Promise<void>;
  isPending?: boolean;
}) {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CheckoutSchemaForm>();

  const selectedPayment = watch("paymentMethod");
  const isBankTransfer = selectedPayment === PaymentMethod.BANK_TRANSFER;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  const inputClass =
    "w-full px-3 py-2.5 sm:py-2 border border-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground transition-colors";

  const fieldErrorClass = "mt-1 text-xs text-red-500";

  const bankAccountDetails = [
    { label: "Bank Name", value: "BD Bank" },
    { label: "Account Name", value: "Bangladesh Navy Frontend" },
    { label: "Account Number", value: "0123 456 7890" },
    { label: "Branch", value: "Dhaka Main Branch" },
    { label: "Routing Number", value: "123456789" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container px-4 sm:px-0">
      <div className="py-4 lg:py-32">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-4 sm:mb-6">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 lg:gap-8">
          <div className="flex flex-col gap-6">
            <div className="border border-border rounded-xl p-4 sm:p-6 bg-card">
              <h2 className="text-sm sm:text-base font-bold text-foreground mb-4 sm:mb-5 flex items-center gap-2">
                <span className="w-1 h-4.5 rounded-sm bg-primary" />
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Enter your full name"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className={fieldErrorClass}>{errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="+880 1XX XXXX XXX"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className={fieldErrorClass}>{errors.phone.message}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Email
                  </label>
                  <input
                    className={inputClass}
                    type="email"
                    placeholder="your@email.com (optional)"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className={fieldErrorClass}>{errors.email.message}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="House no, street, area"
                    {...register("addressLine1")}
                  />
                  {errors.addressLine1 && (
                    <p className={fieldErrorClass}>
                      {errors.addressLine1.message}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Address Line 2
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    {...register("addressLine2")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Dhaka"
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className={fieldErrorClass}>{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    District <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Dhaka"
                    {...register("district")}
                  />
                  {errors.district && (
                    <p className={fieldErrorClass}>{errors.district.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Division <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Dhaka"
                    {...register("division")}
                  />
                  {errors.division && (
                    <p className={fieldErrorClass}>{errors.division.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Postal Code
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. 1205"
                    {...register("postalCode")}
                  />
                </div>
              </div>
            </div>

            <div className="border border-border rounded-xl p-4 sm:p-6 bg-card">
              <h2 className="text-sm sm:text-base font-bold text-foreground mb-4 sm:mb-5 flex items-center gap-2">
                <span className="w-1 h-4.5 rounded-sm bg-primary" />
                Payment Method
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    className={`flex flex-col items-center gap-1.5 sm:gap-2 py-3 sm:py-4 px-2 sm:px-3 border-2 rounded-lg cursor-pointer transition-all bg-background ${
                      selectedPayment === method.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary"
                    }`}
                    onClick={() => {
                      setValue("paymentMethod", method.id, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });

                      if (method.id !== PaymentMethod.BANK_TRANSFER) {
                        setValue("bankTransactionId", "", {
                          shouldValidate: true,
                        });
                      }
                    }}
                  >
                    <div
                      className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg"
                      style={{ color: method.color }}
                    >
                      {method.icon}
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-foreground text-center">
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>

              {errors.paymentMethod && (
                <p className={fieldErrorClass}>{errors.paymentMethod.message}</p>
              )}

              {isBankTransfer && (
                <div className="mt-6 grid gap-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Building2 size={18} />
                    Bangladesh Bank transfer details
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {bankAccountDetails.map((detail) => (
                      <div
                        key={detail.label}
                        className="rounded-lg border border-amber-200 bg-white/80 p-3"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-700">
                          {detail.label}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {detail.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Bank Transaction ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      placeholder="Enter your bank transaction/reference ID"
                      {...register("bankTransactionId")}
                    />
                    {errors.bankTransactionId && (
                      <p className={fieldErrorClass}>
                        {errors.bankTransactionId.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="border border-border rounded-xl p-4 sm:p-6 bg-card">
              <h2 className="text-sm sm:text-base font-bold text-foreground mb-4 sm:mb-5 flex items-center gap-2">
                <span className="w-1 h-4.5 rounded-sm bg-primary" />
                Order Summary
              </h2>

              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId ?? ""}`}
                    className="flex items-center gap-3"
                  >
                    <div className="relative w-12 sm:w-14 min-w-12 sm:min-w-14 h-12 sm:h-14 rounded-md overflow-hidden bg-gray-100">
                      <CheckoutItemImage src={item.image} alt={item.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-foreground line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[11px] sm:text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-t border-border my-4" />

              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <hr className="border-t border-border" />

                <div className="flex justify-between text-base sm:text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">৳{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                className="flex items-center justify-center gap-2 w-full py-3 mt-4 rounded-lg text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Place Order"}
              </button>

              <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground text-center justify-center mt-3">
                <ShieldCheck size={14} />
                Your information is safe and secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}