import Drifters from "./Drifters";

/**
 * The background behind every public page: drifters on a moving current,
 * softened by a light blur laid over them. Fixed to the screen, under all
 * content (-z-10) and out of the way of the pointer. Pages leave their own
 * section backgrounds off so it shows; heroes, cards, the header and the
 * footer stay opaque on top of it.
 */
const SiteBackdrop = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
  >
    <Drifters />
    <div className="absolute inset-0 backdrop-blur-sm" />
  </div>
);

export default SiteBackdrop;
