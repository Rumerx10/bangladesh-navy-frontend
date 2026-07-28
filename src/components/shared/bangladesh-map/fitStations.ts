import L from "leaflet";
import {
  SINGLE_STATION_ZOOM,
  STATION_FIT_PADDING,
  STATION_FIT_ZOOM_BOOST,
} from "./mapConfig";

/**
 * Frames the markers rather than the whole country — stations cluster on the
 * coast and the river mouths, so a country-wide view wastes most of the frame.
 * fitBounds only guarantees the markers are visible, which reads as too far
 * out, so a boost pushes it closer.
 *
 * The zoom is computed and applied in a single un-animated setView: calling
 * setZoom after fitBounds would fight its animation and read a stale zoom,
 * leaving the map on the previous view.
 */
export const fitStations = (
  map: L.Map,
  points: L.LatLngTuple[],
  /** Override when a feature's stations sit too far apart for the default. */
  boost: number = STATION_FIT_ZOOM_BOOST
) => {
  if (!points.length) return;

  // A single point has no extent, so getBoundsZoom would slam to max zoom.
  if (points.length === 1) {
    map.setView(points[0], Math.min(SINGLE_STATION_ZOOM, map.getMaxZoom()), {
      animate: false,
    });
    return;
  }

  const bounds = L.latLngBounds(points);
  const fitted = map.getBoundsZoom(bounds, false, L.point(STATION_FIT_PADDING));
  const zoom = Math.min(fitted + boost, map.getMaxZoom());

  map.setView(bounds.getCenter(), zoom, { animate: false });
};
