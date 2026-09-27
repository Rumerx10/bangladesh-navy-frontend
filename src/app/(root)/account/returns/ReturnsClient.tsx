"use client";

import { siteConfig } from "@/src/config/siteConfig";
import { dummyOrders } from "@/src/data/dummyOrders";
import { OrderStatus } from "@/src/components/cart/types/order";
import { ChevronRight, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const statusColors: Record<string, string> = {
  [OrderStatus.RETURNED]: "bg-orange-50 text-orange-700 border-orange-200",
  [OrderStatus.REFUNDED]: "bg-purple-50 text-purple-700 border-purple-200",
};

const ReturnsClient = () => {
  const returnedOrders = dummyOrders.filter(
    (order) =>
      order.orderStatus === OrderStatus.RETURNED ||
      order.orderStatus === OrderStatus.REFUNDED
  );

  if (returnedOrders.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-foreground">
            My Returns
          </h1>
          <p className="text-sm text-secondary-foreground mt-1">
            Track your returned orders
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-50 text-orange-400">
            <RotateCcw size={28} />
          </div>
          <p className="text-sm font-medium text-secondary-foreground">
            No returned orders
          </p>
          <p className="text-xs text-muted-foreground">
            Your returned orders will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-foreground">
          My Returns
        </h1>
        <p className="text-sm text-secondary-foreground mt-1">
          Track your returned orders
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {returnedOrders.map((order) => (
          <div
            key={order.id}
            className="border border-border rounded-xl bg-card overflow-hidden hover:shadow-sm transition-shadow shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-light/60 border-b border-border">
              <div className="flex items-center gap-1.5 text-sm">
                <span className="font-semibold text-foreground">
                  {order.orderNumber}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-secondary-foreground">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize ${
                  statusColors[order.orderStatus] ||
                  "bg-light text-secondary-foreground border-border"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Items */}
            <div className="px-4 sm:px-5 py-3">
              <div className="flex flex-col gap-2.5">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="relative w-11 sm:w-12 min-w-11 sm:min-w-12 h-11 sm:h-12 rounded-lg overflow-hidden bg-light-dark">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-foreground line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[11px] sm:text-xs text-secondary-foreground">
                        Qty: {item.quantity} · {siteConfig.currencySymbol}
                        {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-border">
              <span className="text-sm font-bold text-foreground">
                Refund: {siteConfig.currencySymbol}
                {order.total.toLocaleString()}
              </span>
              <Link
                href={`/orders/${order.id}`}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline no-underline"
              >
                View Details
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReturnsClient;
