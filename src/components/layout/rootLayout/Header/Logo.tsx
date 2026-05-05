import logo from "@/public/logo.png";
import { siteConfig } from "@/src/config/siteConfig";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label={siteConfig.name}
      className="shrink-0 flex gap-2.5 items-center cursor-pointer"
    >
      <Image
        src={logo}
        alt={siteConfig.name}
        width={80}
        height={80}
        className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
      />
      <div className="hidden sm:block">
        <span className="text-base lg:text-lg font-bold text-[#001836] tracking-tight leading-tight block">
          {siteConfig.name}
        </span>
        <p className="text-[10px] lg:text-xs text-gray-500 leading-tight">
          {siteConfig.description}
        </p>
      </div>
    </Link>
  );
}
