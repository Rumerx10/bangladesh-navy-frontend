"use client";
import dynamic from "next/dynamic";
import { IExternalStation } from "./types";
import { useGet } from "@/src/hooks/useGet";
import WeatherStationMapSkeleton from "./Skeleton/WeatherStationMapSkeleton";


const WeatherStationMap = dynamic(() => import("./WeatherStationMap"), {
  ssr: false,
  loading: () => <WeatherStationMapSkeleton />,
});

const MarineWeather = () => {
  // As on the tide tables page, a failed request leaves the map standing with
  // no markers rather than replacing it with an error screen.
  const { data, isLoading } = useGet<IExternalStation[]>("/external-stations", [
    "external-stations",
  ]);

  const stations = data?.data ?? [];

  return (
    <section className="relative mt-33">
      <WeatherStationMap stations={stations} />

      <div className="pointer-events-none absolute top-4 left-4 z-10 max-w-xs rounded-xl bg-white/95 px-4 py-3 shadow-lg ring-1 ring-black/5 sm:top-6 sm:left-6">
        <h1 className="text-lg font-bold text-pBlue lg:text-xl">
          Marine Weather
        </h1>
        {isLoading ? (
          <p className="mt-1 text-xs text-gray-500 lg:text-sm">
            Loading weather stations…
          </p>
        ) : stations.length > 0 ? (
          <>
            <p className="mt-1 text-xs text-gray-500 lg:text-sm">
              <span className="font-semibold text-pBlue">
                {stations.length}
              </span>{" "}
              weather {stations.length === 1 ? "station" : "stations"} across
              Bangladesh
            </p>
            <p className="mt-1 text-[11px] text-gray-400">
              Click a marker for station data
            </p>
          </>
        ) : (
          <p className="mt-1 text-xs text-gray-500 lg:text-sm">
            Marine weather stations across Bangladesh
          </p>
        )}
      </div>
    </section>
  );
};

export default MarineWeather;
