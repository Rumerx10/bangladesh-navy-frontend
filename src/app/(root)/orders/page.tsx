import { redirect } from "next/navigation";

// Order history lives in the account area; this keeps old /orders links
// working.
const OrdersPage = () => {
  redirect("/account/orders");
};

export default OrdersPage;
