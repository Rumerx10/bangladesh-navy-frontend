import { IQuickAccessItem } from "@/src/components/home/types";
import {
  Info,
  ArrowRight,
  BookOpen,
  CloudSun,
  Map,
  Monitor,
  Waves,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
  map: <Map size={22} />,
  monitor: <Monitor size={22} />,
  waves: <Waves size={22} />,
  "alert-triangle": <Info size={22} />,
  "book-open": <BookOpen size={22} />,
  "cloud-sun": <CloudSun size={22} />,
};

interface QuickAccessCardProps {
  item: IQuickAccessItem;
}

export default function QuickAccessCard({ item }: QuickAccessCardProps) {
  return (
    <Link
      href={item.href}
      className="shadow group flex items-center gap-4 p-5 rounded-xl bg-white border border-gray-100 hover:border-[#003f71]/20 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-[#003f71]/8 text-[#003f71] flex items-center justify-center shrink-0 group-hover:bg-[#003f71] group-hover:text-white transition-colors duration-300">
        {iconMap[item.icon] ?? <Map size={22} />}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-[#001836] group-hover:text-[#003f71] transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
          {item.description}
        </p>
      </div>
      <ArrowRight
        size={18}
        className="text-gray-300 group-hover:text-[#003f71] group-hover:translate-x-1 transition-all duration-300 shrink-0"
      />
    </Link>
  );
}
