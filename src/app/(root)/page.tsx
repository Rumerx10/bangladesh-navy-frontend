import { Metadata } from "next";
import Home from "@/src/components/home/Home";

export const metadata: Metadata = {
  title: "Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Official site of the Bangladesh Navy Hydrographic & Oceanographic Center (BNHOC) — nautical charts, tide tables, notices to mariners, and hydrographic services for safe maritime navigation in Bangladesh waters.",
};

const HomePage = () => {
  return <Home />;
};

export default HomePage;
