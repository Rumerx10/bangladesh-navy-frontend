"use client";

import NavyWatermark from "@/src/components/shared/NavyWatermark";
import NewsCard from "@/src/components/home/News/NewsCard";
import { newsItems } from "@/src/data/homeData";
import { motion } from "framer-motion";
import { ChevronRight, Home, Newspaper } from "lucide-react";
import Link from "next/link";

export default function NewsListingPage() {
  return (
    <div className="mt-28 lg:mt-[104px]">
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-[#001836] to-[#003052] py-14 lg:py-20 overflow-hidden">
        <div className="absolute -right-20 -top-10 text-white">
          <NavyWatermark variant="anchor" size={300} opacity={0.05} animate="float" />
        </div>
        <div className="relative container px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Newspaper size={22} />
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                BNHOC
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">
              News & Events
            </h1>
            <p className="text-base text-gray-300 max-w-lg mx-auto">
              Stay updated with the latest hydrographic surveys, maritime events, and BNHOC publications
            </p>
          </motion.div>

          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-1.5 mt-6 text-sm text-gray-400">
            <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home size={14} /> Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">News & Events</span>
          </nav>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <NewsCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
