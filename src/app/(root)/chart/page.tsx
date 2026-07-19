import ChartIndexMap from "@/src/components/chart/ChartIndexMap";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chart Index | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Interactive index of Bangladesh Navy hydrographic charts covering the coast from Khulna to Cox's Bazar. Search by chart number, hover a coverage area to identify a chart, and click to view its details.",
};

export default function ChartPage() {
  return <ChartIndexMap />;
}
