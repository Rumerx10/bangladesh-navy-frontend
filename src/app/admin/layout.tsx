import { Metadata } from "next";
import { ReactNode } from "react";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata: Metadata = {
  title: {
    default: "Admin | Bangladesh Navy",
    template: "%s | Admin | Bangladesh Navy",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
