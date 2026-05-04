import logo from "@/public/logo.png";
import { siteConfig } from "@/src/config/siteConfig";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <Link
        href="/"
        aria-label={siteConfig.name}
        className="shrink-0 flex gap-2 items-center cursor-pointer"
      >
        <Image
          src={logo}
          alt={siteConfig.name}
          width={80}
          height={80}
          className="w-12 h-12 object-contain"
        />
        <div>
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            {siteConfig.name}
          </span>
          <p className="text-xs text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
