import L from "leaflet";
import { PIN_COLOR } from "./mapConfig";

const PIN_SVG = `<svg class="tidal-marker__pin" viewBox="0 0 30 40" width="30" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.7 0 0 6.7 0 15c0 11.3 13.4 23.6 14 24.2a1.4 1.4 0 0 0 2 0c.6-.6 14-12.9 14-24.2C30 6.7 23.3 0 15 0z" fill="${PIN_COLOR}"/><circle cx="15" cy="14.5" r="5.4" fill="#ffffff"/></svg>`;

// The tip of the teardrop is the anchor, so the pin points at the station.
export const stationIcon = L.divIcon({
  className: "tidal-marker",
  html: PIN_SVG,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -38],
});
