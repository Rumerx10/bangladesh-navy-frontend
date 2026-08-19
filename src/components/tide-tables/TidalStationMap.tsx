"use client";

import "leaflet/dist/leaflet.css";
import "@/src/components/shared/bangladesh-map/bangladesh-map.css";

import { parseCoordinate } from "@/src/components/shared/bangladesh-map/coordinates";
import { fitStations } from "@/src/components/shared/bangladesh-map/fitStations";
import { stationPin } from "@/src/components/shared/bangladesh-map/stationPin";
import { useBangladeshMap } from "@/src/components/shared/bangladesh-map/useBangladeshMap";
import ChartInfoDialog, {
  ChartInfoSpec,
} from "@/src/components/products/ChartInfoDialog";
import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { resolveImage } from "./productImage";
import { IPlottedStation, ITidalStation } from "./types";

const TidalStationMap = ({ stations }: { stations: ITidalStation[] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Keyed to the map instance, not a boolean: StrictMode remounts rebuild the
  // map but keep refs, and a boolean would skip the fit on the second mount.
  const fittedMapRef = useRef<L.Map | null>(null);
  // The pin whose station is open in the dialog, so its highlight can be
  // cleared when the dialog closes or another pin takes over.
  const activeMarkerRef = useRef<L.Marker | null>(null);
  const [selected, setSelected] = useState<IPlottedStation | null>(null);
  const { mapRef, markerLayerRef } = useBangladeshMap(containerRef);

  const plotted = useMemo<IPlottedStation[]>(() => {
    return stations.reduce<IPlottedStation[]>((acc, station) => {
      const lat = parseCoordinate(station.latitude);
      const lng = parseCoordinate(station.longitude);
      if (lat === null || lng === null) return acc;
      return [...acc, { ...station, lat, lng }];
    }, []);
  }, [stations]);

  const clearActiveMarker = () => {
    activeMarkerRef.current
      ?.getElement()
      ?.classList.remove("bn-marker--active");
    activeMarkerRef.current = null;
  };

  useEffect(() => {
    const map = mapRef.current;
    const layer = markerLayerRef.current;
    if (!map || !layer) return;

    // The markers about to be discarded take the highlight with them.
    activeMarkerRef.current = null;
    layer.clearLayers();

    plotted.forEach((station) => {
      const marker = L.marker([station.lat, station.lng], {
        icon: stationPin,
        title: station.location,
      });

      // Station details render in ChartInfoDialog rather than a Leaflet popup,
      // so the card is real React and shares the paper-chart map's styling.
      marker.on("click", () => {
        clearActiveMarker();
        marker.getElement()?.classList.add("bn-marker--active");
        activeMarkerRef.current = marker;
        setSelected(station);
      });

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

  const product = selected?.product;
  const thumbnail = product?.images?.[0]?.trim();
  // The backend sends [] when a product has no attributes, and rows with a
  // blank key or value are noise in a card this small.
  const attributeSpecs: ChartInfoSpec[] = (product?.productAttributes ?? [])
    .filter((attribute) => attribute?.key?.trim() && attribute?.value?.trim())
    .map((attribute) => ({
      label: attribute.key.trim(),
      value: attribute.value.trim(),
    }));

  return (
    <>
      <div
        ref={containerRef}
        className="bn-map h-[calc(100vh-8.25rem)] w-full lg:h-[calc(100vh-10.75rem)]"
        role="application"
        aria-label="Map of Bangladesh tidal stations"
      />

      <ChartInfoDialog
        open={selected !== null}
        onClose={() => {
          clearActiveMarker();
          setSelected(null);
        }}
        title="Station Information"
        image={thumbnail ? resolveImage(thumbnail) : undefined}
        imageBadge={selected?.generalArea}
        // Falls back to the station name so a station without a linked product
        // still opens the detail card instead of a bare identifier.
        heading={product?.nameEn?.trim() || selected?.location}
        subheading={
          product?.nameEn?.trim()
            ? `${selected?.location} · ${selected?.generalArea}`
            : selected?.generalArea
        }
        specs={[
          { label: "Latitude", value: selected?.latitude },
          { label: "Longitude", value: selected?.longitude },
          ...attributeSpecs,
        ]}
        // Without a product id there is nothing to link to, so the button is
        // dropped.
        detailsHref={
          product?.id
            ? `/product-service/tide-tables/${encodeURIComponent(product.id)}`
            : undefined
        }
      />
    </>
  );
};

export default TidalStationMap;
