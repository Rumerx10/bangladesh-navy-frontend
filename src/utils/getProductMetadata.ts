import { Metadata } from "next";

const FALLBACK_METADATA: Metadata = {
  title: "Chart Details | Bangladesh Navy Hydrographic & Oceanographic Center",
  description:
    "Nautical chart details from the Bangladesh Navy Hydrographic & Oceanographic Center.",
};

interface IProductLite {
  nameEn: string;
  descriptionEn?: string | null;
  geographicLocation?: string | null;
}

// Server-side metadata lookup for product/chart detail pages. Runs during
// SSR via generateMetadata, so it uses a plain fetch against the REST API
// directly rather than the axios/TanStack Query client hooks (browser-only).
// Falls back to a generic title on any error so a slow/unreachable backend
// never breaks the page render.
export async function getProductMetadata(
  chartId: string,
  routeLabel: string
): Promise<Metadata> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8001/api/v1";
    const res = await fetch(`${baseUrl}/product/${chartId}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return FALLBACK_METADATA;

    const json = await res.json();
    const product: IProductLite | undefined = json?.data;
    if (!product?.nameEn) return FALLBACK_METADATA;

    return {
      title: `${product.nameEn} — ${routeLabel} | Bangladesh Navy Hydrographic & Oceanographic Center`,
      description:
        product.descriptionEn ||
        `${product.nameEn}${product.geographicLocation ? ` — ${product.geographicLocation}` : ""}. Available from the Bangladesh Navy Hydrographic & Oceanographic Center.`,
    };
  } catch {
    return FALLBACK_METADATA;
  }
}
