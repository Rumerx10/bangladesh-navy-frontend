"use client";
import BiographyCard from "./BiographyCard";
import BiographyModal from "./BiographyModal";
import QuickAccessCard from "./QuickAccessCard";
import { quickAccessItems } from "@/src/data/homeData";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import NavyWatermark from "@/src/components/shared/NavyWatermark";


const QuickAccess = () => {
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
      <section className="relative py-8 lg:py-20 bg-gray-50 overflow-hidden">
        {/* Watermarks */}
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-pBlue">
          <NavyWatermark
            variant="helm"
            size={400}
            opacity={0.025}
            animate="rotate"
          />
        </div>
        <div className="absolute -left-20 -bottom-10 text-pBlue">
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
            <div className="w-full lg:w-[80%]">
              <motion.div
                className="mb-8 lg:mb-10"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl lg:text-5xl font-bold text-pBlue">
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

            {/* Right — 20%: Chief Message card */}
            <BiographyCard openModal={openModal} />
          </div>
        </div>
      </section>

      {/* Full Biography Modal */}
      <AnimatePresence>
        {modalOpen && <BiographyModal closeModal={closeModal} />}
      </AnimatePresence>
    </>
  );
};

export default QuickAccess;
