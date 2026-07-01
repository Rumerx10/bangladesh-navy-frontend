"use client";

import NavyWatermark from "@/src/components/shared/NavyWatermark";
import { chiefMessage } from "@/src/data/homeData";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Quote, Ship, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const VISIBLE_PARAGRAPHS = 1;

function renderParagraph(para: string) {
  if (para.includes("Military Institute of Science and Technology (MIST)")) {
    return (
      <>
        {para.split("Military Institute of Science and Technology (MIST)")[0]}
        <Link
          href="https://mist.ac.bd/"
          target="_blank"
          className="text-liteBlue font-semibold underline underline-offset-4 hover:text-blue-600 transition-colors"
        >
          Military Institute of Science and Technology (MIST)
        </Link>
        {para.split("Military Institute of Science and Technology (MIST)")[1]}
      </>
    );
  }
  return para;
}

export default function ChiefMessage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // Close modal on Escape key
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, closeModal]);

  const truncatedContent = chiefMessage.content.slice(0, VISIBLE_PARAGRAPHS);
  const hasMore = chiefMessage.content.length > VISIBLE_PARAGRAPHS;
  console.log(truncatedContent);
  return (
    <>
      <section className="relative py-20 lg:py-32 bg-white overflow-hidden">
        {/* Dynamic Watermarks for visual depth */}
        <div className="absolute -right-24 top-20 text-pBlue opacity-10">
          <NavyWatermark
            variant="anchor"
            size={450}
            opacity={0.3}
            animate="float"
          />
        </div>
        <div className="absolute -left-32 bottom-20 text-pBlue opacity-10">
          <NavyWatermark
            variant="lighthouse"
            size={400}
            opacity={0.3}
            animate="drift"
          />
        </div>

        <div className="relative container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* Left Column: Image & Badges */}
            <motion.div
              className="w-full lg:w-[40%] sticky top-32"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative group">
                {/* Main Decorative Frame */}
                <div className="absolute -inset-4 border-2 border-pBlue/10 rounded-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500" />
                <div className="absolute -inset-4 border-2 border-liteBlue/10 rounded-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-500" />

                <div className="relative aspect-4/5 rounded-xl overflow-hidden shadow-2xl border-8 border-white">
                  <Image
                    src="/CHIEF.jpeg"
                    alt={chiefMessage.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    priority
                  />

                  {/* Bottom Overlay Info */}
                  {/* <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-pBlue via-pBlue/80 to-transparent p-6 text-white">
                    <h3 className="text-xl font-bold leading-tight">
                      {chiefMessage.name}
                    </h3>
                    <p className="text-sm text-blue-200 mt-1">
                      {chiefMessage.designation}
                    </p>
                  </div> */}
                </div>

                {/* Floating BN Badge or Emblem decoration */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-pBlue rounded-full flex items-center justify-center border-4 border-white shadow-xl z-10">
                  <Ship className="text-white w-10 h-10" />
                </div>
              </div>

              {/* Quick Highlights beneath photo */}
              {/* <div className="grid grid-cols-2 gap-4 mt-10">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                    Award
                  </span>
                  <span className="text-xs font-bold text-pBlue">
                    NGP, Shuddachar Award
                  </span>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                    Education
                  </span>
                  <span className="text-xs font-bold text-pBlue">
                    MBA, MSc (Hydrography)
                  </span>
                </div>
              </div> */}
            </motion.div>

            {/* Right Column: Message Content */}
            <motion.div
              className="w-full lg:w-[60%]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              {/* Section Header */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-1 bg-liteBlue" />
                  <span className="text-sm font-bold text-liteBlue uppercase tracking-widest">
                    Official Biography
                  </span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold text-pBlue leading-tight mb-2">
                  {chiefMessage.title}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <p className="text-xl font-bold text-pBlue">
                      {chiefMessage.name}
                    </p>
                  </div>
                </div>
                <Quote size={48} className="text-pBlue/5 -mb-6 -ml-2.5" />
                
              </div>

              {/* Truncated Biography Paragraphs */}
              <div className="space-y-6 relative z-10">
                {truncatedContent.map((para, i) => (
                  <motion.p
                    key={i}
                    className="text-base lg:text-lg text-gray-600 leading-relaxed font-light"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    {renderParagraph(para)}
                  </motion.p>
                ))}
              </div>

              {/* Read More Button */}
              {hasMore && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <button
                    id="chief-message-read-more"
                    onClick={openModal}
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-pBlue to-liteBlue text-white text-sm font-semibold uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl hover:shadow-pBlue/20 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Read Full Biography
                    <ChevronRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </motion.div>
              )}

              {/* Signature Area */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Biography Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-pBlue/60 backdrop-blur-md"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Modal Header */}
              <div className="relative bg-linear-to-r from-pBlue to-liteBlue px-6 sm:px-10 py-6 sm:py-8 shrink-0">
                {/* Decorative watermark in header */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
                  <Ship size={80} className="text-white" />
                </div>

                <div className="relative flex items-start gap-5">
                  {/* Mini Photo */}
                  <div className="hidden sm:block relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
                    <Image
                      src="/CHIEF.jpeg"
                      alt={chiefMessage.name}
                      fill
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
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                      {chiefMessage.name}
                    </h3>
                    <p className="text-sm text-blue-200/80 mt-1">
                      {chiefMessage.designation}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  id="chief-message-modal-close"
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body — Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 sm:py-10">
                <Quote size={40} className="text-pBlue/5 -mb-4 -ml-1.5" />
                <div className="space-y-6">
                  {chiefMessage.content.map((para, i) => (
                    <motion.p
                      key={i}
                      className="text-base lg:text-lg text-gray-600 leading-relaxed font-light"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    >
                      {renderParagraph(para)}
                    </motion.p>
                  ))}
                </div>

                {/* Modal Signature */}
                <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-pBlue">
                      {chiefMessage.name}
                    </p>
                    <p className="text-sm text-liteBlue font-medium tracking-wide uppercase mt-1">
                      {chiefMessage.designation}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-pBlue/20 flex items-center justify-center p-1.5">
                    <div className="w-full h-full rounded-full bg-pBlue/5 flex items-center justify-center text-pBlue font-bold text-sm">
                      BN
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
