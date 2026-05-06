import { INewsItem } from "@/src/components/home/types";
import { ArrowRight, Calendar, Newspaper, Tag } from "lucide-react";
import Image from "next/image";
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
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#001836] to-[#003f71]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Category badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#003f71]/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
          <Tag size={10} />
          {item.category}
        </span>
      </div>

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
