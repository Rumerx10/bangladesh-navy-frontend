import { Metadata } from "next";
import OrdersClient from "./OrdersClient";

export const metadata: Metadata = {
  title: "My Orders | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "View your order history.",
};

const OrdersPage = () => {
  return <OrdersClient />;
};

export default OrdersPage;
