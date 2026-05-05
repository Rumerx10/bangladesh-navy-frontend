import { ITimelineItem } from "@/src/types/about";
import { Building, Cpu, Flag, Globe, Monitor } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  flag: <Flag size={18} />,
  building: <Building size={18} />,
  monitor: <Monitor size={18} />,
  cpu: <Cpu size={18} />,
  globe: <Globe size={18} />,
};

interface TimelineCardProps {
  item: ITimelineItem;
}

export default function TimelineCard({ item }: TimelineCardProps) {
  const isRight = item.position === "right";

  return (
    <div className="relative flex flex-col md:flex-row items-center">
      {/* Left content area */}
      <div className={`w-full md:w-1/2 ${isRight ? "md:order-2 md:pl-12" : "md:pr-12 md:text-right"}`}>
        <div className="bg-white rounded-xl border border-gray-100 p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className={`flex items-center gap-3 mb-3 ${!isRight ? "md:justify-end" : ""}`}>
            <div className="w-10 h-10 rounded-lg bg-[#003f71]/10 text-[#003f71] flex items-center justify-center">
              {iconMap[item.icon] ?? <Flag size={18} />}
            </div>
            <span className="text-xs font-bold text-[#003f71] uppercase tracking-wider">
              {item.year}
            </span>
          </div>
          <h3 className="text-base font-bold text-[#001836]">{item.title}</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Center dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#003f71] border-[3px] border-white shadow-md z-10 hidden md:block" />

      {/* Empty half */}
      <div className={`hidden md:block w-1/2 ${isRight ? "md:order-1" : ""}`} />
    </div>
  );
}
