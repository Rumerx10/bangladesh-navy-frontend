import { Metadata } from "next";
import OrderDetailClient from "./OrderDetailClient";

export const metadata: Metadata = {
  title: "Order Details | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "View the details of your order.",
};

const OrderDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return <OrderDetailClient params={params} />;
};

export default OrderDetailPage;
