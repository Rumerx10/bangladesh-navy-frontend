import { siteConfig } from "@/src/config/siteConfig";
import { Mail, MapPin, Phone } from "lucide-react";

export default function TopInfoBar() {
  return (
    <div className="bg-[#001836] text-white text-xs">
      <div className="container flex items-center justify-between h-8 px-4">
        <span className="font-medium tracking-wide">Welcome to BNHOC</span>
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${siteConfig.phone1}`}
            className="flex items-center gap-1.5 font-medium hover:text-blue-300 transition-colors"
          >
            <Phone size={12} />
            <span>{siteConfig.phone1}</span>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-1.5 font-medium hover:text-blue-300 transition-colors"
          >
            <Mail size={12} />
            <span>{siteConfig.email}</span>
          </a>
          <span className="flex items-center gap-1.5 text-gray-400">
            <MapPin size={12} />
            <span>{siteConfig.address}</span>
          </span>
        </div>
        <div className="sm:hidden">
          <a
            href={`tel:${siteConfig.phone1}`}
            className="flex items-center gap-1 font-medium"
          >
            <Phone size={11} />
            <span>{siteConfig.phone1}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
