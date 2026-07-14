import HowToCollect from "@/src/components/how-to-collect/HowToCollect";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Collect | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Learn how to collect for BNHOC publications, nautical charts, and services. Bank transfer, online payment, Pay Order, and international SWIFT options available.",
};

const page = () => {
  return <HowToCollect />;
};
export default page;
