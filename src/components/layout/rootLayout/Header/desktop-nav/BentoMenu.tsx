"use client";

import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { getLinkMeta } from "./navMeta";
import { SectionMenu, trackPointer, type MenuStyle } from "./kit";
import { DesktopNavState, NavEntry, flatLinks } from "./useDesktopNav";

/** The teal that marks the current page — on its menu card, its "More" row
 *  and its item in the bar. */
export const ACTIVE_FILL =
  "border-sky-400/20 bg-[linear-gradient(160deg,rgb(14_116_144/0.4),rgb(8_47_73/0.25))]";

const MORE_MENU: MenuStyle = {
  link: "rounded-lg border border-transparent py-2 pr-4 pl-2 text-sm text-white/65 hover:bg-white/5 hover:text-white data-active:border-sky-400/20 data-active:bg-[linear-gradient(160deg,rgb(14_116_144/0.4),rgb(8_47_73/0.25))] data-active:text-white",
  icon: "rounded-md border border-white/10 bg-white/4 text-sky-300",
  heading: "px-2 pt-1 text-white/45",
};

// Written out so Tailwind's scanner sees them; indexed by row count
const ROW_SPAN = ["", "row-span-1", "row-span-2", "row-span-3", "row-span-4"];

const BentoCard = ({
  link,
  nav,
  tall = false,
  className,
}: {
  link: { label: string; link: string };
  nav: DesktopNavState;
  /** The lead card: roomier, with a larger icon. */
  tall?: boolean;
  className?: string;
}) => {
  const { icon: Icon, description } = getLinkMeta(link.link);
  const active = nav.isLinkActive(link.link);
  return (
    <Link
      href={link.link}
      onClick={nav.closeMenus}
      onPointerMove={trackPointer}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/card relative flex flex-col justify-between overflow-hidden rounded-xl border p-3.5 transition-colors",
        tall && "p-4",
        active
          ? ACTIVE_FILL
          : "border-white/8 bg-white/3 hover:border-white/15",
        className
      )}
    >
      {/* Lights up under the pointer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(160px_circle_at_var(--spot-x)_var(--spot-y),rgb(56_189_248/0.16),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
      />
      <Icon
        aria-hidden
        className={cn("relative text-sky-300", tall ? "size-6" : "size-4.5")}
      />
      <span className="relative mt-3 block">
        <span className="block text-sm font-semibold text-white">
          {link.label}
        </span>
        {description && (
          <span className="mt-0.5 block text-xs leading-snug text-white/55">
            {description}
          </span>
        )}
      </span>
    </Link>
  );
};

/** A section's links as a bento grid: one tall card, the rest as tiles.
 *  "More" keeps a plain list of its folded sections. */
const BentoMenu = ({
  entry,
  nav,
}: {
  entry: NavEntry;
  nav: DesktopNavState;
}) => {
  if (entry.isMore) {
    return (
      <div className="p-2">
        <SectionMenu entry={entry} nav={nav} style={MORE_MENU} />
      </div>
    );
  }
  const [first, ...rest] = flatLinks(entry.item.subLinks);
  const columns = rest.length > 2 ? 3 : 2;
  // The lead card fills the first column top to bottom and the rest fill the
  // other columns row by row, so it spans exactly the rows they take — e.g.
  // Contact (1 + 1) is one row of two equal cards, About Us (1 + 6) is three
  // rows with no empty corner.
  const rows = Math.max(1, Math.ceil(rest.length / (columns - 1)));
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(5.5rem,auto)] gap-2 p-2",
        columns === 3 ? "w-2xl grid-cols-3" : "w-120 grid-cols-2"
      )}
    >
      <BentoCard link={first} nav={nav} tall className={ROW_SPAN[rows]} />
      {rest.map((link) => (
        <BentoCard key={link.link} link={link} nav={nav} />
      ))}
    </div>
  );
};

export default BentoMenu;
