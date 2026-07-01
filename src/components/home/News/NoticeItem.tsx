import { INoticeItem } from "@/src/components/home/types";
import { AlertTriangle, Info, RefreshCw } from "lucide-react";
import Link from "next/link";

const typeIcon = {
  warning: <AlertTriangle size={14} className="text-amber-500" />,
  info: <Info size={14} className="text-blue-500" />,
  update: <RefreshCw size={14} className="text-emerald-500" />,
};

interface NoticeItemProps {
  item: INoticeItem;
  isLast?: boolean;
}

export default function NoticeItem({ item, isLast }: NoticeItemProps) {
  return (
    <Link
      href={item.href}
      className={`group flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
    >
      <div className="mt-0.5 shrink-0">
        {typeIcon[item.type ?? "info"]}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-800 group-hover:text-liteBlue transition-colors line-clamp-1">
          {item.title}
        </h4>
        <span className="text-xs text-gray-400 mt-0.5 block">{item.date}</span>
      </div>
    </Link>
  );
}
