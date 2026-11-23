import AdminOrderDetail from "@/src/components/admin/orders/AdminOrderDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details",
  description: "Order items, delivery details, payment and status history.",
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <AdminOrderDetail id={id} />;
};

export default page;
