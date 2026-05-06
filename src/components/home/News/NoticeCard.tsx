import { INoticeItem } from "@/src/components/home/types";
import { AlertTriangle, Info, RefreshCw } from "lucide-react";
import Link from "next/link";

const typeConfig = {
  warning: {
    accent: "border-l-amber-500",
    labelColor: "text-amber-600",
    label: "Warning",
  },
  info: {
    accent: "border-l-[#003f71]",
    labelColor: "text-[#003f71]",
    label: "Information",
  },
  update: {
    accent: "border-l-emerald-500",
    labelColor: "text-emerald-600",
    label: "Update",
  },
};

interface NoticeCardProps {
  item: INoticeItem;
}

export default function NoticeCard({ item }: NoticeCardProps) {
  const config = typeConfig[item.type ?? "info"];

  return (
    <Link
      href={item.href}
      className={`group relative flex flex-col bg-white ${config.accent} border-l-4 p-6 rounded-r-xl hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${config.labelColor}`}>
            {config.label}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">
            {item.date}
          </span>
        </div>
        <h4 className="text-base lg:text-lg font-bold text-[#001836] group-hover:text-[#003f71] transition-colors line-clamp-2 leading-snug">
          {item.title}
        </h4>
      </div>
      
      <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[11px] text-gray-500 group-hover:text-[#003f71] font-bold transition-colors uppercase tracking-tight">
          View Full Notice
        </span>
        <div className="text-gray-300 group-hover:text-[#003f71] transition-all transform group-hover:translate-x-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14m-7-7 7 7-7 7"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
