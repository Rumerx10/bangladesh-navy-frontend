"use client";

import NavyWatermark from "@/src/components/shared/NavyWatermark";
import { newsItems } from "@/src/data/homeData";
import { motion } from "framer-motion";
import { ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";
import NewsCard from "./NewsCard";

export default function NewsEvents() {
  // Show only the 3 latest news on the homepage
  const latestNews = newsItems.slice(0, 3);

  return (
    <>
      {/* ─── News & Events Section ─── */}
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
        {/* Watermark */}
        <div className="absolute -right-16 top-20 text-[#001836]">
          <NavyWatermark
            variant="ship"
            size={400}
            opacity={0.025}
            animate="float"
          />
        </div>

        <div className="relative container px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            className="text-center mb-10 lg:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Newspaper size={20} className="text-[#003f71]" />
              <span className="text-sm font-semibold text-[#003f71] uppercase tracking-wider">
                Stay Updated
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#001836]">
              Latest News & Events
            </h2>
            <p className="mt-2 text-sm lg:text-base text-gray-500 max-w-lg mx-auto">
              Stay informed about the latest hydrographic updates and maritime
              events
            </p>
          </motion.div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <NewsCard item={item} hideImage={true} />
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Link
              href="/news"
              className="inline-flex items-center justify-center gap-2 px-8 h-[44px] py-[16px] rounded-lg bg-[#003f71] text-white font-medium text-base hover:bg-[#004d8a] transition-colors"
            >
              View All News <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
