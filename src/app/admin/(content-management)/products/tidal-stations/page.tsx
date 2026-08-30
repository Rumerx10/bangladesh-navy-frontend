import { Metadata } from "next";
import TidalStationManagement from "@/src/components/admin/ContentManagement/products/tidal-stations/TidalStationManagement";

export const metadata: Metadata = {
  title: "Tidal Stations",
  description: "Manage tidal station data and records.",
};

const TidalStationsPage = () => {
  return <TidalStationManagement />;
};

export default TidalStationsPage;
