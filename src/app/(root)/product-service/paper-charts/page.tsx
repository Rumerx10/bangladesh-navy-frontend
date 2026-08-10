import { Metadata } from "next";
import ChartIndexMap from "@/src/components/chart/ChartIndexMap";

export const metadata: Metadata = {
  title:
    "Paper Chart Index | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Interactive index of Bangladesh Navy paper nautical charts covering the coast from Khulna to Cox's Bazar. Click a coverage area to view chart details.",
};

const page = () => {
  return <ChartIndexMap />;
};

export default page;
