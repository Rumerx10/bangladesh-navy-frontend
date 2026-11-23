import OrderManagement from "@/src/components/admin/orders/OrderManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
  description: "Review customer orders and move them through fulfilment.",
};

const page = () => {
  return <OrderManagement />;
};

export default page;
