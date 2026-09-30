"use client";

import { searchTabs } from "@/src/data/homeData";
import { chartIndexAreas, IChartArea } from "@/src/data/chartIndexAreas";
import { encHotspotAreas, IEncCell } from "@/src/data/encIndexAreas";
import { IPublication } from "@/src/components/admin/ContentManagement/publications/types";
import { INotice } from "@/src/components/notices/types";
import { ITidalStation } from "@/src/components/tide-tables/types";
import { useGet } from "@/src/hooks/useGet";
import { useDebounce } from "@/src/hooks/useDebounce";
import NavyWatermark from "@/src/components/shared/NavyWatermark";
import { motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  Loader2,
  Map as MapIcon,
  MonitorSmartphone,
  Search,
  Waves,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import SearchTabs from "./SearchTabs";
import SectionTitle from "../../SectionTitle";

type ResultCategory =
  "paper-chart" | "enc-chart" | "tide" | "notice" | "publication";

interface SearchResult {
  key: string;
  category: ResultCategory;
  title: string;
  subtitle?: string;
  href: string;
  external?: boolean;
}

const CATEGORY_META: Record<
  ResultCategory,
  { label: string; icon: typeof MapIcon }
> = {
  "paper-chart": { label: "Paper Charts", icon: MapIcon },
  "enc-chart": { label: "Electronic Charts", icon: MonitorSmartphone },
  tide: { label: "Tide Tables", icon: Waves },
  notice: { label: "Notices to Mariners", icon: Bell },
  publication: { label: "Publications", icon: BookOpen },
};

/** Which result categories each search tab pulls suggestions from. */
const TAB_CATEGORIES: Record<string, ResultCategory[]> = {
  all: ["paper-chart", "enc-chart", "tide", "notice", "publication"],
  charts: ["paper-chart", "enc-chart"],
  tides: ["tide"],
  notices: ["notice"],
  publication: ["publication"],
};

/** Where the "Search" button / no-results CTA sends the user for each tab. */
const TAB_FALLBACK_HREF: Record<string, string> = {
  all: "/product-service",
  charts: "/product-service",
  tides: "/product-service/tide-tables",
  notices: "/important-notice/notices",
  publication: "/important-notice/publications",
};

const chartLabel = (area: IChartArea) =>
  area.int ? `Chart ${area.number} (${area.int})` : `Chart ${area.number}`;

const cellLabel = (cell: IEncCell) =>
  cell.intNo ? `${cell.cellNo} (${cell.intNo})` : cell.cellNo;

const MaritimeSearch = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const debouncedQuery = useDebounce(query.trim(), 300);
  const showDropdown = isFocused && q.length > 0;

  // Closing is driven by a pointerdown outside this wrapper rather than by the
  // input's own `blur`. Blur was the reason a tap on a suggestion did nothing
  // on a phone: dismissing the on-screen keyboard blurs the input, and the
  // dropdown was being torn down on a timer before the tap's `click` ever
  // reached the <Link>. An explicit outside check has no such race — the list
  // stays mounted until the pointer genuinely lands somewhere else.
  useEffect(() => {
    if (!showDropdown) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [showDropdown]);

  const categories = TAB_CATEGORIES[activeTab] ?? TAB_CATEGORIES.all;
  const needs = (category: ResultCategory) => categories.includes(category);

  // Paper charts & ENC cells are static catalogues — filtered client-side,
  // no network round-trip needed.
  const uniquePaperCharts = useMemo(() => {
    const byNumber = new Map<string, IChartArea>();
    for (const area of chartIndexAreas) {
      if (!byNumber.has(area.number)) byNumber.set(area.number, area);
    }
    return [...byNumber.values()];
  }, []);

  const paperChartResults = useMemo<SearchResult[]>(() => {
    if (!q || !needs("paper-chart")) return [];
    return uniquePaperCharts
      .filter(
        (area) =>
          area.number.toLowerCase().includes(q) ||
          area.int?.toLowerCase().includes(q)
      )
      .map((area) => ({
        key: `paper-chart-${area.number}`,
        category: "paper-chart" as const,
        title: chartLabel(area),
        subtitle: "Paper Chart",
        href: `/product-service/paper-charts/${area.number}`,
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, activeTab, uniquePaperCharts]);

  const encChartResults = useMemo<SearchResult[]>(() => {
    if (!q || !needs("enc-chart")) return [];
    return encHotspotAreas
      .filter(
        (cell) =>
          cell.cellNo.toLowerCase().includes(q) ||
          cell.nationalNo.toLowerCase().includes(q) ||
          cell.title.toLowerCase().includes(q) ||
          cell.intNo?.toLowerCase().includes(q)
      )
      .map((cell) => ({
        key: `enc-chart-${cell.cellNo}`,
        category: "enc-chart" as const,
        title: cell.title,
        subtitle: cellLabel(cell),
        href: `/product-service/electronic-navigational-charts/${cell.cellNo}`,
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, activeTab]);

  const { data: tidalData, isLoading: tidesLoading } = useGet<ITidalStation[]>(
    "/tidal-station/list",
    ["tidal-station-list"],
    undefined,
    {
      enabled: showDropdown && needs("tide"),
    }
  );

  const tideResults = useMemo<SearchResult[]>(() => {
    if (!q || !needs("tide")) return [];
    const stations = Array.isArray(tidalData?.data) ? tidalData.data : [];
    return stations
      .filter((station) => station.product?.id)
      .filter(
        (station) =>
          station.product?.nameEn.toLowerCase().includes(q) ||
          station.generalArea.toLowerCase().includes(q) ||
          station.location.toLowerCase().includes(q)
      )
      .map((station) => ({
        key: `tide-${station.id}`,
        category: "tide" as const,
        title: station.product?.nameEn ?? station.location,
        subtitle: station.generalArea,
        href: `/product-service/tide-tables/${station.product?.id}`,
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, activeTab, tidalData]);

  const { data: noticeData, isLoading: noticesLoading } = useGet<INotice[]>(
    "/notice-management/list",
    ["notice-management-list"],
    undefined,
    { enabled: showDropdown && needs("notice") }
  );

  const noticeResults = useMemo<SearchResult[]>(() => {
    if (!q || !needs("notice")) return [];
    const notices = Array.isArray(noticeData?.data) ? noticeData.data : [];
    return notices
      .filter((notice) => notice.status === "ACTIVE")
      .filter(
        (notice) =>
          notice.titleEn.toLowerCase().includes(q) ||
          notice.titleBn?.toLowerCase().includes(q) ||
          notice.noticeNumber.toLowerCase().includes(q)
      )
      .map((notice) => ({
        key: `notice-${notice.id}`,
        category: "notice" as const,
        title: notice.titleEn,
        subtitle: notice.noticeNumber,
        href: notice.pdfUrl ?? "/important-notice/notices",
        external: Boolean(notice.pdfUrl),
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, activeTab, noticeData]);

  const { data: publicationData, isLoading: publicationsLoading } = useGet<
    IPublication[]
  >(
    "/publication",
    ["publication-search", debouncedQuery],
    { search: debouncedQuery, limit: "5", status: "ACTIVE" },
    {
      enabled:
        showDropdown && needs("publication") && debouncedQuery.length > 0,
    }
  );

  const publicationResults = useMemo<SearchResult[]>(() => {
    if (!q || !needs("publication")) return [];
    const publications = Array.isArray(publicationData?.data)
      ? publicationData.data
      : [];
    return publications.map((publication) => ({
      key: `publication-${publication.id}`,
      category: "publication" as const,
      title: publication.titleEn,
      subtitle: publication.code,
      href: "/how-to-collect",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, activeTab, publicationData]);

  const resultsByCategory: Record<ResultCategory, SearchResult[]> = {
    "paper-chart": paperChartResults,
    "enc-chart": encChartResults,
    tide: tideResults,
    notice: noticeResults,
    publication: publicationResults,
  };

  const maxPerCategory = activeTab === "all" ? 3 : 8;
  const groups = categories
    .map((category) => ({
      category,
      items: resultsByCategory[category].slice(0, maxPerCategory),
    }))
    .filter((group) => group.items.length > 0);

  const totalResults = groups.reduce((sum, g) => sum + g.items.length, 0);

  const isLoading =
    (needs("tide") && tidesLoading) ||
    (needs("notice") && noticesLoading) ||
    (needs("publication") && publicationsLoading && debouncedQuery.length > 0);

  const closeDropdown = () => {
    setQuery("");
    setIsFocused(false);
  };

  const handleSearch = () => {
    if (query.trim()) {
      const fallback = TAB_FALLBACK_HREF[activeTab] ?? "/product-service";
      router.push(`${fallback}?search=${encodeURIComponent(query.trim())}`);
      closeDropdown();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsFocused(false);
      return;
    }
    if (e.key === "Enter") {
      const firstResult = groups[0]?.items[0];
      if (firstResult && !firstResult.external) {
        router.push(firstResult.href);
        closeDropdown();
      } else {
        handleSearch();
      }
    }
  };

  return (
    <section className="relative py-16 lg:py-25 bg-card">
      {/* Watermarks. The clip belongs on this layer, not on the <section>:
          both marks bleed past the edges deliberately and would otherwise
          widen the page, but an `overflow-hidden` on the section also cuts off
          the search dropdown below, which is absolutely positioned and has to
          escape the section's bottom edge to be readable. `pointer-events-none`
          because this layer spans the full section and would otherwise
          swallow clicks meant for the input and tabs. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-10 text-pBlue">
          <NavyWatermark
            variant="compass"
            size={350}
            opacity={0.03}
            animate="rotate"
          />
        </div>
        <div className="absolute -left-16 -bottom-16 text-pBlue">
          <NavyWatermark
            variant="anchor"
            size={250}
            opacity={0.025}
            animate="drift"
          />
        </div>
      </div>
      <div className="relative container px-4 sm:px-6 lg:px-8 text-center">
        <SectionTitle
          title="Find Maritime Resources"
          desc="Search our comprehensive database of charts, notices, and data"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchTabs
            tabs={searchTabs}
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              inputRef.current?.focus();
            }}
          />
        </motion.div>

        <motion.div
          ref={wrapRef}
          className="mt-5 max-w-2xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search charts, publications, notices..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 h-11 rounded-lg border border-border text-sm bg-light focus:outline-none focus:border-liteBlue focus:ring-2 focus:ring-liteBlue/10 transition-all"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary-foreground cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="inline-flex items-center justify-center gap-2 px-6 h-11 py-4 rounded-lg bg-brand-blue text-white font-medium text-base hover:bg-brand-blue transition-colors cursor-pointer"
            >
              <Search size={18} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>

          {/* Search dropdown */}
          {showDropdown && (
            <div
              // Keeps focus (and the on-screen keyboard) on the input while a
              // result is tapped. Without it the browser treats the first tap
              // as "dismiss the keyboard" — iOS Safari swallows it outright,
              // and elsewhere the viewport resize shifts the row out from
              // under the finger, so the tap lands on nothing. Preventing the
              // default here does not stop the `click`, so the <Link> still
              // navigates; it only stops the focus change.
              onMouseDown={(e) => e.preventDefault()}
              className="scrollbar-modern absolute top-full left-0 right-0 z-50 mt-2 max-h-104 overflow-x-hidden overflow-y-auto rounded-xl border border-border bg-card text-left shadow-2xl"
            >
              {totalResults > 0 ? (
                <>
                  {groups.map((group) => {
                    const meta = CATEGORY_META[group.category];
                    const Icon = meta.icon;
                    return (
                      <div key={group.category}>
                        {activeTab === "all" && (
                          <p className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                            {meta.label}
                          </p>
                        )}
                        {group.items.map((item) =>
                          item.external ? (
                            <a
                              key={item.key}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3.5 px-4 py-3 hover:bg-light transition-colors border-b border-border last:border-b-0"
                              onClick={closeDropdown}
                            >
                              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-brand-navy to-brand-blue flex items-center justify-center shrink-0">
                                <Icon size={18} className="text-white/80" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate">
                                  {item.title}
                                </p>
                                {item.subtitle && (
                                  <p className="text-xs text-muted-foreground truncate">
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                            </a>
                          ) : (
                            <Link
                              key={item.key}
                              href={item.href}
                              className="flex items-center gap-3.5 px-4 py-3 hover:bg-light transition-colors border-b border-border last:border-b-0"
                              onClick={closeDropdown}
                            >
                              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-brand-navy to-brand-blue flex items-center justify-center shrink-0">
                                <Icon size={18} className="text-white/80" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate">
                                  {item.title}
                                </p>
                                {item.subtitle && (
                                  <p className="text-xs text-muted-foreground truncate">
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                            </Link>
                          )
                        )}
                      </div>
                    );
                  })}
                  {isLoading && (
                    <p className="flex items-center gap-2 px-4 py-2 text-xs text-muted-foreground">
                      <Loader2 size={12} className="animate-spin" />
                      Searching…
                    </p>
                  )}
                  <button
                    onClick={handleSearch}
                    className="w-full px-4 py-3 text-sm font-medium text-liteBlue bg-light hover:bg-light-dark transition-colors text-center cursor-pointer"
                  >
                    View all results for &quot;{query}&quot;
                  </button>
                </>
              ) : isLoading ? (
                <p className="flex items-center justify-center gap-2 px-4 py-6 text-sm text-secondary-foreground">
                  <Loader2 size={14} className="animate-spin" />
                  Searching…
                </p>
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-secondary-foreground">
                    No results found for &quot;{query}&quot;
                  </p>
                  <button
                    onClick={handleSearch}
                    className="mt-2 text-sm text-liteBlue font-medium hover:underline cursor-pointer"
                  >
                    Search in product catalog →
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MaritimeSearch;
