import { Metadata } from "next";
import MarineWeather from "@/src/components/marine-weather/MarineWeather";

export const metadata: Metadata = {
  title: "Marine Weather",
  description:
    "Marine weather observation stations maintained by BNHOC across Bangladesh's coastline and major river systems.",
};

const page = () => {
  return <MarineWeather />;
};

export default page;
