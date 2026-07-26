import TideTables from "@/src/components/tide-tables/TideTables";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tide Tables",
  description:
    "Tidal observation stations maintained by BNHOC across Bangladesh's coastline and major river systems.",
};

const page = () => {
  return <TideTables />;
};

export default page;
