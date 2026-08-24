import ElectronicChartMap from "@/src/components/chart/ElectronicChartMap";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Electronic Chart Index (ENC) | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Interactive catalogue of Bangladesh Navy Electronic Navigational Chart (ENC) cells covering the coast from Khulna to Cox's Bazar. Search by cell or chart number, hover a coverage area to identify a cell, and click to view its details.",
};

const ElectronicChartPage = () => {
  return <ElectronicChartMap />;
};

export default ElectronicChartPage;
