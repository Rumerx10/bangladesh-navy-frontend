"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import {
  CornerDownLeftIcon,
  FileTextIcon,
  Loader2Icon,
  MapIcon,
  MegaphoneIcon,
  MonitorIcon,
  PackageCheckIcon,
  PackageIcon,
  PhoneIcon,
  SearchIcon,
  WavesIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import { cn } from "@/src/lib/utils";
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import {
  IProduct,
  PRODUCT_CATEGORY_LABELS,
  ProductCategory,
} from "@/src/components/admin/ContentManagement/products/types";
import {
  findProducts,
  splitByTerms,
  toSearchTerms,
} from "@/src/components/products/productSearch";
import { findPages } from "./searchPages";

// ─── What can be found ────────────────────────────────────────────────────────

/** Shown before anything is typed. */
const QUICK_LINKS: {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Paper Charts",
    description: "Browse the paper chart index",
    href: "/product-service/paper-charts",
    icon: MapIcon,
  },
  {
    label: "Electronic Charts (ENC)",
    description: "Find ENC cells by area",
    href: "/product-service/electronic-navigational-charts",
    icon: MonitorIcon,
  },
  {
    label: "Tide Tables",
    description: "Tidal stations along the coast",
    href: "/product-service/tide-tables",
    icon: WavesIcon,
  },
  {
    label: "Notices to Mariners",
    description: "Latest navigational notices",
    href: "/important-notice/notices",
    icon: MegaphoneIcon,
  },
  {
    label: "How to Collect",
    description: "Ordering and collecting products",
    href: "/how-to-collect",
    icon: PackageCheckIcon,
  },
  {
    label: "Contact Information",
    description: "Phone, email and address",
    href: "/contact-us/information",
    icon: PhoneIcon,
  },
];

const CATEGORY_ICONS: Record<ProductCategory, LucideIcon> = {
  PAPPER_CHART: MapIcon,
  ELECTRONIC_NAVIGATIONAL_CHART: MonitorIcon,
  TIDAL: WavesIcon,
};

const SEARCH_ACTION = "action:search-products";
const FIRST_QUICK_LINK = `quick:${QUICK_LINKS[0].href}`;
const MAX_RESULTS = 6;

// ─── Small pieces ─────────────────────────────────────────────────────────────

const noopSubscribe = () => () => {};
/** ⌘ on Apple devices, Ctrl elsewhere — read on the client only. */
const useIsApple = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),
    () => false
  );

/** Bolds the parts of `text` that match the search terms. */
const Highlight = ({ text, terms }: { text: string; terms: string[] }) => (
  <>
    {splitByTerms(text, terms).map((part, index) =>
      part.match ? (
        <mark key={index} className="bg-transparent font-semibold text-pBlue">
          {part.text}
        </mark>
      ) : (
        <Fragment key={index}>{part.text}</Fragment>
      )
    )}
  </>
);

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-card px-1 font-sans text-[10px] font-medium text-muted-foreground shadow-[0_1px_0_var(--border)]">
    {children}
  </kbd>
);

interface ResultItemProps {
  value: string;
  onSelect: () => void;
  icon: LucideIcon;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** The "search all products" action — drawn in the brand colour. */
  primary?: boolean;
}

const ResultItem = ({
  value,
  onSelect,
  icon: Icon,
  title,
  subtitle,
  primary = false,
}: ResultItemProps) => (
  <CommandItem
    value={value}
    onSelect={onSelect}
    className="group cursor-pointer gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150"
  >
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-lg transition-colors duration-150",
        primary
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-pBlue group-data-[selected=true]:bg-card"
      )}
    >
      <Icon className="size-4 text-current" />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block truncate text-sm font-medium text-foreground">
        {title}
      </span>
      {subtitle && (
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
          {subtitle}
        </span>
      )}
    </span>
    <CornerDownLeftIcon className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-150 group-data-[selected=true]:opacity-100" />
  </CommandItem>
);

// ─── Search ───────────────────────────────────────────────────────────────────

/**
 * Site search for the desktop header: a search pill (an icon where space is
 * tight) that opens a command-palette style panel. Nothing in the header moves
 * when it opens — the panel and a soft backdrop fade and scale in over the
 * page, and back out on close.
 *
 * Before typing it offers quick links; as you type it lists matching products
 * (the same matching as the products page) and pages, with "search all
 * products" first so Enter keeps doing a full product search. Ctrl/⌘ + K or
 * "/" opens it from anywhere; arrows move, Enter opens, Esc closes.
 */
const SiteSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isApple = useIsApple();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(FIRST_QUICK_LINK);

  // The query is cleared when the panel opens, not when it closes, so the
  // results stay put while the panel fades out instead of flashing empty.
  const openSearch = useCallback(() => {
    setQuery("");
    setSelected(FIRST_QUICK_LINK);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        !!target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) setOpen(false);
        else openSearch();
      } else if (
        event.key === "/" &&
        !open &&
        !isTyping &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        event.preventDefault();
        openSearch();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, openSearch]);

  // The active catalogue, fetched the first time the panel opens. Same query
  // (and cache entry) as the products page with no category picked.
  const { data, isLoading } = useGet<IProduct[]>(
    "/product",
    ["product-public", "all"],
    { sortOrder: "asc", status: "ACTIVE" },
    { enabled: open }
  );

  const terms = useMemo(() => toSearchTerms(query), [query]);
  const hasQuery = terms.length > 0;

  const productResults = useMemo(
    () =>
      findProducts(
        Array.isArray(data?.data) ? data.data : [],
        terms,
        MAX_RESULTS
      ),
    [data, terms]
  );

  const pageResults = useMemo(() => findPages(terms, MAX_RESULTS), [terms]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelected(value.trim() ? SEARCH_ACTION : FIRST_QUICK_LINK);
  };

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  // Hands the query to the products page as `?search=`, which it reads.
  const searchProducts = () => {
    const value = query.trim();
    if (!value) return;
    setOpen(false);
    if (pathname === "/product-service") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      router.push(`/product-service?search=${encodeURIComponent(value)}`);
    }
  };

  const shortcut = isApple ? "⌘ K" : "Ctrl K";
  const searchingProducts = isLoading && productResults.length === 0;
  const nothingFound =
    !isLoading && productResults.length === 0 && pageResults.length === 0;

  return (
    <>
      {/* Wide screens: a search pill with its shortcut */}
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search the site"
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K /"
        className="group hidden h-10 w-56 cursor-pointer items-center gap-2.5 rounded-full border border-nav-hairline bg-nav-wash pr-2 pl-3.5 text-sm text-nav-ink-muted transition-[background-color,border-color,color,transform] duration-200 hover:border-white/25 hover:bg-nav-wash-strong hover:text-nav-ink focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none active:scale-[0.98] xl:flex"
      >
        <SearchIcon className="size-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
        <span className="flex-1 truncate text-left">Search charts, pages…</span>
        <kbd className="rounded-md border border-nav-hairline bg-white/10 px-1.5 py-1 font-sans text-[11px] leading-none font-medium text-nav-ink-muted">
          {shortcut}
        </kbd>
      </button>

      {/* Where the nav is tighter: the icon alone */}
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search the site"
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K /"
        className="flex size-10 cursor-pointer items-center justify-center rounded-full text-nav-ink transition-[background-color,transform] duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none active:scale-95 xl:hidden"
      >
        <SearchIcon size={20} />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay className="bg-brand-navy/45 backdrop-blur-[3px] duration-200" />
          <DialogPrimitive.Content className="fixed top-[8vh] left-1/2 z-50 flex w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-[0_24px_64px_-16px_rgb(0_24_54/0.45)] outline-none duration-200 ease-out data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-97 data-[state=closed]:slide-out-to-top-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-97 data-[state=open]:slide-in-from-top-3 sm:top-[12vh]">
            <DialogTitle className="sr-only">Search the site</DialogTitle>
            <DialogDescription className="sr-only">
              Find charts, tide tables and pages. Use the arrow keys to move
              through the results and Enter to open one.
            </DialogDescription>

            <Command
              shouldFilter={false}
              loop
              value={selected}
              onValueChange={setSelected}
              className="rounded-none bg-transparent"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-border px-4 sm:px-5">
                <SearchIcon className="size-5 shrink-0 text-pBlue" />
                <CommandPrimitive.Input
                  value={query}
                  onValueChange={handleQueryChange}
                  placeholder="Search charts, tide tables, pages…"
                  className="h-14 min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => handleQueryChange("")}
                    className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <XIcon className="size-4" />
                  </button>
                )}
                <DialogPrimitive.Close
                  aria-label="Close search"
                  className="hidden shrink-0 cursor-pointer rounded-md border border-border bg-muted/60 px-1.5 py-1 text-[11px] leading-none font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
                >
                  Esc
                </DialogPrimitive.Close>
                <DialogPrimitive.Close
                  aria-label="Close search"
                  className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:hidden"
                >
                  <XIcon className="size-5" />
                </DialogPrimitive.Close>
              </div>

              {/* Results */}
              <CommandList className="max-h-[min(62vh,28rem)] scroll-py-2 overscroll-contain p-2">
                {!hasQuery ? (
                  <CommandGroup heading="Quick links">
                    {QUICK_LINKS.map(({ label, description, href, icon }) => (
                      <ResultItem
                        key={href}
                        value={`quick:${href}`}
                        onSelect={() => navigate(href)}
                        icon={icon}
                        title={label}
                        subtitle={description}
                      />
                    ))}
                  </CommandGroup>
                ) : (
                  <>
                    <CommandGroup>
                      <ResultItem
                        value={SEARCH_ACTION}
                        onSelect={searchProducts}
                        icon={SearchIcon}
                        primary
                        title={
                          <>
                            Search all products for{" "}
                            <span className="font-semibold text-pBlue">
                              &ldquo;{query.trim()}&rdquo;
                            </span>
                          </>
                        }
                        subtitle="Opens Nautical Products with this search"
                      />
                    </CommandGroup>

                    {(searchingProducts || productResults.length > 0) && (
                      <CommandGroup heading="Products">
                        {searchingProducts ? (
                          <div className="flex items-center gap-2 px-3 py-3 text-sm text-muted-foreground">
                            <Loader2Icon className="size-4 animate-spin" />
                            Searching products…
                          </div>
                        ) : (
                          productResults.map((product) => (
                            <ResultItem
                              key={product.id}
                              value={`product:${product.id}`}
                              onSelect={() =>
                                navigate(`/products/${product.id}`)
                              }
                              icon={
                                product.category
                                  ? CATEGORY_ICONS[product.category]
                                  : PackageIcon
                              }
                              title={
                                <Highlight
                                  text={product.nameEn}
                                  terms={terms}
                                />
                              }
                              subtitle={
                                <>
                                  {product.category
                                    ? PRODUCT_CATEGORY_LABELS[product.category]
                                    : "Product"}
                                  {product.chartCode ? (
                                    <>
                                      {" · Chart "}
                                      <Highlight
                                        text={String(product.chartCode)}
                                        terms={terms}
                                      />
                                    </>
                                  ) : null}
                                </>
                              }
                            />
                          ))
                        )}
                      </CommandGroup>
                    )}

                    {pageResults.length > 0 && (
                      <CommandGroup heading="Pages">
                        {pageResults.map((page) => (
                          <ResultItem
                            key={page.href}
                            value={`page:${page.href}`}
                            onSelect={() => navigate(page.href)}
                            icon={FileTextIcon}
                            title={
                              <Highlight text={page.label} terms={terms} />
                            }
                            subtitle={page.section}
                          />
                        ))}
                      </CommandGroup>
                    )}

                    {nothingFound && (
                      <p className="px-3 pt-3 pb-4 text-center text-sm text-muted-foreground">
                        No pages or products match &ldquo;{query.trim()}&rdquo;.
                        Try a chart number or a place, e.g. 3535 or Mongla.
                      </p>
                    )}
                  </>
                )}
              </CommandList>

              {/* Keyboard hints */}
              <div className="hidden items-center justify-between gap-4 border-t border-border bg-muted/40 px-4 py-2.5 text-xs text-muted-foreground sm:flex">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Kbd>↵</Kbd>
                    Open
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Kbd>Esc</Kbd>
                    Close
                  </span>
                </div>
                <span className="flex items-center gap-1.5">
                  Open anytime
                  <Kbd>{isApple ? "⌘" : "Ctrl"}</Kbd>
                  <Kbd>K</Kbd>
                </span>
              </div>
            </Command>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </>
  );
};

export default SiteSearch;
