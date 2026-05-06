import { INoticeItem } from "@/src/components/home/types";
import { AlertTriangle, Info, RefreshCw } from "lucide-react";
import Link from "next/link";

const typeConfig = {
  warning: {
    icon: <AlertTriangle size={16} />,
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    border: "border-amber-200",
    label: "Warning",
    labelColor: "text-amber-600",
  },
  info: {
    icon: <Info size={16} />,
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    border: "border-blue-200",
    label: "Information",
    labelColor: "text-blue-600",
  },
  update: {
    icon: <RefreshCw size={16} />,
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    border: "border-emerald-200",
    label: "Update",
    labelColor: "text-emerald-600",
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
      className={`group flex flex-col rounded-xl ${config.bg} border ${config.border} p-4 lg:p-5 hover:shadow-md transition-all duration-300`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-9 h-9 rounded-lg ${config.iconBg} ${config.iconColor} flex items-center justify-center shrink-0`}
        >
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${config.labelColor}`}>
              {config.label}
            </span>
            <span className="text-[10px] text-gray-400">• {item.date}</span>
          </div>
          <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#003f71] transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h4>
        </div>
      </div>
    </Link>
  );
}
