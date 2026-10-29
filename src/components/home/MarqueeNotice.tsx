"use client";

import type { CSSProperties } from "react";
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
    // 👇 tighter gap on mobile, original on sm+
    <span key={index} className="px-4 sm:px-10">
      {notice.name}
    </span>
  ));

  return (
    // 👇 slightly slimmer strip on mobile
    <div className="bg-nav-strip text-nav-ink py-1.5 sm:py-2 overflow-hidden flex items-center">
      <div className="container px-3 sm:px-4 flex items-center">
        <span className="font-bold text-xs sm:text-sm shrink-0 mr-2 sm:mr-4 bg-nav-wash-strong px-2 sm:px-3 py-1 rounded">
          NOTICE
        </span>
        <div
          // 👇 smaller text + normal tracking on mobile
          className="flex-1 overflow-hidden relative flex text-xs sm:text-sm tracking-normal sm:tracking-wider font-medium"
          style={
            {
              "--marquee-duration": `${Math.max(20, notices.length * 7)}s`,
            } as CSSProperties
          }
        >
          <div className="animate-marquee shrink-0 whitespace-nowrap">
            {track}
          </div>
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
