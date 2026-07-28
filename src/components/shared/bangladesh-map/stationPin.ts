import L from "leaflet";
import { PIN_BORDER_COLOR, PIN_BORDER_WIDTH, PIN_COLOR } from "./mapConfig";

// The teardrop is drawn in a 30x40 box, but the viewBox is inset by 1 unit on
// every side so the outer half of the stroke has room instead of being clipped.
// That makes the rendered icon 32x42, with the tip at (16, 41).
const PIN_SVG = `<svg class="bn-marker__pin" viewBox="-1 -1 32 42" width="32" height="42" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.7 0 0 6.7 0 15c0 11.3 13.4 23.6 14 24.2a1.4 1.4 0 0 0 2 0c.6-.6 14-12.9 14-24.2C30 6.7 23.3 0 15 0z" fill="${PIN_COLOR}" stroke="${PIN_BORDER_COLOR}" stroke-width="${PIN_BORDER_WIDTH}" stroke-linejoin="round"/><circle cx="15" cy="14.5" r="5.4" fill="#ffffff"/></svg>`;

// The tip of the teardrop is the anchor, so the pin points at the station.
export const stationPin = L.divIcon({
  className: "bn-marker",
  html: PIN_SVG,
  iconSize: [32, 42],
  iconAnchor: [16, 41],
  popupAnchor: [0, -39],
});
