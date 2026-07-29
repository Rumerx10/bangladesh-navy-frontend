"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { ENC_VIEWBOX, encIndexAreas, IEncCell } from "@/src/data/encIndexAreas";
import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const IMAGE_SRC = "/chart/enc-index.jpg";

/** Outline every hotspot to calibrate coordinates against the printed rectangles. */
const DEBUG_OUTLINES = false;

const cellLabel = (area: IEncCell) =>
  area.intNo ? `${area.cellNo} (${area.intNo})` : area.cellNo;

/** Normalise a cell number for search: upper-case, no spaces (e.g. "BD5 7453" -> "BD57453"). */
const normalise = (value: string) => value.toUpperCase().replace(/\s+/g, "");

export default function ElectronicChartMap() {
  const [hovered, setHovered] = useState<IEncCell | null>(null);
  const [selected, setSelected] = useState<IEncCell | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [imgMissing, setImgMissing] = useState(false);
  const [query, setQuery] = useState("");
  const [searchedCell, setSearchedCell] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Largest rectangles first so the smallest (most specific) cell renders on
  // top and wins hover/click where coverage areas overlap.
  const areas = useMemo(
    () => [...encIndexAreas].sort((a, b) => b.w * b.h - a.w * a.h),
    []
  );

  // Cells sorted by national number for the search dropdown.
  const allCells = useMemo(
    () =>
      [...encIndexAreas].sort(
        (a, b) => Number(a.nationalNo) - Number(b.nationalNo)
      ),
    []
  );

  const results = useMemo(() => {
    const q = normalise(query.trim());
    if (!q) return [];
    const matchStart = (c: IEncCell) =>
      normalise(c.cellNo).startsWith(q) || c.nationalNo.startsWith(q);
    const matchAny = (c: IEncCell) =>
      normalise(c.cellNo).includes(q) ||
      c.nationalNo.includes(q) ||
      (c.intNo ? normalise(c.intNo).includes(q) : false) ||
      c.title.toUpperCase().includes(query.trim().toUpperCase());
    const starts = allCells.filter(matchStart);
    const contains = allCells.filter((c) => !starts.includes(c) && matchAny(c));
    return [...starts, ...contains].slice(0, 8);
  }, [query, allCells]);

  const selectResult = (area: IEncCell) => {
    setSearchedCell(area.cellNo);
    setQuery(area.cellNo);
    setDropdownOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    setSearchedCell(null);
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
      {/* Toolbar: ENC cell / chart number search */}
      <div className="relative z-20 flex items-center justify-between gap-4 border-b border-slate-100 bg-white px-4 py-2.5 shadow-sm">
        <div className="relative w-64 sm:w-80">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
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
            placeholder="Search cell or chart number…"
            aria-label="Search ENC cell by cell or chart number"
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
                results.map((area) => (
                  <li key={area.cellNo}>
                    <button
                      type="button"
                      onClick={() => selectResult(area)}
                      className="flex w-full items-baseline gap-2 px-3 py-2 text-left transition-colors hover:bg-slate-50"
                    >
                      <span className="text-sm font-bold text-pBlue">
                        {area.cellNo}
                      </span>
                      <span className="text-xs text-gray-400">
                        {area.nationalNo}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-xs text-gray-500">
                        {area.title}
                      </span>
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-sm text-gray-400">
                  No cell matches “{query.trim()}”
                </li>
              )}
            </ul>
          )}
        </div>

        <p className="hidden text-xs text-gray-400 md:block">
          Hover a rectangle to identify an ENC cell — click it to view details
        </p>
      </div>

      <div
        className="relative min-h-0 w-full flex-1 select-none"
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      >
        {imgMissing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="max-w-md rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
              ENC catalogue image not found. Place the image at
              <span className="mx-1 font-mono text-pBlue">
                public/chart/enc-index.jpg
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
          viewBox={`0 0 ${ENC_VIEWBOX.w} ${ENC_VIEWBOX.h}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Catalogue of Bangladesh Navy Electronic Navigational Chart (ENC) cells covering the coast from Khulna to Cox's Bazar"
        >
          <image
            href={IMAGE_SRC}
            x={0}
            y={0}
            width={ENC_VIEWBOX.w}
            height={ENC_VIEWBOX.h}
            preserveAspectRatio="none"
          />
          {areas.map((area, i) => {
            const searched = area.cellNo === searchedCell;
            const active = hovered === area || selected === area || searched;
            return (
              <rect
                key={`${area.cellNo}-${i}`}
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
                aria-label={`ENC cell ${cellLabel(area)}`}
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
            {cellLabel(hovered)}
          </div>
        )}
      </div>

      <EncInfoDialog selected={selected} onClose={() => setSelected(null)} />
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

function EncInfoDialog({
  selected,
  onClose,
}: {
  selected: IEncCell | null;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={selected !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-pBlue">ENC Cell Information</DialogTitle>
          <DialogDescription>
            Bangladesh Navy Hydrographic &amp; Oceanographic Centre
          </DialogDescription>
        </DialogHeader>

        {selected && (
          <div className="space-y-4">
            {/* Cell identity */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-pBlue px-2.5 py-1 text-sm font-bold text-white">
                {selected.cellNo}
              </span>
              {selected.intNo && (
                <span className="rounded-md bg-liteBlue/10 px-2.5 py-1 text-xs font-semibold text-liteBlue">
                  {selected.intNo}
                </span>
              )}
              <span className="text-xs font-medium text-gray-400">
                National No. {selected.nationalNo}
              </span>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-lg leading-snug font-bold text-pBlue">
                {selected.title}
              </h3>
              <p className="mt-0.5 text-sm text-gray-500">
                Electronic Navigational Chart (ENC) · Bay of Bengal
              </p>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-2">
              <SpecTile label="Compilation Scale" value={selected.scale} />
              <SpecTile label="Published" value={selected.published} />
              <SpecTile label="New Edition" value={selected.edition} />
              <SpecTile label="National No." value={selected.nationalNo} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
