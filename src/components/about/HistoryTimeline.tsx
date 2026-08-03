"use client";

import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { useGet } from "@/src/hooks/useGet";
import type { IHistoryContent } from "@/src/components/about/types";

const narrativeStyles =
  "text-base md:text-lg text-[#3a4858] leading-[1.9] text-justify " +
  "[&_p]:mb-5 [&_p:last-child]:mb-0 " +
  "[&_img]:float-left [&_img]:w-50 md:[&_img]:w-150 [&_img]:max-w-full " +
  "[&_img]:h-auto [&_img]:shrink-0 [&_img]:mr-7 [&_img]:mb-4 " +
  "[&_img]:rounded-xl [&_img]:shadow-md [&_img]:object-cover";

export default function HistoryTimeline() {
  const { data, isLoading } = useGet<IHistoryContent | null>("/history", [
    "history",
  ]);

  const history = data?.data;
  const contentEn = history?.contentEn
    ? typeof window !== "undefined"
      ? DOMPurify.sanitize(history.contentEn)
      : history.contentEn
    : "";

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="float-left mr-7 mb-4 w-50 md:w-150 h-40 md:h-75 rounded-xl bg-gray-200 shrink-0" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-200 rounded"
              style={{ width: i % 3 === 2 ? "70%" : "100%" }}
            />
          ))}
        </div>
        <div className="clear-both" />
      </div>
    );
  }

  if (!contentEn) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={narrativeStyles}
        dangerouslySetInnerHTML={{ __html: contentEn }}
      />
      <div className="clear-both" />
    </motion.div>
  );
}
