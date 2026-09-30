"use client";

import { useGet } from "@/src/hooks/useGet";

interface INoticeList {
  name: string;
}

const MarqueeNotice = () => {
  const { data } = useGet<INoticeList[]>("/notice/list", [
    "notice-list-marquee",
  ]);

  const notices = Array.isArray(data?.data) ? data.data : [];

  if (notices.length === 0) return null;

  const track = notices.map((notice, index) => (
    <span key={index} className="px-10">
      {notice.name}
    </span>
  ));

  return (
    <div className="bg-nav-strip text-nav-ink py-2 overflow-hidden flex items-center">
      <div className="container px-4 flex items-center">
        <span className="font-bold text-sm shrink-0 mr-4 bg-nav-wash-strong px-3 py-1 rounded">
          NOTICE
        </span>
        <div
          className="flex-1 overflow-hidden relative flex text-sm tracking-wider font-medium"
          style={
            {
              // Keep the reading pace roughly constant: a fixed duration would
              // make a long notice list scroll past faster than a short one.
              "--marquee-duration": `${Math.max(20, notices.length * 7)}s`,
            } as React.CSSProperties
          }
        >
          <div className="animate-marquee shrink-0 whitespace-nowrap">
            {track}
          </div>
          {/* Second copy of the same notices, trailing one track-width behind,
              so it is already entering from the right as the first one exits. */}
          <div
            aria-hidden
            className="animate-marquee-follow absolute top-0 left-0 shrink-0 whitespace-nowrap"
          >
            {track}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeNotice;
