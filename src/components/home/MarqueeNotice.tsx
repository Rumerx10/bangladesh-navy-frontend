"use client";

export default function MarqueeNotice() {
  return (
    <div className="bg-liteBlue text-white py-2 overflow-hidden flex items-center">
      <div className="container px-4 flex items-center">
        <span className="font-bold text-sm shrink-0 mr-4 bg-[#002a4d] px-3 py-1 rounded">NOTICE</span>
        <div className="flex-1 overflow-hidden relative flex">
          <div className="animate-marquee whitespace-nowrap text-sm tracking-wider font-medium pt-1">
            <span className="pr-16">
              The Annual Summary of Notices to Mariners 2026 is available now
            </span>
            {/* <span className="pr-16">
              Mariners are advised to regularly check updated charts, tide tables, sailing directions, and hydrographic publications for safe navigation.
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
