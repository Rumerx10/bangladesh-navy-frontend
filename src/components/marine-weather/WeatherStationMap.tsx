"use client";

import "leaflet/dist/leaflet.css";
import "@/src/components/shared/bangladesh-map/bangladesh-map.css";
import "./styles/weather-map.css";

import { fitStations } from "@/src/components/shared/bangladesh-map/fitStations";
import { stationPin } from "@/src/components/shared/bangladesh-map/stationPin";
import { useBangladeshMap } from "@/src/components/shared/bangladesh-map/useBangladeshMap";
import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import StationPopup from "./StationPopup";
import { IExternalStation, IPlottedExternalStation } from "./types";

/** No boost: these four stations span most of the coast, so anything past the
 *  plain fit pushes the outermost ones off screen. */
const ZOOM_BOOST = 0;

const WeatherStationMap = ({ stations }: { stations: IExternalStation[] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Keyed to the map instance, not a boolean: StrictMode remounts rebuild the
  // map but keep refs, and a boolean would skip the fit on the second mount.
  const fittedMapRef = useRef<L.Map | null>(null);
  const popupRef = useRef<L.Popup | null>(null);
  const { mapRef, markerLayerRef } = useBangladeshMap(containerRef);

  // The popup body is React (it fetches on open), so Leaflet is handed a plain
  // node and React portals into it.
  const [popupNode] = useState(() =>
    typeof document === "undefined" ? null : document.createElement("div")
  );
  const [selected, setSelected] = useState<IPlottedExternalStation | null>(
    null
  );

  // Leaflet measures the popup when it opens, but React portals the content in
  // a tick later — and again when the fetch resolves. Without re-measuring, the
  // popup stays centred on a zero-width box and never auto-pans into view.
  useEffect(() => {
    if (!popupNode || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      if (popupRef.current?.isOpen()) popupRef.current.update();
    });
    observer.observe(popupNode);

    return () => observer.disconnect();
  }, [popupNode]);

  const plotted = useMemo<IPlottedExternalStation[]>(() => {
    return stations.reduce<IPlottedExternalStation[]>((acc, station) => {
      const lat = station.coordinates?.lat;
      const lng = station.coordinates?.lng;
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return acc;
      return [...acc, { ...station, lat: Number(lat), lng: Number(lng) }];
    }, []);
  }, [stations]);

  useEffect(() => {
    const map = mapRef.current;
    const layer = markerLayerRef.current;
    if (!map || !layer || !popupNode) return;

    layer.clearLayers();

    const popup =
      popupRef.current ??
      L.popup({
        className: "weather-popup",
        maxWidth: 340,
        minWidth: 300,
        // Clears the 42px pin so the tail points at its tip.
        offset: [0, -36],
        autoPanPadding: [24, 24],
        keepInView: true,
      }).setContent(popupNode);
    popupRef.current = popup;

    plotted.forEach((station) => {
      const marker = L.marker([station.lat, station.lng], {
        icon: stationPin,
        title: station.name,
      });

      marker.on("click", () => {
        setSelected(station);
        popup.setLatLng([station.lat, station.lng]).openOn(map);
        marker.getElement()?.classList.add("bn-marker--active");
      });

      layer.addLayer(marker);
    });

    const onPopupClose = () => {
      setSelected(null);
      map
        .getContainer()
        .querySelectorAll(".bn-marker--active")
        .forEach((element) => element.classList.remove("bn-marker--active"));
    };
    map.on("popupclose", onPopupClose);

    if (fittedMapRef.current !== map && plotted.length) {
      fittedMapRef.current = map;
      fitStations(
        map,
        plotted.map((station) => [station.lat, station.lng] as L.LatLngTuple),
        ZOOM_BOOST
      );
    }

    return () => {
      map.off("popupclose", onPopupClose);
    };
  }, [plotted, popupNode, mapRef, markerLayerRef]);

  return (
    <>
      <div
        ref={containerRef}
        className="bn-map h-[calc(100vh-8.25rem)] w-full lg:h-[calc(100vh-10.75rem)]"
        role="application"
        aria-label="Map of Bangladesh marine weather stations"
      />
      {selected && popupNode
        ? createPortal(<StationPopup station={selected} />, popupNode)
        : null}
    </>
  );
};

export default WeatherStationMap;
