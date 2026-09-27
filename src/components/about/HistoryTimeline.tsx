"use client";

import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { useGet } from "@/src/hooks/useGet";
import type { IHistoryContent } from "@/src/components/about/types";
import { richTextNarrativeClass } from "@/src/components/shared/text-editor/richTextStyles";
import { cn } from "@/src/lib/utils";

// Layout for each image — how wide it is, which side it floats to, how much
// air sits between it and the text running past it — comes from the inline
// `style` the admin's image toolbar writes per image (see
// resizable-image.ts's `getWrapStyle`), backed by the shared `.rich-text`
// rules in globals.css. Forcing a blanket float here used to fight that
// per-image choice, which is why the public page could drift from what the
// admin arranged in the editor.
const narrativeStyles = cn(richTextNarrativeClass, "text-base md:text-lg");

const HistoryTimeline = () => {
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
        {/* Mirrors the editor's default insert: a float taking just under half
            the column, with the narrative running past it. */}
        <div className="sm:float-left sm:mr-4 mb-4 w-full sm:w-[45%] aspect-16/10 bg-light-silver" />
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-light-silver rounded"
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
    </motion.div>
  );
};

export default HistoryTimeline;
