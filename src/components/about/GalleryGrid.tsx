"use client";

import { galleryItems } from "@/src/data/aboutData";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const allCategories = ["All", ...Array.from(new Set(galleryItems.map((g) => g.category)))];

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.94,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 140,
      damping: 18,
    },
  },
};

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <motion.section
      className="py-12 lg:py-20 bg-white"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={gridVariants}
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 lg:mb-16">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 h-11 rounded-full font-bold text-sm transition-all cursor-pointer inline-flex items-center justify-center tracking-wider uppercase ${
                activeCategory === cat
                  ? "bg-[#003f71] text-white shadow-lg shadow-blue-900/20"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          variants={gridVariants}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9, y: 18 }}
                transition={{ delay: i * 0.05 }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -10, scale: 1.02, rotate: -0.3 }
                }
                className="group relative aspect-4/5 rounded-2xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500"
              >
                {!shouldReduceMotion ? (
                  <motion.div
                    className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_58%)]"
                    animate={{
                      opacity: [0.35, 0.7, 0.35],
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 6 + i * 0.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ) : null}

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#001836]/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30"
                    initial={false}
                    animate={shouldReduceMotion ? undefined : { scale: [0.85, 1.05, 1], rotate: [0, 8, 0] }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
                  >
                    <Search size={20} />
                  </motion.div>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                  initial={false}
                  animate={shouldReduceMotion ? undefined : { y: 0 }}
                >
                  <span className="inline-block px-2 py-0.5 rounded-md bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                    {item.category}
                  </span>
                  <h4 className="text-white text-base lg:text-lg font-bold leading-tight line-clamp-2">
                    {item.title}
                  </h4>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
