import { INewsItem } from "@/src/types/home";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

interface NewsCardProps {
  item: INewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <Link
      href={item.href}
      className="group flex flex-col h-full rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-xl hover:border-[#003f71]/15 transition-all duration-300"
    >
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#003f71] to-[#0069b4] group-hover:h-1.5 transition-all duration-300" />

      <div className="flex-1 p-5 lg:p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={14} className="text-[#003f71]" />
          <span className="text-xs font-semibold text-[#003f71]">
            {item.date}
          </span>
        </div>

        <h3 className="text-base font-bold text-[#001836] group-hover:text-[#003f71] transition-colors line-clamp-2 leading-snug mb-2">
          {item.title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-1">
          {item.description}
        </p>

        <span className="inline-flex items-center gap-1.5 text-sm text-[#003f71] font-medium group-hover:gap-2.5 transition-all">
          Read More <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
