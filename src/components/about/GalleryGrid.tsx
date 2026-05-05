"use client";

import { galleryItems } from "@/src/data/aboutData";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useState } from "react";

const allCategories = ["All", ...Array.from(new Set(galleryItems.map((g) => g.category)))];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <section className="py-8 lg:py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 h-[44px] py-[16px] rounded-full font-medium text-base transition-all cursor-pointer inline-flex items-center justify-center ${
                activeCategory === cat
                  ? "bg-[#001836] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-[#001836] to-[#003f71] cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera size={40} className="text-white/15" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-sm font-medium">{item.title}</p>
                <p className="text-white/70 text-xs mt-0.5">{item.category}</p>
              </div>
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/30 backdrop-blur-sm text-white text-[10px] font-medium">
                {item.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
