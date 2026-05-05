import { ITimelineItem } from "@/src/types/about";
import TimelineCard from "./TimelineCard";

interface HistoryTimelineProps {
  items: ITimelineItem[];
}

export default function HistoryTimeline({ items }: HistoryTimelineProps) {
  return (
    <div className="relative py-8">
      {/* Center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block" />

      <div className="space-y-8 md:space-y-12">
        {items.map((item) => (
          <TimelineCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
