"use client";

import { chiefMessage, quickAccessItems } from "@/src/data/homeData";
import NavyWatermark from "@/src/components/shared/NavyWatermark";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Quote, Ship, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import QuickAccessCard from "./QuickAccessCard";

function renderParagraph(para: string) {
  if (para.includes("Military Institute of Science and Technology (MIST)")) {
    return (
      <>
        {para.split("Military Institute of Science and Technology (MIST)")[0]}
        <Link
          href="https://mist.ac.bd/"
          target="_blank"
          className="text-[#003f71] font-semibold underline underline-offset-4 hover:text-blue-600 transition-colors"
        >
          Military Institute of Science and Technology (MIST)
        </Link>
        {para.split("Military Institute of Science and Technology (MIST)")[1]}
      </>
    );
  }
  return para;
}

export default function QuickAccess() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen, closeModal]);

  return (
    <>
      <section className="relative py-16 lg:py-25 bg-gray-50 overflow-hidden">
        {/* Watermarks */}
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[#001836]">
          <NavyWatermark
            variant="helm"
            size={400}
            opacity={0.025}
            animate="rotate"
          />
        </div>
        <div className="absolute -left-20 -bottom-10 text-[#001836]">
          <NavyWatermark
            variant="waves"
            size={300}
            opacity={0.03}
            animate="bob"
          />
        </div>

        <div className="relative container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            {/* Left — 70%: title + cards */}
            <div className="w-full lg:w-[70%]">
              <motion.div
                className="mb-8 lg:mb-10"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl lg:text-5xl font-bold text-[#001836]">
                  Quick Access
                </h2>
                <p className="mt-2 text-sm lg:text-base text-gray-500">
                  Access our most popular products and services with a single
                  click
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                {quickAccessItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <QuickAccessCard item={item} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — 30%: Chief Message card */}
            <motion.div
              className="w-full lg:w-[30%] lg:sticky lg:top-28"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-md border border-gray-300">
                {/* Simple gray accent line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gray-600" />

                {/* Chief image */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src="/CHIEF.jpeg"
                    alt={chiefMessage.name}
                    fill
                    className="object-cover object-top"
                  />
                  {/* Simple dark overlay at bottom for text readability if needed, but we don't have text over image */}
                  <div className="absolute inset-0 bg-gray-900/10" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gray-700 text-[10px] font-bold text-white uppercase tracking-wider">
                    Chief Hydrographer
                  </div>
                </div>

                {/* Content panel - pure gray */}
                <div className="relative px-5 pb-6 pt-3 bg-white">
                  <Quote size={26} className="text-gray-400 mb-2" />

                  <h3 className="text-gray-800 font-bold text-base leading-snug">
                    {chiefMessage.name}
                  </h3>
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mt-0.5 mb-4">
                    {chiefMessage.designation}
                  </p>

                  <p className="text-gray-600 text-sm text-justify leading-relaxed line-clamp-4">
                    {chiefMessage.content[0]}
                  </p>

                  {/* <div className="my-5 h-px bg-gray-200" /> */}

                  <button
                    onClick={openModal}
                    className="mt-10 cursor-pointer group w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-200 border border-gray-200 hover:border-gray-400 transition-all duration-200"
                  >
                    <span className="text-gray-700 text-sm font-semibold">
                      Read Full Biography
                    </span>
                    <ChevronRight
                      size={16}
                      className="text-gray-500 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Biography Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#001836]/60 backdrop-blur-md"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Modal Header */}
              <div className="relative bg-linear-to-r from-[#001836] to-[#003f71] px-6 sm:px-10 py-6 sm:py-8 shrink-0">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
                  <Ship size={80} className="text-white" />
                </div>
                <div className="relative flex items-start gap-5">
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
                <button
                  onClick={closeModal}
                  className="crusor-pointer absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 sm:py-10">
                <Quote size={40} className="text-[#001836]/5 -mb-4 -ml-1.5" />
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
                <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-[#001836]">
                      {chiefMessage.name}
                    </p>
                    <p className="text-sm text-[#003f71] font-medium tracking-wide uppercase mt-1">
                      {chiefMessage.designation}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#001836]/20 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#001836]/5 flex items-center justify-center text-[#001836] font-bold text-sm">
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
