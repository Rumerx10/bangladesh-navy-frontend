"use client";

import { IOrderTracking } from "@/src/components/cart/types/order";
import { IGenericErrorResponse } from "@/src/components/shared/types/common";
import { axiosInstance } from "@/src/helpers/axios/axiosInstance";
import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

/** "Track an order" by the number printed on the confirmation. The lookup
 *  answers with the order's id, so it opens the normal order page. */
const TrackOrderBox = () => {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const value = orderNumber.trim();
    if (!value) {
      setError("Enter an order number, e.g. ORD-20261105-7KQ2MX");
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      const response = (await axiosInstance.get(
        `/order/track/${encodeURIComponent(value)}`
      )) as unknown as { data: IOrderTracking };
      router.push(`/orders/${response.data.orderId}`);
    } catch (err) {
      // Most errors arrive normalised by the axios interceptor; a 403 comes
      // through as the raw axios error, with the status on `response`.
      const status =
        (err as IGenericErrorResponse)?.statusCode ??
        (err as { response?: { status?: number } })?.response?.status;
      setError(
        status === 404 || status === 403
          ? "No order with that number on your account."
          : "Couldn't look up that order. Check the number and try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-4"
      noValidate
    >
      <label
        htmlFor="track-order-number"
        className="text-sm font-semibold text-foreground"
      >
        Track an order
      </label>
      <div className="mt-2 flex gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="track-order-number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Order number, e.g. ORD-20261105-7KQ2MX"
            aria-invalid={!!error}
            aria-describedby={error ? "track-order-error" : undefined}
            className="h-10 w-full rounded-lg border border-border bg-light pr-3 pl-9 text-sm uppercase placeholder:normal-case focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/10 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isLoading && <Loader2 size={14} className="animate-spin" />}
          Track
        </button>
      </div>
      {error && (
        <p
          id="track-order-error"
          role="alert"
          className="mt-2 text-xs text-red-500"
        >
          {error}
        </p>
      )}
    </form>
  );
};

export default TrackOrderBox;
