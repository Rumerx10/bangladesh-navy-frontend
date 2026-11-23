"use client";

import { IOrder, ORDER_QUERY_KEYS } from "@/src/components/cart/types/order";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { usePatch } from "@/src/hooks/usePatch";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const REASON_MAX = 500;

const CancelOrderDialog = ({
  order,
  isOpen,
  onClose,
}: {
  order: Pick<IOrder, "id" | "orderNumber">;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [reason, setReason] = useState("");

  const { mutate, isPending, error, reset } = usePatch<IOrder>(() => {
    toast.success(`Order ${order.orderNumber} cancelled`);
    setReason("");
    onClose();
  }, [
    ORDER_QUERY_KEYS.detail(order.id),
    ORDER_QUERY_KEYS.tracking(order.id),
    ORDER_QUERY_KEYS.mine,
  ]);

  const close = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancel order {order.orderNumber}?</DialogTitle>
          <DialogDescription>
            This can&apos;t be undone. To get these items you would need to
            place a new order.
          </DialogDescription>
        </DialogHeader>

        <div>
          <label
            htmlFor="cancel-reason"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Reason{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </label>
          <textarea
            id="cancel-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength={REASON_MAX}
            rows={3}
            placeholder="e.g. Ordered the wrong chart"
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none"
          />
        </div>

        <ErrorMessage error={error} />

        <DialogFooter className="gap-2">
          <button
            type="button"
            onClick={close}
            className="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-light"
          >
            Keep order
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() =>
              mutate({
                url: `/order/${order.id}/cancel`,
                data: reason.trim() ? { reason: reason.trim() } : {},
              })
            }
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isPending && <Loader2 size={14} className="animate-spin" />}
            Cancel order
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderDialog;
