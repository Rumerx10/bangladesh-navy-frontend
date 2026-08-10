import { Metadata } from "next";
import AddressList from "@/src/components/account/Address/AddressList/AddressList";

export const metadata: Metadata = {
  title: "My Addresses | Bangladesh Navy Hydrographic & Oceanographic Center",
  description: "Manage your saved delivery addresses.",
};

export default function page() {
  return (
    <div>
      <AddressList />
    </div>
  );
}
