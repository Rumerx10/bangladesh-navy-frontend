import { baseURL } from "@/src/config/envConfig";

export const FALLBACK_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="130" viewBox="0 0 280 130">
    <rect width="280" height="130" fill="#012a52"/>
    <g fill="none" stroke="#3d6d96" stroke-width="3" stroke-linecap="round">
      <path d="M40 58c10-9 20-9 30 0s20 9 30 0 20-9 30 0 20 9 30 0 20-9 30 0 20 9 30 0"/>
      <path d="M40 76c10-9 20-9 30 0s20 9 30 0 20-9 30 0 20 9 30 0 20-9 30 0 20 9 30 0"/>
    </g>
  </svg>`
)}`;

const API_ORIGIN = baseURL.replace(/\/api\/v\d+\/?$/, "");

export const resolveImage = (raw?: string) => {
  const value = raw?.trim();
  if (!value) return FALLBACK_IMAGE;
  if (/^https?:\/\//i.test(value)) return value;
  return `${API_ORIGIN}/${value.replace(/^\/+/, "")}`;
};
