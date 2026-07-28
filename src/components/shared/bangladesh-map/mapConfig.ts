import bangladeshBoundary from "@/src/data/bangladeshBoundary.json";
import type { MultiPolygon } from "geojson";
import L from "leaflet";

export const BOUNDARY = bangladeshBoundary as MultiPolygon;

export const TILE_NATIVE_MAX_ZOOM = 19;
export const MAX_ZOOM = 22;

export const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const TILE_SUBDOMAINS = "abc";
export const TILE_ATTRIBUTION = "";

export const BORDER_COLOR = "#006a4e";
export const PIN_COLOR = "#dc2626";
/** White ring so the red pin stays legible over green land and blue water. */
export const PIN_BORDER_COLOR = "#ffffff";
export const PIN_BORDER_WIDTH = 1.5;
export const COUNTRY_FILL = "#009a5b";

export const FIT_PADDING: L.PointTuple = [40, 40];
/** Must clear the 42px pin: it is anchored at its tip, so a marker on the edge
 *  of the fit extends a full icon height above its own coordinate. */
export const STATION_FIT_PADDING: L.PointTuple = [40, 52];
/** Extra zoom levels applied after the station fit, to open in closer. */
export const STATION_FIT_ZOOM_BOOST = 0.25;
/** Used when a single station can't define a bounding box to fit. */
export const SINGLE_STATION_ZOOM = 11;

export const COUNTRY_STYLE: L.PathOptions = {
  color: BORDER_COLOR,
  weight: 4,
  opacity: 1,
  lineJoin: "round",
  fill: true,
  fillColor: COUNTRY_FILL,
  fillOpacity: 0.28,
};
