import bangladeshBoundary from "@/src/data/bangladeshBoundary.json";
import type { MultiPolygon } from "geojson";
import L from "leaflet";

export const BOUNDARY = bangladeshBoundary as MultiPolygon;

/** OSM renders no tiles past 19; beyond this Leaflet upscales the z19 tile. */
export const TILE_NATIVE_MAX_ZOOM = 19;
/** How far the user may actually zoom in — the last few levels are stretched. */
export const MAX_ZOOM = 22;

export const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const TILE_SUBDOMAINS = "abc";
export const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Boundary: <a href="https://www.geoboundaries.org/">geoBoundaries</a>';

export const BORDER_COLOR = "#006a4e";
export const PIN_COLOR = "#dc2626";
/** Bangladesh green, laid over the tiles so the country reads as one mass. */
export const COUNTRY_FILL = "#009a5b";

/** Breathing room around the country when computing the zoom floor, in pixels. */
export const FIT_PADDING: L.PointTuple = [40, 40];
/** Breathing room around the stations at the opening view, in pixels. */
export const STATION_FIT_PADDING: L.PointTuple = [48, 48];

export const COUNTRY_STYLE: L.PathOptions = {
  color: BORDER_COLOR,
  weight: 4,
  opacity: 1,
  lineJoin: "round",
  // Translucent, so roads and rivers still read through the green.
  fill: true,
  fillColor: COUNTRY_FILL,
  fillOpacity: 0.28,
};
