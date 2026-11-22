"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ITidalStation } from "./types";
import { useGet } from "@/src/hooks/useGet";
import { useInactiveProducts } from "@/src/components/products/useInactiveProducts";
import TidalStationMapSkeleton from "./Skeleton/TidalStationMapSkeleton";

const TidalStationMap = dynamic(() => import("./TidalStationMap"), {
  ssr: false,
  loading: () => <TidalStationMapSkeleton />,
});

const TideTables = () => {
  const { data, isLoading: stationsLoading } = useGet<ITidalStation[]>(
    "/tidal-station/list",
    ["tidal-station-list"]
  );
  const { inactiveIds, isLoading: inactiveLoading } =
    useInactiveProducts("TIDAL");
  const isLoading = stationsLoading || inactiveLoading;

  // Drop inactive stations, and stations whose tide-table product an admin
  // has switched off. Held back until both lists are in, so the map never
  // fits itself to pins that are about to disappear.
  const stations = useMemo(
    () =>
      isLoading
        ? []
        : (data?.data ?? []).filter(
            (station) =>
              station.status === "ACTIVE" &&
              !inactiveIds.has(station.product?.id ?? station.productId)
          ),
    [data, inactiveIds, isLoading]
  );

  return (
    <section className="relative mt-25">
      <TidalStationMap stations={stations} />

      <div className="pointer-events-none absolute top-4 left-4 z-10 max-w-xs rounded-xl bg-white/95 px-4 py-3 shadow-lg ring-1 ring-black/5 sm:top-6 sm:left-6">
        <h1 className="text-lg font-bold text-pBlue lg:text-xl">Tide Tables</h1>
        {isLoading ? (
          <p className="mt-1 text-xs text-secondary-foreground lg:text-sm">
            Loading tidal stations…
          </p>
        ) : stations.length > 0 ? (
          <>
            <p className="mt-1 text-xs text-secondary-foreground lg:text-sm">
              <span className="font-semibold text-pBlue">
                {stations.length}
              </span>{" "}
              tidal {stations.length === 1 ? "station" : "stations"} across
              Bangladesh
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Click a marker for station details
            </p>
          </>
        ) : (
          <p className="mt-1 text-xs text-secondary-foreground lg:text-sm">
            Tidal observation stations across Bangladesh
          </p>
        )}
      </div>
    </section>
  );
};

export default TideTables;
