"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  CHART_VIEWBOX,
  chartIndexAreas,
  IChartArea,
} from "@/src/data/chartIndexAreas";
import {
  findProductByChartNumber,
  getProductSlug,
} from "@/src/data/navyProducts";
import { SearchIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const IMAGE_SRC = "/chart/chart-index.jpg";

/** Outline every hotspot to calibrate coordinates against the printed rectangles. */
const DEBUG_OUTLINES = false;

const chartLabel = (area: IChartArea) =>
  area.int ? `${area.number} (${area.int})` : area.number;

export default function ChartIndexMap() {
  const [hovered, setHovered] = useState<IChartArea | null>(null);
  const [selected, setSelected] = useState<IChartArea | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [imgMissing, setImgMissing] = useState(false);
  const [query, setQuery] = useState("");
  const [searchedNumber, setSearchedNumber] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Largest rectangles first so the smallest (most specific) chart renders
  // on top and wins hover/click where coverage areas overlap.
  const areas = useMemo(
    () => [...chartIndexAreas].sort((a, b) => b.w * b.h - a.w * a.h),
    []
  );

  // One entry per chart number (1511 has two panels), sorted ascending.
  const uniqueCharts = useMemo(() => {
    const byNumber = new Map<string, IChartArea>();
    for (const a of chartIndexAreas) {
      if (!byNumber.has(a.number)) byNumber.set(a.number, a);
    }
    return [...byNumber.values()].sort(
      (a, b) => Number(a.number) - Number(b.number)
    );
  }, []);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    const starts = uniqueCharts.filter((a) => a.number.startsWith(q));
    const contains = uniqueCharts.filter(
      (a) => !a.number.startsWith(q) && a.number.includes(q)
    );
    return [...starts, ...contains].slice(0, 8);
  }, [query, uniqueCharts]);

  const selectResult = (area: IChartArea) => {
    setSearchedNumber(area.number);
    setQuery(area.number);
    setDropdownOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    setSearchedNumber(null);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const probe = new window.Image();
    probe.onerror = () => setImgMissing(true);
    probe.src = IMAGE_SRC;
  }, []);

  return (
    // mt-33 (132px) clears the fixed header on both breakpoints: mobile
    // 32+56+44 = 132; desktop 172 minus the <header>'s own lg:pb-10 flow
    // height (40px) = 132.
    <section className="mt-33 flex h-[calc(100vh-8.25rem)] lg:h-[calc(100vh-10.75rem)] w-full flex-col bg-white">
      {/* Toolbar: chart number search */}
      <div className="relative z-20 flex items-center justify-between gap-4 border-b border-slate-100 bg-white px-4 py-2.5 shadow-sm">
        <div className="relative w-64 sm:w-80">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            inputMode="numeric"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setDropdownOpen(true);
            }}
            onFocus={() => query.trim() && setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) selectResult(results[0]);
              if (e.key === "Escape") clearSearch();
            }}
            placeholder="Search chart number…"
            aria-label="Search chart by number"
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-9 pl-9 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-pBlue focus:ring-2 focus:ring-pBlue/20"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-gray-400 transition-colors hover:text-pBlue"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}

          {dropdownOpen && query.trim() && (
            <ul
              className="absolute top-11 right-0 left-0 z-30 max-h-64 overflow-auto rounded-lg border border-slate-100 bg-white py-1 shadow-xl"
              onMouseDown={(e) => e.preventDefault()}
            >
              {results.length > 0 ? (
                results.map((area) => {
                  const product = findProductByChartNumber(area.number);
                  return (
                    <li key={area.number}>
                      <button
                        type="button"
                        onClick={() => selectResult(area)}
                        className="flex w-full items-baseline gap-2 px-3 py-2 text-left transition-colors hover:bg-slate-50"
                      >
                        <span className="text-sm font-bold text-pBlue">
                          {area.number}
                        </span>
                        {area.int && (
                          <span className="text-xs text-gray-400">
                            ({area.int})
                          </span>
                        )}
                        {product && (
                          <span className="min-w-0 flex-1 truncate text-xs text-gray-500">
                            {product.nameEn}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })
              ) : (
                <li className="px-3 py-2 text-sm text-gray-400">
                  No chart matches “{query.trim()}”
                </li>
              )}
            </ul>
          )}
        </div>

        <p className="hidden text-xs text-gray-400 md:block">
          Hover a rectangle to identify a chart — click it to view details
        </p>
      </div>

      <div
        className="relative min-h-0 w-full flex-1 select-none"
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      >
        {imgMissing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="max-w-md rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
              Chart index image not found. Place the image at
              <span className="mx-1 font-mono text-pBlue">
                public/chart/chart-index.jpg
              </span>
              and reload.
            </p>
          </div>
        )}

        {/*
          The raster map and the hotspot rects live inside ONE svg sharing
          the same viewBox coordinate space, so the buttons are bound to the
          image pixels by construction — they cannot drift apart at any
          window size or browser zoom level.
        */}
        <svg
          viewBox={`0 0 ${CHART_VIEWBOX.w} ${CHART_VIEWBOX.h}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Index of Bangladesh Navy hydrographic charts covering the coast from Khulna to Cox's Bazar"
        >
          <image
            href={IMAGE_SRC}
            x={0}
            y={0}
            width={CHART_VIEWBOX.w}
            height={CHART_VIEWBOX.h}
            preserveAspectRatio="none"
          />
          {areas.map((area, i) => {
            const searched = area.number === searchedNumber;
            const active = hovered === area || selected === area || searched;
            return (
              <rect
                key={`${area.number}-${i}`}
                x={area.x}
                y={area.y}
                width={area.w}
                height={area.h}
                fill={active ? "rgba(147, 51, 234, 0.22)" : "transparent"}
                stroke={
                  active
                    ? "#7e22ce"
                    : DEBUG_OUTLINES
                      ? "rgba(220, 38, 38, 0.6)"
                      : "none"
                }
                strokeWidth={searched ? 3.5 : 2.5}
                vectorEffect="non-scaling-stroke"
                pointerEvents="all"
                role="button"
                tabIndex={0}
                aria-label={`Chart ${chartLabel(area)}`}
                className={`cursor-pointer outline-none focus-visible:stroke-pBlue ${
                  searched ? "animate-pulse" : ""
                }`}
                onMouseEnter={() => setHovered(area)}
                onMouseLeave={() =>
                  setHovered((prev) => (prev === area ? null : prev))
                }
                onClick={() => setSelected(area)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(area);
                  }
                }}
              />
            );
          })}
        </svg>

        {/* Cursor-following identifier */}
        {hovered && (
          <div
            className="pointer-events-none fixed z-40 rounded-md bg-pBlue px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
            style={{ left: cursor.x + 14, top: cursor.y + 14 }}
          >
            Chart {chartLabel(hovered)}
          </div>
        )}

      </div>

      <ChartInfoDialog selected={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function SpecTile({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold wrap-break-word text-gray-800">
        {value}
      </p>
    </div>
  );
}

function ChartInfoDialog({
  selected,
  onClose,
}: {
  selected: IChartArea | null;
  onClose: () => void;
}) {
  const product = selected ? findProductByChartNumber(selected.number) : null;
  const image = product?.images?.[0];
  const attr = (key: string) =>
    product?.productAttributes.find((a) => a.key === key)?.value;

  return (
    <Dialog
      open={selected !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className={product && image ? "sm:max-w-md" : "sm:max-w-sm"}>
        <DialogHeader>
          <DialogTitle className="text-pBlue">Chart Information</DialogTitle>
          <DialogDescription>
            Bangladesh Navy Hydrographic &amp; Oceanographic Centre
          </DialogDescription>
        </DialogHeader>

        {selected && product && image ? (
          <div className="space-y-4">
            {/* Chart preview */}
            <div className="relative h-56 w-full overflow-hidden rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 to-slate-100">
              <Image
                src={image}
                alt={product.nameEn}
                fill
                className="object-contain p-2"
                sizes="(max-width: 640px) 100vw, 448px"
              />
              <span className="absolute top-3 left-3 rounded-md bg-pBlue px-2.5 py-1 text-xs font-bold text-white shadow-md">
                Chart {selected.number}
              </span>
              {selected.int && (
                <span className="absolute top-3 right-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-pBlue shadow-md">
                  {selected.int}
                </span>
              )}
            </div>

            {/* Title */}
            <div>
              <h3 className="text-lg leading-snug font-bold text-pBlue">
                {product.nameEn}
              </h3>
              <p className="mt-0.5 text-sm text-gray-500">
                {attr("Geographic Location") ?? "Bay of Bengal"} ·{" "}
                {product.category.nameEn}
              </p>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-2">
              <SpecTile label="Scale" value={attr("Scale")} />
              <SpecTile label="Projection" value={attr("Projection")} />
              <SpecTile
                label="Published"
                value={attr("Date of Publication")}
              />
              <SpecTile label="Edition" value={attr("Edition")} />
            </div>

            {/* CTA */}
            <div className="border-t border-gray-100 pt-4">
              <Link
                href={`/products/${getProductSlug(product)}`}
                className="block w-full rounded-lg bg-pBlue py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-pBlue/90"
              >
                View Details
              </Link>
            </div>
          </div>
        ) : (
          selected && (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-8 text-center">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                Serial Number
              </p>
              <p className="mt-1 text-4xl font-extrabold tracking-wide text-pBlue">
                {selected.number}
              </p>
              {selected.int && (
                <p className="mt-1 text-sm font-semibold text-gray-600">
                  {selected.int}
                </p>
              )}
              <p className="mt-3 text-xs text-gray-400">
                Detailed information for this chart is coming soon.
              </p>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
