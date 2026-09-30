"use client";

import {
  CHART_VIEWBOX,
  chartIndexAreas,
  IChartArea,
} from "@/src/data/chartIndexAreas";
import { useGet } from "@/src/hooks/useGet";
import {
  IProduct,
  PRODUCT_CATEGORY_LABELS,
} from "@/src/components/admin/ContentManagement/products/types";
import { MapIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ChartInfoDialog from "../products/ChartInfoDialog";
import ChartHoverTag from "./ChartHoverTag";
import ChartMapToolbar from "./ChartMapToolbar";

const IMAGE_SRC = "/chart/chart-index.jpg";

/** Outline every hotspot to calibrate coordinates against the printed rectangles. */
const DEBUG_OUTLINES = false;

/** Hover/selection wash, keyed to the purple coverage boxes printed on the map. */
const HOVER_FILL = "rgba(147, 51, 234, 0.18)";
const HOVER_STROKE = "#7e22ce";
/** A searched chart gets the brand blue instead, so it reads as distinct from hover. */
const SEARCH_FILL = "rgba(0, 63, 113, 0.28)";
const SEARCH_STROKE = "#003f71";

const chartLabel = (area: IChartArea) =>
  area.int ? `${area.number} (${area.int})` : area.number;

const formatChartDate = (value?: string | null) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : undefined;

const ChartIndexMap = () => {
  const [hovered, setHovered] = useState<IChartArea | null>(null);
  const [selected, setSelected] = useState<IChartArea | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [imgMissing, setImgMissing] = useState(false);
  const [query, setQuery] = useState("");
  const [searchedNumber, setSearchedNumber] = useState<string | null>(null);

  // Product for the currently selected chart, fetched on demand (by chart
  // code) rather than pulling the entire product catalogue up front.
  const { data: selectedProductData } = useGet<IProduct>(
    `/product/${selected?.number}`,
    ["product-detail", selected?.number ?? ""],
    undefined,
    { enabled: selected !== null }
  );
  const selectedProduct = selectedProductData?.data;

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
  };

  const clearSearch = () => {
    setQuery("");
    setSearchedNumber(null);
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
    <section className="my-25 flex h-[calc(100vh-8.25rem)] w-full flex-col bg-card lg:h-[calc(100vh-10.75rem)]">
      <ChartMapToolbar
        title="Paper Chart Index"
        subtitle="Khulna to Cox’s Bazar coverage"
        icon={<MapIcon className="size-5" />}
        entity="chart"
        query={query}
        onQueryChange={setQuery}
        onClear={clearSearch}
        placeholder="Search chart number…"
        numeric
        results={results}
        getKey={(area) => area.number}
        onSelect={selectResult}
        pinnedLabel={searchedNumber ? `Chart ${searchedNumber}` : undefined}
        total={uniqueCharts.length}
        renderResult={(area) => (
          <>
            <span className="font-mono text-sm font-bold text-pBlue">
              {area.number}
            </span>
            {area.int && (
              <span className="text-xs text-muted-foreground">{area.int}</span>
            )}
          </>
        )}
      />

      <div
        className="relative min-h-0 w-full flex-1 select-none"
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      >
        {imgMissing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="max-w-md rounded-lg border border-dashed border-input bg-light p-6 text-center text-sm text-secondary-foreground">
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
                fill={
                  searched ? SEARCH_FILL : active ? HOVER_FILL : "transparent"
                }
                stroke={
                  searched
                    ? SEARCH_STROKE
                    : active
                      ? HOVER_STROKE
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
                className={`cursor-pointer outline-none transition-[fill,stroke] duration-150 focus-visible:stroke-pBlue ${
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
          <ChartHoverTag
            x={cursor.x}
            y={cursor.y}
            eyebrow="Paper Chart"
            label={hovered.number}
            sublabel={hovered.int}
          />
        )}
      </div>

      <ChartInfoDialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        image={selectedProduct?.images?.[0]}
        imageBadge={selected ? `Chart ${selected.number}` : undefined}
        imageBadgeSecondary={selected?.int}
        heading={selectedProduct?.nameEn}
        subheading={
          selectedProduct
            ? [
                selectedProduct.geographicLocation ?? "Bay of Bengal",
                selectedProduct.category &&
                  PRODUCT_CATEGORY_LABELS[selectedProduct.category],
              ]
                .filter(Boolean)
                .join(" · ")
            : undefined
        }
        specs={[
          { label: "Scale", value: selectedProduct?.scale },
          { label: "Projection", value: selectedProduct?.projection },
          {
            label: "Published",
            value: formatChartDate(selectedProduct?.publicationDate),
          },
          { label: "Edition", value: selectedProduct?.edition },
          {
            label: "Edition Date",
            value: formatChartDate(selectedProduct?.editionDate),
          },
        ]}
        detailsHref={
          selected
            ? `/product-service/paper-charts/${selected.number}`
            : undefined
        }
        fallback={
          selected
            ? {
                label: "Serial Number",
                value: selected.number,
                note: selected.int,
              }
            : undefined
        }
      />
    </section>
  );
};

export default ChartIndexMap;
