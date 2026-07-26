"use client";

import { useGet } from "@/src/hooks/useGet";
import dynamic from "next/dynamic";
import TidalStationMapSkeleton from "./Skeleton/TidalStationMapSkeleton";
import { ITidalStation } from "./types";

const TidalStationMap = dynamic(() => import("./TidalStationMap"), {
  ssr: false,
  loading: () => <TidalStationMapSkeleton />,
});

const TideTables = () => {
  // A failed or empty request is not worth an error screen here: the map of
  // Bangladesh is still the point of the page, it just carries no markers.
  const { data, isLoading } = useGet<ITidalStation[]>("/tidal-station/list", [
    "tidal-station-list",
  ]);

  const stations = data?.data ?? [];

  return (
    // The map renders straight away on the default Bangladesh view; markers are
    // added by the map itself once the request resolves, so a slow API delays
    // the pins rather than the whole page.
    <section className="relative mt-33">
      <TidalStationMap stations={stations} />

      <div className="pointer-events-none absolute top-4 left-4 z-10 max-w-xs rounded-xl bg-white/95 px-4 py-3 shadow-lg ring-1 ring-black/5 sm:top-6 sm:left-6">
        <h1 className="text-lg font-bold text-pBlue lg:text-xl">Tide Tables</h1>
        {isLoading ? (
          <p className="mt-1 text-xs text-gray-500 lg:text-sm">
            Loading tidal stations…
          </p>
        ) : stations.length > 0 ? (
          <>
            <p className="mt-1 text-xs text-gray-500 lg:text-sm">
              <span className="font-semibold text-pBlue">
                {stations.length}
              </span>{" "}
              tidal {stations.length === 1 ? "station" : "stations"} across
              Bangladesh
            </p>
            <p className="mt-1 text-[11px] text-gray-400">
              Click a marker for station details
            </p>
          </>
        ) : (
          <p className="mt-1 text-xs text-gray-500 lg:text-sm">
            Tidal observation stations across Bangladesh
          </p>
        )}
      </div>
    </section>
  );
};

export default TideTables;
