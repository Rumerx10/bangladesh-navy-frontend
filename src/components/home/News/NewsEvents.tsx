"use client";

import { newsItems, noticeItems } from "@/src/data/homeData";
import NavyWatermark from "@/src/components/shared/NavyWatermark";
import { motion } from "framer-motion";
import { ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";
import NewsCard from "./NewsCard";
import NoticeCard from "./NoticeCard";

export default function NewsEvents() {
  return (
    <section id="latest-notices" className="relative py-16 lg:py-24 bg-gray-50 overflow-hidden">
      {/* Watermark */}
      <div className="absolute -right-16 top-20 text-[#001836]">
        <NavyWatermark variant="ship" size={400} opacity={0.025} />
      </div>
      <div className="absolute -left-12 bottom-10 text-[#001836]">
        <NavyWatermark variant="compass" size={300} opacity={0.02} />
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
            Latest News & Notices
          </h2>
          <p className="mt-2 text-sm lg:text-base text-gray-500 max-w-lg mx-auto">
            Stay informed about the latest hydrographic updates and maritime notices
          </p>
        </motion.div>

        {/* News Cards Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#001836]">News & Events</h3>
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 text-sm text-[#003f71] font-medium hover:underline"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {newsItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <NewsCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Notice Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#001836]">
              Recent Notices to Mariners
            </h3>
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 text-sm text-[#003f71] font-medium hover:underline"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {noticeItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <NoticeCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
