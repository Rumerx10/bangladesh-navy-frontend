"use client";

import L from "leaflet";
import { RefObject, useEffect, useRef } from "react";
import {
  BOUNDARY,
  COUNTRY_STYLE,
  FIT_PADDING,
  MAX_ZOOM,
  TILE_ATTRIBUTION,
  TILE_NATIVE_MAX_ZOOM,
  TILE_SUBDOMAINS,
  TILE_URL,
} from "./mapConfig";

/**
 * Builds the shared Bangladesh basemap: colourful tiles, the country picked out
 * in green with a bold border, zoom floored so it can never shrink past the
 * country, and panning clamped to it. Markers are the caller's business.
 */
export const useBangladeshMap = (
  containerRef: RefObject<HTMLDivElement | null>
) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
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
    // The slack matters: a popup opening near the edge auto-pans, and with a
    // tight clamp there is nowhere to pan to, so it stays clipped off-screen.
    map.setMaxBounds(countryBounds.pad(0.25));

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
    };
  }, [containerRef]);

  return { mapRef, markerLayerRef };
};
