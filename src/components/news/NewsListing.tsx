"use client";

import Link from "next/link";
import { INewsItem } from "../types";
import { motion } from "framer-motion";
import { useGet } from "@/src/hooks/useGet";
import NewsCard from "@/src/components/home/News/NewsCard";
import { ChevronRight, Home, Newspaper } from "lucide-react";
import NavyWatermark from "@/src/components/shared/NavyWatermark";

const NewsListingPage = () => {
  const { data, isLoading } = useGet<INewsItem[]>("/news-events/list", [
    "news-events-list",
  ]);

  const newsItems = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="mt-28 lg:mt-26">
      {/* Page Header */}
      <section className="relative bg-linear-to-b from-pBlue to-[#003052] py-14 lg:py-20 overflow-hidden">
        <div className="absolute -right-20 -top-10 text-white">
          <NavyWatermark
            variant="anchor"
            size={300}
            opacity={0.05}
            animate="float"
          />
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
              Stay updated with the latest hydrographic surveys, maritime
              events, and BNHOC publications
            </p>
          </motion.div>

          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-1.5 mt-6 text-sm text-gray-400">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
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
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                >
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                    <div className="h-5 w-full bg-gray-200 animate-pulse rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No news or events found.</p>
            </div>
          ) : (
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
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsListingPage;
