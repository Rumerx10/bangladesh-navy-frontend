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

  return (
    <div className="bg-liteBlue text-white py-2 overflow-hidden flex items-center">
      <div className="container px-4 flex items-center">
        <span className="font-bold text-sm shrink-0 mr-4 bg-[#002a4d] px-3 py-1 rounded">
          NOTICE
        </span>
        <div className="flex-1 overflow-hidden relative flex">
          <div className="animate-marquee whitespace-nowrap text-sm tracking-wider font-medium pt-1">
            {notices.map((notice, index) => (
              <span key={index} className="px-10">
                {notice.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeNotice;
