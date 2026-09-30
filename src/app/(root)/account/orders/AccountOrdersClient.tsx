"use client";

import { siteConfig } from "@/src/config/siteConfig";
import { dummyOrders } from "@/src/data/dummyOrders";
import { IOrder, OrderStatus } from "@/src/components/cart/types/order";
import {
  Calendar,
  ChevronRight,
  Clock,
  Package,
  Search,
  Truck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const statusConfig: Record<
  OrderStatus,
  { color: string; bgColor: string; borderColor: string; icon: React.ReactNode }
> = {
  [OrderStatus.PENDING]: {
    color: "text-yellow-700",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    icon: <Clock size={12} />,
  },
  [OrderStatus.CONFIRMED]: {
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: <Package size={12} />,
  },
  [OrderStatus.PROCESSING]: {
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    icon: <Package size={12} />,
  },
  [OrderStatus.SHIPPED]: {
    color: "text-cyan-700",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    icon: <Truck size={12} />,
  },
  [OrderStatus.DELIVERED]: {
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icon: <Package size={12} />,
  },
  [OrderStatus.CANCELLED]: {
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: <X size={12} />,
  },
  [OrderStatus.RETURNED]: {
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    icon: <Package size={12} />,
  },
  [OrderStatus.REFUNDED]: {
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    icon: <Package size={12} />,
  },
};

const tabs = [
  { label: "All", value: "all", count: dummyOrders.length },
  {
    label: "Pending",
    value: OrderStatus.PENDING,
    count: dummyOrders.filter((o) => o.orderStatus === OrderStatus.PENDING)
      .length,
  },
  {
    label: "Processing",
    value: OrderStatus.PROCESSING,
    count: dummyOrders.filter((o) => o.orderStatus === OrderStatus.PROCESSING)
      .length,
  },
  {
    label: "Shipped",
    value: OrderStatus.SHIPPED,
    count: dummyOrders.filter((o) => o.orderStatus === OrderStatus.SHIPPED)
      .length,
  },
  {
    label: "Delivered",
    value: OrderStatus.DELIVERED,
    count: dummyOrders.filter((o) => o.orderStatus === OrderStatus.DELIVERED)
      .length,
  },
];

/* ─────────────────────── Order Card ─────────────────────── */
const OrderCard = ({ order }: { order: IOrder }) => {
  const status = statusConfig[order.orderStatus];

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 sm:px-5 py-3 bg-light/60 border-b border-border">
        <div className="flex items-center gap-2 text-sm min-w-0">
          <Package
            size={15}
            className="text-muted-foreground shrink-0 hidden sm:block"
          />
          <span className="font-semibold text-foreground truncate">
            {order.orderNumber}
          </span>
          <span className="text-light-silver hidden xs:inline">·</span>
          <span className="text-secondary-foreground flex items-center gap-1 text-xs sm:text-sm shrink-0">
            <Calendar size={12} className="text-muted-foreground sm:hidden" />
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize shrink-0 w-fit ${status.bgColor} ${status.color} ${status.borderColor}`}
        >
          {status.icon}
          {order.orderStatus}
        </span>
      </div>

      {/* ── Items ── */}
      <div className="px-4 sm:px-5 py-3 sm:py-4">
        <div className="flex flex-col gap-3">
          {order.items.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 sm:gap-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-light-dark shrink-0 border border-border">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 48px, 56px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {item.name}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-secondary-foreground">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {siteConfig.currencySymbol}
                    {item.price.toLocaleString()}
                  </span>
                </div>
              </div>
              {/* Per-item subtotal — desktop only */}
              <span className="hidden md:block text-sm font-semibold text-foreground shrink-0">
                {siteConfig.currencySymbol}
                {(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
          {order.items.length > 3 && (
            <p className="text-xs text-muted-foreground pl-15">
              +{order.items.length - 3} more item(s)
            </p>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 sm:px-5 py-3 border-t border-border bg-light/30">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-foreground">
            Total: {siteConfig.currencySymbol}
            {order.total.toLocaleString()}
          </span>
          {order.trackingNumber && (
            <span className="hidden sm:flex items-center gap-1 text-xs text-secondary-foreground">
              <Truck size={12} className="text-muted-foreground" />
              {order.trackingNumber}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {order.estimatedDelivery &&
            order.orderStatus !== OrderStatus.DELIVERED &&
            order.orderStatus !== OrderStatus.CANCELLED && (
              <span className="text-[11px] text-muted-foreground hidden sm:block">
                Est.{" "}
                {new Date(order.estimatedDelivery).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          <Link
            href={`/orders/${order.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline no-underline transition-colors"
          >
            View Details
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────── Page ─────────────────────── */
const AccountOrdersClient = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = useMemo(() => {
    return dummyOrders.filter((order) => {
      // Exclude cancelled and returned from the "all" view in this page
      if (
        activeTab === "all" &&
        (order.orderStatus === OrderStatus.CANCELLED ||
          order.orderStatus === OrderStatus.RETURNED ||
          order.orderStatus === OrderStatus.REFUNDED)
      ) {
        return false;
      }
      const matchesTab = activeTab === "all" || order.orderStatus === activeTab;
      const matchesSearch = searchQuery
        ? order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : true;
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-foreground">
            My Orders
          </h1>
          <p className="text-sm text-secondary-foreground mt-0.5">
            Track and manage your orders
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          {filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── Search ── */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by order number or product name..."
          className="w-full h-10 sm:h-11 pl-10 pr-10 rounded-lg border border-border bg-light text-sm focus:border-primary focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary-foreground p-0.5 cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${
              activeTab === tab.value
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-card text-secondary-foreground border-border hover:border-primary/30 hover:text-primary"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === tab.value
                    ? "bg-white/20 text-white"
                    : "bg-light-dark text-secondary-foreground"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Order List ── */}
      {filteredOrders.length > 0 ? (
        <div className="flex flex-col gap-3 sm:gap-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center gap-3 bg-card rounded-xl border border-border">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-light-dark text-muted-foreground">
            <Package size={28} />
          </div>
          <p className="text-sm font-medium text-secondary-foreground">
            No orders found
          </p>
          <p className="text-xs text-muted-foreground max-w-50">
            {searchQuery
              ? `No results for "${searchQuery}". Try a different search.`
              : "Your orders will appear here once you place an order."}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-1 text-xs font-medium text-primary hover:underline cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountOrdersClient;
