import { siteConfig } from "@/src/config/siteConfig";
import Image from "next/image";
import Link from "next/link";

/** The sidebar's share of the admin masthead. It is filled with the navy the
 *  top bar's gradient starts on (see DashboardHeader), so the crest and the
 *  bar read as one band across the screen. The negative margins stretch the
 *  fill over the sidebar's padding and its 1px right border, so no seam shows
 *  where the two meet. */
const SidebarLogo = () => {
  return (
    <Link
      href="/"
      title="Open the public site"
      className="-mr-4.25 -ml-4 flex h-18 shrink-0 items-center gap-2.5 bg-brand-navy px-4 text-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none focus-visible:ring-inset sm:-mr-5.25 sm:-ml-5 sm:px-5"
    >
      <Image
        width={216}
        height={216}
        src="/logo.png"
        alt="Bangladesh Navy crest"
        className="w-11 shrink-0"
      />
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-[15px] leading-tight font-semibold">
          {siteConfig.name}
        </span>
        <span className="text-xs leading-snug text-white/65">
          {siteConfig.description}
        </span>
      </div>
    </Link>
  );
};

export default SidebarLogo;
