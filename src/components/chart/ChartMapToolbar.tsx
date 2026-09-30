"use client";

import {
  CornerDownLeftIcon,
  CrosshairIcon,
  MousePointerClickIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import {
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export interface ChartMapToolbarProps<T> {
  /** Page identity, shown beside the navy icon tile. */
  title: string;
  subtitle: string;
  icon: ReactNode;
  /** Singular noun for what a hotspot represents — "chart", "ENC cell". */
  entity: string;

  query: string;
  onQueryChange: (value: string) => void;
  /** Clears both the query and whatever the search pinned on the map. */
  onClear: () => void;
  placeholder: string;
  numeric?: boolean;

  results: T[];
  getKey: (item: T) => string;
  renderResult: (item: T) => ReactNode;
  onSelect: (item: T) => void;

  /** Label of the hotspot a search is currently holding on the map. */
  pinnedLabel?: string;
  /** Size of the searchable set, shown as a quiet counter. */
  total?: number;
}

const Kbd = ({ children }: { children: ReactNode }) => (
  <kbd className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-border bg-light px-1 font-sans text-[10px] leading-none font-medium text-secondary-foreground">
    {children}
  </kbd>
);

/**
 * Search + legend bar shared by the paper-chart and ENC catalogue maps.
 *
 * Owns only its own popover state (open flag, highlighted row). The query and
 * the result list stay with the parent, because each map matches on different
 * fields and renders its rows differently.
 */
const ChartMapToolbar = <T,>({
  title,
  subtitle,
  icon,
  entity,
  query,
  onQueryChange,
  onClear,
  placeholder,
  numeric,
  results,
  getKey,
  renderResult,
  onSelect,
  pinnedLabel,
  total,
}: ChartMapToolbarProps<T>) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  const trimmed = query.trim();
  const showList = open && trimmed.length > 0;

  // Keep the keyboard-highlighted row inside the scroll box.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, showList]);

  // "/" focuses the search box from anywhere on the page, the way map and
  // documentation tools do — the map itself has nothing else to type into.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable)
      )
        return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const choose = (item: T) => {
    setOpen(false);
    onSelect(item);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!results.length) return;
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) =>
        e.key === "ArrowDown"
          ? (i + 1) % results.length
          : (i - 1 + results.length) % results.length
      );
      return;
    }
    if (e.key === "Enter") {
      const item = results[activeIndex] ?? results[0];
      if (item) {
        e.preventDefault();
        choose(item);
      }
      return;
    }
    if (e.key === "Escape") {
      onClear();
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative z-20 border-b border-border bg-light/60">
      {/* Hairline of brand colour along the bottom edge, fading out at both
          ends so the bar reads as a header rather than a boxed-in panel. */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-liteBlue/40 to-transparent" />

      <div className="container mx-auto flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
        {/* Identity */}
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-navy text-white ring-1 ring-white/10 ring-inset">
            {icon}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-sm leading-tight font-semibold text-pBlue">
              {title}
            </h1>
            <p className="truncate text-[11px] leading-tight text-muted-foreground">
              {subtitle}
              {total ? ` · ${total} indexed` : ""}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative order-3 w-full sm:order-2 sm:ms-auto sm:w-72 lg:w-80">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            inputMode={numeric ? "numeric" : undefined}
            value={query}
            onChange={(e) => {
              onQueryChange(e.target.value);
              // The result list is rebuilt on every keystroke, so the previous
              // highlight no longer points at the same row.
              setActiveIndex(0);
              setOpen(true);
            }}
            onFocus={() => trimmed && setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label={placeholder}
            role="combobox"
            aria-expanded={showList}
            aria-controls={listboxId}
            aria-autocomplete="list"
            className="h-11 w-full rounded-xl border border-border bg-card ps-10 pe-12 text-sm text-foreground shadow-xs transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground focus:border-liteBlue focus:ring-4 focus:ring-liteBlue/15"
          />

          {query ? (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search"
              className="absolute top-1/2 right-2.5 grid size-7 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-light-dark hover:text-pBlue"
            >
              <XIcon className="size-4" />
            </button>
          ) : (
            <span className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 sm:block">
              <Kbd>/</Kbd>
            </span>
          )}

          {showList && (
            <div className="absolute top-13 right-0 left-0 z-30 overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
              <ul
                ref={listRef}
                id={listboxId}
                role="listbox"
                className="max-h-72 overflow-auto p-1.5"
                onMouseDown={(e) => e.preventDefault()}
              >
                {results.length > 0 ? (
                  results.map((item, i) => (
                    <li
                      key={getKey(item)}
                      role="option"
                      aria-selected={i === activeIndex}
                    >
                      <button
                        type="button"
                        data-active={i === activeIndex}
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => choose(item)}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors data-[active=true]:bg-liteBlue/10"
                      >
                        {renderResult(item)}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-2.5 py-6 text-center">
                    <p className="text-sm font-medium text-foreground">
                      No {entity} found
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Nothing matches “{trimmed}”
                    </p>
                  </li>
                )}
              </ul>

              {results.length > 0 && (
                <div className="flex items-center gap-4 border-t border-border bg-light/70 px-3 py-1.5 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd> navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <Kbd>
                      <CornerDownLeftIcon className="size-2.5" />
                    </Kbd>
                    select
                  </span>
                  <span className="ms-auto flex items-center gap-1">
                    <Kbd>esc</Kbd> clear
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Legend / pinned result */}
        <div className="order-2 ms-auto flex items-center gap-2 sm:order-3 sm:ms-0">
          {pinnedLabel && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-liteBlue/10 py-1.5 ps-3 pe-1.5 text-xs font-semibold text-liteBlue ring-1 ring-liteBlue/20 ring-inset">
              <CrosshairIcon className="size-3.5" />
              {pinnedLabel}
              <button
                type="button"
                onClick={onClear}
                aria-label={`Clear ${pinnedLabel}`}
                className="grid size-5 place-items-center rounded-full transition-colors hover:bg-liteBlue/15"
              >
                <XIcon className="size-3" />
              </button>
            </span>
          )}

          <p className="hidden items-center gap-2 rounded-full border border-border bg-card py-1.5 ps-2 pe-4 text-xs text-muted-foreground lg:inline-flex">
            <span className="grid size-6 place-items-center rounded-full bg-liteBlue/10 text-liteBlue">
              <MousePointerClickIcon className="size-3.5" />
            </span>
            <span>
              <span className="font-semibold text-foreground">Hover</span> a
              rectangle to identify a {entity} ·{" "}
              <span className="font-semibold text-foreground">click</span> for
              details
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChartMapToolbar;
