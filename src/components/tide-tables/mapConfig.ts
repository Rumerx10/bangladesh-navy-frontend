import bangladeshBoundary from "@/src/data/bangladeshBoundary.json";
import type { MultiPolygon } from "geojson";
import L from "leaflet";

export const BOUNDARY = bangladeshBoundary as MultiPolygon;

export const TILE_NATIVE_MAX_ZOOM = 19;
export const MAX_ZOOM = 22;

export const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const TILE_SUBDOMAINS = "abc";
export const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Boundary: <a href="https://www.geoboundaries.org/">geoBoundaries</a>';

export const BORDER_COLOR = "#006a4e";
export const PIN_COLOR = "#dc2626";
/** White ring so the red pin stays legible over green land and blue water. */
export const PIN_BORDER_COLOR = "#ffffff";
export const PIN_BORDER_WIDTH = 1.5;
export const COUNTRY_FILL = "#009a5b";

export const FIT_PADDING: L.PointTuple = [40, 40];
export const STATION_FIT_PADDING: L.PointTuple = [48, 48];

export const COUNTRY_STYLE: L.PathOptions = {
  color: BORDER_COLOR,
  weight: 4,
  opacity: 1,
  lineJoin: "round",
  fill: true,
  fillColor: COUNTRY_FILL,
  fillOpacity: 0.28,
};
