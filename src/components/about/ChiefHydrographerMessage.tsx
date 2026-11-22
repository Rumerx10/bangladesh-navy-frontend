"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Ship } from "lucide-react";
import { useGet } from "@/src/hooks/useGet";
import { IBiography } from "@/src/components/types";
import { sanitizeRichText } from "@/src/utils/sanitize";

const ChiefHydrographerMessageSkeleton = () => (
  <div className="w-full max-w-4xl mx-auto bg-card rounded-2xl shadow-2xl overflow-hidden animate-pulse">
    <div className="bg-linear-to-r from-brand-navy to-brand-blue px-6 sm:px-10 py-6 sm:py-8">
      <div className="flex items-start gap-5">
        <div className="hidden sm:block w-16 h-16 rounded-full bg-white/20 shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-3 w-28 rounded bg-white/20" />
          <div className="h-6 w-2/3 rounded bg-white/20" />
          <div className="h-4 w-40 rounded bg-white/20" />
        </div>
      </div>
    </div>
    <div className="px-4 lg:px-6 py-4 lg:py-6 space-y-3">
      <div className="w-10 h-10 rounded bg-light-silver mb-4" />
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-light-silver rounded"
          style={{ width: i % 3 === 2 ? "70%" : "100%" }}
        />
      ))}
    </div>
  </div>
);

const ChiefHydrographerMessage = () => {
  const { data, isLoading } = useGet<IBiography>("/biography", ["biography"]);
  const biography = data?.data;

  if (isLoading) return <ChiefHydrographerMessageSkeleton />;

  if (!biography) {
    return (
      <p className="text-center text-secondary-foreground">
        The Chief Hydrographer&apos;s message is not available at the moment.
      </p>
    );
  }

  return (
    <motion.article
      className="w-full mx-auto bg-card rounded-2xl shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="relative bg-linear-to-r from-brand-navy to-brand-blue px-6 sm:px-10 py-6 sm:py-8">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
          <Ship size={80} className="text-white" />
        </div>
        <div className="relative flex items-start gap-5">
          <div className="block relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
            <Image
              src={biography.imageUrl || "/CHIEF.jpeg"}
              alt={biography.nameEn}
              fill
              sizes="64px"
              className="object-cover object-top"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-0.5 bg-white/40" />
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                Full Biography
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {biography.nameEn}
            </h2>
            <p className="text-sm text-blue-200/80 mt-1">
              {biography.designationEn || "Chief Hydrographer"}
            </p>
            {/* Bengali Name & Designation - commented out */}
            {/* <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mt-2">
              {biography.nameBn}
            </h2>
            <p className="text-sm text-blue-200/80 mt-1">
              {biography.designationBn}
            </p> */}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 lg:px-6 py-4 lg:py-6">
        <Quote size={40} className="text-pBlue/20 mb-4" />
        <div className="space-y-6">
          <motion.div
            className="text-base lg:text-lg text-secondary-foreground text-justify leading-relaxed font-light [&_p]:mb-4 [&_p:last-child]:mb-0 [&_img]:rounded-lg [&_img]:shadow-sm after:content-[''] after:table after:clear-both"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            dangerouslySetInnerHTML={{
              __html: sanitizeRichText(biography.messageEn),
            }}
          />

          {/* Bengali Message - commented out */}
          {/* <motion.p
            className="text-base lg:text-lg text-secondary-foreground text-justify leading-relaxed font-light"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {biography.messageBn}
          </motion.p> */}
        </div>
        <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-pBlue">{biography.nameEn}</p>
            <p className="text-sm text-liteBlue font-medium tracking-wide uppercase mt-1">
              {biography.designationEn || "Chief Hydrographer"}
            </p>
            {/* Bengali footer - commented out */}
            {/* <p className="text-lg font-bold text-pBlue mt-2">
              {biography.nameBn}
            </p>
            <p className="text-sm text-liteBlue font-medium tracking-wide uppercase mt-1">
              {biography.designationBn}
            </p> */}
          </div>
          <div className="shrink-0 w-14 h-14 rounded-full border-2 border-dashed border-pBlue/20 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-pBlue/5 flex items-center justify-center text-pBlue font-bold text-sm">
              BN
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ChiefHydrographerMessage;
