"use client";

import "leaflet/dist/leaflet.css";
import "./styles/tidal-map.css";

import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import {
  BOUNDARY,
  COUNTRY_STYLE,
  FIT_PADDING,
  MAX_ZOOM,
  STATION_FIT_PADDING,
  TILE_ATTRIBUTION,
  TILE_NATIVE_MAX_ZOOM,
  TILE_SUBDOMAINS,
  TILE_URL,
} from "./mapConfig";
import { stationIcon } from "./stationIcon";
import { stationPopupHtml } from "./stationPopup";
import { IPlottedStation, ITidalStation } from "./types";
import { parseCoordinate } from "./stationCoordinates";

const TidalStationMap = ({ stations }: { stations: ITidalStation[] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const hasFittedStationsRef = useRef(false);

  // Drop rows the backend stored with unusable coordinates rather than
  // dumping them at 0,0 in the Gulf of Guinea.
  const plotted = useMemo<IPlottedStation[]>(() => {
    return stations.reduce<IPlottedStation[]>((acc, station) => {
      const lat = parseCoordinate(station.latitude);
      const lng = parseCoordinate(station.longitude);
      if (lat === null || lng === null) return acc;
      return [...acc, { ...station, lat, lng }];
    }, []);
  }, [stations]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      // Zooming and panning are on, but minZoom and maxBounds below keep the
      // view inside Bangladesh — you can go closer, never wider.
      zoomControl: false,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      maxBoundsViscosity: 1,
      attributionControl: true,
    });

    L.tileLayer(TILE_URL, {
      attribution: TILE_ATTRIBUTION,
      subdomains: TILE_SUBDOMAINS,
      maxNativeZoom: TILE_NATIVE_MAX_ZOOM,
      maxZoom: MAX_ZOOM,
    }).addTo(map);

    // Neighbouring countries render normally; Bangladesh is picked out by its
    // green fill and bold border rather than by hiding everything else.
    const boundaryLayer = L.geoJSON(BOUNDARY, {
      style: COUNTRY_STYLE,
      interactive: false,
    }).addTo(map);

    const countryBounds = boundaryLayer.getBounds();
    map.setMaxZoom(MAX_ZOOM);
    map.fitBounds(countryBounds, { padding: FIT_PADDING });

    // Floor the zoom at the level fitBounds just chose. Recomputing it with
    // getBoundsZoom would ignore the padding above and land a notch higher,
    // clamping the view in and cropping the country.
    map.setMinZoom(map.getZoom());
    map.setMaxBounds(countryBounds.pad(0.05));

    L.control.zoom({ position: "bottomright" }).addTo(map);

    markerLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // A full-bleed map is often laid out before its final size is known.
    // Recompute the floor only — re-fitting would yank the user's own view.
    const onResize = () => {
      map.invalidateSize();
      map.setMinZoom(0);
      map.setMinZoom(
        map.getBoundsZoom(countryBounds, false, L.point(FIT_PADDING))
      );
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
      hasFittedStationsRef.current = false;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = markerLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    plotted.forEach((station) => {
      const marker = L.marker([station.lat, station.lng], {
        icon: stationIcon,
        title: station.location,
      }).bindPopup(stationPopupHtml(station), {
        className: "tidal-popup",
        closeButton: true,
        offset: [0, 0],
      });

      marker.on("popupopen", () =>
        marker.getElement()?.classList.add("tidal-marker--active")
      );
      marker.on("popupclose", () =>
        marker.getElement()?.classList.remove("tidal-marker--active")
      );

      layer.addLayer(marker);
    });

    // Open tight on the stations — they sit on the coast and the river mouths,
    // so the whole-country view wastes most of the frame on the north. Only on
    // the first load: a refetch must not yank a view the user has moved.
    if (!hasFittedStationsRef.current && plotted.length) {
      hasFittedStationsRef.current = true;
      map.fitBounds(
        L.latLngBounds(
          plotted.map((station) => [station.lat, station.lng] as L.LatLngTuple)
        ),
        { padding: STATION_FIT_PADDING }
      );
    }
  }, [plotted]);

  return (
    <div
      ref={containerRef}
      className="tidal-map h-[calc(100vh-8.25rem)] w-full lg:h-[calc(100vh-10.75rem)]"
      role="application"
      aria-label="Map of Bangladesh tidal stations"
    />
  );
};

export default TidalStationMap;
