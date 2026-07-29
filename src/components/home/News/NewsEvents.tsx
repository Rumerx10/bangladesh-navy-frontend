"use client";

import Link from "next/link";
import NewsCard from "./NewsCard";
import { motion } from "framer-motion";
import { INewsItem } from "../../types";
import { useGet } from "@/src/hooks/useGet";
import SectionTitle from "../../SectionTitle";
import { ArrowRight, Newspaper } from "lucide-react";
import NavyWatermark from "@/src/components/shared/NavyWatermark";

const NewsEvents = () => {
  const { data, isLoading } = useGet<INewsItem[]>("/news-events/list", [
    "news-events-list",
  ]);

  const allNews = Array.isArray(data?.data) ? data.data : [];
  const latestNews = allNews.slice(0, 3);

  return (
    <>
      {/* ─── News & Events Section ─── */}
      <section className="relative py-8 lg:py-20 bg-white overflow-hidden">
        {/* Watermark */}
        <div className="absolute -right-16 top-20 text-pBlue">
          <NavyWatermark
            variant="ship"
            size={400}
            opacity={0.025}
            animate="float"
          />
        </div>

        <div className="relative container px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Newspaper size={20} className="text-liteBlue" />
            </div>
            <SectionTitle
              title="News and Events"
              desc="Stay informed about the latest hydrographic updates and maritime events"
            />
          </div>

          {/* News Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-gray-100 overflow-hidden"
                >
                  <div className="p-5 lg:p-6 space-y-3">
                    <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                    <div className="h-5 w-full bg-gray-200 animate-pulse rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : latestNews.length === 0 ? (
            <div className="text-center py-10">
              <Newspaper size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No news or events available.</p>
            </div>
          ) : (
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
          )}

          {/* View All Button */}
          {latestNews.length > 0 && (
            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Link
                href="/news"
                className="inline-flex items-center justify-center gap-2 px-8 h-11 py-4 rounded-lg bg-liteBlue text-white font-medium text-base hover:bg-[#004d8a] transition-colors"
              >
                View All News <ArrowRight size={18} />
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default NewsEvents;
