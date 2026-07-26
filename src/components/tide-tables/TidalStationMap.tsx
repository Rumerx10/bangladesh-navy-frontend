"use client";

import "leaflet/dist/leaflet.css";
import "@/src/components/shared/bangladesh-map/bangladesh-map.css";
import "./styles/tidal-map.css";

import { parseCoordinate } from "@/src/components/shared/bangladesh-map/coordinates";
import { fitStations } from "@/src/components/shared/bangladesh-map/fitStations";
import { stationPin } from "@/src/components/shared/bangladesh-map/stationPin";
import { useBangladeshMap } from "@/src/components/shared/bangladesh-map/useBangladeshMap";
import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { stationPopupHtml } from "./stationPopup";
import { IPlottedStation, ITidalStation } from "./types";

const TidalStationMap = ({ stations }: { stations: ITidalStation[] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Keyed to the map instance, not a boolean: StrictMode remounts rebuild the
  // map but keep refs, and a boolean would skip the fit on the second mount.
  const fittedMapRef = useRef<L.Map | null>(null);
  const { mapRef, markerLayerRef } = useBangladeshMap(containerRef);

  const plotted = useMemo<IPlottedStation[]>(() => {
    return stations.reduce<IPlottedStation[]>((acc, station) => {
      const lat = parseCoordinate(station.latitude);
      const lng = parseCoordinate(station.longitude);
      if (lat === null || lng === null) return acc;
      return [...acc, { ...station, lat, lng }];
    }, []);
  }, [stations]);

  useEffect(() => {
    const map = mapRef.current;
    const layer = markerLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    plotted.forEach((station) => {
      const marker = L.marker([station.lat, station.lng], {
        icon: stationPin,
        title: station.location,
      }).bindPopup(stationPopupHtml(station), {
        className: "tidal-popup",
        closeButton: true,
        offset: [0, 0],
      });

      marker.on("popupopen", () =>
        marker.getElement()?.classList.add("bn-marker--active")
      );
      marker.on("popupclose", () =>
        marker.getElement()?.classList.remove("bn-marker--active")
      );

      layer.addLayer(marker);
    });

    // Open tight on the stations — they sit on the coast and the river mouths,
    // so the whole-country view wastes most of the frame on the north. Only on
    // the first load: a refetch must not yank a view the user has moved.
    if (fittedMapRef.current !== map && plotted.length) {
      fittedMapRef.current = map;
      fitStations(
        map,
        plotted.map((station) => [station.lat, station.lng] as L.LatLngTuple)
      );
    }
  }, [plotted, mapRef, markerLayerRef]);

  return (
    <div
      ref={containerRef}
      className="bn-map h-[calc(100vh-8.25rem)] w-full lg:h-[calc(100vh-10.75rem)]"
      role="application"
      aria-label="Map of Bangladesh tidal stations"
    />
  );
};

export default TidalStationMap;
