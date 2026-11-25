import logo from "@/public/logo.png";
import { siteConfig } from "@/src/config/siteConfig";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface NavBrandProps {
  className?: string;
  imageClassName?: string;
  nameClassName?: string;
  descriptionClassName?: string;
}

/** Emblem + name + description, painted in nav ink so each design's tokens
 *  colour it. A tighter lockup than the current Logo, which leaves the nav
 *  more room. */
const NavBrand = ({
  className,
  imageClassName,
  nameClassName,
  descriptionClassName,
}: NavBrandProps) => (
  <Link
    href="/"
    aria-label={siteConfig.name}
    className={cn("flex shrink-0 items-center gap-3", className)}
  >
    <Image
      src={logo}
      alt=""
      width={80}
      height={80}
      className={cn("size-11 object-contain", imageClassName)}
    />
    <span className="leading-tight">
      <span
        className={cn(
          "block text-[17px] font-bold tracking-tight text-nav-ink",
          nameClassName
        )}
      >
        {siteConfig.name}
      </span>
      <span
        className={cn(
          "block text-xs font-medium text-nav-ink-muted",
          descriptionClassName
        )}
      >
        {siteConfig.description}
      </span>
    </span>
  </Link>
);

export default NavBrand;
