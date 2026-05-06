"use client";

import { galleryItems } from "@/src/data/aboutData";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Search } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const allCategories = ["All", ...Array.from(new Set(galleryItems.map((g) => g.category)))];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 lg:mb-16">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 h-[44px] rounded-full font-bold text-sm transition-all cursor-pointer inline-flex items-center justify-center tracking-wider uppercase ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001836]/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 scale-50 group-hover:scale-100 transition-transform duration-300">
                    <Search size={20} />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                    {item.category}
                  </span>
                  <h4 className="text-white text-base lg:text-lg font-bold leading-tight line-clamp-2">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
