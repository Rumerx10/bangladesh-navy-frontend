import { Metadata } from "next";
import AccountOrdersClient from "./AccountOrdersClient";

export const metadata: Metadata = {
  title: "My Orders | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Track and manage your orders.",
};

const AccountOrdersPage = () => {
  return <AccountOrdersClient />;
};

export default AccountOrdersPage;
