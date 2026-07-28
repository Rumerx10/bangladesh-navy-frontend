import { FALLBACK_IMAGE, resolveImage } from "./productImage";
import { IPlottedStation, ITidalStationProduct } from "./types";

/** This popup is built as an HTML string, so every API value must be escaped. */
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** The detail route's dynamic segment takes the product id. */
const productHref = (product: ITidalStationProduct) =>
  `/products/${encodeURIComponent(product.id)}`;

export const stationPopupHtml = (station: IPlottedStation) => {
  const product = station.product;
  const productName = product?.nameEn?.trim();
  const thumbnail = product?.images?.[0]?.trim();
  // The backend sends [] when a product has no attributes, and rows with a
  // blank key or value are noise in a card this small.
  const attributes = (product?.productAttributes ?? []).filter(
    (attribute) => attribute?.key?.trim() && attribute?.value?.trim()
  );

  // Always an image — a broken or missing URL degrades to the placeholder
  // rather than back to an icon.
  const media = `<img class="tidal-popup__thumb" src="${escapeHtml(resolveImage(thumbnail))}" alt="${escapeHtml(productName || station.location)}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'" />`;

  const attributeRow = attributes.length
    ? `<div class="tidal-popup__attrs">${attributes
        .map(
          (attribute) =>
            `<span class="tidal-popup__attr"><span class="tidal-popup__attr-key">${escapeHtml(attribute.key.trim())}</span>${escapeHtml(attribute.value.trim())}</span>`
        )
        .join("")}</div>`
    : "";

  // Without an id there is nothing to link to, so the button is dropped.
  const action = product?.id
    ? `<a class="tidal-popup__action" href="${escapeHtml(productHref(product))}">View details</a>`
    : "";

  return `
    <div class="tidal-popup__card">
      ${media}
      <div class="tidal-popup__body">
        <p class="tidal-popup__title">${escapeHtml(station.location)}</p>
        <p class="tidal-popup__area">${escapeHtml(station.generalArea)}</p>
        <p class="tidal-popup__coords">${escapeHtml(station.latitude)}, ${escapeHtml(station.longitude)}</p>
        ${productName ? `<p class="tidal-popup__product">${escapeHtml(productName)}</p>` : ""}
        ${attributeRow}
        ${action}
      </div>
    </div>
  `;
};
