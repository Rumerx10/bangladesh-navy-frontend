import HowToPay from "@/src/components/how-to-pay/HowToPay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Pay | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Learn how to pay for BNHOC publications, nautical charts, and services. Bank transfer, online payment, Pay Order, and international SWIFT options available.",
};

export default function HowToPayPage() {
  return <HowToPay />;
}
